module.exports = function(app) {
    const scrap = require('./scrapController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 27. 스크랩 생성 API
    app.post('/app/scraps',jwtMiddleware, scrap.postScrap);

    // 28. (컬렉션 속) 스크랩 별 포스트들 조회 API
    app.get('/app/scraps/:scrapIdx',jwtMiddleware, scrap.getScrap);



}