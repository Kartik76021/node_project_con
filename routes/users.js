var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var session = require('express-session');
var express = require('express');
var router = express.Router();
var db  = require('../lib/db');
// var session = require('express-session');

router.get('/',function(req,res, next){
    res.render('users/index');
});

router.get('/about',function(req,res,next){
    //recive section
    // let admi1=req.session.admi1;
    if ('') 
    {
    res.render('admin/about')
    }
    else
    {
        res.render('users/index')
    }
});
router.get('/services', function (req,res,next) {
  
    res.render('users/services');
})
router.get('/services_detals', function (req,res,next) {
  
    res.render('users/services_detals');
})
router.get('/project', function (req,res,next) {
  
    res.render('users/project');
})
router.get('/project_detals', function (req,res,next) {
    // let user_=req.session.user_;
    // if (user_) {
    //     req.session.user_="";
    //     res.render('users/about')
    // } 
    // else{
    //     res.render('users/about')
    // }
    res.render('users/project_detals');
})
router.get('/blog', function (req,res,next) {
    // let user_=req.session.user_;
    // if (user_) {
    //     req.session.user_="";
    //     res.render('users/about')
    // } 
    // else{
    //     res.render('users/about')
    // }
    res.render('users/blog');
})
router.get('/blog_detals', function (req,res,next) {
    // let user_=req.session.user_;
    // if (user_) {
    //     req.session.user_="";
    //     res.render('users/about')
    // } 
    // else{
    //     res.render('users/about')
    // }
    res.render('users/blog_detals');
})
router.get('/contact', function (req,res,next) {
    // let user_=req.session.user_;
    // if (user_) {
    //     req.session.user_="";
    //     res.render('users/about')
    // } 
    // else{
    //     res.render('users/about')
    // }
    res.render('users/contact');
})

// router.get('/logout',function(req, res, next){
//     let user_=req.session.user_;
//     if(user_)
//     {
//         req.session.user_="";
//         res.render('users/index',{msg:"succesfully logout"});
//     }
//     else
//     {
//         res.render('users/index',{msg:"already logged out"}); 
//     }
// });
router.post('/enqury',function(req,res,next){
   
  
        let name=req.body.name;
        let email=req.body.email;
        let subject=req.body.subject;
        let message=req.body.message;
       let from_data={
        name:name,
        email:email,
        subject:subject,
        message:message
       }
       db.query("INSERT INTO `enquiry` SET?",from_data,function(errore,result){
        if (errore) {
            res.render('users/contact');
        }
        else{
            res.render('users/contact');
        }
       })

   
});

module.exports = router;

