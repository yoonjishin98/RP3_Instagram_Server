const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const storyDao = require("./storyDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveStoryIdx = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const s = await storyDao.selectStoryIdx(connection, userId);
    const storyIdxCheckResult = s[0].storyIdx;
    connection.release();

    return storyIdxCheckResult;
};


exports.retrieveStory = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const storyResult = await storyDao.selectStory(connection, userId);
    connection.release();

    return storyResult;
};