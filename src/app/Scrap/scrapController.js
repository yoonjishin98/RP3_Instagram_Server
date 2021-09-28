const jwtMiddleware = require("../../../config/jwtMiddleware");
const scrapProvider = require("../../app/Scrap/scrapProvider");
const scrapService = require("../../app/Scrap/scrapService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");




/**
 * API No. 27
 * API Name : 스크랩 생성 API
 * [POST] /app/scraps
 */
exports.postScrap = async function(req, res) {

    /**
     * Body: userId,collection,idx,type
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId,collection,idx,idxType} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!idx)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!idxType)
        return res.send(response(baseResponse.USER_USERID_EMPTY));


    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const scrapResponse = await scrapService.createScrap(userId,collection,idx,idxType);
        return res.send(scrapResponse);
    }

};


/**
 * API No.28
 * API Name : 스크랩 조회 API
 * [GET] /app/scraps/:scrapIdx
 */
exports.getScrap = async function (req, res) {

    /**
     * body: userId
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!scrapIdx)
        return res.send(response(baseResponse.SCRAP_SCRAPIDX_EMPTY));



    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getStoryResponse = await reelsProvider.retrieveReels();
        return res.send(getStoryResponse);
    }

};


/**
 * API No.20
 * API Name : 릴스 삭제 API
 * [PATCH] /app/reels/:userId/status
 */
exports.deleteReels = async function (req, res) {

    /**
     * Path Variable: userId
     * body: reelsIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {reelsIdx} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    //TODO: 존재하지 않는 userId에 대한 validation 처리 필요 -> USER_USERID_NOT_EXIST

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getReelsResponse = await reelsService.deleteReels(reelsIdx);
        return res.send(getReelsResponse);
    }

};



/**
 * API No. 22
 * API Name : 릴스 좋아요 생성 API
 * [POST] /app/reels/like
 */
exports.postReelsLike = async function(req, res) {

    /**
     * Body: userId,reelsIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId,reelsIdx} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    //TODO: 존재하지 않는 userId에 대한 validation 처리 필요 -> USER_USERID_NOT_EXIST

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const reelsLikeResponse = await reelsService.createReelsLike(userId,reelsIdx);
        return res.send(reelsLikeResponse);
    }

};



/**
 * API No.23
 * API Name : 릴스 좋아요 삭제 API
 * [PATCH] /app/reels/like/:userId/status
 */
exports.deleteReelsLike = async function (req, res) {

    /**
     * Path Variable: userId
     * body: reelsIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {reelsIdx} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    //TODO: 존재하지 않는 userId에 대한 validation 처리 필요 -> USER_USERID_NOT_EXIST

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const deleteLikeResponse = await reelsService.deleteReelsLike(reelsIdx,userId);
        return res.send(deleteLikeResponse);
    }

};


/**
 * API No. 24
 * API Name : 릴스 댓글 생성 API
 * [POST] /app/reels/comments
 */
exports.postReelsComment = async function(req, res) {

    /**
     * Body: reelsIdx, userId, comment, reelsRecommentIdx
     */

    const userIdFromJWT = req.verifiedToken.userId;
    const {reelsIdx, userId, comment, reelsRecommentIdx} = req.body;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const createCommentResponse = await reelsService.createReelsComment(reelsIdx, userId, comment, reelsRecommentIdx);
        return res.send(createCommentResponse);
    }

};



/**
 * API No.25
 * API Name : 릴스 댓글 삭제 API
 * [PATCH] /app/reels/comments/:userId/status
 */
exports.deleteReelsComment = async function (req, res) {

    /**
     * Path Variable: userId
     * body: reelsCommentIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {reelsCommentIdx} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    //TODO: 존재하지 않는 userId에 대한 validation 처리 필요 -> USER_USERID_NOT_EXIST

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const deleteCommentResponse = await reelsService.deleteReelsComment(reelsCommentIdx);
        return res.send(deleteCommentResponse);
    }

};


/**
 * API No.26
 * API Name : 릴스 댓글 조회 API
 * [GET] /app/reels/comments/:reelsIdx
 */
exports.getReelsComment = async function (req, res) {

    /**
     * path variable: postIdx
     * body: userId
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId} = req.body;
    const reelsIdx = req.params.reelsIdx;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    //TODO: 존재하지 않는 userId에 대한 validation 처리 필요 -> USER_USERID_NOT_EXIST

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getCommentResponse = await reelsProvider.retrieveComment(reelsIdx);
        return res.send(getCommentResponse);
    }

};