module.exports = function(app) {
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');


    // 3. 포스트 생성 API
    app.post('/app/posts',jwtMiddleware,post.postPosts);

    // 4. 전체 포스트 조회 API (두번째 탭에 나오는 것처럼. 실제로는 알고리즘이 적용된 게시물들이지만, 우선은 임의로 처리.)
    app.get('/app/posts',jwtMiddleware, post.getPosts);

    // 5. 유저가 팔로잉한 포스트들 조회 API(메인화면)
    app.get('/app/posts/:userId',jwtMiddleware, post.getFollowingPosts);

    // 6. 포스트 수정 API
    app.patch('/app/posts/:postIdx',jwtMiddleware, post.patchPost);

    // 7. 포스트 삭제 API
    app.patch('/app/posts/:userId/status',jwtMiddleware, post.deletePost);

    // 8. 포스트 댓글 생성 API
    app.post('/app/posts/comments',jwtMiddleware, post.postComment);

    // 9. 포스트 댓글 조회 API
    app.get('/app/posts/comments/:userId/:postIdx',jwtMiddleware, post.getComment);

    // 10. 포스트 댓글 삭제 API
    app.patch('/app/posts/comments/:userId/status',jwtMiddleware, post.deleteComment);

    // 11. 포스트 좋아요 생성 API
    app.post('/app/posts/likes',jwtMiddleware, post.postLikes);

    // 12. 포스트 좋아요 삭제 API
    app.patch('/app/posts/likes/:userId/status',jwtMiddleware, post.deleteLikes);

};