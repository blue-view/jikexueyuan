var express = require('express');
var router = express.Router();
var orm = require("orm");
var dbHelper = require('../dbHelper.js');
var helper = new dbHelper();
var mysqlStr = helper.mysqlStr;
/* GET home page. */
router.get('/index', function(req, res, next) {
	res.render('front_index.ejs', {
		title: '百度新闻'
	});
});
/*获取前台页面的某个类型的所有新闻*/
router.post('/server/getNews/', function(req, res, next) {
	var newstype = req.body.newstype;
	orm.express(mysqlStr, {
		define: function(db, models, next) {
			models.news = db.define("news", {
				id: {
					type: 'serial',
					key: true
				},
				newstype: String,
				newstitle: String,
				newsimg: String,
				newstime: Date,
				newssrc: String
			});
			models
			models.news.find({
				newstype: newstype
			}).orderRaw('id desc').all(function(err, news) {
				if(err) {
					console.log(err);
				} else {
					res.header("Content-Type", "application/json; charset=utf-8");
					res.json(news);
				}
			});
		}
	})
});
module.exports = router;