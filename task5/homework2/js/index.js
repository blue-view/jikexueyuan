/**
 * 
 * @param {Object} a 数字1
 * @param {Object} b 数字2
 * @param {Object} type 
 */
function cal(a, b, type) {
	var a = parseFloat(a);
	var b = parseFloat(b);

	if(type == '+') {
		return Calc.Add(a, b);
	} else if(type == '-') {
		return Calc.Sub(a, b);
	} else if(type == '*') {
		return Calc.Mul(a, b);
	} else if(type == '/') {
		return Calc.Div(a, b);
	}
}
/*
 *校验参数并显示计算结果到页面
 * */
function showResult() {
	//数值x对象
	var x = document.getElementById('x');
	//数值y对象
	var y = document.getElementById('y');
	//计算结果对象
	var result = document.getElementById('result');
	//确认按钮对象
	var btnok = document.getElementById('ok');
	//操作符对象
	var oper = document.getElementById('oper');
	//信息提示对象
	var info = document.getElementById('info');
	//显示计算结果
	if(validate(x.value, y.value, oper.value)) { //对参数进行验证
		result.innerText = cal(x.value, y.value, oper.value);
		info.innerHTML = '';
	}
}
/*
 * 根据操作类型(+,-,*,/)对参数进行校验
 */
function validate(x, y, type) {
	//信息提示对象
	var info = document.getElementById('info');
	var x_name = '';
	var y_name = '';
	var floatReg = /^-?\d+\.?\d*$/;

	if(type == '+') {
		x_name = '被加数';
		y_name = '加数';
	} else if(type == '-') {
		x_name = '被减数';
		y_name = '减数';
	} else if(type == '*') {
		x_name = '被乘数';
		y_name = '乘数';
	} else if(type == '/') {
		x_name = '被除数';
		y_name = '除数';
	}
	if(x == '') {
		info.innerHTML = x_name + '不能为空';
		return false;
	} else if(!floatReg.test(x)) {
		info.innerHTML = x_name + '必须为数字';
		return false;
	} else if(y == '') {
		info.innerHTML = y_name + '不能为空';
		return false;
	} else if(!floatReg.test(y)) {
		info.innerHTML = y_name + '必须为数字';
		return false;
	} else {
		if(type == '/') {
			if(parseInt(y) == 0) {
				info.innerHTML = '除数不能为0';
				return false;
			} else {
				return true;
			}

		} else {
			return true;
		}
	}
}
document.getElementById('ok').onclick = function() {
	showResult();

}