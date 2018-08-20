title: call
---
call
<!-- more -->

``` bash
// 函数.call(对象，参数1，参数2...参数N)
// 函数.apply(对象，[参数1，参数2...参数N])
function say(n) {
	console.log('叫'+ n +'声' + this.v);
}
var miao = {v: 'miaomiao'};
say.call(miao, 1);  // 叫1声miaomiao
say.apply(miao, [2]);  // 叫2声miaomiao
```

``` bash
function say() {
	return this.v;
}
var miao = {v: 'miaomiao'};
var dog = {v: 'wangwang'};
var sheep = {
	v: function() {
		return 'meimei';
	}
};
[miao, dog, sheep].map(function (animal) {
	var s = say.call(animal);
	var result = Object.prototype.toString.call(s) == "[object Function]" ? s() : s;
	console.log(result);
});  // miaomiao wangwang meimei
```