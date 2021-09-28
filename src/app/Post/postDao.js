// 포스트 생성
async function insertPost(connection, insertPostParams) {
    const insertPostQuery = `
        INSERT INTO Post (userId, caption, location)
        VALUES (?, ?, ?);
    `;
    const insertPostRow = await connection.query(
        insertPostQuery,
        insertPostParams
    );

    return insertPostRow;
}

//postIdx 얻기
async function selectMaxPostIdx(connection, userId) {
    const selectPostIdxPostQuery = `
        select max(postIdx) as postIdx from Post 
    where userId = ? 
        group by userId;
    `;
    const selectPostIdxRow = await connection.query(
        selectPostIdxPostQuery,
        userId
    );

    return selectPostIdxRow[0];
}

// 포스트 컨텐츠(사진, 비디오) 생성
async function insertContents(connection, insertContentsParams) {
    const insertContentsQuery = `
        INSERT INTO PostContents (postIdx, contents)
        VALUES (?, ?);
    `;
    const insertContentsRow = await connection.query(
        insertContentsQuery,
        insertContentsParams
    );

    return insertContentsRow;
}

// 모든 포스트 조회
async function selectPost(connection) {
    const selectPostListQuery = `
        select PostContents.postIdx, PostContents.contents from PostContents
            inner join (select PostContents.postIdx, min(postContentsIdx) as minimum,P.userId as userId 
            from PostContents
                inner join(select postIdx, userId,status from Post)P on P.postIdx = PostContents.postIdx
                        where status ='Y'
            group by postIdx) PP
                on PP.minimum=PostContents.postContentsIdx;
                `;
    const [postRows] = await connection.query(selectPostListQuery);
    return postRows;
}

// 위치로 포스트 조회
async function selectPostLocation(connection, location) {
    const selectPostLocationQuery = `
        select PostContents.postIdx, PostContents.contents from PostContents
            inner join (select PostContents.postIdx, min(postContentsIdx) as minimum,P.userId as userId, P.location as loca
            from PostContents
                inner join(select postIdx, userId,status, location from Post)P on P.postIdx = PostContents.postIdx
                    where status ='Y' and location = ?
            group by postIdx) PP
                on PP.minimum=PostContents.postContentsIdx;
                `;
    const [locationRows] = await connection.query(selectPostLocationQuery, location);
    return locationRows;
}


//해쉬태그 생성
async function insertHashtag(connection, insertHashtagParams) {
    const insertHashtagQuery = `
        INSERT INTO PostHashtag (postIdx, contents)
        VALUES (?, ?);
    `;
    const insertHashtagRow = await connection.query(
        insertHashtagQuery,
        insertHashtagParams
    );

    return insertHashtagRow;
}


//좋아요 생성
async function insertLikes(connection, insertLikesParams) {
    const insertLikesQuery = `
        INSERT INTO PostLike (postIdx, userId)
        VALUES (?, ?);
    `;
    const insertLikesRow = await connection.query(
        insertLikesQuery,
        insertLikesParams
    );

    return insertLikesRow;
}


//좋아요 조회
async function selectLike(connection, postIdx) {
    const selectLikeQuery = `
        select count(postLikeIdx) as likeCount from PostLike
    where postIdx = ? 
        group by postIdx;
    `;
    const selectLikesRow = await connection.query(
        selectLikeQuery,
        postIdx
    );

    return selectLikesRow[0];
}


// 코멘트 생성
async function insertComments(connection, commentsParams) {
    const insertCommentsQuery = `
        insert into Comment(userId, postIdx, commentContents, recommentIdx)
        values (?,?,?,?);
    `;
    const insertCommentsRow = await connection.query(
        insertCommentsQuery,
        commentsParams
    );

    return insertCommentsRow;

}


//댓글 목록 조회
async function selectCommentsList (connection, postIdx){
    const selectCommentsQuery = `
        select Comment.userId, commentContents,likeCount, if(recommentIdx=null,null, taggedPpl )  as tag,
               case
                   when timestampdiff(minute, createdAt, current_time) < 60
                       then concat(timestampdiff(minute, createdAt, current_time) , '분')
                   when timestampdiff(hour, createdAt, current_time) < 24
                       then concat(timestampdiff(hour, createdAt, current_time) , '시간')
                   when timestampdiff(day , createdAt, current_time) < 30
                       then concat(timestampdiff(day, createdAt, current_time) , '일')
                   else
                       concat(timestampdiff(week, createdAt, current_time) , '주')
                   end as createdAt from Comment
                       left join (select userId as taggedPpl,commentIdx from CommentPplTag where status='Y') P on P.commentIdx=Comment.commentIdx
                       left join (select commentIdx, count(commentIdx) as likeCount from CommentLike group by commentIdx) C on C.commentIdx=Comment.commentIdx
        where postIdx = ? and status= 'Y';
    `;

    const selectCommentsRow = await connection.query(
        selectCommentsQuery,
        postIdx
    );

    return selectCommentsRow[0];
}


//포스트 댓글 삭제
async function deleteComment(connection,commentIdx){
    const deleteCommentQuery = `
        update Comment 
        set status = 'N'
        where commentIdx = ?;
  `;

    const deleteCommentRow = await connection.query(deleteCommentQuery, commentIdx);
    return deleteCommentRow[0];
}

//포스트 수정
async function updatePost (connection,postParams) {
    const updatePostQuery = `
        update Post 
        set location = ?, caption = ?
        where postIdx = ?;
  `;

    const updatePostRow = await connection.query(updatePostQuery, postParams);
    return updatePostRow[0];
}

//해쉬태그 수정
async function updateHashtag (connection,hashtagParams) {
    const updateHashtagQuery = `
        update PostHashtag 
        set contents = ?
        where postHashtagIdx = ?;
  `;

    const updateHashtagRow = await connection.query(updateHashtagQuery, hashtagParams);
    return updateHashtagRow[0];
}

//포스트 삭제
async function deletePost(connection,postIdx) {
    const deletePostQuery = `
        update Post 
        set status = 'N'
        where postIdx = ?;
  `;

    const deletePostRow = await connection.query(deletePostQuery, postIdx);
    return deletePostRow[0];
}

//포스트 해쉬태그 삭제
async function deleteHashtag  (connection,postIdx) {
    const deleteHashtagQuery = `
        update PostHashtag 
        set status = 'N'
        where postIdx = ?;
  `;

    const deleteHashtagRow = await connection.query(deleteHashtagQuery, postIdx);
    return deleteHashtagRow[0];
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


async function selectHashtagIdx(connection,postHashtagIdx) {
    const selectHashtagIdxQuery = `
        select postHashtagIdx from PostHashtag 
    where postHashtagIdx = ?
  `;

    const [selectIdxRow] = await connection.query(selectHashtagIdxQuery, postHashtagIdx);
    return selectIdxRow;
}


//postIdx 얻기
async function selectPostIdx(connection, postIdx) {
    const selectPostIdxPostQuery = `
        select postIdx from Post 
    where postIdx = ? ;
    `;
    const selectPostIdxRow = await connection.query(
        selectPostIdxPostQuery,
        postIdx
    );

    return selectPostIdxRow[0];
}


//cmtIdx 얻기
async function selectCmtIdx(connection, commentIdx) {
    const selectCmtIdxPostQuery = `
        select commentIdx from Comment 
    where commentIdx = ? ;
    `;
    const selectCmtIdxRow = await connection.query(
        selectCmtIdxPostQuery,
        commentIdx
    );

    return selectCmtIdxRow[0];
}


// 좋아요 삭제
async function deleteLikes(connection, likesParams){
    const deleteLikeQuery = `
        update PostLike 
        set status = 'N'
        where postIdx = ? and userId = ?;
  `;

    const deleteHashtagRow = await connection.query(deleteLikeQuery, likesParams);
    return deleteHashtagRow[0];
}


// 유저가 팔로잉하는 포스트
async function selectFollowingPosts (connection, userId){
    const followingPostsQuery = `
        select Post.postIdx, Post.userId, caption, location, likeCount, Contents,
               case
                   when timestampdiff(hour, createdAt, current_time) < 1
                       then concat(timestampdiff(hour, createdAt, current_time) , '분 전')
                   when timestampdiff(hour, createdAt, current_time) < 24
                       then concat(timestampdiff(hour, createdAt, current_time) , '시간 전')
                   when timestampdiff(day , createdAt, current_time) < 30
                       then concat(timestampdiff(day, createdAt, current_time) , '일 전')
                   when timestampdiff(year , createdAt, current_time) < 1
                       then date_format(createdAt, '%e월 %c일')
                   else
                       date_format(createdAt, '%y년 %c월 %c일')
                   end as createdAt from Post
                                             inner join (select User.userId, profileImgUrl from User) UserInfo on UserInfo.userId = Post.userId
                                             left join (
            select PostLike.postIdx, count(PostLike.postIdx) as likeCount from PostLike
            where status = 'Y'
            group by postIdx ) L on Post.postIdx = L.postIdx
                                             left join(
            select PostContents.postIdx, PostContents.contents as Contents from PostContents
                                                                                    inner join (select PostContents.postIdx, min(postContentsIdx) as minimum,P.userId as userId from PostContents
                                                                                                                                                                                         inner join(select postIdx, userId, status from Post)P on P.postIdx = PostContents.postIdx
                                                                                                where status ='Y'
                                                                                                group by postIdx) PP
                                                                                               on PP.minimum=PostContents.postContentsIdx) C on C.postIdx = Post.postIdx
        where Post.status = 'Y' and Post.userId in (select Follow.userId from Follow where followerId='yoonji_ks98');
  `;

    const followingPostsRow = await connection.query(followingPostsQuery, userId);
    return followingPostsRow[0];
}








module.exports = {
    insertPost,
    insertContents,
    selectPost,
    selectPostLocation,
    insertHashtag,
    insertLikes,
    selectPostIdx,
    selectLike,
    insertComments,
    selectCommentsList,
    deleteComment,
    updatePost,
    updateHashtag,
    deletePost,
    deleteHashtag,
    selectId,
    selectHashtagIdx,
    selectMaxPostIdx,
    selectCmtIdx,
    deleteLikes,
    selectFollowingPosts
};
