// function createContainer(){
// 	var container=document.createElement("div");
// 	container.id="slideshow";

// 	var img=document.createElement("img");
// 	img.src="topics.gif";
// 	img.alt="网页设计";
// 	img.id="preview";

// 	container.appendChild(img);
// 	yc.insertAfter(container,"alltabs");
// }

function moveImg(){
	if(!yc.isCompatible()) return false;
	var aAs=yc.$("alltabs").getElementsByTagName("a");
	var img=yc.$("preview");
	for(var i=0;i<aAs.length;i++){
		aAs[i].index=i;
		aAs[i].onmouseover=function(){
			var className="toRight"+this.index;
			yc.removeClassName(img,"def");
			yc.addClassName(img,className);
		}
		aAs[i].onmouseout=function(){
			var className="toRight"+this.index;
			yc.addClassName(img,"def");
			yc.removeClassName(img,className);
		}
	}
}

//yc.addLoadEvent(createContainer);
yc.addLoadEvent(moveImg);