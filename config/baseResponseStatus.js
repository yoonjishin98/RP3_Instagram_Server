module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2021,"message":"닉네임은 50자리 미만이어야 합니다." },
    SIGNUP_USERID_LENGTH  : { "isSuccess": false,"code": 2022,"message":"아이디는 50자리 미만이어야 합니다." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "아이디를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },

    HASHTAGIDX_NOT_EXIST : { "isSuccess": false, "code": 2019, "message": "존재하지 않는 해쉬태그 인덱스 값입니다" },
    HASHTAGIDX_EMPTY : { "isSuccess": false, "code": 2023, "message": "해쉬태그 인덱스 값이 입력되지 않았습니다." },

    POST_NOT_EXIST : { "isSuccess": false, "code": 2020, "message": "포스트가 존재하지 않습니다." },
    POST_EMPTY : { "isSuccess": false, "code": 2018, "message": "사진 혹은 비디오를 추가해주세요" },
    POST_POSTIDX_NOT_EXIST : { "isSuccess": false, "code": 2023, "message": "포스트 인덱스가 존재하지 않습니다." },
    POST_POSTIDX_EMPTY : { "isSuccess": false, "code": 2024, "message": "포스트 인덱스를 입력해주세요" },

    DM_NOT_EMPTY : { "isSuccess": false, "code": 2021, "message": "채팅방 번호를 전달해주세요." },
    DM_NOT_EXIST : { "isSuccess": false, "code": 2022, "message": "존재하지 않는 채팅방입니다." },

    COMMENT_EMPTY : { "isSuccess": false, "code": 2025, "message": "댓글 내용을 입력해주세요" },
    COMMENT_LENGTH_LIMIT : { "isSuccess": false, "code": 2026, "message": "댓글 글자수는 500자 미만으로 제한됩니다" },
    COMMENT_COMMENTIDX_EMPTY : { "isSuccess": false, "code": 2027, "message": "댓글 인덱스를 입력해주세요" },
    COMMENT_COMMENTIDX_NOT_EXIST : { "isSuccess": false, "code": 2028, "message": "댓글 인덱스가 존재하지 않습니다." },
    COMMENT_PARENT_IDX_NOT_EXIST: { "isSuccess": false, "code": 2038, "message": "부모 댓글 인덱스가 존재하지 않습니다." },

    CHAT_EMPTY : { "isSuccess": false, "code": 2029, "message": "대화 내용을 입력해주세요" },
    CHATTYPE_EMPTY : { "isSuccess": false, "code": 2030, "message": "대화의 데이터 타입을 입력해주세요" },

    STORY_STORYIDX_EMPTY :  {"isSuccess": false, "code": 2031, "message": "스토리 인덱스를 입력해주세요" },
    STORY_STORYIDX_NOT_EXIST : { "isSuccess": false, "code": 2032, "message": "존재하지 않는 스토리입니다" },

    REELS_VIDEO_EMPTY :  {"isSuccess": false, "code": 2033, "message": "영상을 추가해주세요" },
    REELS_REELSIDX_NOT_EXIST :  {"isSuccess": false, "code": 2034, "message": "존재하지 않는 릴스입니다" },
    REELS_SONG_EMPTY : {"isSuccess": false, "code": 2035, "message": "노래를 추가해주세요" },
    REELS_SINGER_EMPTY : {"isSuccess": false, "code": 2036, "message": "가수를 추가해주세요" },
    REELS_REELSIDX_EMPTY :  {"isSuccess": false, "code": 2037, "message": "릴스 인덱스 값을 입력해 주세요" },

    SCRAP_SCRAPIDX_EMPTY :  {"isSuccess": false, "code": 2039, "message": "스크랩 인덱스 값을 입력해 주세요" },
    SCRAP_SCRAPIDX_NOT_EXIST:  {"isSuccess": false, "code": 2040, "message": "해당 스크랩 인덱스는 존재하지 않습니다" },

    SHOP_PRODUCT_NAME_EMPTY : {"isSuccess": false, "code": 2041, "message": "상품 이름을 입력해 주세요" },
    SHOP_PRODUCT_PRICE_EMPTY : {"isSuccess": false, "code": 2042, "message": "상품 가격을 입력해 주세요" },
    SHOP_PRODUCTIDX_NOT_EXIST: {"isSuccess": false, "code": 2043, "message": "해당 상품 인덱스는 존재하지 않습니다" },



    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },
    SIGNUP_REDUNDANT_USERID : { "isSuccess": false, "code": 3007, "message":"중복된 아이디입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
