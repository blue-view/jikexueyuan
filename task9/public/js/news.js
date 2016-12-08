$(document).ready(function() {
	//获取浏览器的宽度
	var deviceWidth = $('body').width();
	//设置导航项的宽度
	$('nav li').each(function(index, item) {
		if($(this).find('a').html().split('').length > 2) {
			$(this).width(deviceWidth / 3);
		} else {
			$(this).width(deviceWidth / 6);
		}
	});
	//默认加载精选类型新闻
	refreshNews('1');
	//为导航项绑定加载相关类型的新闻列表
	$('nav ul li a[data-newstype]').click(function() {
		//添加选中样式
		$(this).find('span').addClass('selected').parents('li').siblings('li').find('.selected').removeClass('selected').end();
		//加载数据
		var newstype = $(this).attr('data-newstype');
		refreshNews(newstype);
	});
});
/*
 * 刷新新闻信息
 */
function refreshNews(newstype) {
	var $lists = $('article ul');
	$lists.empty();

	$.ajax({
		url: '/server/getNews',
		type: 'post',
		datatype: 'json',
		data: {
			newstype: newstype
		},
		success: function(data) {
			console.log(data);
			//遍历返回的json数据，并展现到页面上防止xss攻击
			if(data.length > 0) {
				data.forEach(function(item, index, array) {
					var $list = $('<li></li>').addClass('news-list').appendTo($lists);
					var $newsImg = $('<div></div>').addClass('newsimg').appendTo($list);
					var $img = $('<img>').width($newsImg.width() / 3).attr('src', '../' + filterXSS(item.newsimg)).appendTo($newsImg);
					var $newsContent = $('<div></div>').addClass('newscontent').appendTo($list);
					var $h1 = $('<h1></h1>').html(filterXSS(item.newstitle)).appendTo($newsContent);
					var $p = $('<p></p>').appendTo($newsContent);
					var $newsrc = $('<span></span>').addClass('newssrc').html(filterXSS(item.newssrc)).appendTo($p);
					var $newstime = $('<span></span>').addClass('newstime').html(moment(item.newstime).format('YYYY-MM-DD hh:mm:ss')).appendTo($p);
				});
			}

		}
	});

}