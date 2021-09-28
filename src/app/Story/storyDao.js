// 스토리 생성
async function insertStory(connection, insertStoryParams) {
    const insertStoryQuery = `
        INSERT INTO Story (userId, contents)
        VALUES (?, ?);
    `;

    const insertStoryRow = await connection.query(
        insertStoryQuery,
        insertStoryParams
    );

    return insertStoryRow;
}

//storyIdx 얻기
async function selectStoryIdx(connection, userId) {
    const selectStoryIdxQuery = `
        select max(storyIdx) as storyIdx from Story 
    where userId = ? 
        group by userId;
    `;

    const selectStoryIdxRow = await connection.query(
        selectStoryIdxQuery,
        userId
    );

    return selectStoryIdxRow[0];
}


// 스토리 컨텐츠 생성
async function insertContents(connection, insertContentsParams) {
    const insertContentsQuery = `
        INSERT INTO StoryContents (storyIdx,contents)
        VALUES (?, ?);
    `;
    const insertContentsRow = await connection.query(
        insertContentsQuery,
        insertContentsParams
    );

    return insertContentsRow;
}


// 스토리 조회
async function selectStory(connection, userId) {
    const selectStoryQuery = `
        select Story.storyIdx, if(Story.userId= ? ,'내 스토리', Story.userId) UserId, profileImgUrl, phtoOrVideo, contents,
               case
                   when timestampdiff(minute, createdAt, current_time) < 60
                       then concat(timestampdiff(minute, createdAt, current_time) , '분 전')
                   when timestampdiff(hour, createdAt, current_time) < 24
                       then concat(timestampdiff(hour, createdAt, current_time) , '시간 전')
                   when timestampdiff(day , createdAt, current_time) < 30
                       then concat(timestampdiff(day, createdAt, current_time) , '일 전')
                   else
                       concat(timestampdiff(week, createdAt, current_time) , '주 전')
                   end as createdAt from Story
                       inner join (select User.userId, profileImgUrl from User) UserInfo on Story.userId = UserInfo.userId
                       inner join (select storyIdx, contents as phtoOrVideo from StoryContents) S on Story.storyIdx = S.storyIdx
        where Story.status = 'Y';
    `;

    const selectStoryRow = await connection.query(
        selectStoryQuery,
        userId
    );

    return selectStoryRow[0];
}


// 스토리 삭제
async function patchStory(connection, storyIdx) {
    const deleteStoryQuery = `
        UPDATE Story
        SET status = 'N'
        WHERE storyIdx = ?;
    `;

    const deleteStoryRow = await connection.query(
        deleteStoryQuery,
        storyIdx
    );

    return deleteStoryRow[0];
}









module.exports = {
    insertStory,
    insertContents,
    selectStoryIdx,
    selectStory,
    patchStory
}