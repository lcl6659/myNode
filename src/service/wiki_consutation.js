/**
 * Created by licl on 2015/12/2.
 */
var bookshelf = require('../model/bookshelf');
var wiki_question_model = require('../model/wiki_consutation');
var Promise = require('bluebird');

function addConsutation(consutation){
    return bookshelf.knex
        .insert(consutation)
        .from('wiki_consutation')
        .then(function(result){
            return Promise.resolve(result);
        });
}

exports.addConsutation = addConsutation;

function listAllConsltation(){

    return bookshelf.knex
        .select()
        .from('wiki_consutation')
        .then(function(resp){
            return Promise.resolve(resp);
        });
}
exports.listAllConsltation = listAllConsltation;

