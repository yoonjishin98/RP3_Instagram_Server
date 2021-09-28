const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const postDao = require("./postDao");

// Provider: Read 비즈니스 로직 처리

exports.retrievePostList = async function (location) {
    if (!location) {
        const connection = await pool.getConnection(async (conn) => conn);
        const postResult = await postDao.selectPost(connection);
        connection.release();

        return postResult;

    } else {
        const connection = await pool.getConnection(async (conn) => conn);
        const postResult = await postDao.selectPostLocation(connection, location);
        connection.release();

        return postResult;
    }
};

exports.retrievePostIdx = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const postIdxCheckResult = await postDao.selectMaxPostIdx(connection, userId);
    connection.release();

    return postIdxCheckResult[0].postIdx;
};

exports.retrieveLikeCount = async function (postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const likesCheckResult = await postDao.selectLike(connection, postIdx);
    connection.release();

    return likesCheckResult;
};

exports.retrieveCommentsList = async function (postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    const commentResult = await postDao.selectCommentsList(connection, postIdx);
    connection.release();

    return commentResult;
};


exports.userIdCheck  = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = await postDao.selectId(connection, userId);

    connection.release();

    return userIdCheckResult;
};

exports.hashtagIdxCheck = async function (postHashtagIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const hashtagIdxResult = await postDao.selectHashtagIdx(connection, postHashtagIdx);

    connection.release();

    return hashtagIdxResult;
};


exports.postIdxCheck = async function (postIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const postIdxResult = await postDao.selectPostIdx(connection, postIdx);

    connection.release();

    return postIdxResult;
};


exports.cmtIdxCheck = async function (commentIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const cmtIdxResult = await postDao.selectCmtIdx(connection, commentIdx);

    connection.release();

    return cmtIdxResult;
};


exports.retrieveFollowingPosts = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);

    const postsResult = await postDao.selectFollowingPosts(connection,userId);
    connection.release();

    return postsResult;
};
