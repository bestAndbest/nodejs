const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/learn', { useNewUrlParser: true, useUnifiedTopology: true  })
.then(res=>console.log('连接成功'))
.catch(err=>console.log('连接失败'))
;
