const http=require('http');
const url=require('url');
const querystring=require('querystring');
const app=http.createServer();
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/learn',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result=>console.log('数据库连接成功'))
.catch(err=>console.log('err','数据库连接失败'));

const userSchema=mongoose.Schema({
    name:{
        type:String,
        minlength:5,
        maxlength:50,
        require:true
    },
   
    age:{
        type:Number,
        min:18,
        max:80,
        require:true
    },
    hobbies:[String],
    email:{type:String},
    password:{
        type:String,
        require:true
    },
    
})
const User=mongoose.model('User',userSchema);

app.on('request',async(req,res)=>{
    let method=req.method;
    let {pathname,query}=url.parse(req.url,true);
    if(method==='GET'){
        if(pathname==='/list'){
          const users= await User.find();
          let list =`<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>用户列表</title>
              <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
          </head>
          <body>
              <div class="container">
                  <h6>
                      <a href="/add" class="btn btn-primary">添加用户</a>
                  </h6>
                  <table class="table table-striped table-bordered">
                      <tr>
                          <td>用户名</td>
                          <td>年龄</td>
                          <td>爱好</td>
                          <td>邮箱</td>
                          <td>操作</td>
                      </tr>`;
                    
                    users.forEach((item)=>{
                        list+=` <tr>
                          <td>${item.name}</td>
                          <td>${item.age}</td>
                          <td>`;
                          item.hobbies.forEach(ele=>list+=`
                          <span>${ele}</span>
                          `);
                         
                         list+=`
                          </td>
                          <td>${item.email}</td>
                          <td>
                              <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                              <a href="/modified?id=${item._id}" class="btn btn-success btn-xs">修改</a>
                          </td>
                      </tr>`
                    });
                      

                list+=`
                  </table>
              </div>
          </body>
          </html>`;
            res.end(list);
            
        }else if(pathname==='/add'){
            let add=`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method='post' action='/add'>
                      <div class="form-group">
                        <label>用户名</label>
                        <input type="text" class="form-control" placeholder="请填写用户名" name="name">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input type="password" class="form-control" placeholder="请输入密码" name="password">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input type="text" class="form-control" placeholder="请填写年龄"name="age" >
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" class="form-control" placeholder="请填写邮箱" name="email">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="足球" name="hobbies"> 足球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="篮球" name="hobbies"> 篮球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="喝酒"name="hobbies" > 喝酒
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="烫头" name="hobbies"> 烫头
                            </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            </html>`;
            res.end(add);
        }else if(pathname==='/modified'){
            let updataUser=await User.findOne({_id:query.id});
            // console.log('updataUser',updataUser.email);
            let hobbies=['足球','篮球','敲代码','橄榄球','抽烟','烫头'];
            let modified=`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method='post' action='/modified?id=${updataUser._id}'>
                      <div class="form-group">
                        <label>用户名</label>
                        <input type="text" class="form-control" value="${updataUser.name}" placeholder="请填写用户名" name="name">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input type="password" class="form-control" value="${updataUser.password}" placeholder="请输入密码" name="password">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input type="text" class="form-control"  value="${updataUser.age}" placeholder="请填写年龄"name="age" >
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input type="email" class="form-control" placeholder="请填写邮箱"  value="${updataUser.email}" name="email">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>`
                       hobbies.forEach(item=>{
                           //includes——》查看当前数组是否包含该元素，返回值为布尔值——》包含返回true，反之false
                            if( updataUser.hobbies.includes(item)){
                                modified+=`
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                                </label>`
                            }else{
                                modified+=`
                                <label class="checkbox-inline">
                                  <input type="checkbox" value="${item}" name="hobbies" > ${item}
                                </label>`

                            }
                        })
                            
                            modified+=  `
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">修改用户</button>
                    </form>
                </div>
            </body>
            </html>`;
            res.end(modified);
        }else if(pathname==='/remove'){
            await User.findOneAndDelete({_id:query.id});
            res.writeHead(301,{
                Location:'/list'
            });
            res.end();
        }
    }else if(method==='POST'){
        if(pathname==='/add'){
            let formData="";
            req.on('data',(param)=>{
                formData+=param
            });
            req.on('end',async()=>{
                let user=querystring.parse(formData)
                console.log(user);
               let result=await User.create(user)
               //301代表重定向，Location——》表示要跳转到的地址；注意重定向之后，一定要写上res.end()来响应前端
                res.writeHead(301,{
                    Location:'/list'
                });
                res.end();
            })

            //修改数据
        }else if(pathname==='/modified'){
            let formData2="";
            req.on('data',(param)=>{
                formData2+=param
            });
            req.on('end',async()=>{
                let user=querystring.parse(formData2)
                console.log('user',user);
               let result=await User.updateOne({_id:query.id},user);
               //301代表重定向，Location——》表示要跳转到的地址；注意重定向之后，一定要写上res.end()来响应前端
                res.writeHead(301,{
                    Location:'/list'
                });
                res.end();
            })
        }
    }
   
    
})
app.listen(3000,()=>console.log('3000端口')
);
