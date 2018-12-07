var dbConfig = require('../../config/db');

//封装bookshelf对象，让外面直接使用
var knex = require('knex')(dbConfig);
module.exports = require('bookshelf')(knex);