// dm 채팅방 생성
async function insertChatRoom(connection, chatRoomParams) {
    const insertChatRoomQuery = `
        INSERT INTO ChatRoom (userId, friendId)
        VALUES (?, ?);
    `;
    const insertChatRoomRow = await connection.query(
        insertChatRoomQuery,
        chatRoomParams
    );

    return insertChatRoomRow;
}


//chatRoomIdx 얻기
async function selectRoomIdx(connection, userId, friendId) {
    const selectChatRoomQuery = `
        select chatRoomIdx from ChatRoom
    where userId = ? and friendId = ?
    `;

    const [selectChatRoomIdxRow] = await connection.query(
        selectChatRoomQuery,
       [userId, friendId]
    );

    return selectChatRoomIdxRow;
}


async function selectRoomIdx2(connection, friendId, userId) {
    const selectChatRoomQuery2 = `
        select chatRoomIdx from ChatRoom
    where userId = ? and friendId = ?
    `;

    const [selectChatRoomIdxRow2] = await connection.query(
        selectChatRoomQuery2,
        [friendId, userId]
    );

    return selectChatRoomIdxRow2;
}


// 채팅 생성
async function insertChat(connection, insertChatParams) {
    const insertChatQuery = `
        INSERT INTO Chat (chatRoomIdx,userId,chat,chatType)
        VALUES (?,?,?,?);
    `;

    const insertChatRow = await connection.query(
        insertChatQuery,
        insertChatParams
    );

    return insertChatRow;
}


// userId, friendId  가져오기
async function selectIds(connection, userId,friendId) {
    const selectIdsQuery = `
        select userId, friendId 
        from ChatRoom
        where userId = ? and friendId = ?;
    `;

    const [selectIdsRow] = await connection.query(
        selectIdsQuery,
        [userId,friendId]
    );

    return selectIdsRow;
}


async function selectIds2(connection, friendId,userId) {
    const selectIdsQuery2 = `
        select userId, friendId 
        from ChatRoom
        where userId = ? and friendId = ?;
    `;

    const [selectIdsRow2] = await connection.query(
        selectIdsQuery2,
        [friendId,userId]
    );

    return selectIdsRow2;
}








module.exports = {
    insertChatRoom,
    selectRoomIdx,
    selectRoomIdx2,
    insertChat,
    selectIds,
    selectIds2,

}

