/*
 *将0-100分学员，以10为分界，10分为一段，
 *根据传入的分数计算出该生为数字几等生，如给函数传入98分，
 *该分数在90-100区间为1等生，65分在60-70区间为4等生。
 */
function getLevel(score) {
	var level = 0;
	if(score >= 0 && score < 10) {
		level = 10;
	} else if(score >= 10 && score < 20) {
		level = 9;
	} else if(score >= 20 && score < 30) {
		level = 8;
	} else if(score >= 30 && score < 40) {
		level = 7;
	} else if(score >= 40 && score < 50) {
		level = 6;
	} else if(score >= 50 && score < 60) {
		level = 5;
	} else if(score >= 60 && score < 70) {
		level = 4;
	} else if(score >= 70 && score < 80) {
		level = 3;
	} else if(score >= 80 && score < 90) {
		level = 2;
	} else if(score >= 90 && score <= 100) {
		level = 1;
	}
	return level;
}
//在页面上显示学员的分数等级
function showResult() {
	var numReg = /^[0-9]*$/;
	var btn_ok = document.getElementById('btnOk');
	var score = document.getElementById('score');
	var info = document.getElementById('info');
	var levelValue = document.getElementById('levelValue');
	var trinfo = document.getElementById('trinfo');
	levelValue.innerHTML = '';
	info.innerHTML = '';
	trinfo.style.display = 'none';

	//输入的值为空
	if(score.value == '') {
		trinfo.style.display = 'block';
		info.innerHTML = '分数不能为空';
	} else if(!numReg.test(score.value)) {
		trinfo.style.display = 'block';
		info.innerHTML = '分数必须为数字';
	} else if(parseInt(score.value) > 101) {
		trinfo.style.display = 'block';
		info.innerHTML = '分数必须在0-100之间';
	} else {
		trinfo.style.display = 'none';
		info.innerHTML = '';
		var result = getLevel(parseInt(score.value));
		levelValue.innerHTML = result + '等生';
	}
}
/*清空信息*/
function resetInfo() {
	var score = document.getElementById('score');
	var info = document.getElementById('info');
	var levelValue = document.getElementById('levelValue');
	var trinfo = document.getElementById('trinfo');
	score.value = '';
	info.innerHTML = '';
	levelValue.innerText = '';
	trinfo.style.display = 'none';
}