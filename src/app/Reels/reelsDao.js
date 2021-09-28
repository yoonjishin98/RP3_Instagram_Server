// 릴스 생성
async function insertReels(connection, insertReelsParams) {
    const insertReelsQuery = `
        INSERT INTO Reels (userId,reelsContents,reelsVideo,song,singer)
        VALUES (?,?,?,?,?);
    `;

    const insertReelsRow = await connection.query(
        insertReelsQuery,
        insertReelsParams
    );

    return insertReelsRow;
}


// 릴스 조회
async function selectReels(connection) {
    const selectReelsQuery = `
        select Reels.userId,profileImgUrl,reelsContents,reelsVideo,song,singer,likeCount from Reels
            inner join (select userId, profileImgUrl from User) U on U.userId=Reels.userId
            left join (select reelsIdx, count(userId) as likeCount from ReelsLike  group by reelsIdx) L
                on L.reelsIdx = Reels.reelsIdx
            left join (select reelsIdx, count(reelsIdx) as commentCount from ReelsComment  group by reelsIdx) C
                on C.reelsIdx = Reels.reelsIdx
        where Reels.status='Y';
    `;

    const selectReelsRow = await connection.query(selectReelsQuery);
    return selectReelsRow[0];
}


// 릴스 삭제
async function patchReels(connection,reelsIdx) {
    const deleteReelsQuery = `
        UPDATE Reels
        SET status = 'N'
        WHERE reelsIdx = ?;
    `;

    const deleteReelsRow = await connection.query(
        deleteReelsQuery,
        reelsIdx
    );

    return deleteReelsRow[0];
}


//릴스 좋아요 생성
async function insertReelsLike (connection,insertLikeParams) {
    const insertLikeQuery = `
        INSERT INTO ReelsLike (userId,reelsIdx)
        VALUES (?,?);
    `;

    const insertReelsLikeRow = await connection.query(
        insertLikeQuery,
        insertLikeParams
    );

    return insertReelsLikeRow[0];
}


//릴스 좋아요 삭제
async function patchReelsLike (connection, deletelikeParams) {
    const deleteLikeQuery = `
        UPDATE ReelsLike
        SET status = 'N'
        WHERE reelsIdx = ? and userId = ?;
    `;

    const deleteReelsLikeRow = await connection.query(
        deleteLikeQuery,
        deletelikeParams
    );

    return deleteReelsLikeRow[0];
}


//릴스 댓글 생성
async function insertComment(connection, commentParams) {
    const insertCommentQuery = `
        INSERT INTO ReelsComment (reelsIdx, userId, comment, reelsRecommentIdx)
        VALUES (?,?,?,?);
    `;

    const insertCommentRow = await connection.query(
        insertCommentQuery,
        commentParams
    );

    return insertCommentRow[0];
}


//릴스 댓글 삭제
async function patchReelsComment(connection, reelsCommentIdx) {
    const deleteCommentQuery = `
        UPDATE ReelsComment
        SET status = 'N'
        WHERE reelsCommentIdx = ? ;
    `;

    const deleteReelsCommentRow = await connection.query(
        deleteCommentQuery,
        reelsCommentIdx
    );

    return deleteReelsCommentRow[0];
}


//릴스 댓글 조회
async function selectReelsComment(connection, reelsIdx) {
    const selectCommentQuery = `
        select reelsIdx, userId,ReelsComment.reelsCommentIdx,ReelsComment.reelsReCommentIdx, comment,  if(reelsRecommentIdx='null',null,taggePpl) as taggedPpl, countLike,
               case
                   when timestampdiff(minute, createdAt, current_time) < 60
                       then concat(timestampdiff(minute, createdAt, current_time) , '분')
                   when timestampdiff(hour, createdAt, current_time) < 24
                       then concat(timestampdiff(hour, createdAt, current_time) , '시간')
                   when timestampdiff(day , createdAt, current_time) < 30
                       then concat(timestampdiff(day, createdAt, current_time) , '일')
                   else
                       concat(timestampdiff(week, createdAt, current_time) , '주')
                   end as createdAt from ReelsComment
                       left join (select userId as taggePpl, reelsCommentIdx from ReelsCommentPplTag) P
                           on P.reelsCommentIdx=ReelsComment.reelsCommentIdx
                       left join (select reelsCommentIdx, count(reelsCommentIdx) as countLike from ReelsCommentLike 
                                group by reelsCommentIdx) L
                           on  L.reelsCommentIdx=ReelsComment.reelsCommentIdx
        where ReelsComment.reelsIdx = ? and status='Y';
    `;

    const selectReelCommentRow = await connection.query(
        selectCommentQuery,
        reelsIdx
    );

    return selectReelCommentRow[0];
}


//userId 존재 여부 체크
async function selectId(connection, userId){
    const selectIdQuery = `
        select userId from User 
    where userId = ?
  `;

    const [selectIdRow] = await connection.query(selectIdQuery, userId);
    return selectIdRow;
}


//reelsIdx 존재 여부 체크
async function selectReelsIdx(connection, reelsIdx){
    const selectReelsIdxQuery = `
        select reelsIdx from Reels 
    where reelsIdx = ?
  `;

    const [selectReelsIdxRow] = await connection.query(selectReelsIdxQuery, reelsIdx);
    return selectReelsIdxRow;
}


//reelsCmtIdx 존재 여부 체크
async function selectReelsCmtIdx(connection, reelsCommentIdx){
    const selectCmtIdxQuery = `
        select reelsCommentIdx from ReelsComment
    where reelsCommentIdx = ?
  `;

    const [selectCmtIdxRow] = await connection.query(selectCmtIdxQuery, reelsCommentIdx);
    return selectCmtIdxRow;
}







module.exports = {
    insertReels,
    selectReels,
    patchReels,
    insertReelsLike,
    patchReelsLike,
    insertComment,
    patchReelsComment,
    selectReelsComment,
    selectId,
    selectReelsIdx,
    selectReelsCmtIdx
}