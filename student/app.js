const http=require('http');
const app=http.createServer();
require('./model/connect');
const template=require('art-template');
const router=require('./router/index');
const dateformat=require('dateformat');
const staticServe=require('serve-static');

const path=require('path');




const serve=staticServe(path.join(__dirname,'public'));

template.defaults.root=path.join(__dirname,'views');
template.defaults.imports.dateformat=dateformat;


app.on('request',(req,res)=>{
    //router的第三个参数在请求成功后调用，是必填参数
    router(req,res,()=>{
        console.log(6666);
        
    })
    serve(req,res,()=>{})
})

app.listen(3000,()=>console.log('3000端口'));

