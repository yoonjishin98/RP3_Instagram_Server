module.exports = function(app) {
    const dm = require('./dmController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 13. DM 1:1 대화 생성 API
    app.post('/app/dms',jwtMiddleware, dm.postDms);

}
