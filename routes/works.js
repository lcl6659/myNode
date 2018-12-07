module.exports = function(app){
    //作品入口
    app.get('/works',function(req,res){
        res.render('works');
    });

};