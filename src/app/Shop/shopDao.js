// 상품 생성
async function insertProduct(connection, insertProductsParams) {
    const insertProductQuery = `
        INSERT INTO Product (userId,productName,price,isSale)
        VALUES (?, ?, ?, ?);
    `;

    const insertProductRow = await connection.query(
        insertProductQuery,
        insertProductsParams
    );

    return insertProductRow;
}

// productIdx 존재 여부 체크
async function selectProductIdx(connection, productIdx) {
    const selectProductIdxPostQuery = `
        select productIdx from Product 
    where productIdx = ? ;
    `;
    const selectProductIdxRow = await connection.query(
        selectProductIdxPostQuery,
        productIdx
    );

    return selectProductIdxRow[0];
}


// 모든 상품 리스트 조회
async function selectShopList(connection) {
    const selectShopListQuery = `
        select productIndex, productContentsIdx,contents from Product
            inner join(select min(productIdx) as productIndex, productContentsIdx,contents from ProductContents
            group by productIdx) C
                on productIndex=ProductIdx
        where status='Y';
                `;
    const [listRows] = await connection.query(selectShopListQuery);
    return listRows;
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

// 쇼핑 상품 세부사항 얻기
async function selectProductDetail(connection, productIdx){
    const selectDetailQuery = `
    select Product.userId,productIdx,productName,price,shopUserId,followerCount from Product
left join(select P.userId, shopUserId,concat(count(followerId), ' followers') as followerCount from Follow
    right join(select userId, concat('Shop ',userId) as shopUserId from Product )P on P.userId=Follow.userId)F
        on F.userId=Product.userId
where productIdx= ? ;
    `;

    const [selectDetailRow] = await connection.query(selectDetailQuery, productIdx);
    return selectDetailRow;
}


// 쇼핑 상품 사진,비디오 얻기
async function selectProductContents(connection, productIdx){
    const selectContentsQuery = `
        select productIdx,productContentsIdx,contents from ProductContents
        where productIdx=?
        order by productContentsIdx asc;
    `;

    const [selectContentsRow] = await connection.query(selectContentsQuery, productIdx);
    return selectContentsRow;
}

// 같은 계정의 상품 정보들 얻기
async function selectOtherProducts (connection, productIdxParams){
    const selectOthersQuery = `
        select productIndex as otherProductsIdx,productName as otherProductsName,price as otherProductsPrice ,contents as otherProductsContents from Product
            inner join(select if(productIdx=?,null,productIdx) as idx, min(productContentsIdx) as productIndex,contents from ProductContents
            group by productIdx) C
                on idx=Product.productIdx
        where status='Y' and userId in (select userId from Product where Product.productIdx=?);
    `;

    const [selectOthersRow] = await connection.query(selectOthersQuery, productIdxParams);
    return selectOthersRow;
}





module.exports = {
    insertProduct,
    selectId,
    selectShopList,
    selectProductIdx,
    selectProductDetail,
    selectProductContents,
    selectOtherProducts
};
