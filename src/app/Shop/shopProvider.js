const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const shopDao = require("./shopDao");

// Provider: Read 비즈니스 로직 처리

exports.userIdCheck  = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userIdCheckResult = await shopDao.selectId(connection, userId);

    connection.release();

    return userIdCheckResult;
};

exports.retrieveShopList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const shopListResult = await shopDao.selectShopList(connection);
    connection.release();

    return shopListResult;
};

exports.productIdxCheck = async function (productIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const productIdxCheckResult = await shopDao.selectProductIdx(connection, productIdx);
    connection.release();

    return productIdxCheckResult;
};

exports.retrieveProductDetail = async function (productIdx) {
    const connection = await pool.getConnection(async (conn) => conn);

    // 상품 정보 부분 + 계정 정보 부분
    const detailResult = await shopDao.selectProductDetail(connection, productIdx);

    // 상품 사진, 비디오 부분
    const contentsResult = await shopDao.selectProductContents(connection,productIdx);

    // 계정이 파는 다른 상품들 보여주기
    const productIdxParams=[productIdx,productIdx];
    const otherProductsResult = await shopDao.selectOtherProducts(connection,productIdxParams);

    connection.release();

    return [detailResult,contentsResult,otherProductsResult];
};

