module.exports = function(app){
    //pc
    app.get('/livevideo/pcvideo',function(req,res){
        res.render('livevideo/pc_video');
    });

    //手机端
    app.get('/livevideo/mvideo',function(req,res){
        res.render('livevideo/m_video');
    });
};