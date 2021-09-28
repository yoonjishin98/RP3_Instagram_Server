const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const shopProvider = require("./shopProvider");
const shopDao = require("./shopDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createProducts = async function (userId,productName,price,isSale) {
    try {
        const insertProductsParams = [userId,productName,price,isSale];

        const connection = await pool.getConnection(async (conn) => conn);
        const productResult = await shopDao.insertProduct(connection, insertProductsParams);

        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - createProducts Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


