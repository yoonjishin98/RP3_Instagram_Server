const jwtMiddleware = require("../../../config/jwtMiddleware");
const reelsProvider = require("../../app/Reels/reelsProvider");
const reelsService = require("../../app/Reels/reelsService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");




/**
 * API No. 19
 * API Name : 릴스 생성 API
 * [POST] /app/reels
 */
exports.postReels = async function(req, res) {

    /**
     * Body: userId,reelsContents,reelsVideo,song,singer
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId,reelsContents,reelsVideo,song,singer} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!reelsVideo){
        return res.send(response(baseResponse.REELS_VIDEO_EMPTY));
    }
    if(!song){
        return res.send(response(baseResponse.REELS_SONG_EMPTY));
    }
    if(!singer){
        return res.send(response(baseResponse.REELS_SINGER_EMPTY));
    }

    // userId 존재 여부 체크
    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const reelsResponse = await reelsService.createReels(userId,reelsContents,reelsVideo,song,singer);
        return res.send(reelsResponse);
    }

};


/**
 * API No.21
 * API Name : 릴스 조회 API
 * [GET] /app/reels
 */
exports.getReels = async function (req, res) {

    /**
     * body: userId
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // userId 존재 여부 체크
    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

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
    if(!reelsIdx)
        return res.send(response(baseResponse.REELS_REELSIDX_EMPTY));

    // 존재 여부 체크
    const reelsIdxResponse = await reelsProvider.reelsIdxCheck(reelsIdx);
    if (!(reelsIdxResponse.length > 0))
        return res.send(response(baseResponse.REELS_REELSIDX_NOT_EXIST));

    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));


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
    if(!reelsIdx)
        return res.send(response(baseResponse.REELS_REELSIDX_EMPTY));

    // 존재 여부 체크
    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const reelsIdxResponse = await reelsProvider.reelsIdxCheck(reelsIdx);
    if (!(reelsIdxResponse.length > 0))
        return res.send(response(baseResponse.REELS_REELSIDX_NOT_EXIST));

    if (userIdFromJWT != userId) {
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
    if(!reelsIdx)
        return res.send(response(baseResponse.REELS_REELSIDX_EMPTY));

    // 존재 여부 체크
    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const reelsIdxResponse = await reelsProvider.reelsIdxCheck(reelsIdx);
    if (!(reelsIdxResponse.length > 0))
        return res.send(response(baseResponse.REELS_REELSIDX_NOT_EXIST));

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

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!reelsIdx)
        return res.send(response(baseResponse.REELS_REELSIDX_EMPTY));
    if(!comment)
        return res.send(response(baseResponse.COMMENT_EMPTY));

    // 존재 여부 체크
    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const reelsIdxResponse = await reelsProvider.reelsIdxCheck(reelsIdx);
    if (!(reelsIdxResponse.length > 0))
        return res.send(response(baseResponse.REELS_REELSIDX_NOT_EXIST));

    const recommentIdxResponse = await reelsProvider.reelsIdxCheck(reelsRecommentIdx);
    if (!(recommentIdxResponse.length > 0))
        return res.send(response(baseResponse.COMMENT_PARENT_IDX_NOT_EXIST));

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
    if(!reelsCommentIdx)
        return res.send(response(baseResponse.COMMENT_COMMENTIDX_EMPTY));

    // 존재 여부 체크
    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const reelsCmtIdxResponse = await reelsProvider.reelsCmtIdxCheck(reelsCommentIdx);
    if (!(reelsCmtIdxResponse.length > 0))
        return res.send(response(baseResponse.COMMENT_COMMENTIDX_NOT_EXIST));


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
     * path variable: reelsIdx
     * body: userId
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId} = req.body;
    const reelsIdx = req.params.reelsIdx;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!reelsIdx)
        return res.send(response(baseResponse.REELS_REELSIDX_EMPTY));

    // 존재 여부 체크
    const userIdResponse = await reelsProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const reelsIdxResponse = await reelsProvider.reelsIdxCheck(reelsIdx);
    if (!(reelsIdxResponse.length > 0))
        return res.send(response(baseResponse.REELS_REELSIDX_NOT_EXIST));


    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const getCommentResponse = await reelsProvider.retrieveComment(reelsIdx);
        return res.send(getCommentResponse);
    }

};