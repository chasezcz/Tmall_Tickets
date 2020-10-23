//定时器
var timer = null;

//检测状态
function checkElementState(path, callback) {
	var ele = document.querySelector(path);
	if (ele) {
		callback && callback();
	} else {
		console.log('异步加载元素中....' + path);
		setTimeout(function () { checkElementState(path, callback); }, 200);
	}
}

//检测“全选框”
function checkCheckbox() {
	var checkbox = document.getElementsByName("select-all")[0];
	// “全选”
	checkbox && !checkbox.checked && checkbox.click()

	// 数量选择为2
	var num = document.getElementsByClassName("text-amount")[0];
	var plus = document.getElementsByClassName("J_Plus plus")[0];
	// “数量加一” 要不要自动加量到最高限额看个人需求
	plus && num && num.value < 2 && plus.click()

	setTimeout(() => {
		checkCheckbox()
	}, 1000);
}



//点击购买按钮
function clickBuy() {

	console.log('买！');

	//票的数量  如果还不可以购买，这个地方获取会失败 
	var amount = document.getElementsByClassName('mui-amount-increase')[0];
	amount && amount.click();  //+1

	var btnBuy = document.querySelector('');

}


//结算
function checkOut() {

	console.log('结算开始....');
	var btn = document.getElementById('J_Go');

	if (btn) {
		console.log("我要点击结算了！" + new Date().toLocaleTimeString())
		btn.click();
	} else {
		console.log('结算按钮没找到');
	}

}

function checkOutAsync() {
	checkElementState('#J_Go', checkOut);
}

//提交订单
function submitOrder() {

	console.log('提交订单开始....');


	checkElementState('.go-btn', function () {
		var btn = document.querySelector(".go-btn");
		if (btn) {
			btn.click();
		} else {
			console.log('提交订单按钮没找到');
		}

	});
}


//目标时间
var dDate = new Date();  //10点和20点开抢
if (dDate.getHours() < 10) {
	dDate.setHours(9, 59, 59.2);
} else {
	dDate.setHours(20, 00, 00);
}

//进入时间判断循环
function enterTimeCheckLoop(callback) {
	var date = new Date();
	// var diff = Date.parse(dDate) - Date.parse(date);
	var diff = dDate.getTime() - date.getTime();
	console.log(diff);

	if (diff < - 100) {

		console.log('时间过了！');

	} else if (diff < 100) {

		console.log("还剩 " + diff + 'ms, 时间到了！！！');
		callback && callback();

	} else {
		setTimeout(function () { enterTimeCheckLoop(callback); }, 20);
	}
}

//主要函数
function main() {
	console.log('############################开始抢购茅台############################');
	console.log('时间设置为' + dDate.toLocaleTimeString())
	var href = window.location.href;
	if (href.indexOf('cart.tmall.com') > -1) {
		//结算页面
		//进入时间判断
		checkCheckbox();
		enterTimeCheckLoop(checkOutAsync);

	} else if (href.indexOf('buy.tmall.com') > -1) {
		//提交订单页面

		submitOrder();
	}

}

main();
