//库用来存放一些内置函数的扩展(String,Array,Object)
//放一些自定义的函数，这些函数为了不与别的库冲突，定义到一个命名空间（对象）中。
(function(){
	if(  !window.lib  ){
		window.lib={};
	}
	function $(){
		var elements=[];
		for(var i=0;i<arguments.length;i++){
			var element=arguments[i];
			if((typeof element)=="string"){
				element=document.getElementById("element");
			}
			if(arguments.length==1){
				return element;
			}
			elements.push(element);
		}
		return elements;
	}
	window["lib"]["$"]=$;


})();


//扩展全局的window.Object.prototype=xxx
window.Object.prototype.toJSONString=function(){
	//将一个对象的属性值以json的格式输出
	var str="";
	if((typeof this)=="object"){
		if(this instanceof Array){
			str+="[";
			for(var i=0;i<this.length;i++){
				if((typeof this[i])=="string"){
					str+="\""+this[i]+"\",";
				}else if((typeof this[i])=="object"&&(typeof this)!="function"){
					str+=this[i].toJSONString()+",";
				}else if((typeof this[i])!="function"){
					str+=this[i]+",";
				}
			}
			str=str.slice(0,str.length-1);
			str+="]";
			return str;
		}
		str+="{";
		for(var i in this){
			if((typeof this[i])=="string"){
				str+="\""+i+"\":\""+this[i]+"\",";
			}else if((typeof this[i])=="object"&&(typeof this)!="function"){
				str+="\""+i+"\":"+this[i].toJSONString()+",";
			}else if((typeof this[i])!="function"){
				str+="\""+i+"\":"+this[i]+",";
			}
		}
		str=str.slice(0,str.length-1);
		str+="}";
		return str;
	}

}
