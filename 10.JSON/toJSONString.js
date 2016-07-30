//扩展全局的window.Object.prototype=xxx
Object.prototype.toJSONString=function(){
	//将一个对象的属性值以json的格式输出
	var str="";
	if((typeof this)==="object"){
		if(this instanceof Array){
			str+="[";
			for(var i=0;i<this.length;i++){
				if((typeof this[i])==="string"){
					str+="\""+this[i]+"\",";
				}else if((typeof this[i])==="object"){
					str+=this[i].toJSONString()+",";
				}else if((typeof this[i])!=="function"){
					str+=this[i]+",";
				}
			}
			str=str.slice(0,str.length-1);
			str+="]";
			return str;
		}
		str+="{";
		for(var i in this){
			if((typeof this[i])==="string"){
				str+="\""+i+"\":\""+this[i]+"\",";
			}else if((typeof this[i])==="object"){
				str+="\""+i+"\":"+this[i].toJSONString()+",";
			}else if((typeof this[i])!=="function"){
				str+="\""+i+"\":"+this[i]+",";
			}
		}
		str=str.slice(0,str.length-1);
		str+="}";
		return str;
	}

}