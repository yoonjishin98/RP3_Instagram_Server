const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const scrapProvider = require("./scrapProvider");
const reelsDao = require("./scrapDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createScrap = async function (userId,collection,idx,idxType) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);

        const insertScrapParams = [userId,collection,idx,idxType];
        const scrapResult = await reelsDao.insertScrap(connection, insertScrapParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createScrap Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//
// exports.deleteReels = async function (reelsIdx) {
//     try {
//         const connection = await pool.getConnection(async (conn) => conn);
//
//         const deleteReelsResult = await reelsDao.patchReels(connection,reelsIdx);
//
//         connection.release();
//
//         return response(baseResponse.SUCCESS);
//
//     } catch (err) {
//         logger.error(`App - deleteReels Service error\n: ${err.message}`);
//         return errResponse(baseResponse.DB_ERROR);
//     }
// };
//

