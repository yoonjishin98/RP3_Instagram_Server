const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const dmDao = require("./dmDao");

// Provider: Read 비즈니스 로직 처리

exports.chatRoomIdxCheck = async function (userId, friendId) {

    const connection = await pool.getConnection(async (conn) => conn);
    let chatRoomResult = await dmDao.selectRoomIdx(connection,userId,friendId);

    if(chatRoomResult[0]==="" || chatRoomResult[0]==null || chatRoomResult[0]==undefined){
        chatRoomResult = await dmDao.selectRoomIdx2(connection,friendId,userId);
        console.log(chatRoomResult[0]);
    }

    connection.release();

    return chatRoomResult[0];
};


exports.idsCheck = async function (userId, friendId) {

    const connection = await pool.getConnection(async (conn) => conn);
    let checkIdsResult = await dmDao.selectIds(connection,userId, friendId);

    connection.release();

    if (checkIdsResult==="" || checkIdsResult==null || checkIdsResult==undefined)
        checkIdsResult = 0;

    return checkIdsResult;

};


exports.idsCheck2 = async function (friendId, userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    let checkIdsResult2 = await dmDao.selectIds2(connection,friendId, userId);

    connection.release();

    if (checkIdsResult2==="" || checkIdsResult2==null || checkIdsResult2==undefined)
        checkIdsResult2 = 0;

    return checkIdsResult2;

};