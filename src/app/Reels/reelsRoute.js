module.exports = function(app) {
    const reels = require('./reelsController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 19. 릴스 생성 API
    app.post('/app/reels',jwtMiddleware, reels.postReels);

    // 20. 릴스 삭제 API
    app.patch('/app/reels/:userId/status',jwtMiddleware, reels.deleteReels);

    // 21. 릴스 조회 API
    app.get('/app/reels',jwtMiddleware, reels.getReels);

    // 22. 릴스 좋아요 생성 API
    app.post('/app/reels/like',jwtMiddleware, reels.postReelsLike);

    // 23. 릴스 좋아요 삭제 API
    app.patch('/app/reels/like/:userId/status',jwtMiddleware, reels.deleteReelsLike);

    // 24. 릴스 댓글 생성 API
    app.post('/app/reels/comments',jwtMiddleware, reels.postReelsComment);

    // 25. 릴스 댓글 삭제 API
    app.patch('/app/reels/comments/:userId/status',jwtMiddleware, reels.deleteReelsComment);

    // 26. 릴스 댓글 조회 API
    app.get('/app/reels/comments/:reelsIdx',jwtMiddleware, reels.getReelsComment);

}