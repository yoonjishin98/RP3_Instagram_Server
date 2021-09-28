const jwtMiddleware = require("../../../config/jwtMiddleware");
const shopProvider = require("../../app/Shop/shopProvider");
const shopService = require("../../app/Shop/shopService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 28
 * API Name : 쇼핑 상품 생성 API
 * [POST] /app/shops
 */
exports.postProducts = async function (req, res) {

    /**
     * Body: userId,productName,price,isSale
     */

    const userIdFromJWT = req.verifiedToken.userId;

    const {userId,productName,price,isSale} = req.body;

    // 빈 값 체크
    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));
    if(!productName)
        return res.send(response(baseResponse.SHOP_PRODUCT_NAME_EMPTY));
    if(!price)
        return res.send(response(baseResponse.SHOP_PRODUCT_PRICE_EMPTY));


    // userId 존재 여부 체크
    const userIdResponse = await shopProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));


    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {

        const createProductsResponse = await shopService.createProducts(userId,productName,price,isSale);

        return res.send(createProductsResponse);
    }


};


/**
 * API No. 29
 * API Name : 쇼핑 상품 리스트 조회 API
 * [GET] /app/shops
 */
exports.getProducts = async function (req, res) {

    const {userId} = req.body;
    const userIdFromJWT = req.verifiedToken.userId;

    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    const userIdResponse = await shopProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const shopListResult = await shopProvider.retrieveShopList();
        return res.send(response(baseResponse.SUCCESS, shopListResult));

    }


    
};


/**
 * API No. 30
 * API Name : 상품 상세 화면 조회 API
 * [PATCH] /app/shops/:productIdx
 */
exports.getProductsDetail = async function (req, res) {

    /**
     * Path variable: productIdx
     */

    const userId = req.body.userId;
    const userIdFromJWT = req.verifiedToken.userId;
    const productIdx = req.params.productIdx;

    if(!userId)
        return res.send(response(baseResponse.USER_USERID_EMPTY));

    // 존재 여부 체크
    const userIdResponse = await shopProvider.userIdCheck(userId);
    if (!(userIdResponse.length > 0))
        return res.send(response(baseResponse.USER_USERID_NOT_EXIST));

    const prodcutIdxResponse = await shopProvider.productIdxCheck(productIdx);
    if (!(prodcutIdxResponse.length > 0))
        return res.send(response(baseResponse.SHOP_PRODUCTIDX_NOT_EXIST));


    if (userIdFromJWT !== userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const detailResponse = await shopProvider.retrieveProductDetail(productIdx);
        return res.send(detailResponse);
    }

};



/**
 * API No. 9
 * API Name : 포스트 댓글 조회 API
 * [GET] /app/posts/comments/:userId/:postIdx
 */
exports.getComment = async function (req, res) {

    /**
     * path variable: userId,postIdx
     */
    const userIdFromJWT = req.verifiedToken.userId;
    const {postIdx,userId} = req.params;

    if(!postIdx)
        return res.send(response(baseResponse.POST_POSTIDX_EMPTY));

    // postIdx 존재 여부 체크
    const postIdxResponse = await postProvider.postIdxCheck(postIdx);
    if (!(postIdxResponse.length > 0))
        return res.send(response(baseResponse.POST_POSTIDX_NOT_EXIST));

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const retrieveCommentResponse = await postProvider.retrieveCommentsList(postIdx);
        return res.send(retrieveCommentResponse);
    }

};



/**
 * API No. 11
 * API Name : 포스트 좋아요 생성 API
 * [POST] /app/posts/likes
 */
exports.postLikes = async function (req, res) {

    /**
     * Body: postIdx, contents
     */

    const {postIdx, userId} = req.body;

    // 빈 값 체크
    if(!postIdx)
        return res.send(response(baseResponse.POST_NOT_EXIST));

    // postIdx 존재 여부 체크
    const postIdxResponse = await postProvider.postIdxCheck(postIdx);
    if (!(postIdxResponse.length > 0))
        return res.send(response(baseResponse.POST_POSTIDX_NOT_EXIST));

    const userIdFromJWT = req.verifiedToken.userId;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        const postLikesResponse = await postService.createPostLikes(
            postIdx,
            userId
        );

        return res.send(postLikesResponse);
    }

};
