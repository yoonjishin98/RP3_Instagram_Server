const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (email) {
  if (!email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.retrieveUser = async function (userIdForFollower, userIdForFollowing,userId) {
  const connection = await pool.getConnection(async (conn) => conn);

  //상단
  const userIdParams = [userIdForFollower,userIdForFollowing,userId];
  const userResult = await userDao.selectUserId(connection, userIdParams);

  //하단
  const postResult = await userDao.selectUserPost(connection, userId);

  const result = {userResult,postResult};

  connection.release();

  return result;
};


exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.userIdCheck = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdCheckResult = await userDao.selectId(connection, userId);

  connection.release();

  return userIdCheckResult;
};

exports.nicknameCheck = async function (userNickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const nicknameCheckResult = await userDao.selectNickname(connection, userNickname);
  connection.release();

  return nicknameCheckResult;
};


exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};

exports.retrieveFollowPosts = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const followPostsResult = await userDao.selectFollowPosts(connection, userId);
  connection.release();

  return followPostsResult;
};

exports.retrieveDm =  async function (userId,chatRoomIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const dmParams = [userId,chatRoomIdx];
  console.log(userId);
  console.log(chatRoomIdx);
  const dmResult = await userDao.selectDm(connection, dmParams);
  connection.release();

  return dmResult;
};

exports.retrieveDmList =  async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdParams=[userId,userId,userId,userId,userId,userId,userId,userId];

  const dmResult = await userDao.selectDmList(connection,userIdParams);
  connection.release();

  return dmResult;
};


exports.chatRoomIdxCheck = async function (chatRoomIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const roomIdxResponse = await userDao.selectChatRoomIdx(
      connection,
      chatRoomIdx
  );

  console.log(roomIdxResponse);

  connection.release();
  return roomIdxResponse;
};