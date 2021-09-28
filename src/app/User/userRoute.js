module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    app.get('/app/test', user.getTest);

    // 1. 유저 생성 (회원가입) API
    app.post('/app/users', user.postUsers);

    // -. 전체 유저 조회 API
    //app.get('/app/users',user.getUsers);

    // 2. 특정 유저 정보 조회(프로필) API
    app.get('/app/users/:userId', user.getUserById);

    // 5. 유저가 팔로우한 포스트들 조회 API(메인화면)
    app.get('/app/users/:userId/posts', user.getFollowPosts);

    // 14. DM 1:1 대화 조회 API
    app.get('/app/users/:userId/dm/:friendId',jwtMiddleware, user.getDm);

    // 15. DM 목록 조회 API
    app.get('/app/users/:userId/dm',jwtMiddleware, user.getDmList);







    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/app/login', user.login);

    // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
    app.patch('/app/users/:userId', jwtMiddleware, user.patchUsers)



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API