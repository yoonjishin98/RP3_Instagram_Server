const jwtMiddleware = require("../../../config/jwtMiddleware");
const postProvider = require("../../app/Post/postProvider");
const postService = require("../../app/Post/postService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 3
 * API Name : 포스트(게시물) 생성 API
 * [POST] /app/posts
 */
exports.postPosts = async function (req, res) {

    /**
     * Body: userId, caption, location, postContents, hashtagContents
     */

    const userIdFromJWT = req.verifiedToken.userId;

    const {userId, caption, location, postContents, hashtagContents} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    if(!postContents)
        return res.send(response(baseResponse.POST_EMPTY));

    // userId 존재 여부 체크
    const userIdResponse = await postProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {

        const postResponse = await postService.createPost(
            userId,
            caption,
            location,
            postContents,
            hashtagContents
        );

        return res.send(postResponse);
    }


};


/**
 * API No. 4
 * API Name : 포스트 전체 목록 조회 API (+검색)
 * [GET] /app/posts
 */
exports.getPosts = async function (req, res) {

    /**
     * Query String: location
     */
    const location = req.query.location;
    const userId = req.body.userId;
    const userIdFromJWT = req.verifiedToken.userId;
    //const hashtag = req.query.hashtag;


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {

        if (!location) {
            // 포스트 전체 조회
            const postListResult = await postProvider.retrievePostList();
            return res.send(response(baseResponse.SUCCESS, postListResult));
        } else {
            // 포스트 검색 조회 (by location)
            const postListByLocation = await postProvider.retrievePostList(location);
            return res.send(response(baseResponse.SUCCESS, postListByLocation));
        }
        //hashtag 관련 조회 파트 추가하기

    }

};



/**
 * API No. 5
 * API Name : 유저가 팔로잉한 포스트들 조회 API(메인화면)
 * [GET] /app/posts/:userId
 */
exports.getFollowingPosts = async function (req, res) {

    const userId = req.params.userId;
    const userIdFromJWT = req.verifiedToken.userId;

    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // userId 존재 여부 체크
    const userIdResponse = await postProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const followingPostsResult = await postProvider.retrieveFollowingPosts(userId);
        return res.send(response(baseResponse.SUCCESS, followingPostsResult));

    }

}



/**
 * API No. 6
 * API Name : 포스트 수정 API
 * [PATCH] /app/posts/:postIdx
 */
exports.patchPost = async function (req, res) {

    /**
     * Path variable: postIdx
     * Body: userId,postHashtagIdx,location,caption,contents
     */

    const userIdFromJWT = req.verifiedToken.userId;
    const postIdx = req.params.postIdx;

    const {userId,postHashtagIdx,location,caption,contents} = req.body;

    // postHashtagIdx 존재 여부 체크
    const hashtagIdxResponse = await postProvider.hashtagIdxCheck(postHashtagIdx);
    if (!(hashtagIdxResponse.length > 0))
        return res.send(response(baseResponse.HASHTAGIDX_NOT_EXIST));


    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editPost = await postService.editPost(postIdx,location,caption,postHashtagIdx,contents);
        return res.send(editPost);
    }

};


/**
 * API No. 7
 * API Name : 포스트 삭제 API
 * [PATCH] /app/posts/:userId/status
 */
exports.deletePost = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {postIdx} = req.body;

    if(!postIdx){
        return res.send(response(baseResponse.POST_POSTIDX_EMPTY));
    }

    // postIdx 존재 여부 체크
    const postIdxResponse = await postProvider.postIdxCheck(postIdx);
    if (!(postIdxResponse.length > 0))
        return res.send(response(baseResponse.POST_NOT_EXIST));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const editPost = await postService.deletePost(postIdx);
        return res.send(editPost);
    }

};


/**
 * API No. 8
 * API Name : 포스트 댓글 생성 API
 * [POST] /app/posts/comments
 */
exports.postComment = async function (req, res) {

    /**
     * Body: postIdx, userId, commentContents, recommentIdx
     */

    const userIdFromJWT = req.verifiedToken.userId;
    const {userId, postIdx, commentContents, recommentIdx} = req.body;

    if(!postIdx)
        return res.send(response(baseResponse.POST_POSTIDX_EMPTY));

    if (!commentContents)
        return res.send(response(baseResponse.COMMENT_EMPTY));

    if(commentContents.length > 1000)
        return res.send(response(baseResponse.COMMENT_LENGTH_LIMIT));

    // postIdx 존재 여부 체크
    const postIdxResponse = await postProvider.postIdxCheck(postIdx);
    if (!(postIdxResponse.length > 0))
        return res.send(response(baseResponse.POST_POSTIDX_NOT_EXIST));


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const createCommentResponse = await postService.createComment(userId, postIdx, commentContents, recommentIdx);
        return res.send(createCommentResponse);
    }

};


/**
 * API No. 9
 * API Name : 포스트 댓글 조회 API
 * [GET] /app/posts/comments/:userId/:postIdx
 */
exports.getComment = async function (req, res) {

    /**
     * path variable: userId,postIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {postIdx,userId} = req.params;

    if(!postIdx)
        return res.send(response(baseResponse.POST_POSTIDX_EMPTY));

    // postIdx 존재 여부 체크
    const postIdxResponse = await postProvider.postIdxCheck(postIdx);
    if (!(postIdxResponse.length > 0))
        return res.send(response(baseResponse.POST_POSTIDX_NOT_EXIST));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const retrieveCommentResponse = await postProvider.retrieveCommentsList(postIdx);
        return res.send(retrieveCommentResponse);
    }

};

/**
 * API No. 10
 * API Name : 포스트 댓글 삭제 API
 * [PATCH] /app/posts/comments/:userId/status
 */
exports.deleteComment = async function (req, res) {

    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {commentIdx} = req.body;

    if (!commentIdx)
        return res.send(response(baseResponse.COMMENT_COMMENTIDX_EMPTY));

    // commentIdx 존재 여부 체크
    const cmtIdxResponse = await postProvider.cmtIdxCheck(commentIdx);
    if (!(cmtIdxResponse.length > 0))
        return res.send(response(baseResponse.COMMENT_COMMENTIDX_NOT_EXIST));


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const deleteComment = await postService.deleteComment(commentIdx);
        return res.send(deleteComment);
    }

};





/**
 * API No. 11
 * API Name : 포스트 좋아요 생성 API
 * [POST] /app/posts/likes
 */
exports.postLikes = async function (req, res) {

    /**
     * Body: postIdx, contents
     */

    const {postIdx, userId} = req.body;

    // 빈 값 체크
    if(!postIdx)
        return res.send(response(baseResponse.POST_NOT_EXIST));

    // postIdx 존재 여부 체크
    const postIdxResponse = await postProvider.postIdxCheck(postIdx);
    if (!(postIdxResponse.length > 0))
        return res.send(response(baseResponse.POST_POSTIDX_NOT_EXIST));

    const userIdFromJWT = req.verifiedToken.userId;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const postLikesResponse = await postService.createPostLikes(
            postIdx,
            userId
        );

        return res.send(postLikesResponse);
    }

};


/**
 * API No. 12
 * API Name : 포스트 좋아요 삭제 API
 * [PATCH] /app/posts/likes/:userId/status
 */
exports.deleteLikes = async function (req, res) {

    /**
     * path variable: userId
     * body: postIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const userId = req.params.userId;
    const {postIdx} = req.body;

    if(!postIdx)
        return res.send(response(baseResponse.POST_POSTIDX_EMPTY));

    // 존재 여부 체크
    const userIdResponse = await postProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const postIdxResponse = await postProvider.postIdxCheck(postIdx);
    if (!(postIdxResponse.length > 0))
        return res.send(response(baseResponse.POST_POSTIDX_NOT_EXIST));


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const deleteLikesResponse = await postService.patchLikes(userId,postIdx);
        return res.send(deleteLikesResponse);
    }

};