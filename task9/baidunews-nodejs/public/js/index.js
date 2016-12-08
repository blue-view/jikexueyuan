var pendingRequests = {};
jQuery.ajaxPrefilter(function(options, originalOptions, jqXHR) {
	var key = options.url;
	if(!pendingRequests[key]) {
		pendingRequests[key] = jqXHR;
	} else {
		//jqXHR.abort();    //放弃后触发的提交
		pendingRequests[key].abort(); // 放弃先触发的提交
	}

	var complete = options.complete;
	options.complete = function(jqXHR, textStatus) {
		pendingRequests[key] = null;
		if(jQuery.isFunction(complete)) {
			complete.apply(this, arguments);
		}
	};
});
//打开页面后发送请求，刷新新闻列表
$(function() {

	var $newsTable = $('#newstable tbody');
	//加载新闻类型
	getNewsType('newstype');
	getNewsType('unewstype');
	//绑定日期空间
	$("#newstime").datetimepicker({
		format: 'yyyy-mm-dd hh:ii:ss'
	});
	$("#unewstime").datetimepicker({
		format: 'yyyy-mm-dd hh:ii:ss'
	});
	refreshNews();

	//添加新闻
	$('#addNews').click(function(e) {
		e.preventDefault();
		//输入判断
		if($('#newstitle').val() === '' || $('#newsimg').val() === '' || $('#newstime').val() === '' || $('#newssrc').val() === '') {
			if($('#newstitle').val() === '') {
				$('#newstitle').parents().addClass('has-error');
			} else {
				$('#newstitle').parents().removeClass('has-error');
			}
			if($('#newsimg').val() === '') {
				$('#newsimg').parents().addClass('has-error');
			} else {
				$('#newsimg').parents().removeClass('has-error');
			}
			if($('#newstime').val() === '') {
				$('#newstime').parents().addClass('has-error');
			} else {
				$('#newstime').parents().removeClass('has-error');
			}
			if($('#newssrc').val() === '') {
				$('#newssrc').parents().addClass('has-error');
			} else {
				$('#newssrc').parents().removeClass('has-error');
			}
		} else {
			var jsonNews = {
				'newstitle': $('#newstitle').val(),
				'newstype': $('#newstype').val(),
				'newsimg': $('#newsimg').val(),
				'newstime': $('#newstime').val(),
				'newssrc': $('#newssrc').val()
			};
			//提交添加
			$.ajax({
				url: '/server/insert',
				type: 'post',
				data: jsonNews,
				datatype: 'json',
				success: function(data) {
					//					console.log(data);
					refreshNews();
					//清空还原数据
					$('#newstitle').val('');
					$('#newstype').val(1);
					$('#newsimg').val('');
					$('#newstime').val('');
					$('#newssrc').val('');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if(errorThrown != 'abort') {
						alert('应用加载失败！');
					}
				}
			});

		}
	});
	//弹出删除新闻功能框
	var deleteID = null;
	$newsTable.on('click', '.btn-danger', function(e) {
		$('#deleteModal').modal('show');
		deleteID = $(this).attr('data-newsid');

	});
	//确认删除新闻
	$('#deleteModal #confirmDelete').click(function(e) {
		if(deleteID) {
			$.ajax({
				type: "post",
				url: "/server/delete",
				async: true,
				datatype: 'json',
				data: {
					newsid: deleteID
				},
				success: function(data) {
					refreshNews();
					$('#deleteModal').modal('hide');

				}
			});
		}
	});

	//更新新闻功能
	var updateID = null;
	$newsTable.on('click', '.btn-primary', function(e) {
		$('#updateModal').modal('show');
		updateID = $(this).attr('data-newsid');
		$.ajax({
			type: "post",
			url: "/server/query",
			async: true,
			datatype: 'json',
			data: {
				newsid: updateID
			},
			success: function(data) {
				var data1 = data[0];
				$('#unewstitle').val(data1.newstitle);
				$('#unewstype').val(data1.newstype);
				$('#unewsimg').val(data1.newsimg);
				$('#unewstime').val(moment(data1.newstime).format('YYYY-MM-DD hh:mm:ss'));
				$('#unewssrc').val(data1.newssrc);
			}
		});
	});
	//确认更新新闻
	$('#updateModal #confirmUpdate').click(function(e) {
		if(updateID) {
			$.ajax({
				type: "post",
				url: "/server/update",
				async: true,
				datatype: 'json',
				data: {
					newstitle: $('#unewstitle').val(),
					newstype: $('#unewstype').val(),
					newsimg: $('#unewsimg').val(),
					newstime: $('#unewstime').val(),
					newssrc: $('#unewssrc').val(),
					newsid: updateID
				},
				success: function(data) {

					refreshNews();
					$('#updateModal').modal('hide');

				}
			});
		}
	});
	/*加载所有新闻*/
	function refreshNews() {
		//清空所有新闻
		$newsTable.empty();
		$.ajax({
			type: "post",
			url: "/server/ad_getNews",
			async: true,
			datatype: 'json',
			success: function(data) {
				//				console.log(data);
				data.forEach(function(item, index, array) {
					var $tdid = $('<td>').html(item.id);
					var $tdtype = $('<td>').html(item.newstype);
					var $tdtitle = $('<td>').html(filterXSS(item.newstitle));
					//					var $tdimg = $('<td>').html(item.newsimg);
					//					var $tdsrc = $('<td>').html(item.newssrc);

					var $tdtime = $('<td>').html(moment(item.newstime).format('YYYY-MM-DD hh:mm:ss'));
					var $tdctrl = $('<td>');
					var $btnupdate = $('<button>').addClass('btn btn-primary btn-xs').attr('data-newsid', item.id).html('修改');
					var $btndelete = $('<button>').addClass('btn btn-danger btn-xs').attr('data-newsid', item.id).html('删除');
					$tdctrl.append($btnupdate, $btndelete);
					var $trow = $('<tr>');
					$trow.append($tdid, $tdtype, $tdtitle, $tdtime, $tdctrl);
					$newsTable.append($trow);
				});

			}
		});
	}
	//获取新闻类型
	function getNewsType(id) {
		//清空所有新闻
		var $select = $('#' + id);
		$.ajax({
			type: "post",
			url: "/server/getNewsTypeList?time=" + new Date().getTime(),
			async: true,
			datatype: 'json',
			success: function(data) {
				$select.empty();
				data.forEach(function(item, index, array) {
					var $option = $('<option value="' + item.id + '">' + item.name + '</option>');
					$select.append($option);
				});

			}
		});
	}
});