const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const postProvider = require("./postProvider");
const postDao = require("./postDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createPost = async function (userId, caption, location, postContents, hashtagContents) {
    try {

        const insertPostParams = [userId, caption, location];

        const connection = await pool.getConnection(async (conn) => conn);
        const userPostResult = await postDao.insertPost(connection, insertPostParams);

        const insertContentsParams = [ (await postProvider.retrievePostIdx(userId)), postContents];
        const insertHashtagParams = [ (await postProvider.retrievePostIdx(userId)), hashtagContents];

        const contentsResult = await postDao.insertContents(connection,insertContentsParams);
        const hashtagResult = await postDao.insertHashtag(connection, insertHashtagParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};



exports.createPostLikes = async function (postIdx, userId) {
    try {

        const insertLikesParams = [postIdx, userId];

        const connection = await pool.getConnection(async (conn) => conn);

        const LikesResult = await postDao.insertLikes(connection, insertLikesParams);
        console.log(`추가로 좋아요 누른 유저 : ${LikesResult[0].userId}`)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createPostLikes Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.createComment =  async function (userId, postIdx, commentContents, recommentIdx) {
    try {

        const commentsParams = [userId, postIdx, commentContents, recommentIdx];

        const connection = await pool.getConnection(async (conn) => conn);
        const commentsResult = await postDao.insertComments(connection, commentsParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.deleteComment = async function (commentIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteCommentResult = await postDao.deleteComment(connection,commentIdx);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.editPost = async function (postIdx,location,caption,postHashtagIdx,contents) {
    try {
        const postParams = [location,caption,postIdx];
        const hashtagParams = [contents,postHashtagIdx];

        const connection = await pool.getConnection(async (conn) => conn);

        const editPostResult = await postDao.updatePost(connection,postParams);
        const editHashtagResult = await postDao.updateHashtag(connection,hashtagParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editPost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};



exports.deletePost = async function (postIdx) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        const deletePostResult = await postDao.deletePost(connection,postIdx);
        const deleteHashtagResult = await postDao.deleteHashtag(connection,postIdx);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deletePost Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.patchLikes = async function (userId,postIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const likesParams =[userId,postIdx];
        const deleteLikesResult = await postDao.deleteLikes(connection,likesParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - patchLikes Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};