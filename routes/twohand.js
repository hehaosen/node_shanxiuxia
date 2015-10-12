var express = require('express');
var router = express.Router();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
MongoStore.connect('mongodb://127.0.0.1:27017/hubwiz'); //连接数据库
MongoStore.connection.on('open', function () {
    console.log('-----------数据库连接成功！------------');
});
var app = express();



app.use(session({
    secret: config.cookieSecret, //secret的值建议使用128个随机字符串
    cookie: {maxAge: 60 * 1000 * 60 * 24 * 14}, //过期时间
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection //使用已有的数据库连接
    })
}));
/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session.name = '我是一个小塔姆';
        res.send('welecome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');

});


app.listen(80);
module.exports = router;
