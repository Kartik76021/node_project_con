var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var session = require('express-session');
var express = require('express');
var router = express.Router();
var db  = require('../lib/db');
var multer=require('multer');
var fileUpload=('express-fileupload');

//let session = require('express-session');

//main code here

router.get('/',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/profile',{'nm':admi1});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/',function(req,res,next){
    //receive all data
    let adminid=req.body.adminid.trim();
    let password=req.body.password.trim();
    db.query("SELECT COUNT(*) AS count1 FROM `admi1` where `adminid`='"+adminid+"' and `password`='"+password+"'",function(error,result){
        if(result[0].count1==0)
        {
           // console.log(error);
            res.render('admin/index',{'msg':"invalid adminid or password"});
        }
        else
        {
            req.session.admi1 = adminid;//create sesssion
            res.redirect('/admin/profile');
        }
    });

});
router.get('/profile',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let q1="select count(*) as count2 from `slider`";
        let q2="select count(*) as count2 from `about_1`";
        let q3="select count(*) as count2 from `construction`";
        let q4="select count(*) as count2 from `services`";
        let q5="select count(*) as count2 from `project_category`";
        let q6="select count(*) as count2 from `projects`";
        let q7="select count(*) as count2 from `enqury`";
        let q8="select count(*) as count2 from `testmonials`";
        let q9="select count(*) as count2 from `site_menu`";
        let q10="select count(*) as count2 from `myorder`";
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
         // current month
         let month = ("0" +(date_ob.getMonth() +1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();
        var curdate =year+"-"+month+"-"+date;
        //console.log(year+"-"+month+"-"+date);
        let q11 ="SELECT SUM(amount) AS total FROM `partpayment`";
        let q12 ="SELECT SUM(amount) AS total1 FROM `myorder` WHERE `created_at` like concat('"+curdate+"','%')";
        let count=0;
        let count1=0;
        let count2=0;
        let count3=0;
        let count4=0;
        let count5=0;
        let count6=0;
        let count7=0;
        let count8=0;
        let count9=0;
        let count10=0;
        let count11=0;
       


        db.query(q1, function (err,result) {
        count=result[0].count2;
        db.query(q2, function (err,result) {
            count1=result[0].count2;
            db.query(q3, function (err,result) {
                count2=result[0].count2;
                db.query(q4, function (err,result) {
                    count3=result[0].count2;
                    db.query(q5, function (err,result) {
                        count4=result[0].count2;
                        db.query(q6, function (err,result) {
                            count5=result[0].count2;
                            db.query(q7, function (err,result) {
                                count6=result[0].count2;
                                db.query(q8, function (err,result) {
                                    count7=result[0].count2;
                                    db.query(q9, function (err,result) {
                                        count8=result[0].count2;
                                        db.query(q10, function (err,result) {
                                            count9=result[0].count2;
                                            db.query(q11, function (err,result) {
                                                count10=result[0].total;
                                                db.query(q12, function (err,result) {
                                                    count11=result[0].total1;
                                                        res.render('admin/profile',{'nm':admi1,c1:count,c2:count1,c3:count2,c4:count3,c5:count4,c6:count5,c7:count6,c8:count7,c9:count8,c10:count9,c11:count10,c12:count11});   
                                                        });
                                                    
                                                    });
                                                
                                                });
                                            
                                            });
                                    }) ; 
                                });
                              
                            });
                        
                        });
                     
                    });
                
                });
              
            });
         
        });
   
    }
    else
    {
       
        res.render('admin/index',{msg:"please login"});
    }
});

router.get('/changepwd',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    
    if(admi1)
    {
    res.render('admin/changepwd',{'nm':admi1,msg1:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/changepwd',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    
    if(admi1)
    {
        //receive all data
        let opwd=req.body.opwd.trim();
        let npwd=req.body.npwd.trim();
        let cpwd=req.body.cpwd.trim();
        db.query("SELECT COUNT(*) AS count1 FROM `admi1` where `adminid`='"+admi1+"' and `password`='"+opwd+"'",function(error,result){
                if(result[0].count1==0){
                    res.render('admin/changepwd',{'nm':admi1,msg1:"old password doesnot match"});
                }
                else
                {
                    if(npwd!=cpwd)
                    {
                        res.render('admin/changepwd',{'nm':admi1,'msg1':"both password doesnot match"});
                    }
                    else
                    {
                        let form_data={
                            password:cpwd
                        };
                                try{
                                db.query("update `admi1` SET ? where `adminid`='"+admi1+"'",form_data,function(error1,result1){
                                    if(error1){res.render('admin/changepwd',{'nm':admi1,msg1:"something went wrong"});}
                                    else{res.render('admin/changepwd',{msg1:"password updated successfully done",'nm':admi1});
                                    }
                                });
                            }
                            catch(e)
                            {
                                console.log(e);
                            }
                    }
                }
        });
        //queries
        //execute
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});

// router.get('/status/:id/:x',function(req,res,next){
//     //receive session
//     let admi1=req.session.admi1;
    
//     if(admi1)
//     {
//         let x=req.params.x.trim();
//         let id=req.params.id.trim();
//         console.log(x+" "+id);
//         // console.log(x);
//         let form_data={
//             status:x
//         }
                              
//                                 db.query("update `students` SET ? where `id`='"+id+"'",form_data,function(error1,result1){
//                                     res.redirect('/admin/allstudent');
//                                     });
        
//     }
//     else
//     {
//         res.render('admin/index',{msg:"please login"});
//     }
// });





router.get('/slider',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("select * from `slider`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/slider',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_slider',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_slider',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_slider', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('image');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
            
          //Receive Data
                // let id=req.body.id;
                let title=req.body.title;
                let image=random_number+".jpg";
                let sequence=req.body.sequence;
                let status=req.body.status;
                let added_date=req.body.added_date;
                let modified_date=req.body.modified_date;
       
                
          
                     
    //store into dictionary
    var form_data = {
               
                // id:id,
                title:title,
                image:image,
                sequence:sequence,
                status:status,
                added_date:added_date,
                modified_date:modified_date,
    }
    //queries string
    let q1="insert into `slider` set ?";
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/add_slider')
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/add_slider');    
        }
    });
}});
})
router.get('/display_slider/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `slider` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_slider',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_slider/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `slider` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_slider',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete1/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `slider` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/slider")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/edit_slider/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `slider` where `id`='"+id+"'",function(error,result){
            if(error){
                req.flash('error',error);
                res.render('admin/edit_slider',{
                    id:'',
                    title:'',
                    image:'',
                    sequence:'',
                    status:'',
                    added_date:'',
                    modified_date:'', 
                });
            }
            else
            {
                res.render('admin/edit_slider',{'nm':'admi1', msg:"", result1:result,
                id:result[0].id,
                title:result[0].title,
                image:result[0].image,
                sequence:result[0].sequence,
                status:result[0].status,
                added_date:result[0].added_date,
                modified_date:result[0].modified_date, 
            
            });
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/edit_slider', function(req, res, next) {  
    //Receive Data
    var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('image');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
                let id=req.body.id;
                let title=req.body.title;
                let image=random_number+".jpg";
                let sequence=req.body.sequence;
                let status=req.body.status;
                let update_image=req.body.update_image;
                let added_date=req.body.added_date;
                let modified_date=req.body.modified_date;
       
                
          
                     
    //store into dictionary
    var form_data = {
               
                id:id,
                title:title,
                image:image,
                sequence:sequence,
                status:status,
                added_date:added_date,
                modified_date:modified_date,
    }
    //queries string
    let q1="update `slider` set ? where `id` ="+id;
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/edit_slider' ,{'id':id})
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/edit_slider',{'nm':'admi1', msg:"",result1:""});    
        }
    });
}});
})

router.get('/about',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("SELECT * FROM `about_1`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/about',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});

router.get('/add_about',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_about',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_about',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.body.id;
        let heading=req.body.heading;
        let description=req.body.description; 
        let status=req.body.status;
        let added_date=req.body.added_date;
        let modify_date=req.body.modify_date;
       let form_data={
        id:id,
        heading:heading,
        description:description,
        status:status,
        added_date:added_date,
        modify_date:modify_date
       }
       db.query("insert into `about_1` set?",form_data,function(errore,result){
        if (errore) {
            res.render('admin/add_about',{'nm':admi1,msg:"wrong"});
        }
        else{
            res.render('admin/add_about',{'nm':admi1,msg:"done"});
        }
       })

   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/display_about/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `about_1` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_about',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_about/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `about_1` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_about',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete2/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `about_1` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/about")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});

router.get('/edit_about/(:id)',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id;
        db.query("select * from  `about_1` where `id`='"+id+"'",function(error,result){
            if(error){
                req.flash('error',error);
                res.render('admin/edit_about',{
                    id:'',
                    heading:'',
                    description:'',
                    status:'',
                    added_date:'',
                    modified_date:'', 
                });
            }
            else
            {
                res.render('admin/edit_about',{'nm':'admi1', msg:"", result1:result,
                id:result[0].id,
                heading:result[0].heading,
                description:result[0].description,
                status:result[0].status,
                added_date:result[0].added_date,
                modified_date:result[0].modified_date, 
            
            });
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/edit_about/',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.body.id;
        let heading=req.body.heading;
        let description=req.body.description; 
        let status=req.body.status;
        let added_date=req.body.added_date;
        let modify_date=req.body.modify_date;
       let form_data={
        id:id,
        heading:heading,
        description:description,
        status:status,
        added_date:added_date,
        modify_date:modify_date
       }
       db.query("update `about_1` set? where `id` ="+id , form_data,function(errore,result){
        if (errore) {
            res.render('admin/edit_about',{'nm':admi1,msg:"wrong"},{'id':id});
        }
        else{
            res.render('admin/edit_about',{'nm':admi1,msg:"done",result1:result});
        }
       })

   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});


router.get('/constructions',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("select * from `construction`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/constructions',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_constructions',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_constructions',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});

router.post('/add_constructions', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('icon');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
                let name=req.body.name;
                let heading=req.body.heading;
                let icon=random_number+".jpg";
                let description=req.body.description;
                let status=req.body.status;
                let added_date=req.body.added_date;
                let modified_date=req.body.modified_date;
       
                
          
                     
    //store into dictionary
    var form_data = {
                name:name,
                heading:heading,
                description:description,
                icon:icon,
                status:status,
                added_date:added_date,
                modified_date:modified_date,
    }
    //queries string
    let q1="insert into `construction` set ?";
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/add_constructions')
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/add_constructions');    
        }
    });
}});
})
router.get('/display_construction/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `construction` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_construction',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_constructions/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `construction` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_constructions',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete3/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `construction` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/constructions")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/edit_constructions/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `construction` where `id`='"+id+"'",function(error,result){
            if(error){
                req.flash('error',error);
                res.render('admin/edit_constructions',{
                    id:'',
                    name:'',
                    heading:'',
                    icon:'',
                    description:'',
                    status:'',
                    added_date:'',
                    modified_date:'', 
                });
            }
            else
            {
                res.render('admin/edit_constructions',{'nm':'admi1', msg:"", result1:result,
                id:result[0].id,
                name:result[0].name,
                heading:result[0].heading,
                description:result[0].description,
                status:result[0].status,
                added_date:result[0].added_date,
                modified_date:result[0].modified_date, 
            
            });
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/edit_constructions', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('icon');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
                let id=req.body.id;
                let name=req.body.name;
                let heading=req.body.heading;
                let icon=random_number+".jpg";  
                let status=req.body.status;
                let added_date=req.body.added_date;
                let modified_date=req.body.modified_date;
       
                
          
                     
    //store into dictionary
    var form_data = {
               
                id:id,
                name:name,
                heading:heading,
                icon:icon,
                status:status,
                added_date:added_date,
                modified_date:modified_date,
    }
    //queries string
    let q1="update `construction` set ? where `id` ="+id;
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/edit_constructions' ,{'id':id})
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/edit_constructions',{'nm':'admi1', msg:"",result1:""});    
        }
    });
}});
})

router.get('/services',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("select * from `services`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/services',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_services',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_services',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_services', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('icon');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
                let name=req.body.name;
                let icon=random_number+".jpg";
                let description=req.body.description;
                let status=req.body.status;
                let added_date=req.body.added_date;
                let modified_date=req.body.modified_date;
       
                
          
                     
    //store into dictionary
    var form_data = {
                name:name,
                description:description,
                icon:icon,
                status:status,
                added_date:added_date,
                modified_date:modified_date,
    }
    //queries string
    let q1="insert into `services` set ?";
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/add_services')
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/add_services');    
        }
    });
}});
})
router.get('/display_services/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `services` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_services',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_services/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `services` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_services',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete4/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `services` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/services")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});


router.get('/project_category',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("SELECT * FROM `project_category`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/project_category',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_project_category',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_project_category',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_project_category',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.body.id;
        let name=req.body.name;
        let status=req.body.status;
        let added_date=req.body.added_date;
        let modify_date=req.body.modify_date;
       let form_data={
        id:id,
        name:name,
        status:status,
        added_date:added_date,
        modify_date:modify_date
       }
       db.query("insert into `project_category` set?",form_data,function(errore,result){
        if (errore) {
            res.render('admin/add_project_category',{'nm':admi1,msg:"wrong"});
        }
        else{
            res.render('admin/add_project_category',{'nm':admi1,msg:"done"});
        }
       })

   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/display_project_category/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `project_category` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_project_category',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_project_category/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `project_category` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_project_category',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete5/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `project_category` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/project_category")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});



router.get('/project',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("select * from `projects`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/project',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_project',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_project',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_project', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('image');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
                let id=req.body.id;
                let name=req.body.name;
                let image=random_number+".jpg";
                let category_id=req.body.category_id;
                let status=req.body.status;
                let added_date=req.body.added_date;
                let modify_date=req.body.modify_date;
       
                
          
                     
    //store into dictionary
    var form_data = {
                id:id,
                name:name,
                category_id:category_id,
                image:image,
                status:status,
                added_date:added_date,
                modify_date:modify_date,
    }
    //queries string
    let q1="insert into `projects` set ?";
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/add_project')
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/add_project');    
        }
    });
}});
})
router.get('/display_project/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `projects` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_project',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_project/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `projects` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_project',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete6/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `projects` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/project")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});



router.get('/enqury',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("SELECT * FROM `enqury`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/enqury',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_enqury',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_enqury',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_enqury',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.body.id;
        let name=req.body.name;
        let email=req.body.email;
        let subject=req.body.subject;
        let message=req.body.message;
        let status=req.body.status;
        let added_date=req.body.added_date;
        let modify_date=req.body.modify_date;
        
       let form_data={
        id:id,
        name:name,
        email:email,
        subject:subject,
        message:message,
        status:status,
        added_date:added_date,
        modify_date:modify_date,
        
       }
       db.query("insert into `enqury` set?",form_data,function(errore,result){
        if (errore) {
            res.render('admin/add_enqury',{'nm':admi1,msg:"wrong"});
        }
        else{
            res.render('admin/add_enqury',{'nm':admi1,msg:"done"});
        }
       })

   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
// router.get('/e_view/:id',function(req,res,next){
//     //receive session
//     let admi1=req.session.admi1;
//     if(admi1)
//     {
//         let id=req.params.id
//         db.query("SELECT * FROM `enqury` where `id`='"+id+"'",function(error,result){
//             if (error) {
                
//             }
//             else{
//                 res.render('admin/e_view',{'nm':'admi1',msg:"",result1:result});
//             }
//         })
   
//     }
//     else
//     {
//         res.render('admin/index',{msg:"please login"});
//     }
// });

router.get('/display_enqury/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `enqury` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_enqury',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_enqury/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `enqury` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_enqury',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete7/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `enqury` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/enqury")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});



router.get('/testmonials',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("select * from `testmonials`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/testmonials',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_testmonials',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_testmonials',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_testmonials', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('image');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
                let id=req.body.id;
                let name=req.body.name;
                let heading=req.body.heading;
                let image=random_number+".jpg";
                let description=req.body.descrption;
                let status=req.body.status;
                let added_date=req.body.added_date;
                let modify_date=req.body.modify_date;
       
                
          
                     
    //store into dictionary
    var form_data = {
                id:id,
                name:name,
                heading:heading,
                description:description,
                image:image,
                status:status,
                added_date:added_date,
                modify_date:modify_date,
    }
    //queries string
    let q1="insert into `testmonials` set ?";
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/add_testmonials')
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/add_testmonials');    
        }
    });
}});
})
router.get('/display_testmonials/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `testmonials` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_testmonials',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});

router.get('/delete_testmonials/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `testmonials` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_testmonials',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete8/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `testmonials` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/testmonials")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});



router.get('/site_menu',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        db.query("select * from `site_menu`",function(error,result){
            if (error) {
                
            }
            else{
                res.render('admin/site_menu',{'nm':'admi1',msg:"",result1:result});
            }
        })
   
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/add_site_menu',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
    res.render('admin/add_site_menu',{'nm':'admi1',msg:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.post('/add_site_menu', function(req, res, next) {  
    //Receive Data
     var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
    var random = ("" + Math.random()).substring(2, 8); 
    var random_number = timestamp+random; 

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './Public/assets/upload')
        },
        filename: function (req, file, cb) {
          cb(null, random_number+'.jpg')
        }
      });
      var upload = multer({ storage: storage }).single('logo');
      upload(req,res,function(err){
          if(err)
          {
           
          }
          else
          {
          //Receive Data
                // let id=req.body.id;
                let phone=req.body.phone;
                let email=req.body.email;
                let address=req.body.address;
                let fb=req.body.fb;
                let tw=req.body.tw;
                let insta=req.body.insta;
                let logo=random_number+".jpg";
                // let favicon=random_number+".jpg";
               
       
                     
    //store into dictionary
    var form_data = {
               
                // id:id,
                phone:phone,
                email:email,
                address:address,
                fb:fb,
                tw:tw,
                insta:insta,
                logo:logo,
                // favicon:favicon,
               
    }
    //queries string
    let q1="insert into `site_menu` set ?";
    //execution
    db.query(q1, form_data, function(err, result) {
        if (err) {
            req.flash('error', err)
            res.render('admin/add_site_menu')
        }
        else{
            req.flash('success', 'successfully added');
            res.redirect('/admin/add_site_menu');    
        }
    });
}});
})
router.get('/display_site_menu/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `site_menu` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/display_site_menu',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete_site_menu/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("select * from `site_menu` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                res.render('admin/delete_site_menu',{'nm':admi1, msg:"",result1:result});
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/delete9/:id',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    if(admi1)
    {
        let id=req.params.id
        db.query("delete  from `site_menu` where `id`='"+id+"'",function(error,result){
            if(error){console.log(error);}
            else
            {
                // res.render('admin/delete1',{'nm':admi1, msg:"",result1:result});
                res.redirect("/admin/site_menu")
            }
        })
    
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});


router.get('/today_revenu',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    
    if(admi1)
    {
    res.render('admin/today_revenu',{'nm':admi1,msg1:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});
router.get('/all_revenu',function(req,res,next){
    //receive session
    let admi1=req.session.admi1;
    
    if(admi1)
    {
    res.render('admin/all_revenu',{'nm':admi1,msg1:""});
    }
    else
    {
        res.render('admin/index',{msg:"please login"});
    }
});


router.get('/logout',function(req,res,next){
    //receive session
    let admin1=req.session.admin1;
    if(admin1)
    {
        req.session.admin1="";
    res.render('admin/index',{msg:"successfully logout"});
    }
    else
    {
        res.render('admin/index',{msg:"already logged out"});
    }
});






module.exports = router;