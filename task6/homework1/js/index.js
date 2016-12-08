(function() {
	var calc = {
		/*
		函数，加法函数，用来得到精确的加法结果  
		说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
		参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数）
		调用：Calc.Add(arg1,arg2,d)  
		返回值：两数相加的结果
		*/
		Add: function(arg1, arg2) {
			arg1 = arg1.toString(), arg2 = arg2.toString();
			var arg1Arr = arg1.split("."),
				arg2Arr = arg2.split("."),
				d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
				d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
			var maxLen = Math.max(d1.length, d2.length);
			var m = Math.pow(10, maxLen);
			var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
			var d = arguments[2];
			return typeof d === "number" ? Number((result).toFixed(d)) : result;
		},
		/*
		函数：减法函数，用来得到精确的减法结果  
		说明：函数返回较为精确的减法结果。 
		参数：arg1：第一个加数；arg2第二个加数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数
		调用：Calc.Sub(arg1,arg2)  
		返回值：两数相减的结果
		*/
		Sub: function(arg1, arg2) {
			return Calc.Add(arg1, -Number(arg2), arguments[2]);
		},
		/*
		函数：乘法函数，用来得到精确的乘法结果  
		说明：函数返回较为精确的乘法结果。 
		参数：arg1：第一个乘数；arg2第二个乘数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
		调用：Calc.Mul(arg1,arg2)  
		返回值：两数相乘的结果
		*/
		Mul: function(arg1, arg2) {
			var r1 = arg1.toString(),
				r2 = arg2.toString(),
				m, resultVal, d = arguments[2];
			m = (r1.split(".")[1] ? r1.split(".")[1].length : 0) + (r2.split(".")[1] ? r2.split(".")[1].length : 0);
			resultVal = Number(r1.replace(".", "")) * Number(r2.replace(".", "")) / Math.pow(10, m);
			return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
		},
		/*
		函数：除法函数，用来得到精确的除法结果  
		说明：函数返回较为精确的除法结果。 
		参数：arg1：除数；arg2被除数；d要保留的小数位数（可以不传此参数，如果不传则不处理小数位数)
		调用：Calc.Div(arg1,arg2)  
		返回值：arg1除于arg2的结果
		*/
		Div: function(arg1, arg2) {
			var r1 = arg1.toString(),
				r2 = arg2.toString(),
				m, resultVal, d = arguments[2];
			m = (r2.split(".")[1] ? r2.split(".")[1].length : 0) - (r1.split(".")[1] ? r1.split(".")[1].length : 0);
			resultVal = Number(r1.replace(".", "")) / Number(r2.replace(".", "")) * Math.pow(10, m);
			return typeof d !== "number" ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)));
		}
	};
	window.Calc = calc;
}());

//实数正则表达式
var realNumberReg = /^[+,-]?\d+\.?\d*$/;
//获取显示操作结果的对象
var resultObj = $$('txtresult');
//获取计算器操作容器
var oper = $$('oper');
//获取oper对象下的所有子节点
var opernLi = oper.children;
//获取数值x
var valueX = $$('x');
//获取数值y
var valueY = $$('y');
//操作符
var operLetter = $$('operLetter');

/*给子节点绑定事件的函数
 * obj为子节点
 * isValidate是否数据验证
 * flag在结果为NAN时是否重置0
 * callback回调函数
 */
function bindEvent(obj, isValidate, flag, callback) {
	if(isValidate) { //是否要验证数据的合法性,true代表要验证，false代表不验证
		if(callback && typeof callback == 'function') {
			//验证数据合法性
			obj.onclick = function() {
				if(resultObj.value == 'NAN' && flag) {
					resultObj.value = '0';
				}
				//验证数据的合法性
				if(validateData(realNumberReg, resultObj, trim(obj.innerHTML))) {
					callback(obj);
				}
			};

		}
	} else {
		//清空数据不用验证
		obj.onclick = callback;
	}
}
/*
 * 数值运算函数
 */
function getResult(x1, x2, type) {
	if(type == '+') {
		return Calc.Add(x1, x2);
	} else if(type == '-') {
		return Calc.Sub(x1, x2);
	} else if(type == '*') {
		return Calc.Mul(x1, x2);
	} else if(type == '/') {
		if(valueY.value == '0') {
			clearValue();
			return 'NAN';
		} else {
			return Calc.Div(valueX.value, valueY.value);
		}
	}
}
/**
 * 给隐藏控件x和y赋值
 */
function setValue() {
	if(operLetter.value == '') {
		valueX.value = resultObj.value;
	} else {
		valueY.value = resultObj.value;
	}
}
/*
 * 调用函数bindEvent给子节点绑定事件
 */
for(var t = 0; t < opernLi.length; t++) {
	var liBtn = opernLi[t];
	//去除空格并字母转为小写
	var liValue = trim(liBtn.innerHTML).toLowerCase();

	switch(liValue) {
		//绑定余弦操作对象事件
		case 'cos':
			bindEvent(liBtn, true, false, function() {
				var squareValue = parseFloat(resultObj.value);
				//调用Math对象的cos方法
				resultObj.value = Math.cos(squareValue);
				//给隐藏控件x和y赋值
				setValue();
			});
			break;
			//绑定正弦操作对象事件
		case 'sin':
			bindEvent(liBtn, true, false, function() {
				//调用Math对象的sin方法
				resultObj.value = Math.sin(parseFloat(resultObj.value));
				//给隐藏控件x和y赋值
				setValue();
			});
			break;
			//绑定平方数操作对象事件
		case 'x^2':
			bindEvent(liBtn, true, false, function() {
				//调用Calc相乘函数进行精确计算
				resultObj.value = Calc.Mul(parseFloat(resultObj.value), parseFloat(resultObj.value));
				//给隐藏控件x和y赋值
				setValue();
			});
			break;
			//绑定倒数操作对象事件
		case '1/x':
			bindEvent(liBtn, true, false, function() {
				//调用Calc相乘函数进行精确计算
				resultObj.value = Calc.Div(1, parseFloat(resultObj.value));
				//给隐藏控件x和y赋值
				setValue();
			});
			break;
			//绑定正负数操作对象事件
		case '±':
			bindEvent(liBtn, true, false, function() {
				//获取当前显示的数据
				var temValue = trim(resultObj.value);
				//获取所显示的数据的第一个字符
				var firstChar = temValue.substring(0, 1);
				if(firstChar != '+' && firstChar != '-') {
					temValue = '-' + temValue;
					resultObj.value = temValue;
				} else {
					if(firstChar == '+') {
						resultObj.value = temValue.replace('+', '-');
					} else {
						resultObj.value = temValue.replace('-', '+');
					}

				}
				//给隐藏控件x和y赋值
				setValue();
			});
			break;
			//绑定清空数据事件
		case 'c':
			bindEvent(liBtn, false, false, function() {
				resultObj.value = '0';
				//调用函数
				clearValue();
			});
			break;
			//绑定数字和点操作对象事件
		case '0':
		case '1':
		case '2':
		case '3':
		case '4':
		case '6':
		case '5':
		case '7':
		case '8':
		case '9':
		case '.':
			bindEvent(liBtn, true, true, function(obj) {
				//节点的值
				var linodeText = trim(obj.innerHTML);
				//显示数据对象的值
				var temValue = trim(resultObj.value);
				//小数点数字操作
				if(linodeText == '.') {
					if(temValue.indexOf('.') > -1) {
						return;
					} else {
						resultObj.value = temValue + linodeText;
					}
				} else {
					//0数字对象操作
					if(Math.abs(temValue) == 0 && temValue.indexOf('.') == -1) {
						resultObj.value = linodeText;
					}
					//1-9数字操作
					else {

						if(valueY.value == '' && operLetter.value != '') {
							resultObj.value = '';
							resultObj.value = resultObj.value + linodeText;
						} else {
							resultObj.value = resultObj.value + linodeText;
						}

					}
					//给隐藏控件x和y赋值
					setValue();
				}

			});
			break;
			//绑定加减乘除操作对象事件
		case '+':
		case '-':
		case '*':
		case '/':
		case '=':
			bindEvent(liBtn, true, false, function(obj) {
				//数值X,数值Y，操作符都不能为空时进行精确运算
				if(valueX.value != '' && valueY.value != '' && operLetter.value != '') {
					resultObj.value = getResult(valueX.value, valueY.value, operLetter.value);

					valueX.value = resultObj.value;
					valueY.value = '';
				}
				var temType = trim(obj.innerHTML);
				//操作符不是等号时给隐藏操作符控件赋值
				if(valueX.value != '' && temType != '=') {
					operLetter.value = temType;
				}
				//操作符等号操作方法
				else if(temType == '=') {
					operLetter.value = '';
				}
			});
			break;
	}
}

/*
 * 清除左右空格
 */
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");　　
}
/*
 * 清空存储数值x控件，数值y控件,操作符控件的值
 */
function clearValue() {
	valueX.value = '';
	valueY.value = '';
	operLetter.value = '';
}

/*
 * 根据ID获取DOM对象
 */
function $$(id) {
	return document.getElementById(id);
}

/*
 * 校验数据是否合法
 * reg:正则表单上市
 * obj:子节点
 * type:子节点文本值
 */
function validateData(reg, obj, type) {
	var temValue = obj.value.replace(/[+,-]/g, '');
	if(!reg.test(temValue)) {
		obj.value = 'NAN';
		return false;
	} else {
		if(type == '1/x') { //倒数不能为0
			if(temValue == '0' || temValue == '0.') {
				obj.value = 'NAN';
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}
}