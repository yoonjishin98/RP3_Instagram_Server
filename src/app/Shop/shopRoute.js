module.exports = function(app) {
    const shop = require('./shopController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 28. 쇼핑 상품 생성 API
    app.post('/app/shops',jwtMiddleware,shop.postProducts);

    // 29. 쇼핑 상품 리스트 조회 API
    app.get('/app/shops',jwtMiddleware, shop.getProducts);

    // 30. 상품 상세 화면 조회 API
    app.get('/app/shops/:productIdx',jwtMiddleware, shop.getProductsDetail);

};