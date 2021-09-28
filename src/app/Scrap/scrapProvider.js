const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reelsDao = require("./scrapDao");

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