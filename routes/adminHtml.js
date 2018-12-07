module.exports = function(app){
    
    app.get('/addQuestionnaire',function(req,res){
        res.render('adminHtml/addQuestionnaire');
    });

    app.get('/appIndexAdmin',function(req,res){
        res.render('adminHtml/appIndexAdmin');
    });

    app.get('/checkCreateTableForm',function(req,res){
        res.render('adminHtml/checkCreateTableForm');
    });

    app.get('/menuEdit',function(req,res){
        res.render('adminHtml/menuEdit');
    });

    app.get('/researchStatistics',function(req,res){
        res.render('adminHtml/researchStatistics');
    });

    
};