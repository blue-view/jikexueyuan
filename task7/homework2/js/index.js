/* when document is ready */
$(function() {

	//回到顶部
	$("#returnTop .top").click(function() {
		$(window).scrollTop(0);
	});
	//弹出搜索框
	$('#search-btn').click(function() {
		$('#searchbox').addClass('showbox');
	});
	$('#close-btn').click(function() {
		$('#searchbox').removeClass('showbox');
	});
	//弹出最新，课程类型，内容类型，难度等级的子菜单
	$('.detail-list-nav>ul>li').hover(function() {
		$(this).find('a>i').css('opacity', 0);
		$(this).find('.navsubmenu').css({
			'opacity': 1,
			'display': 'block'
		});
	}, function() {
		$(this).find('a>i').css('opacity', 1);
		$(this).find('.navsubmenu').css({
			'opacity': 0,
			'display': 'none'
		});
	});
	//图文排序
	$('.order-pic-icon').click(function() {
		$('.detail-pic').show();
		$('.detail-order').hide();
		loadPic({
			className: 'pager1',
			containerID: 'itemContainer'
		});
	});
	$('.detail-pic>ul>li').hover(function() {
		$(this).find('.icon-overflow').fadeTo('fast', 1);
		$(this).find('.icon-player').fadeTo('fast', 1);
		$(this).find('.info2').slideDown('fast');
	}, function() {
		$(this).find('.icon-overflow').fadeTo('fast', 0);
		$(this).find('.icon-player').fadeTo('fast', 0);
		$(this).find('.info2').slideUp('fast');
	});
	//列表排序
	$('.order-list-icon').click(function() {
		$('.detail-pic').hide();
		$('.detail-order').show();
		loadPic({
			className: 'pager1',
			containerID: 'itemContainer2',
			perPage: 25
		});
	});
	//分类导航
	$('.course-nav>dd').each(function(index, item) {
		$(this).hover(function() {
			var $content = $('.content>nav');
			var $menu_list = $(this).find('.menu-list');
			var nav_width = $content.width();
			var nav_height = $(this).height() + 1;
			var top = -(nav_height * (index) + $('#courselib').height() + 1);
			$menu_list.css({
				'top': top + 'px',
				'left': (nav_width - 2) + 'px',
				'display': 'block'
			});
			$(this).find('a').addClass('ahover');
		}, function() {
			$(this).find('.menu-list').hide();
			$(this).find('a').removeClass('ahover');
		});
	});
	loadInfo();
	loadPic({
		className: 'pager1',
		containerID: 'itemContainer'
	});
});
/**
 * 
 * @param {Object} options
 */

function loadPic(options) {
	var perPage = options.perPage || 24;
	var startPage = options.startPage || 1;
	var startRange = options.startRange || 1;
	var midRange = options.midRange || 5;
	var endRange = options.endRange || 0;
	var containerID = options.containerID || '';
	var className = options.className || '';
	var loadingID = options.loadingID || 'loading';

	$("." + className).jPages({
		containerID: containerID,
		first: '首页',
		last: '末页',
		previous: '上一页',
		next: '下一页',
		perPage: perPage,
		startPage: startPage,
		startRange: startRange,
		midRange: midRange,
		endRange: endRange,
		keyBrowse: true,
		callback: function(pages, items) {
			$(".page-total").html("共&nbsp;" + pages.count + '&nbsp;页');
			$('#idcurrent').val(pages.current);
		}
	});
	//挑战页面
	$('#btnOK').on('click', function() {
		var currentNumber = parseInt($('#idcurrent').val());
		$("#" + loadingID).show();
		$("#" + containerID).hide();
		setTimeout(function() {
			$("." + className).jPages(currentNumber);
			$("#" + loadingID).hide();
			$("#" + containerID).show();
		}, 1500);

	});

}

function loadInfo() {
	setTimeout(function() {
			$('.loading-2').hide(0, function() {
				$('#itemContainer').show();
			});
		}, 1500)
		//跳转到某一页  
}