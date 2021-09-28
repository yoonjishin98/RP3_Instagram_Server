const jwtMiddleware = require("../../../config/jwtMiddleware");
const storyProvider = require("../../app/Story/storyProvider");
const storyService = require("../../app/Story/storyService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 16
 * API Name : 스토리 생성 API
 * [POST] /app/stories
 */
exports.postStories = async function(req, res) {

    /**
     * Body: userId,contents,mediaContents
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId,contents,mediaContents} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    if(!mediaContents)
        res.send(errResponse(baseResponse.POST_EMPTY));

    // TODO: userId 존재 여부 체크
    // const userIdResponse = await storyProvider.userIdCheck(userId);
    // if (!(userIdResponse.length > 0))
    //     return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const storyResponse = await storyService.createStory(userId,contents,mediaContents);
        return res.send(storyResponse);
    }

};


/**
 * API No.17
 * API Name : 스토리 조회 API
 * [GET] /app/stories/:userId
 */
exports.getStories = async function (req, res) {

    /**
     * path variable: userId
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;

    // TODO: userId 존재 여부 체크
    // const userIdResponse = await storyProvider.userIdCheck(userId);
    // if (!(userIdResponse.length > 0))
    //     return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    // TODO: 삭제된 스토리 체크

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getStoryResponse = await storyProvider.retrieveStory(userId);
        return res.send(getStoryResponse);
    }

};


/**
 * API No.18
 * API Name : 스토리 삭제 API
 * [PATCH] /app/stories/:userId/status
 */
exports.deleteStories = async function (req, res) {

    /**
     * Path Variable: userId
     * body: storyIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {storyIdx} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    if(!storyIdx)
        return res.send(response(baseResponse.STORY_STORYIDX_EMPTY));

    //TODO: 존재하지 않는 userId에 대한 validation 처리 필요 -> USER_USERID_NOT_EXIST

    //TODO: 존재하지 않는 storyIdx에 대한 validation 처리 필요 -> STORY_STORYIDX_NOT_EXIST

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getStoryResponse = await storyService.deleteStory(storyIdx);
        return res.send(getStoryResponse);
    }

};

