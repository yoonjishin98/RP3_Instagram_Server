const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
}

/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body: email, password, nickname, userId
     */
    const {email, password, userNickname, userId} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

    if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));

    if (!userNickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));

    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 길이 체크
    if (userId.length > 50)
        return res.send(response(baseResponse.SIGNUP_USERID_LENGTH));

    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    if (userNickname.length > 20)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));


    const signUpResponse = await userService.createUser(
        email,
        password,
        userNickname,
        userId
    );

    return res.send(signUpResponse);
};

/**
 * API No. -
 * API Name : 유저 조회 API (+ 이메일로 검색 조회)
 * [GET] /app/users
 */
exports.getUsers = async function (req, res) {

    /**
     * Query String: email
     */
    const email = req.query.email;

    if (!email) {
        // 유저 전체 조회
        const userListResult = await userProvider.retrieveUserList();
        return res.send(response(baseResponse.SUCCESS, userListResult));
    } else {
        // 유저 검색 조회
        const userListByEmail = await userProvider.retrieveUserList(email);
        return res.send(response(baseResponse.SUCCESS, userListByEmail));
    }
};


/**
 * API No. 2
 * API Name : 특정 유저 조회 API - 프로필
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;
    const userIdForFollower = userId;
    const userIdForFollowing = userId;

    // 아이디 존재여부 확인
    const idRows = await userProvider.userIdCheck(userId);
    if (!(idRows.length > 0))
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));
    else{
        const userByUserId = await userProvider.retrieveUser(userIdForFollower,userIdForFollowing,userId);

        return res.send(response(baseResponse.SUCCESS, userByUserId));
    }

};


/**
 * API No. 5
 * API Name : 유저가 팔로우한 포스트들 조회 API(메인화면)
 * [GET] /app/users/:userId/posts
 */
exports.getFollowPosts = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const selectPosts = await userProvider.retrieveFollowPosts(userId);
        return res.send(selectPosts);
    }

};



/**
 * API No. 14
 * API Name : DM 1:1 대화 조회 API
 * [PATCH] /app/users/:userId/dm/:friendId
 */
exports.getDm = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;
    const {userId, friendId} = req.params;
    const {chatRoomIdx} = req.body;

    if (!chatRoomIdx)
        return res.send(response(baseResponse.DM_NOT_EMPTY));

    const roomCheckResponse = await userProvider.chatRoomIdxCheck(chatRoomIdx);
    if (!(roomCheckResponse.length > 0))
        return res.send(response(baseResponse.DM_NOT_EXIST));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getDmResponse = await userProvider.retrieveDm(userId,chatRoomIdx);
        return res.send(response(baseResponse.SUCCESS,getDmResponse));
    }

};


/**
 * API No. 15
 * API Name : DM 목록 조회 API
 * [PATCH] /app/users/:userId/dm
 */
exports.getDmList = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;

    const idRows = await userProvider.userIdCheck(userId);
    if (!(idRows.length > 0))
        return res.send(errResponse(baseResponse.USER_USERID_NOT_EXIST));

    if (userIdFromJWT != userId) {
        console.log(userId);
        console.log(userIdFromJWT);
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getDmListResponse = await userProvider.retrieveDmList(userId);
        return res.send(getDmListResponse);
    }

};









// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 100
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 101
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : userNickname
 */
exports.patchUsers = async function (req, res) {

    // jwt의 userId 값과 path variable 의 userId 가 일치하는지 판단 (validation)

    const userIdFromJWT = req.verifiedToken.userId;

    const userId = req.params.userId;
    const userNickname = req.body.userNickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!userNickname)
            return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUser = await userService.editUser(userId, userNickname)
        return res.send(editUser);
    }
};









/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
