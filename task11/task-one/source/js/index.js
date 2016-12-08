var animateEnd = 1;
var animateEnd_ad = 1;
var story_picTimer;
var picTimer;

function nextscroll(options) {
	
	
	
	//声明对象
	var $vcon_parent = options.vcon_parent;
	var $vcon = options.vcon;
	var $story_box = options.story_box;
	var $pagebtn = options.pagebtn;
	var css_old = options.css_old;
	var css_new = options.css_new;
	var tag = options.tag;
	var flag = options.flag;

	var story_len = $story_box.length; //幻灯片个数
	var story_sWidth = $vcon_parent.width(); //每次移动的距离绝对值
	var offset = story_sWidth * -1; //每次移动的距离

	$vcon.css("width", story_sWidth * (story_len));

	$vcon.stop().animate({
		left: offset
	}, 'slow', function() {
		var firstItem = $story_box.first();
		$vcon.append(firstItem);
		$(this).css("left", "0px");
		if(flag == 1) {
			var currentIndex = $(".student-story-box ul").first().attr("data-index");
		} else if(flag == 2) {
			var currentIndex = $('.banner2-ad-container a').first().attr("data-index");
		}
		$pagebtn.eq(currentIndex).addClass(css_new).siblings().removeClass(css_new);
	})
}

$(function() {
	//关闭banner
	$('.b-close').bind('click', function() {
		$('.banner').slideUp();
	});
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
	/*banner begin*/
	$(".banner2-ad").hover(function() {
		clearInterval(picTimer);
	}, function() {
		picTimer = setInterval(function() {
			var options = {
				vcon_parent: $('.banner2-ad'),
				vcon: $(".banner2-ad-container"),
				story_box: $(".banner2-ad-container a"),
				pagebtn: $("#paging-box span"),
				css_new: 'adnewcls',
				css_old: 'oldcls',
				tag: 'span',
				flag: 2
			};
			nextscroll(options);
		}, 2000);

	}).trigger("mouseleave");

	//banner弹出上一页、下一页按钮
	$(".banner2-ad").hover(function() {
		$('.banner-arrow-left').show();
		$('.banner-arrow-right').show();
	}, function() {
		$('.banner-arrow-left').hide();
		$('.banner-arrow-right').hide();
	});
	//上一页按钮
	$("#banner-arrow-left").click(function() {
		clearInterval(picTimer);
		var vcon = $(".banner2-ad-container");
		vcon.css("width", $(".banner2-ad").width() * ($(".banner2-ad-container a").length));
		var offset = ($(".banner2-ad-container a").width() * -1);
		var lastItem = $(".banner2-ad-container a").last();
		vcon.prepend(lastItem);
		vcon.css("left", offset);
		vcon.stop().animate({
			left: "0px"
		}, "slow", function() {
			var currentIndex = $('.banner2-ad-container a').first().attr("data-index");
			$("#paging-box span").eq(currentIndex).addClass('adnewcls').siblings('span').removeClass('adnewcls');
		})
	});
	//下一页按钮
	$("#banner-arrow-right").click(function() {
		clearInterval(picTimer);
		var options = {
			vcon_parent: $('.banner2-ad'),
			vcon: $(".banner2-ad-container"),
			story_box: $(".banner2-ad-container a"),
			pagebtn: $("#paging-box span"),
			css_new: 'adnewcls',
			css_old: 'oldcls',
			tag: 'span',
			flag: 2
		};
		nextscroll(options);
	});
	//导航事件
	$("#paging-box span").click(function() {
		$(".banner2-ad-container").css("width", $(".banner2-ad").width() * ($(".banner2-ad-container a").length));
		clearInterval(picTimer);
		if(animateEnd_ad == 0) {
			return;
		}
		$(this).addClass("adnewcls").siblings().removeClass("adnewcls");
		var nextindex = $(this).index();
		var currentindex = $(".banner2-ad-container a").first().attr("data-index");

		if(nextindex == currentindex) return;

		var curr = $(".banner2-ad-container a").first().clone();

		if(nextindex > currentindex) {
			for(var i = 0; i < nextindex - currentindex; i++) {
				var firstItem = $(".banner2-ad-container a").first();
				$(".banner2-ad-container").append(firstItem)
			}
			$(".banner2-ad-container").prepend(curr);
			var offset = ($(".banner2-ad-container a").width()) * -1;
			if(animateEnd_ad == 1) {
				animateEnd_ad = 0;
				$(".banner2-ad-container").stop().animate({
					left: offset
				}, "slow", function() {
					$(".banner2-ad-container a").first().remove();
					$(".banner2-ad-container").css("left", "0px");
					animateEnd_ad = 1
				})
			}
		} else {
			var curt = $(".banner2-ad-container a").last().clone();
			for(var i = 0; i < currentindex - nextindex; i++) {
				var lastItem = $(".banner2-ad-container a").last();
				$(".banner2-ad-container").prepend(lastItem)
			}
			$(".banner2-ad-container").append(curt);
			var offset = ($(".banner2-ad-container a").width()) * -1;
			$(".banner2-ad-container").css("left", offset);
			if(animateEnd_ad == 1) {
				animateEnd_ad = 0;
				$(".banner2-ad-container").stop().animate({
					left: "0px"
				}, "slow", function() {
					$(".banner2-ad-container a").last().remove();
					animateEnd_ad = 1
				})
			}
		}
	})

	//banner结束

	//学员故事
	$(".student-story-page2 span").click(function() {
		$(".student-story-box").css("width", $(".student-story").width() * ($(".student-story-box ul").length));

		if(animateEnd == 0) {
			return
		}
		$(this).addClass("newcls").siblings().removeClass("newcls");
		var nextindex = $(this).index();

		var currentindex = $(".student-story-box ul").first().attr("data-index");
		if(nextindex == currentindex) return;
		var curr = $(".student-story-box ul").first().clone();
		if(nextindex > currentindex) {
			for(var i = 0; i < nextindex - currentindex; i++) {
				var firstItem = $(".student-story-box ul").first();
				$(".student-story-box").append(firstItem)
			}
			$(".student-story-box").prepend(curr);
			var offset = ($(".student-story-box ul").width()) * -1;

			if(animateEnd == 1) {
				animateEnd = 0;
				$(".student-story-box").stop().animate({
					left: offset
				}, "slow", function() {
					$(".student-story-box ul").first().remove();
					$(".student-story-box").css("left", "0px");
					animateEnd = 1
				})
			}
		} else {
			var curt = $(".student-story-box ul").last().clone();
			for(var i = 0; i < currentindex - nextindex; i++) {
				var lastItem = $(".student-story-box ul").last();
				$(".student-story-box").prepend(lastItem)
			}
			$(".student-story-box").append(curt);
			var offset = ($(".student-story-box ul").width()) * -1;
			$(".student-story-box").css("left", offset);
			if(animateEnd == 1) {
				animateEnd = 0;
				$(".student-story-box").stop().animate({
					left: "0px"
				}, "slow", function() {
					$(".student-story-box ul").last().remove();
					animateEnd = 1
				})
			}
		}
	});
	$(".student-story").hover(function() {
		clearInterval(story_picTimer);
	}, function() {
		story_picTimer = setInterval(function() {
			var options = {
				vcon_parent: $('.student-story'),
				vcon: $(".student-story-box"),
				story_box: $(".student-story-box ul"),
				pagebtn: $(".student-story-page2 span"),
				css_new: 'newcls',
				css_old: 'oldcls',
				tag: 'span',
				flag: 1
			};
			nextscroll(options);
		}, 2000);
	}).trigger("mouseleave")

});