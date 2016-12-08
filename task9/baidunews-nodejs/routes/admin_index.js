var express = require('express');
var router = express.Router();
var orm = require("orm");
var dbHelper = require('../dbHelper.js');
var helper = new dbHelper();
var mysqlStr = helper.mysqlStr;
var underscore_s = require("underscore.string");

/* GET users listing. */
router.get('/admin', function(req, res, next) {
	res.render('front_index.ejs', {
		title: '百度新闻管理'
	});
});

/*后台相关接口 begin*/
/*获取所有新闻信息并按id字段降序排序*/
router.post('/server/ad_getNews/', function(req, res) {
	orm.express(mysqlStr, {
		define: function(db, models, next) {
			models.news = db.define("news", {
				id: {
					type: 'serial',
					key: true
				},
				newstype: Number,
				newstitle: String,
				newsimg: String,
				newstime: Date,
				newssrc: String
			});

			models.news.find({}).orderRaw('id desc').all(function(err, news) {
				if(err) {
					console.log(err);
				} else {
					res.header("Content-Type", "application/json; charset=utf-8");
					res.status(200);
					res.json(news);
				}
			});
		}
	})
});
//根据新闻id获取新闻信息
router.post('/server/query/', function(req, res) {
	var newsid = req.body.newsid;
	orm.express(mysqlStr, {
		define: function(db, models, next) {
			models.news = db.define("news", {
				id: {
					type: 'serial',
					key: true
				},
				newstype: Number,
				newstitle: String,
				newsimg: String,
				newstime: Date,
				newssrc: String
			});
			models.news.find({
				id: newsid
			}, function(err, news) {
				if(err) {
					console.log(err);
				} else {
					res.header("Content-Type", "application/json; charset=utf-8");
					res.status(200);
					res.json(news);
				}
			});
		}
	})
});
//根据新闻id删除新闻信息
router.post('/server/delete/', function(req, res) {
	var newsid = req.body.newsid;
	orm.express(mysqlStr, {
		define: function(db, models, next) {
			models.news = db.define("news", {
				id: {
					type: 'serial',
					key: true
				},
				newstype: Number,
				newstitle: String,
				newsimg: String,
				newstime: Date,
				newssrc: String
			});
			models.news.find({
				id: newsid
			}).remove(function(err) {
				if(err) {
					console.log(err);
				} else {
					res.status(200);
					res.json({
						result: 'ok'
					});
				}
			});
		}
	})
});

//新增一条新闻信息
router.post('/server/insert/', function(req, res) {

	//转义特殊字符
	var newstitle = underscore_s.escapeHTML(req.body.newstitle);
	var newstype = underscore_s.escapeHTML(req.body.newstype);
	var newsimg = underscore_s.escapeHTML(req.body.newsimg);
	var newstime = underscore_s.escapeHTML(req.body.newstime);
	var newssrc = underscore_s.escapeHTML(req.body.newssrc);

	orm.express(mysqlStr, {
		define: function(db, models, next) {
			models.news = db.define("news", {
				id: {
					type: 'serial',
					key: true
				},
				newstype: Number,
				newstitle: String,
				newsimg: String,
				newstime: Date,
				newssrc: String
			});
			//新增前判断改信息是否已经添加避免重复添加
			models.news.exists({
				newstitle: newstitle
			}, function(err, exists) {
				if(err) {
					console.log(err);
				} else {
					if(!exists) { //不存在添加一条新的数据
						models.news.create([{
							newstype: newstype,
							newstitle: newstitle,
							newsimg: newsimg,
							newstime: newstime,
							newssrc: newssrc
						}], function(err, items) {
							if(err) {
								console.log(err);
							} else {
								res.status(200);
								res.json({
									result: 'ok'
								});
							}
						});
					}
					//console.log("We %s Does in our db", exists ? "have" : "don't have");
				}

			});

		}
	})
});
//更新一条新闻
router.post('/server/update/', function(req, res) {

	var newstitle = req.body.newstitle;
	var newstype = req.body.newstype;
	var newsimg = req.body.newsimg;
	var newstime = req.body.newstime;
	var newssrc = req.body.newssrc;
	var newsid = req.body.newsid;

	orm.express(mysqlStr, {
		define: function(db, models, next) {
			models.news = db.define("news", {
				id: {
					type: 'serial',
					key: true
				},
				newstype: Number,
				newstitle: String,
				newsimg: String,
				newstime: Date,
				newssrc: String
			});

			models.news.get(newsid, function(err, news) {
				//反转义特殊字符
				news.newstitle = underscore_s.unescapeHTML(newstitle);
				news.newstype = underscore_s.unescapeHTML(newstype);
				news.newsimg = underscore_s.unescapeHTML(newsimg);
				news.newstime = underscore_s.unescapeHTML(newstime);
				news.newssrc = underscore_s.unescapeHTML(newssrc);

				news.save(function(err) {
					res.status(200);
					res.json({
						result: 'ok'
					});
				});
			});
		}
	})
});
//获取新闻类型
router.post('/server/getNewsTypeList/', function(req, res) {
	orm.express(mysqlStr, {
		define: function(db, models, next) {
			models.newstype = db.define("newstype", {
				id: Number,
				name: String
			});

			models.newstype.find({}).orderRaw('id asc').all(function(err, newstype) {
				if(err) {
					console.log(err);
				} else {
					res.header("Content-Type", "application/json; charset=utf-8");
					res.status(200);
					res.json(newstype);
				}
			});
		}
	})
});
/*后台台相关接口 end*/
module.exports = router;