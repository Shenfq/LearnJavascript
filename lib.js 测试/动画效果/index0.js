function prepareSlideShow(){
	if(!yc.isCompatible()) return false;
	if(!yc.$("alltabs")) return false;
	if(!yc.$("preview")) return false;
	var preview=yc.$("preview");
	preview.style.position="absolute";
	preview.style.left="0px";
	preview.style.top="0px";
	var list=yc.$("alltabs");
	var links=list.getElementsByTagName("a");

	// for(var i=0;i<links.length;i++){
	// 	links[i].index=i+1;
	// 	yc.addEvent(links[i],"mouseover",function(){
	// 		//yc.moveElement("preview",this.index*(-100),0,10);
	// 		console.log(this.index*(-100));
	// 	});
	// }

	for(var i=0;i<links.length;i++){
		(function(index){
			yc.addEvent(links[index],"mouseover",function(){
				yc.moveElement("preview",(index+1)*(-100),0,10);
			});
		})(i);
	}
}

yc.addLoadEvent(prepareSlideShow);