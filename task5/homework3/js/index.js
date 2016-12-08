//声明变量
var letters = ['a', 'x', 'b', 'd', 'm', 'a', 'k', 'm', 'p', 'j', 'a'],
	keysArray = new Array(), //关键字数组
	oldLetters = new Array(), //保存数组letters的值的数组
	newLetters = new Array(); //对象型数组
//复制数组letters到oldLetters
for(var m in letters) {
	oldLetters[m] = letters[m];
}
/*
 * 去掉数组中重复元素
 * 参数:数组
 * 返回值:数组
 */
function unique(data) {
	var data = data || [];
	var a = {};
	for(var i = 0; i < data.length; i++) {
		var v = data[i];
		if(typeof(a[v]) == 'undefined') {
			a[v] = 1;
		}
	};
	data.length = 0;
	for(var i in a) {
		data[data.length] = i;
	}
	return data;
}

//调用函数unique，去掉数组letters重复值
keysArray = unique(letters);
/*构建一个对象型数组，其中对象有3个属性
 * 属性letter：字符串类型，存储keysArray数组的某个项
 * 属性positions:数组类型，存储属性letter的值在数组oldLetters的索引值
 * 属性counts:数字类型，存储属性letter的值在数组中oldLetters出项的次数
 */
//遍历数组keysArray
for(var t in keysArray) {
	var obj = {};
	var a = keysArray[t];
	//属性letter存值
	obj.letter = a;
	var temAarry = [];
	//遍历数组oldLetters
	for(var m in oldLetters) {
		//如果两个数组的某个项的值相等
		if(keysArray[t] == oldLetters[m]) {
			//把该值出现在数组oldLetters的索引值存入到临时数组temAarry
			temAarry.push(m);
		}
	}
	obj.positions = temAarry;
	obj.counts = temAarry.length;
	newLetters.push(obj);
}
//根据对象的counts值给数组newLetters进行排序(从大到小)
newLetters.sort(function(a, b) {
	return a.counts < b.counts;
});
//获取数组oldLetters中第一项值
var firstLetter = newLetters[0];
//获取数组中字母出现的最大次数
var maxCount = firstLetter.counts;
/*在html页面输出数组newLetters中所有对象的counts值为maxCount的对象
 * 即输出数组oldLetters中出现次数最多的字母，个数值和每一个所在的顺序
 */
var resultContainer = document.getElementById('result');

for(var t in newLetters) {
	if(newLetters[t].counts == maxCount) {
		var div_letter = document.createElement('div');
		div_letter.innerHTML = '字母：' + newLetters[t].letter;
		resultContainer.appendChild(div_letter);
		var div_counts = document.createElement('div');
		div_counts.innerHTML = '出现的次数：' + newLetters[t].counts + '次';
		resultContainer.appendChild(div_counts);
		var div_positions = document.createElement('div');
		div_positions.innerHTML = '所在的索引位置：' + newLetters[t].positions.join(',');
		div_positions.className = 'posCls';
		resultContainer.appendChild(div_positions);
	}
}