//路由模块
const getRouter=require('router');
const router=getRouter();
const template=require('art-template');
const Student=require('../model/user');
const queryString=require('querystring');


router.get('/add',(req,res)=>{
    
    let html= template('add.art',{
 
     });
     res.end(html);
 
 });
 
 router.get('/list',async(req,res)=>{
     let students=  await Student.find();
     let html=template('list.art',{students});
     res.end(html);
 })
 
 //添加数据
 router.post('/add',(req,res)=>{
     let formData="";
     req.on('data',(param)=>{
         formData+=param;
     })
     req.on('end',async()=>{
         let student=queryString.parse(formData);
         console.log('student',student);
         
        await Student.create(student);
        res.writeHead('301',{
            Location: '/list'
        });
        res.end();
     })
     
 })

 module.exports=router;