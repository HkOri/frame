# 全局安装express   npm i express-generator -g

# 用express创建一个项目 express --view=ejs 项目名   (ejs为项目采用的模板引擎)

# cd 进入项目

# npm i安装初始依赖包

# 将package.json中"scripts"选项下"start"中node启动改为nodemon(如此可以不必每次更改代码之后重启项目)

# 安装mongoose

# 创建model文件夹用以存放相关数据库数据操作

# 创建connet.js数据库连接文件

# 在app.js中通过require导入数据库连接文件


**==注意事项==**
    ++mongoose在创建model时，对集合命名Collection做了处理(mongoose/lib/util.js模块中)，对于第一个参数，也就是对应于数据库中集合名的参数，不管该单词是否为复数形式，最后去操作集合(表)时都会去找对应于这个名字的复数名称的集合++

# 重置密码时所用的邮箱服务已暂停，查看users.js和customers.js中的相关代码配置一下即可

# paymoney.js是支付接口，但前台并没有使用，还存在BUG：支付二维码有时一直刷新，有时支付成功不跳转回原来页面