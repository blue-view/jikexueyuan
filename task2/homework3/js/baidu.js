$(function() {

	$("#wd").focus(function() {
		$('.input-container').addClass('intHover');
	});
	$("#wd").blur(function() {
		$('.input-container').removeClass('intHover');
	});
	$("#wd").trigger('focus');
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

});