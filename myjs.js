/*一个自己的js库*/
Object.prototype.equals=function(obj){
	//比较两个对象的所有属性值是否相等，相等返回true，不等返回false
	var result=false;
	if(  !obj  ){
		return result;
	}
	for(var key in obj){
		if(!obj[key]||!this[key]||obj[key]!=this[key]){
			return result;
		}
	}
	for(var key in this){
		if(!obj[key]||!this[key]||obj[key]!=this[key]){
			return result;
		}
	}
	result=true;
	return result;
}
Object.prototype.clone=function (){
	//循环当前对象this所有的属性，存入到一个新的对象
	var newobj={};
	for(var key in this){
		newobj[key]=this[key];
	}
	return newobj;
}

function $(id){  //获得当前的id的对象引用
	return document.getElementById(id);
}

function $e(event){
	e=event?event:widow.event;
	return e
}

function delDefault(event){ //清除浏览器的默认样式
	if(window.event){
		e=window.event;
		e.returnValue=false;
		e.preventDefault();
	}else{
		e.preventDefault();
	}
}


function mergeObject(defaultvalue,realvalue){   //用于合并对象，如果不存在则给对象附上默认值
	if(realvalue&&typeof(realvalue)=='object'){
		for(var key in defaultvalue){
			defaultvalue[key]=realvalue[key]||defaultvalue[key];

		}
	}
	return defaultvalue;
}

function myReady(fn){
	//1.现代浏览器
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",fn,false);
	}else{
		IEContentLoaded(fn);
	}
	function IEContentLoaded(fn){
		var isdone=false;

		function init(){
			if(!isdone){
				isdone=true;
				fn();
			}
		}
		(function (){
			try{
				document.documentElement.doScroll();
			}catch(e){
				setTimeout(arguments.callee,10);
				return;
			}
			init();
		})();
		document.onreadystatechange=function(){
			if(document.readyState=="complete"){
				init();
			}
		}
	}
}

function getPreSbl(n){		//取得向上的兄弟元素节点
	var x=n.previousSibling;
	while(x&&x.nodeType!=1){
		x=x.previousSibling;
	}
	return x;
}
function getNextSbl(n){		//取得向下的兄弟元素节点
	var x=n.nextSibling;
	while(x&&x.nodeType!=1){
		x=x.nextSibling;
	}
	return x;
}
function getChild(n){		//取得所有的子元素节点
  var Child=[];
  for(var i=0;i<n.childNodes.length;i++){
    if(n.childNodes[i].nodeType==1){
      Child.push(n.childNodes[i]);
    }
  }
  var num=num-1;
  return Child;
}


