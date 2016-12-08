$(function() {
	$(window).resize(function() {
		init();
	});
	init();

	function init() {
		var window_screen = screen.width;

		if(window_screen >= 768) { //屏幕分辨率大于大于768
			$("#wd").focus(function() {
				$('.input-container').addClass('intHover');
				$('.input-container').removeClass('intHover-1');
			});
			$("#wd").blur(function() {
				$('.input-container').removeClass('intHover');
			});
			$("#wd").hover(function() {
				var isFocus = $(this).is(":focus");
				if(!isFocus) {
					$('.input-container').addClass('intHover-1');
				}

			}, function() {
				var isFocus = $(this).is(":focus");
				if(!isFocus) {
					$('.input-container').removeClass('intHover-1');
				}
			});
			$("#wd").trigger('focus');

			$("#btn-baidu").hover(function() {

				$(this).addClass('btn-hover');
			}, function() {
				$(this).removeClass('btn-hover');
			});
			//弹出设置的下拉菜单
			var $bdpfmenu = $("#bdpfmenu");
			var timer = null;
			var timer1 = null;
			$('.setting,#bdpfmenu').hover(function() {
				var setting_this = $('.setting');
				clearTimeout(timer);
				var left_dis = setting_this.offset().left - ($bdpfmenu.width() - setting_this.width()) / 2;
				var top_dis = setting_this.offset().top + setting_this.height();
				$bdpfmenu.css({
					left: left_dis + 'px'
				});
				$bdpfmenu.show();
			}, function() {
				timer = setTimeout(function() {
					$bdpfmenu.hide();
				}, 100);

			});
			//弹出更多产品菜单
			$("#moreproc1,#moreproc").hover(function() {
				clearTimeout(timer1);
				$("#moreproc").show();
			}, function() {
				timer1 = setTimeout(function() {
					$("#moreproc").hide();
				}, 100);

			});

			//		var w1 = $('#baidu-info').outerWidth(true);
			//		var w2 = $('#qrcode').outerWidth(true);
			//		var w = w1 + w2;
			//		var w3 = $(window).width();
			//		var w_half = (w3 - w) / 2;
			//		$('.ftCon-Wrapper').width(w);
			//		$('.ftCon-Wrapper').css("marginLeft", w_half + 'px');
		} else { //小于768px
			//获取图片的大小
			function getImgPicWidth() {
				var $news_item = $('.news-container');
				var $img = $news_item.find('.img')
				var news_width = $(window).width();
				var container_width = news_width - 52;
				var img_width = container_width / 3; //图片的大小
				$img.width(img_width);
			}
			//导航菜单排列
			function layoutMenu() {
				var $nav = $('.nav');
				var nav_width = $nav.width();
				var $nav_item = $nav.find('.navmenu-item');
				var nav_item_width = $nav_item.eq(0).width();
				var nav_item_left = (nav_width - nav_item_width * 6) / 5;
				$nav.find('.item-mid').css({
					marginLeft: nav_item_left + 'px'
				});

			}
			//getImgPicWidth();
			//layoutMenu();
		}

	}

});
window.onerror = function() {
	return true;
}