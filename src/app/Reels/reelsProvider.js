const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reelsDao = require("./reelsDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveReels = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const reelsResult = await reelsDao.selectReels(connection);
    connection.release();

    return reelsResult;

};


exports.retrieveComment = async function (reelsIdx) {

    const connection = await pool.getConnection(async (conn) => conn);
    const reelsCommentResult = await reelsDao.selectReelsComment(connection,reelsIdx);
    connection.release();

    return reelsCommentResult;

};

exports.userIdCheck =  async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = await reelsDao.selectId(connection, userId);

    connection.release();

    return userIdCheckResult;
};


exports.reelsIdxCheck = async function (reelsIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const reelsIdxCheckResult = await reelsDao.selectReelsIdx(connection, reelsIdx);

    connection.release();

    return reelsIdxCheckResult;
};


exports.reelsCmtIdxCheck = async function (reelsCommentIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const reelsCmtIdxCheckResult = await reelsDao.selectReelsCmtIdx(connection, reelsCommentIdx);

    connection.release();

    return reelsCmtIdxCheckResult;
};