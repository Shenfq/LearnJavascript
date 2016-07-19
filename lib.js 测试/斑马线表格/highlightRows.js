function highlightRows(){
	if(!yc.isCompatible()) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].onmouseover=function(){
			// this.style.fontWeight="bold";
			// this.style.color="#f00";

			yc.addClassName(this,"mouseover");
		}
		rows[i].onmouseout=function(){
			// this.style.fontWeight="normal";
			// this.style.color="#000";
			yc.removeClassName(this,"mouseover");

		}
	}
}
yc.addLoadEvent(highlightRows);