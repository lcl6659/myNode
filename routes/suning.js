module.exports = function(app){
    //苏宁首页
    app.get('/suning',function(req,res){
        res.render('suning/index');
    });

};