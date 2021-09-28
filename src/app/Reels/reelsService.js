const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const storyProvider = require("./reelsProvider");
const reelsDao = require("./reelsDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createReels = async function (userId,reelsContents,reelsVideo,song,singer) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const insertReelsParams = [userId,reelsContents,reelsVideo,song,singer];
        const reelsResult = await reelsDao.insertReels(connection, insertReelsParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createReels Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.deleteReels = async function (reelsIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const deleteReelsResult = await reelsDao.patchReels(connection,reelsIdx);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteReels Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.createReelsLike = async function (userId,reelsIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const insertLikeParams = [userId,reelsIdx];
        const reelsLikeResult = await reelsDao.insertReelsLike(connection, insertLikeParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createReelsLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.deleteReelsLike = async function (reelsIdx,userId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deletelikeParams = [reelsIdx,userId];
        const deleteReelsLikeResult = await reelsDao.patchReelsLike(connection,deletelikeParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteReelsLike Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.createReelsComment = async function (reelsIdx, userId, comment, reelsRecommentIdx) {
    try {
        const commentParams = [reelsIdx, userId, comment, reelsRecommentIdx];

        const connection = await pool.getConnection(async (conn) => conn);
        const commentResult = await reelsDao.insertComment(connection, commentParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createReelsComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.deleteReelsComment = async function (reelsCommentIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const deleteReelsLikeResult = await reelsDao.patchReelsComment(connection,reelsCommentIdx);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteReelsComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};