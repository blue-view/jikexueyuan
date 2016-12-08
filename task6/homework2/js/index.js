/*
 * 设置网页背景图片
 */
function setWebCss() {
	//获取操作背景操作按钮 .select
	var bgimg = document.getElementById('bgimg');
	var bgOpers = bgimg.children;
	//获取操作网站css样式文件的对象
	var pageStyle = document.getElementById('pageStyle');
	var pageStyleChildren = pageStyle.children;

	//获取背景图片的cookie值
	var bgcookie = getCookie('bg');
	//获取网站样式的cookie值
	var csscookie = getCookie('css');

	//bgcookie不为空的话，设置存储的相关值为当前网站的背景图
	if(bgcookie) {
		deleteNode(document.getElementById('bgimg'));
		for(var t = 0; t < bgOpers.length; t++) {
			if(bgOpers[t].className == bgcookie) {
				var bodyCss = 'body' + '_' + bgcookie;
				document.body.className = bodyCss;
				bgOpers[t].innerHTML = '<span class="select" ></span>';
			}
		}
	}
	//csscookie不为空的话，设置存储的相关值为当前网站的样式文件
	if(csscookie) {
		deleteNode(document.getElementById('pageStyle'));
		for(var t = 0; t < pageStyleChildren.length; t++) {
			if(pageStyleChildren[t].className == csscookie) {
				pageStyleChildren[t].innerHTML = '<span class="select" ></span>';
				var cssPath = 'css/' + csscookie + '.css';
				document.getElementById('webcss').href = cssPath;
			}
		}
	}

	//绑定设置网站背景图片的事件
	for(var t = 0; t < bgOpers.length; t++) {
		bgOpers[t].onclick = function() {
			deleteNode(document.getElementById('bgimg'));
			this.innerHTML = '<span class="select" ></span>';
			var bodyCss = 'body' + '_' + this.className;
			document.body.className = bodyCss;
			setCookie('bg', this.className, 7);
		}
	}
	//绑定设置网站css样式文件事件
	for(var t = 0; t < pageStyleChildren.length; t++) {
		pageStyleChildren[t].onclick = function() {
			deleteNode(document.getElementById('pageStyle'));
			this.innerHTML = '<span class="select" ></span>';
			var cssPath = 'css/' + this.className + '.css';
			document.getElementById('webcss').href = cssPath;
			setCookie('css', this.className, 7);
		}
	}
}
/**
 * 设置网站cookies
 * @param {Object} name
 * @param {Object} value
 * @param {Object} iDay
 */
function setCookie(name, value, iDay) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);

	document.cookie = name + '=' + value + ';expires=' + oDate;
}
/**
 * 获取网站cookie
 * @param {Object} name
 */
function getCookie(name) {
	var arr = document.cookie.split('; ');

	for(var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');

		if(arr2[0] == name) {
			return arr2[1];
		}
	}

	return '';
}
/**
 * 删除网站cookie
 * @param {Object} name
 */
function removeCookie(name) {
	setCookie(name, 1, -1);
}
/**
 * 删除选中元素
 */
function deleteNode(bgimg2) {
	var bgOpers2 = bgimg2.children;
	for(var n = 0; n < bgOpers2.length; n++) {
		var selectObj = getByClass(bgOpers2[n], 'select');
		if(selectObj.length > 0) {
			for(var j = 0; j < selectObj.length; j++) {
				bgOpers2[n].removeChild(selectObj[j]);
			}
		}
	}
}
/**
 * 获取元素
 * @param {Object} oParent
 * @param {Object} sClass
 */
function getByClass(oParent, sClass) {
	var aResult = [];
	var aEle = oParent.getElementsByTagName('*');
	for(var i = 0; i < aEle.length; i++) {
		if(aEle[i].className == sClass) {
			aResult.push(aEle[i]);
		}
	}

	return aResult;
}

window.onload = function() {
	//调用setWebBg方法
	setWebCss();
}