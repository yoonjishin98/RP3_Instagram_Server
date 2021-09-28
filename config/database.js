const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'yj-db.crtgjpltkmdw.ap-northeast-2.rds.amazonaws.com',
    user: 'master',
    port: '3306',
    password: 'moonwalker01!',
    database: 'igDatabase'
});

module.exports = {
    pool: pool
};