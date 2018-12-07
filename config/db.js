/**
 * Created by licl on 2015/12/2.
 * 数据库连接配置文件
 */
module.exports = {
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        password : '1234',
        database : 'node',
        charset  : 'utf8'
    },
    pool: {
        min: 0,
        max: 7
    }
};
