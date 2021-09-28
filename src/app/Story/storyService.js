const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const storyProvider = require("./storyProvider");
const storyDao = require("./storyDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createStory = async function (userId,contents,mediaContents) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);

        const insertStoryParams = [userId,contents];
        const storyResult = await storyDao.insertStory(connection, insertStoryParams);

        let storyIdx = await storyProvider.retrieveStoryIdx(userId);
        const insertContentsParams = [storyIdx, mediaContents];
        const contentsResult = await storyDao.insertContents(connection,insertContentsParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createStory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.deleteStory = async function (storyIdx) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const deleteStoryResult = await storyDao.patchStory(connection, storyIdx);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteStory Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};