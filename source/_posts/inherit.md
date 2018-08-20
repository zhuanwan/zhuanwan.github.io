title: 继承
---
继承
<!-- more -->

## 函数

### 构造函数绑定
``` bash
function Animal(){
	this.say = function(s){
		console.log(this.name + '叫' + s);
	}
}

function Cat(name){
　　Animal.apply(this, arguments);
　　this.name = name;
}

var cat1 = new Cat("小猫");
cat1.say("喵喵"); // 小猫叫喵喵
```



### 原型


``` bash
function Animal(){
	this.say = function(s){
		console.log(this.name + '叫' + s);
	}
}

function Cat(name){
　　this.name = name;
}

Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
var cat1 = new Cat("小猫");
cat1.say("喵喵"); // 小猫叫喵喵
```

封装下
``` bash
function extend(subClass,superClass){
	var F = function(){};
	F.prototype = superClass.prototype;
	subClass.prototype = new F();
	subClass.prototype.constructor = subClass;
	subClass.superClass = superClass.prototype;
	if(superClass.prototype.constructor == Object.prototype.constructor){
		superClass.prototype.constructor = superClass;
	}
}

function Animal(){
	this.say = function(s){
		console.log(this.name + '叫' + s);
	}
}

function Cat(name){
	Cat.superClass.constructor.call(this, arguments);
　　this.name = name;
}

extend(Cat,Animal);
var cat1 = new Cat("小猫");
cat1.say("喵喵"); // 小猫叫喵喵
```

## 对象
``` bash
var Chinese = {
　　nation:'中国'
};

var Doctor ={
　　career:'医生'
}


function object(o) {
　　function F() {}
　　F.prototype = o;
　　return new F();
}


var Doctor = object(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); //中国
```
参考 http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html