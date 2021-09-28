// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, userNickname 
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, userNickname 
                FROM User 
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}

// userId 회원 조회
async function selectUserId(connection, userIdParams) {
  const selectUserIdQuery = `
                select User.userId, userNickname, profileImgUrl, userBio, userWebsite, isOfficial, showCategory ,follower, following 
                from User
                    left join (select userId, count(userId) as follower  from Follow where Follow.userId= ? ) U   
                on U.userId = User.userId
                    left join (select followerId, count(followerId) as following from Follow where followerId = ? ) F  
                on F.followerId = User.userId
                where User.userId = ?;
                `;
  const [userRow] = await connection.query(selectUserIdQuery, userIdParams);
  return userRow;
}

// userId 포스트(게시물) 조회
async function selectUserPost(connection, userId) {
  const selectUserPostQuery = `
              select PostContents.postIdx, PostContents.contents from PostContents
                  inner join (select PostContents.postIdx, min(postContentsIdx) as minimum,P.userId as userId from PostContents
                      inner join(select postIdx, userId from Post where status = 'Y')P on P.postIdx = PostContents.postIdx
                  where userId = ? 
                  group by postIdx) PP
                      on PP.minimum=PostContents.postContentsIdx;
                `;
  const [userRow] = await connection.query(selectUserPostQuery, userId);
  return userRow;
}


// 유저 생성
async function insertUser(connection, insertUserParams) {
  const insertUserQuery = `
        INSERT INTO User (email, password, userNickname, userId)
        VALUES (?, ?, ?, ?);
    `;
  const insertUserRow = await connection.query(
      insertUserQuery,
    insertUserParams
  );

  return insertUserRow;
}



// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, userNickname, password
        FROM User 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, userId
        FROM User 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

//유저 정보 수정
async function updateUser(connection, userId, userNickname) {
  const updateUserQuery = `
  UPDATE User 
  SET userNickname = ?
  WHERE userId = ?;
  `;
  const updateUserRow = await connection.query(updateUserQuery, [userNickname, userId]);
  return updateUserRow[0];
}



//유저가 팔로우한 사람들의 포스트 조회
async function selectFollowPosts(connection, userId){
  const followPostsQuery = `
        
  `;

  const followPostsRow = await connection.query(followPostsQuery, userId);
  return followPostsRow[0];
}


//userId 중복체크
async function selectId(connection, userId){
  const selectIdQuery = `
        select userId from User 
    where userId = ?
  `;

  const [selectIdRow] = await connection.query(selectIdQuery, userId);
  return selectIdRow;
}


//userNickname 중복 체크
async function selectNickname(connection, userNickname){
  const selectNicknameQuery = `
        select userNickname from User
    where userNickname = ?
  `;

  const [selectNicknameRow] = await connection.query(selectNicknameQuery, userNickname);
  return selectNicknameRow;
}


//dm 1:1 대화 조회
async function selectDm (connection, dmParams){
  const selectDmQuery = `
    select chatRoomIdx, Chat.userId, UserInfo.userNickName, profileImgUrl, chat, Chat.chatLike, DATE_FORMAT(Chat.createdAt, '%p %h:%m' ) as msgTimeStamp 
    from Chat
        left join (
            select userId, User.userNickName, profileImgUrl from User
            where userId not in (?) ) UserInfo
            on UserInfo.userId = Chat.userId
    where chatRoomIdx = ?
    order by Chat.createdAt;
  `;

  const selectDmRow = await connection.query(selectDmQuery, dmParams);
  return selectDmRow[0];
}


//dm 목록 조회
async function selectDmList (connection,userIdParams){
  const selectDmListQuery = `
    select C.chatRoomIdx, if(C.friendId='yoonji_ks98',(select userId from ChatRoom where friendId='yoonji_ks98'),C.friendId) as friendID,
       if(C.friendId='yoonji_ks98',(
           select userNickname from User inner join(select userId from ChatRoom where friendId='yoonji_ks98')N
               on User.userId=N.userId),userNickname) as nickname,
       if(C.friendId='yoonji_ks98',(
           select profileImgUrl from User inner join(select userId from ChatRoom where friendId='yoonji_ks98')P
                on User.userId=P.userId),profileImgUrl) as profileImg,
        case
           when timestampdiff(minute ,lastChatMsgTimeStamp,current_time) < 60
               then concat(timestampdiff(minute,lastChatMsgTimeStamp,current_time), '분 전')
           when timestampdiff(hour,lastChatMsgTimeStamp,current_time) < 24
               then concat(timestampdiff(hour,lastChatMsgTimeStamp,current_time), '시간 전')
           when timestampdiff(day,lastChatMsgTimeStamp,current_time) < 30
               then concat(timestampdiff(day,lastChatMsgTimeStamp,current_time), '일 전')
           else
               concat(timestampdiff(month,lastChatMsgTimeStamp,current_time), '달 전')
            end as lastChatMsgTimeStamp
    from User
inner join (select chatRoomIdx,userId,friendId from ChatRoom)C
    on User.userId = C.friendId
inner join(
    select Chat.chatRoomIdx, createdAt as lastChatMsgTimeStamp, chatType as lastChatMsgType from Chat
inner join (select chatRoomIdx, max(chatIdx) as currentMsgNo from Chat
    group by chatRoomIdx) CurrentMsg
where currentMsgNo = chatIdx
        )LastChatMsg
    on LastChatMsg.chatRoomIdx = C.chatRoomIdx
where C.userId='yoonji_ks98' or friendId='yoonji_ks98';
  `;

  const selectDmListRow = await connection.query(selectDmListQuery,userIdParams);
  return selectDmListRow[0];
}


//채팅방 번호 존재 여부 체크
async function selectChatRoomIdx(connection, chatRoomIdx){
  const selectChatRoomIdxQuery = `
    select chatRoomIdx from ChatRoom 
where chatRoomIdx = ?;
  `;

  const selectRoomRow = await connection.query(selectChatRoomIdxQuery,chatRoomIdx );
  return selectRoomRow[0];
}












module.exports = {
  selectUser,
  selectUserEmail,
  selectUserId,
  selectUserPost,
  insertUser,
  selectUserPassword,
  selectUserAccount,
  updateUser,
  selectFollowPosts,
  selectId,
  selectNickname,
  selectDm,
  selectDmList,
  selectChatRoomIdx
};
