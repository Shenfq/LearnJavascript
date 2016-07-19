function preparePlaceHolder(){//实现html  js  的分离，由dom来动态的创建和管理img标签
	if(!yc.isCompatible()) return false;
	if(!yc.$("imagegallery")) return false;
	var placeholder=document.createElement("img");
	placeholder.src="images/placeholder.png";
	placeholder.id="placeholder";
	placeholder.alt="图片浏览";

	var description=document.createElement("p");
	description.id="description";
	description.innerHTML="请选择一张图片";

	var gallery=yc.$("imagegallery");
	yc.insertAfter(placeholder,gallery);
	yc.insertAfter(description,placeholder);
}

function showPic(whichPic){
	if(!yc.$("placeholder")) return false;
	var placeholder=yc.$("placeholder");
	if(placeholder.nodeName!="IMG") return false;
	placeholder.src=whichPic.getAttribute("href");
	if(yc.$("description")){
		var text=whichPic.getAttribute("title")?whichPic.getAttribute("title"):"";
		var description=yc.$("description");
		if(description.firstChild.nodeType==3){
			description.firstChild.nodeValue=text;
		}
	}
	return true;
}

function preparePic(){
	if(!yc.isCompatible()) return false;
	if(!yc.$("imagegallery")) return false;
	var gallery=yc.$("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			return showPic(this)?false:true;
		}
	}
}

yc.addLoadEvent(preparePlaceHolder);
yc.addLoadEvent(preparePic);