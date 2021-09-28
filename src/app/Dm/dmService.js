const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const dmProvider = require("./dmProvider");
const dmDao = require("./dmDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createDms = async function (userId, friendId, chat, chatType) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const chatRoomParams = [userId, friendId];      // userId: 보내는 사람, friendId: 받는 사람
        const ids = await dmProvider.idsCheck(userId, friendId);
        const ids2 = await dmProvider.idsCheck2(friendId,userId);

        console.log(ids.length);
        console.log(ids2.length);

        //이미 생성된 채팅방이 있는지 체크
        if ( !(ids.length > 0) ){

            if(ids2.length > 0)
                console.log("이미 생성된 채팅방");
            else
                await dmDao.insertChatRoom(connection, chatRoomParams);
        }

        let chatRoomIdx = await dmProvider.chatRoomIdxCheck(userId, friendId);
        chatRoomIdx = chatRoomIdx.chatRoomIdx;

        const insertChatParams = [chatRoomIdx,userId,chat,chatType];
        const chatResult = await dmDao.insertChat(connection,insertChatParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createDms Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};