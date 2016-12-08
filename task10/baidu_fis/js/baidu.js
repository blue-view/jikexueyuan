$(function () {

	var bgImage = localStorage.getItem('bgImage');
	var myskin = localStorage.getItem('myskin', 'css/myskin.css');
	var bdlogo = localStorage.getItem('bdlogo', 'img/logo_white_fe6da1ec.png');
	if (bgImage) {
		$('.b-skin-container').css({
			'backgroundImage': 'url(img/skin/' + bgImage + '.jpg)'
		});
	}
	if (myskin) {
		$('#myskin').attr('href', myskin);
	}
	if (bdlogo) {
		$('#skin-bdlogo').attr('src', bdlogo);
	}

	$("#wd").focus(function () {
		$('.input-container').addClass('intHover');
		$('.input-container').removeClass('intHover-1');
	});
	$("#wd").blur(function () {
		$('.input-container').removeClass('intHover');
	});
	$("#wd").hover(function () {
		var isFocus = $(this).is(":focus");
		if (!isFocus) {
			$('.input-container').addClass('intHover-1');
		}

	}, function () {
		var isFocus = $(this).is(":focus");
		if (!isFocus) {
			$('.input-container').removeClass('intHover-1');
		}
	});
	$("#wd").trigger('focus');

	$("#btn-baidu").hover(function () {

		$(this).addClass('btn-hover');
	}, function () {
		$(this).removeClass('btn-hover');
	});
	//弹出设置的下拉菜单
	var $bdpfmenu = $("#bdpfmenu");
	var $myinfo = $('#myinfo');
	var timer1 = null;
	$bdpfmenu.attr('timer', null);
	$myinfo.attr('timer', null);
	//弹出设置菜单	
	$('.setting,#bdpfmenu').hover(function () {
		var setting_this = $('.setting');
		clearTimeout($bdpfmenu.attr('timer'));
		var left_dis = setting_this.offset().left - ($bdpfmenu.width() - setting_this.width()) / 2;
		var top_dis = setting_this.offset().top + setting_this.height();
		$bdpfmenu.css({
			left: left_dis + 'px'
		});
		$bdpfmenu.show();
	}, function () {
		var timer1 = setTimeout(function () {
			$bdpfmenu.hide();
		}, 100);
		$bdpfmenu.attr('timer', timer1);
	});
	//弹出个人信息菜单
	$('#mylogin,#myinfo').hover(function () {
		var login_this = $(this);
		clearTimeout($myinfo.attr('timer'));
		var left_dis = login_this.offset().left - ($myinfo.width() - login_this.width()) / 2;
		var top_dis = login_this.offset().top + login_this.height();
		$myinfo.css({
			left: left_dis + 'px'
		});
		$myinfo.show();
	}, function () {
		var timer2 = setTimeout(function () {
			$myinfo.hide();
		}, 100);
		$myinfo.attr('timer', timer2);
	});

	//弹出更多产品菜单
	$("#moreproc1,#moreproc").hover(function () {
		clearTimeout(timer1);
		$("#moreproc").show();
	}, function () {
		timer1 = setTimeout(function () {
			$("#moreproc").hide();
		}, 100);

	});

	//tab
	$('.news-content>div:gt(0)').hide();
	$('.news-tab>a').each(function (index, items) {
		$(this).click(function () {
			if (index == 0) {
				$('.myfoucs').find('.headpic').addClass('pos');
			} else {
				$('.myfoucs').find('.headpic').removeClass('pos');
			}
			$(this).addClass('selected').siblings('a').removeClass('selected');
			$('.news-content>div').eq(index).show().siblings('div').hide();
		});
	});
	$('.sport-title>span:gt(0)').hide();
	//弹出皮肤选择框
	$('#changeskin').click(function (e) {
		$('#skinContainer').slideDown();
		e.stopPropagation();
	});
	$('#skin-settings-text').click(function (e) {
		$('#skinContainer').slideUp();
		e.stopPropagation();
	});
	$(document).click(function () {
		$('#skinContainer').slideUp();
	});
	$('#skinContainer').click(function (e) {
		e.stopPropagation();
	});
	//显示预览图片
	$('.skinContainer-c-l>ul>li span').hover(function () {
		$(this).find('i').css({
			'opacity': .5,
			'display': 'block'
		});
		$(this).find('p').show();
		var preImg = $(this).find('img').attr('src');
		$('#prevImg').attr('src', preImg);
		$('#prevImg').show();
	}, function () {
		$(this).find('i').css({
			'opacity': .5,
			'display': 'none'
		});
		$(this).find('p').hide();

		var $myright = $('.skinContainer-c-l>ul>li .myright:visible');
		if ($myright.length == 0) {
			$('#prevImg').hide();
		}
	});
	$('.skinContainer-c-l>ul:gt(0)').hide();
	$('.skinContainer-c-l>ul>li span').click(function () {
		var index = $(this).attr('data-index');
		$('.b-skin-container').css({
			'backgroundImage': 'url(img/skin/' + index + '.jpg)'
		});
		$('#myskin').attr('href', 'css/myskin.css');
		$('#skin-bdlogo').attr('src', 'img/logo_white_fe6da1ec.png');
		var $myright = $('.skinContainer-c-l>ul>li .myright');
		$myright.not(this).hide();
		$(this).find('.myright').show();

		//换成皮肤
		localStorage.setItem('bgImage', index);
		localStorage.setItem('myskin', 'css/myskin.css');
		localStorage.setItem('bdlogo', 'img/logo_white_fe6da1ec.png');
	});

	$('.skinContainer-n>ul>li').each(function (index, item) {
		$(this).click(function () {
			$(this).addClass('selectSkin').siblings('li').removeClass('selectSkin');
			$('.skinContainer-c-l>ul').eq(index).show().siblings('ul').hide();
		});
	});
	$('.pageTopC').hover(function () {
		$('.top-text').show();
		$('.top-pic').hide();
	}, function () {
		$('.top-text').hide();
		$('.top-pic').show();
	});

	$('.top-text').click(function () {
		$(window).scrollTop(0);
	});

	$(window).scroll(function () {
		if ($(window).scrollTop() > 100) {
			$('.pageTop').show();
		} else {
			$('.pageTop').hide();

		}
	});

});