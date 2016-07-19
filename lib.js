//库用来存放一些内置函数的扩展(String,Array,Object)
//放一些自定义的函数，这些函数为了不与别的库冲突，定义到一个命名空间（对象）中。
(function(){
	//给window顶层对象添加一个属性，相当于一个命名空间
	if(  !window.yc  ){
		window.yc={};
	}

//=======================================浏览器的检测======================================
	//判断当前浏览器是否兼容这个库：浏览器能力检测
	function isCompatible(other){
		if(other===false||!Array.prototype.push||!Object.hasOwnProperty||!document.createElement||!document.getElementsByTagName){
			return false;
		}
		return true;
	}
	window["yc"]["isCompatible"]=isCompatible;

//========================================节点的获取======================================
	//通过id名获取节点,传入多个id名时返回一个数组
	function $(){
		var elements=[];
		for(var i=0;i<arguments.length;i++){
			var element=arguments[i];
			if((typeof element)=="string"){
				element=document.getElementById(element);
			}
			if(arguments.length==1){
				return element;
			}
			elements.push(element);
		}
		return elements;
	}
	window["yc"]["$"]=$;

	//通过类名查找节点,返回一个数组   classname 类名；tag 标签名
	function getElementsByClassName(className,tag,parent){
		parent=parent||document;
		if(!( parent=$(parent) )){return false;}
		var allTags=(tag=="*" && parent.all)?parent.all:parent.getElementsByTagName(tag);
		var matchingElements=[];
		var reg=new RegExp("(^|\\s)"+className+"(\\s|$)");//表示classname是开头或者空格开头，或者是结尾或者空格结尾
		var element;
		for(var i=0;i<allTags.length;i++){
			element=allTags[i];
			if(reg.test(element.className)){
				matchingElements.push(element);//将所有匹配到的节点放入数组
			}
		}
		return matchingElements;
	}
	window["yc"]["getElementsByClassName"]=getElementsByClassName;

//========================================DOM节点操作的补充======================================
	//插入一个节点到指定节点之后
	function insertAfter(node,referenceNode){
		if( !(node=$(node)) ){return false;}
		if( !(referenceNode=$(referenceNode)) ){return false;}
		var parent=referenceNode.parentNode;
		if(parent.lastChild==referenceNode){
			parent.appendChild(node);
		}else{
			parent.insertBefore(node,referenceNode.nextSibling);
		}
		return node;
	}
	window["yc"]["insertAfter"]=insertAfter;

	//在一个父节点的第一个子节点前面添加一个新的节点
	function prependChild(parent,newChild){
		if( !(parent=$(parent)) ){return false;}
		if( !(newChild=$(newChild)) ){return false;}
		if(parent.firstChild){
			parent.insertBefore(newChild,parent.firstChild);
		}else{
			parent.appendChild(newChild);
		}
		return parent;
	}
	window["yc"]["prependChild"]=prependChild;

	//删除节点下的所有子节点
	function removeChildren(parent){
		if( !(parent=$(parent)) ){return false;}
		while( parent.firstChild ){
			parent.removeChild( parent.firstChild );
		}
		return parent;
	}
	window["yc"]["removeChildren"]=removeChildren;


//======================================事件的操作======================================
	//事件添加  node 节点；type 事件类型；listener 监听器函数
	function addEvent(node,type,listener){ 
		if(!isCompatible()){return false;}
		if( !( node=$(node) )){return false;}
		if(node.addEventListener){//ff浏览器
			node.addEventListener(type,listener,false);
			return true;
		}else if(node.attachEvent){//兼容低版本ie浏览器
			node['e'+type+listener]=listener;
			node[type+listener]=function(){
				node['e'+type+listener](window.event);
			};
			node.attachEvent('on'+type,node[type+listener]);
			return true;
		}
		return false;
	}
	window["yc"]["addEvent"]=addEvent;

	//事件移除  node 节点；type 事件类型；listener 监听器函数
	function removeEvent(node,type,listener){
		if(  !( node=$(node) ) ){return false;}
		if(node.removeEventListener){//ff chorme
			node.removeEventListener(type,listener,false);
			return true;
		}else if( node.detachEvent ){//兼容低版本ie浏览器
			node.detachEvent( "on"+type,node[type+listener] );
			node[type+listener]=null;
			return true;
		}
		return false;
	}
	window["yc"]["removeEvent"]=removeEvent;

	function addLoadEvent(func){
		var oldOnLoad=window.onload;
		if(typeof window.onload!='function'){
			window.onload=func;
		}else{
			window.onload=function(){
				oldOnLoad();
				func();
			}
		}
	}
	window["yc"]["addLoadEvent"]=addLoadEvent;

//========================================界面的操作======================================
	//添加一个显示与隐藏的开关
	function toggleDisplay(node,value){
		if( !(node=$(node)) ){return false;}
		if(node.style.display!='none'){
			node.style.display='none';
		}else{
			node.style.display=value||'';
		}
		return true;
	}
	window['yc']['toggleDisplay']=toggleDisplay;
	//替换模版
	function supplant(str,date){
		// for(var index in date){
		// 	template=template.replace("{"+index+"}",date[index]);
		// }
		// return template;
		return str.replace(/{([a-z]*)}/g,function(a,b){return date[b]})
	}
	window["yc"]["supplant"]=supplant;


//========================================样式表的操作======================================
	function camelize(s){//将word-word 转换为 wordWord
		return s.replace(/-(\w)/g,function(strMatch,p1){return p1.toUpperCase();})
	}
	window["yc"]["camelize"]=camelize;

	function uncamelize(s,sep){//将wordWord 转换为 word-word
		sep=sep||'-';
		return s.replace(/([a-z])([A-Z])/g,function(math,p1,p2){return p1+sep+p2.toLowerCase();});
	}
	window["yc"]["uncamelize"]=uncamelize;

	function setStyleById(element,styles){
		if(!(element=$(element))){return false;}
		for(var property in styles){
			if(!styles.hasOwnProperty(property)){continue;}
			if(element.style.setProperty){
				element.style.setProperty(uncamelize(property,'-'),styles[property],null);
			}else{
				element.style[camelize(property)]=styles[property];
			}
		}
		return true;
	}

	window["yc"]["setStyle"]=setStyleById;
	window["yc"]["setStyleById"]=setStyleById;

	function setStyleByTagName(tag,styles,parent){
		parent=parent||document;
		if(!(parent=$(parent))){return false;}
		var elements=parent.getElementsByTagName(tag);
		for(var e=0;e<elements.length;e++){
			setStyleById(elements[e],styles);
		}
	}
	window["yc"]["setStyleByTagName"]=setStyleByTagName;

	function setStyleByClassName(styles,className,tag,parent){
		var elements=getElementsByClassName(className,tag,parent);
		for(var i=0;i<elements.length;i++){
			setStyleById(elements[i],styles);
		}
		return true;
	}
	window["yc"]["setStyleByClassName"]=setStyleByClassName;

	function getClassNames(element){//element  要获得类名的元素
		if(!(element=$(element))){return false;}
		return element.className.replace(/\s+/,' ').split(' ');
	}
	window["yc"]["getClassNames"]=getClassNames;

	function hasClassName(element,className){  //element 要查找的元素    className 要查找的类名
		if(!(element=$(element))){return false;}
		var classes=getClassNames(element);
		for(var i=0;i<classes.length;i++){
			if(classes[i]===className){
				return true;
			}
		}
		return false;
	}
	window["yc"]["hasClassName"]=hasClassName;

	function addClassName(element,className){
		if(!(element=$(element))){return false;}
		if(!hasClassName(element,className)){
			element.className+=(element.className?' ':'') + className;
			return true;
		}
	}
	window["yc"]["addClassName"]=addClassName;

	function removeClassName(element,className){
		if(!(element=$(element))){return false;}
		var classes=getClassNames(element);
		var length=classes.length;
		for(var i=length-1;i>=0;i--){
			if(classes[i]===className){
				delete(classes[i]);
				classes.splice(i,1);
			}
		}
		element.className=classes.join(' ');
		return (length===classes.length?false:true);
	}
	window["yc"]["removeClassName"]=removeClassName;
//========================更大范围的操作样式表================================
	function getStyleSheets(url,media){
		var sheets=[];
		for(var i=0;i<document.styleSheets.length;i++){
			var href=document.styleSheets[i].href;
			if( !href || (url && href.indexOf(url)==-1)){
				continue;
			}
			if(media){
				media=media.replace(/,\s*$/,'');
				var sheetMedia;
				if(document.styleSheets[i].media.mediaText){//w3c
					sheetMedia=document.styleSheets[i].media.mediaText.replace(/,\s*/,',');
					sheetMedia=sheetMedia.replace(/,\s*$/,'');
				}else{//ie
					sheetMedia=document.styleSheets[i].media.replace(/,\s*/,',');
				}
				if(media!=sheetMedia){
					continue;
				}
			}
			sheets.push(document.styleSheets[i]);
		}
		return sheets;
	}
	window["yc"]["getStyleSheets"]=getStyleSheets;

	function addStyleSheet(url,media){//添加样式表
		media=media||'screen';
		var link=document.createElement("link");
		link.setAttribute("href",url);
		link.setAttribute("media",media);
		link.setAttribute("rel","stylesheet");
		link.setAttribute("type","text/css");
		document.getElementsByTagName("head")[0].appendChild(link);
	}
	window["yc"]["addStyleSheet"]=addStyleSheet;

	function removeStyleSheet(url,media){//移除样式表
		var styles=getStyleSheets(url,media);
		for(var i=0;i<styles.length;i++){
			var node=styles[i].ownerNode||styles[i].owningElement;
			styles[i].disabled=true;//禁用样式表
			node.parentNode.removeChild(node);//移除节点
		}
	}
	window["yc"]["removeStyleSheet"]=removeStyleSheet;

	function addCSSRule(selector,styles,index,url,media){
		var declaration='';
		for(var property in styles){
			if(!styles.hasOwnProperty(property)){
				continue;
			}
			declaration+=property+":"+styles[property]+";";
		}
		var styleSheets=getStyleSheets(url,media);
		var newindex;
		for(var i=0;i<styleSheets.length;i++){
			if(styleSheets[i].insertRule){
				newindex=(index>=0?index:styleSheets[i].cssRules.length);
				styleSheets[i].insertRule(selector+"{"+declaration+"}",newindex);
			}else if(styleSheets[i].addRule){
				newindex=(index>=0?index:-1);
				styleSheets[i].addRule(selector,declaration,newindex);
			}
		}
	}
	window["yc"]["addCSSRule"]=addCSSRule;

	function editCSSRule(selector,styles,url,media){
		var styleSheets=getStyleSheets(url,media);
		for(var i=0;i<styleSheets.length;i++){
			var rules=styleSheets[i].rules||styleSheets[i].cssRules;//取出样式表中的规则表
			if(rules){
				selector=selector.toUpperCase();
				for(var j=0;j<rules.length;j++){
					if(rules[j].selectorText.toUpperCase()==selector){
						for(var property in styles){
							if(styles.hasOwnProperty(property)){
								rules[j].style[camelize(property)]=styles[property];
							}
						}
					}
				}
			}
		}
	}
	window["yc"]["editCSSRule"]=editCSSRule;

	function getStyle(element,property){
		if(!(element=$(element))) return false;
		var value=element.style[camelize(property)];
		if(!value){
			if(document.defaultView&&document.defaultView.getComputedStyle){
				//w3c
				var css=document.defaultView.getComputedStyle(element,null);
				value=css?css.getPropertyValue(property):null;
			}else if(element.currentStyle){
				//ie
				value=element.currentStyle[camelize(property)];
			}
		}
		return (value=="auto")?"":value;
	}
	window["yc"]["getStyle"]=getStyle;
	window["yc"]["getStyleById"]=getStyle;

//========================================JSON的操作======================================
	//将一个json格式的字符串转换成一个对象，且带过滤功能
	function parseJSON(str,filter){
		//var obj=JSON.parse(str);
		var obj=eval("("+str+")");
		var objfilter=function(obj){
			for(var i in obj){
				if(obj!=null && typeof obj[i]=="object"){
					objfilter(obj[i]);
				}else if(filter!=null && typeof filter=="function"){
					obj[i]=filter(i,obj[i]);
				}
			}
		}
		objfilter(obj);
		return obj;
	}

	// function parseJSON(str,filter){
	// 	var result=eval("("+str+")");
	// 	if(filter!=null&& typeof(filter)=="function"){
	// 		for(var i in result){
	// 			//alert(typeof(result[i]));
	// 			if(typeof(result[i])=='object' && typeof result[i]!="function"){
	// 				var jsonstr=JSON.stringify(result[i]);
	// 				result[i]=parseJSON(jsonstr,filter);
	// 			}else{
	// 				result[i]=filter(i,result[i]);
	// 			}
	// 		}
	// 	}
	// 	console.log(result);
	// 	return result;
	// }
	window["yc"]["parseJSON"]=parseJSON;

})();

//========================================JSON的操作======================================
//将一个对象转换成json格式的字符串
Object.prototype.toJSONString=function(){
	var jsonarr=[];
	for(var i in this){
		if(this.hasOwnProperty(i)){
			jsonarr.push("\""+i+"\":"+this[i].toJSONString());
		}
	}
	var r=jsonarr.join(",\n");
	r="{"+r+"}";
	return r;
};
Array.prototype.toJSONString=function(){
	var json=[];
	for(var i=0;i<this.length;i++){
		json[i]=(this[i] != null) ? this[i].toJSONString() : "null";
	}
	return "["+json.join(",")+"]";
};
String.prototype.toJSONString=function(){
	return '"'+  this.replace(/(\\|\")/g,"\\$1").replace(/\n|\r|\t/g,function(){
		var a=arguments[0]; 
		return (a=='\n') ? '\\n' : (a=='\r') ? '\\r' : (a=='\t') ? '\\t' : "" })  +'"';
	//return '"'+this+'"';
};
Number.prototype.toJSONString=function(){return this};
Boolean.prototype.toJSONString=function(){return this};
Function.prototype.toJSONString=function(){return this};
RegExp.prototype.toJSONString=function(){return this};



Function.prototype.method=function(name,func){
	if(!this.prototype[name]){
		this.prototype[name]=func;
	}
	return this;
};