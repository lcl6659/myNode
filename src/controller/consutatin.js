/**
 * Created by 95 on 2015/12/2.
 */
var consutatinService = require('../service/wiki_consutation');
var Promise = require('bluebird');

exports.listAll = function(req, res, next){
    Promise.props({
        consutations:consutatinService.listAllConsltation()
    }).then(function (result) {
        res.render("consutation/list", {consutations:result.consutations});
    });
};
