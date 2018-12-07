/**
 * Created by licl on 2015/12/2.
 * 对wiki_question表的操作
 */
var bookshelf = require('./bookshelf');


var Wiki_question = bookshelf.Model.extend({
    tableName:'wiki_question'
},{
    addQuestion:function(question){

    },
    deleteQuestion:function(id){

    },
    findQuestionById:function(id){

    },
    getAllQuestions:function(){

    },
    getQuestionsLimit:function(limit){

    }
});

module.exports = Wiki_question;

