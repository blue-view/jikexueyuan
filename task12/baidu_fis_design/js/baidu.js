/**
 * 使用单例设计模式
 * 好处：
 * 1.可以用来进行模块间通信
 * 2.系统中某个类的对象只能存在一个
 * 3.保护字符的属性和方法
 */
var baidu = {
	/*
	 * 初始化
	 */
	init: function() {
		this.render();
		this.bind();
	},
	/**
	 * 渲染
	 */
	render: function() {
		var that = this;
		//显示网站缓存皮肤
		that.bgImage = localStorage.getItem('bgImage');
		that.bSkinContainer = $('.b-skin-container');

		that.myskincache = localStorage.getItem('myskin', 'css/myskin.css');
		that.myskin = $('#myskin');

		that.bdlogo = localStorage.getItem('bdlogo', 'img/logo_white_fe6da1ec.png');
		that.skinbdlogo = $('#skin-bdlogo');

		//搜索输入框
		that.inputSearcBtn = $('#wd');
		that.inputContainer = $('.input-container');

		//搜索按钮
		that.btnBaidu = $("#btn-baidu");

		//弹出设置的下拉菜单
		that.settingMenus = new Array();
		that.settingMenus.push($("#bdpfmenu"));
		that.settingMenus.push($('.setting'));
		that.settingMenus[1].attr('timer', null);

		//弹出个人信息
		that.loginMenus = new Array();
		that.loginMenus.push($('#mylogin'), $('#myinfo'));
		that.loginMenus[1].attr('timer', null);

		//更多产品
		that.productMenus = new Array();
		that.productMenus.push($('#moreproc1'), $('#moreproc'));
		that.productMenus[1].attr('timer', null);

		//新闻选项卡
		that.newsTab = $('.news-tab>a');
		that.newsContent = $('.news-content>div');
		that.newsContentFirst = that.newsContent.filter(':gt(0)');
		that.sportTitle = $('.sport-title>span');
		that.sportTitleFirst = that.sportTitle.filter(':gt(0)');
		that.myfoucs = $('.myfoucs');

		//弹出皮肤选择框
		that.changeskin = $('#changeskin');
		that.skinSettingsText = $('#skin-settings-text');
		that.skinContainer = $('#skinContainer');

		//显示预览图片
		that.skinContainerC = $('.skinContainer-c-l>ul');
		that.skinContainerSpan = that.skinContainerC.find('span');
		that.prevImg = $('#prevImg');
		that.skinContainerRightShow = that.skinContainerC.children('li').find('.myright:visible');
		that.skinContainerSpanFirst = that.skinContainerC.filter(":gt(0)");
		that.skinContainerRight = that.skinContainerC.children('li').find('.myright');
		that.skinContainerNUl = $('.skinContainer-n>ul>li');

		//回到顶部
		that.pageTopC = $('.pageTopC');
		that.topText = $('.top-text');
		that.topPic = $('.top-pic');
		that.pageTop = $('.pageTop');
	},
	/**
	 * 绑定
	 */
	bind: function() {
		var that = this;
		//显示网站缓存皮肤
		if(that.bgImage) {
			that.bSkinContainer.css({
				'backgroundImage': 'url(img/skin/' + that.bgImage + '.jpg)'
			});
		}
		if(that.myskincache) {
			that.myskin.attr('href', that.myskincache);
		}
		if(that.bdlogo) {
			that.skinbdlogo.attr('src', that.bdlogo);
		}

		//绑定搜索输入框相关事件
		that.inputSearcBtn.focus(function() {
			that.inputContainer.addClass('intHover');
			that.inputContainer.removeClass('intHover-1');
		});
		that.inputSearcBtn.blur(function() {
			that.inputContainer.removeClass('intHover');
		});
		that.inputSearcBtn.hover(function() {
			var isFocus = $(this).is(":focus");
			if(!isFocus) {
				that.inputContainer.addClass('intHover-1');
			}

		}, function() {
			var isFocus = $(this).is(":focus");
			if(!isFocus) {
				that.inputContainer.removeClass('intHover-1');
			}
		});
		that.inputSearcBtn.trigger('focus');

		//綁定搜索按钮事件
		that.btnBaidu.hover(function() {
			$(this).addClass('btn-hover');
		}, function() {
			$(this).removeClass('btn-hover');
		});

		//弹出设置菜单	
		for(var t in that.settingMenus) {
			that.settingMenus[t].hover(function() {
				var setting_this = that.settingMenus[1];
				var $bdpfmenu = that.settingMenus[0];

				clearTimeout($bdpfmenu.attr('timer'));
				var left_dis = setting_this.offset().left - ($bdpfmenu.width() - setting_this.width()) / 2;
				var top_dis = setting_this.offset().top + setting_this.height();
				$bdpfmenu.css({
					left: left_dis + 'px'
				});
				$bdpfmenu.show();
			}, function() {
				var $bdpfmenu = that.settingMenus[0];
				var timer1 = setTimeout(function() {
					$bdpfmenu.hide();
				}, 100);
				$bdpfmenu.attr('timer', timer1);
			});
		}
		//弹出个人信息菜单
		for(var m in that.loginMenus) {
			that.loginMenus[m].hover(function() {
				var login_this = $(this);
				var $myinfo = that.loginMenus[1];

				clearTimeout($myinfo.attr('timer'));
				var left_dis = login_this.offset().left - ($myinfo.width() - login_this.width()) / 2;
				var top_dis = login_this.offset().top + login_this.height();
				$myinfo.css({
					left: left_dis + 'px'
				});
				$myinfo.show();
			}, function() {
				var $myinfo = that.loginMenus[1];
				var timer2 = setTimeout(function() {
					$myinfo.hide();
				}, 100);
				$myinfo.attr('timer', timer2);
			});
		}

		//弹出更多产品菜单
		for(var n in that.productMenus) {
			that.productMenus[n].hover(function() {
				clearTimeout(that.productMenus[1].attr('timer'));
				that.productMenus[1].show();
			}, function() {
				var timer1 = setTimeout(function() {
					that.productMenus[1].hide();
				}, 100);
				that.productMenus[1].attr('timer', timer1);
			});
		}
		//选项卡切换
		that.sportTitleFirst.hide();
		that.newsContentFirst.hide();

		that.newsTab.each(function(index, items) {
			$(this).click(function() {
				if(index == 0) {
					that.myfoucs.find('.headpic').addClass('pos');
				} else {
					that.myfoucs.find('.headpic').removeClass('pos');
				}
				$(this).addClass('selected').siblings('a').removeClass('selected');
				that.newsContent.eq(index).show().siblings('div').hide();
			});
		});

		//弹出皮肤选择框
		that.changeskin.click(function(e) {
			that.skinContainer.slideDown();
			e.stopPropagation();
		});
		that.skinSettingsText.click(function(e) {
			that.skinContainer.slideUp();
			e.stopPropagation();
		});
		$(document).click(function() {
			that.skinContainer.slideUp();
		});
		that.skinContainer.click(function(e) {
			e.stopPropagation();
		});

		//显示预览图片
		that.skinContainerSpan.hover(function() {
			$(this).find('i').css({
				'opacity': .5,
				'display': 'block'
			});
			$(this).find('p').show();
			var preImg = $(this).find('img').attr('src');
			that.prevImg.attr('src', preImg);
			that.prevImg.show();
		}, function() {
			$(this).find('i').css({
				'opacity': .5,
				'display': 'none'
			});
			$(this).find('p').hide();

			if(that.skinContainerRight.length == 0) {
				that.prevImg.hide();
			}
		});
		that.skinContainerSpanFirst.hide();
		that.skinContainerSpan.click(function() {
			var index = $(this).attr('data-index');
			that.bSkinContainer.css({
				'backgroundImage': 'url(img/skin/' + index + '.jpg)'
			});
			that.myskin.attr('href', 'css/myskin.css');
			that.skinbdlogo.attr('src', 'img/logo_white_fe6da1ec.png');
			that.skinContainerRight.not(this).hide();
			$(this).find('.myright').show();

			//存储网站皮肤
			localStorage.setItem('bgImage', index);
			localStorage.setItem('myskin', 'css/myskin.css');
			localStorage.setItem('bdlogo', 'img/logo_white_fe6da1ec.png');
		});

		that.skinContainerNUl.each(function(index, item) {
			$(this).click(function() {
				$(this).addClass('selectSkin').siblings('li').removeClass('selectSkin');
				$('.skinContainer-c-l>ul').eq(index).show().siblings('ul').hide();
			});
		});
		//回到顶部
		that.pageTopC.hover(function() {
			that.topText.show();
			that.topPic.hide();
		}, function() {
			that.topText.hide();
			that.topPic.show();
		});

		that.topText.click(function() {
			$(window).scrollTop(0);
		});

		$(window).scroll(function() {
			if($(window).scrollTop() > 100) {
				that.pageTop.show();
			} else {
				that.pageTop.hide();

			}
		});
	}
};

$(function() {
	//初始化信息
	baidu.init();
});