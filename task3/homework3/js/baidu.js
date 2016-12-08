$(function() {

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


		var w1 = $('#baidu-info').outerWidth(true);
		var w2 = $('#qrcode').outerWidth(true);
		var w = w1 + w2;
		var w3 = $(window).width();
		var w_half = (w3 - w) / 2;
		$('.ftCon-Wrapper').width(w);
		$('.ftCon-Wrapper').css("marginLeft", w_half + 'px');

});