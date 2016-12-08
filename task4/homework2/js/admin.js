$(function() {
	var array_param = ['submenu1', 'submenu2', 'submenu3', 'submenu4', 'submenu5'];
	showSubmenu(array_param);
});

function showSubmenu(params) {
	if(Array.isArray(params)) {
		for(var t in params) {
			var id = params[t];
			$('#' + id).on('show.bs.collapse', function() {
				$(this).parents('li').find('span').addClass('nav-select');
			})
			$('#' + id).on('hide.bs.collapse', function() {
				$(this).parents('li').find('span').removeClass('nav-select');
			})
		}
	} else {
		alert('传入参数必须为数组');
	}

}
window.onerror = function() {
	return true;
}