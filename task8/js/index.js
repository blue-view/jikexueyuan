//打开页面后发送请求，刷新新闻列表
$(function() {
	var $newsTable = $('#newstable tbody');
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
				url: '../server/insert.php',
				type: 'post',
				data: jsonNews,
				datatype: 'json',
				success: function(data) {
					console.log(data);
					refreshNews();
				}
			});

		}
	});
	//删除新闻功能
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
				url: "../server/delete.php",
				async: true,
				datatype: 'json',
				data: {
					newsid: deleteID
				},
				success: function(data) {
					console.log(data);
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
			url: "../server/query.php",
			async: true,
			datatype: 'json',
			data: {
				newsid: updateID
			},
			success: function(data) {
				console.log(data);
				var data1 = data[0];
				$('#unewstitle').val(data1.newstitle);
				$('#unewstype').val(data1.newstype);
				$('#unewsimg').val(data1.newsimg);
				$('#unewstime').val(data1.newstime.split(' ')[0]);
				$('#unewssrc').val(data1.newssrc);
			}
		});
	});
	//确认更新新闻
	$('#updateModal #confirmUpdate').click(function(e) {
		if(updateID) {
			$.ajax({
				type: "post",
				url: "../server/update.php",
				async: true,
				datatype: 'json',
				data: {
					newstitle: $('#unewstitle').val(),
					newstype: $('#unewstype').val(),
					newsimg: $('#unewsimg').val(),
					newstime: $('#unewstime').val(),
					newssrc: $('#unewssrc').val(),
					id: updateID
				},
				success: function(data) {
					console.log(data);
					refreshNews();
					$('#updateModal').modal('hide');

				}
			});
		}
	});

	function refreshNews() {
		//清空所有新闻
		$newsTable.empty();
		$.ajax({
			type: "get",
			url: "../server/ad_getNews.php",
			async: true,
			datatype: 'json',
			success: function(data) {
				//				console.log(data);
				data.forEach(function(item, index, array) {
					var $tdid = $('<td>').html(item.id);
					var $tdtype = $('<td>').html(item.newstype);
					var $tdtitle = $('<td>').html(item.newstitle);
					//					var $tdimg = $('<td>').html(item.newsimg);
					//					var $tdsrc = $('<td>').html(item.newssrc);
					var $tdtime = $('<td>').html(item.newstime);
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
});