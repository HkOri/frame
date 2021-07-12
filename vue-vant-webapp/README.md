# create by hk at 2021-01-04

# 创建项目  vue create vue-vant-webapp
# 创建项目过程中，默认选择vue2版本，即直接回车
# 创建完成之后，删除隐藏文件夹.git(暂时不需要git)

# 安装router依赖包  npm install vue-router -S

# 安装sass、sass-loader依赖包   
# npm install sass -D
# npm install sass-loader -D

# 安装状态管理依赖包vuex
# npm install vuex -S

# 安装axios 
# npm install axios -S

# -D和-S，前者安装的包将记录在package.json文件中的"devDependencies"中，后者安装的包将记录在package.json文件中的"devpendencies"中，在使用时，-S安装的包需要在文件内导入，-D不需要

# 创建views文件夹，用于存放页面中使用到的组件

# 创建utils文件夹，用于存放一些工具函数

# 在views下创建模块文件夹以及模块文件，比如创建home文件夹以及home.vue

# 创建router路由文件夹，index.js文件，懒加载路由，配置路由信息

# 创建store文件夹，创建modules文件夹以及index.js文件，配置状态管理，状态管理要调用接口，所以再创建api接口文件并简单封装axios

# 在api文件夹下创建fetch.js，简单封装axios

# 简单封装axios之后，再在modules文件夹下简单创建一个home.js用作小module，然后将其配置到index中(借用了vue-element-admin的导入方式)

# 简单处理状态管理vuex和路由store之后，在main.js中引入并挂载

# 在package.json文件的"scripts"中添加一条指令npm start

# 创建vue.config.js文件，修改程序端口(ps：axios解决跨域问题也是在这里)

# npm start启动项目

# 安装vant依赖包
# npm i vant -S
# 安装vant推荐的引入组件的方式
# npm i babel-plugin-import -D
# 将官方文档中关于babel.config.js文件的配置追加到babel.config.js文件中

## 调用接口
    1. 在vue.config.js添加代理服务以解决跨域问题(注意：配置里面设置的端口号要和axios里面baseURL的端口一样)
    2. 创建api.js文件，引入封装好的axios，然后创建调用接口的各种方法
    3. 在需要调用接口的组件内引入，然后再created()中调用api.js中封装的调用接口的方法
    ps:
        axios调用接口
            1. GET请求，入参需要使用params属性
            2. POST请求，入参使用data属性
        axios调接口的三个永恒问题：
            1. url是什么？
            2. 请求方式是什么？
            3. 入参有哪些？参数的要求如何？类型、是否必需等等
        如何确定一个接口，要不要走Vuex？
            1. 如果要，则该接口返回的数据需要跨组件共享
            2. 如果要，则该接口返回的数据会做缓存处理
    4. 接口文档：
        [baseUrl] = http://10.36.149.14:9999
        1、获取商品列表
        [GET] /api/v1/jd/good/list
        [入参]  size=10, page=1, cate='', hot=false 都是非必填

        2、获取商品详情
        [GET] /api/v1/jd/good/detail
        [入参] id 必填

        3、用户注册接口
        [POST] /api/v1/user/regist
        [入参] username, password, password2 都是必填

        4、用户登录接口
        [POST] /api/v1/user/login
        [入参] username, password 都是必填

        5、添加到购物车
        [POST] /api/v1/jd/cart/add
        [入参] num 非必填(默认是1), good_id 必填

        6、获取购物车商品列表
        [GET] /api/v1/jd/cart/list
        [入参] 没有入参

        7、删除购物车中的一条商品
        [GET] /api/v1/jd/cart/del
        [入参] id 是购物车列表中一条下单记录的 _id

        8、改变购物车中商品的数量
        [POST] /api/v1/jd/cart/update
        [入参]  id  num必填

        9、提交购物车
        [POST] /api/v1/jd/cart/submit
        [入参] goods 必填，是购物车行记录的多个 _id 由 ; 连接而成的字符串

        10、获取所有品类
        [GET]  /api/v1/jd/cates
        [入参]  无
    
    5. 注意：请求拦截器中配置的token!!!

# 创建styles文件用于存放样式

# 引入设置html大小的js文件

## 首页Home.vue
    1. 实现头部广告，利用自定义指令辅助实现点击关闭广告
    2. 实现顶部背景，实现过程中css样式有一个注意事项：overflow-x: hidden失效，原因：对于设置绝对定位的元素，单纯给父元素设置hidden是无效的，必须给父元素也添加定位，相对绝对都可以
    3. 实现搜索框
    4. 借用vant库实现图片轮播
        1. 通过import { Swipe, SwipeItem } from 'vant';导入
        2. 在data中定义一个关于图片路径的数据
        3. 注意vant库实现轮播是div而不是img，所以直接在van-swipe-item上添加src是无效的，在里面手动添加一个img标签
        4. 使用v-lazy实现轮播的懒加载，注意：Lazyload导入之后，还需要用Vue.use手动注册才能使用
        5. 通过indicator-coloe修改当前轮播图对应的指示器的背景颜色
        6. 使用require加载图片路径
    5. 使用vant库提供的Grid宫格和swipe轮播配合实现轮播图下方的导航栏icon排列
        1. 通过通过import { Grid, GridItem } from 'vant';导入
        2. 在data中定义图片路径数据，使用require导入
        3. 在<van-swipe-item>(一页轮播)中书写宫格，采用文档提供的自定义内容格式，注意修改:column-num的值为5
        4. 注意事项：在宫格中使用了vant库的img，所以还需要通过import{ Image as VanImage }的方式将Image图标导入
        5. 修改样式
        6. 自定义指示器样式，同时通过轮播的change事件实现指示器高亮
        7. 自定义指示器样式时的问题：指示器盒子和两个span(指示器)的高度相同，但是指示器不在盒子里面而是在盒子下面，原因：将span设置为inline-block之后因为行内块自带空格，所以指示器盒子在高度上装不下span，需要先去掉行内块的自定义样式
    6. 实现下拉刷新和自动加载功能
        导入下拉刷新PullRefresh、Toast轻提示、List列表
            import { PullRefresh, Toast, List } from 'vant'
    7. 用van-pull-refresh将所有内容包裹起来(除了底部tab栏)
        isLoading: 表示当前下拉刷新是否正在进行
    8. 用List列表实现首页商品信息预览
        loading-text: 表示加载中的文本提示
        finished-text: 数据全部加载完毕之后的文本提示
        Loading: 表示数据是否正在加载
        finished: 表示数据是否全部加载完毕
    9. 补充一些内容
    10. 配置点击进入详情页的路由
    11. 使用<keep-alive></keep-alive>保持首页活性
    注意：
        1. 在修改vant库样式时，有时不生效，对于scss可以在选择器前面添加::v-deep
        2. 因为首页保持活性，所以回退回首页不要使用this.$route.push('/home')，应该使用this.$route.back()和this.$route.go(-1)

        
## 封装过滤器
    1. 创建filters文件夹
    2. 创建过滤器方法
    3. 在main.js中导入，然后通过如下代码创建全局过滤器
        for (let key in filters) {
            Vue.filter(key, filters[key]);
        }
## 封装公共组件
    1. components文件夹下创建commonTabbar.vue(底部tab栏)

## 封装工具函数
    1. utils文件夹下创建操作cookie的js文件

## 详情页details.vue
    1. 引用vant库的GoodsAction商品导航
    2. 改写底部样式
    ps：flex子项目的高宽并一定能直接修改

## 发现页find.vue
    1. 导入所需的vant组件：Sidebar、SidevarItem、Grid、GridItem、NavBar
    2、导入底部tab栏
    3、由于数据复杂而且需要缓存，所以使用Vuex状态管理
    4、封装store
        1) find.js为store独立出来的小modules
    5、通过mapState等将find.js中的方法导入
    6、实现页面


## 购物车页cart.vue
    1. 导入所需组件
    2、实现页面
    3、实现业务逻辑
    4、BUG：通过计算属性和侦听器来实现price(支付金额)的改变都不行，现通过方法调用已实现改变；另外在最初通过计算属性实现逻辑的方法中，遍历商品列表当判定checked属性成功时输出，bug->在输出商品结果中checked为false，但是判定却成功了，详情可以看注释

## 个人中心页user.vue
    1. 导入工具函数cookie中方法delCookie以实现退出登录功能
    2. 简单设计页面结构并实现

## 登录页login.vue
    1. 导入所需组件和工具函数文件cookie中的方法setCookie以存储登录成功后后端返回的关于当前用户的token
    2. 实现页面以及业务逻辑

## 注册页register.vue
    1. 同登录页

### 实现底部tab栏目
1. 在components文件夹中创建commonTabbar.vue文件，使用vant库的Tabbar标签栏
2. 使用自定义图标模式，在data中创建关于icon图标激活和未激活状态下的路径以及路由地址

## 配置路由守卫
    1. router.beforeEach ---> 此时路由刚从原始地址出发