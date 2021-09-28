module.exports = function(app) {
    const story = require('./storyController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 16. 스토리 생성 API
    app.post('/app/stories',jwtMiddleware, story.postStories);

    // 17. 스토리 조회 API
    app.get('/app/stories/:userId',jwtMiddleware, story.getStories);

    // 18. 스토리 삭제 API
    app.patch('/app/stories/:userId/status',jwtMiddleware, story.deleteStories);

}