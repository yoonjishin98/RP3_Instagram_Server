// 스크랩 생성
async function insertScrap(connection, insertScrapParams) {
    const insertScrapQuery = `
        INSERT INTO Scrap (userId,collection,idx,idxType)
        VALUES (?,?,?,?);
    `;

    const insertScrapRow = await connection.query(
        insertScrapQuery,
        insertScrapParams
    );

    return insertScrapRow;
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












module.exports = {
    insertScrap,
    selectReels
}