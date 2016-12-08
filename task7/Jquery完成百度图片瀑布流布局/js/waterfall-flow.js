$(document).ready(function() {
	$(window).on('load', function() {
		//调用实现瀑布流的方法
		imgLocation();
		var dataImg = {
			'data': [{
				'src': '1.jpg'
			}, {
				'src': '2.jpg'
			}, {
				'src': '3.jpg'
			}, {
				'src': '4.jpg'
			}, {
				'src': '5.jpg'
			}
			]
		};
		//窗口滚动事件
		$(window).scroll(function() {
			windowScroll();
		});
	});
});
/**
 * 窗口滚动事件
 */
function windowScroll() {
	var dataImg = {
		'data': [{
			'src': '1.jpg'
		}, {
			'src': '2.jpg'
		}, {
			'src': '3.jpg'
		}, {
			'src': '4.jpg'
		}, {
			'src': '5.jpg'
		}]
	};
	if(scollSide()) {
		/**
		 * 遍历对象dataImg
		 */
		$.each(dataImg.data, function(index, value) {
			var box = $('<div>').addClass('box').appendTo($('.container'));
			var content = $('<div>').addClass('content').appendTo(box);
			var img = $('<img>’').attr('src', './img/' + $(value).attr('src')).appendTo(content);
		});
		//对新创建的图片再次调用
		imgLocation();
	}
}
/**
 * 实现图片下来无限滚动
 */
function scollSide() {
	var box = $('.box');
	var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
	var documentHeight = $(document).height();
	var scrollHeight = $(window).scrollTop();
	return(lastBoxHeight < scrollHeight + documentHeight) ? true : false;
}
/**
 * 实现图片瀑布流
 */
function imgLocation() {
	var box = $('.box');
	var boxWidth = box.eq(0).width();
	var num = Math.floor($(window).width() / boxWidth);
	var boxArr = [];
	box.each(function(index, value) {
		consolelog(index + '--' + value);
		var boxHeight = box.eq(index).height();
		if(index < num) {
			boxArr[index] = boxHeight;
		} else {
			//获取最小高度
			var minboxHeight = Math.min.apply(null, boxArr);
			consolelog(minboxHeight);
			var minboxIndex = $.inArray(minboxHeight, boxArr);
			$(value).css({
				'position': 'absolute',
				'top': minboxHeight + 'px',
				'left': box.eq(minboxIndex).position().left + 'px'
			});

			boxArr[minboxIndex] += box.eq(index).height();
		}
	});
}
/**
 * 打印控制台信息
 * @param {Object} event
 */
function consolelog(event) {
	//	console.log(event);
}