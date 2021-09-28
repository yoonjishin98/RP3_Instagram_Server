const jwtMiddleware = require("../../../config/jwtMiddleware");
const dmProvider = require("../../app/Dm/dmProvider");
const dmService = require("../../app/Dm/dmService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 13
 * API Name : DM 1:1 대화 생성 API
 * [POST] /app/dms
 */
exports.postDms = async function (req, res) {

    /**
     * Body: userId, friendId, chat, chatType
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {userId, friendId, chat, chatType} = req.body;

    if(!friendId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    if(!chat)
        return res.send(response(baseResponse.CHAT_EMPTY));

    if(!chatType)
        return res.send(response(baseResponse.CHATTYPE_EMPTY));

    // TODO: friendId, userId 존재 여부 체크
    // TODO: chatType 중복 체크


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const postDm = await dmService.createDms(userId, friendId, chat, chatType);
        return res.send(postDm);
    }

};