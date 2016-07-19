function stripeTables(){
	if(!yc.isCompatible()){return false;}
	var tables=document.getElementsByTagName("table");
	var odd,rows;
	for(var i=0;i<tables.length;i++){
		odd=false;
		rows=tables[i].getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd){
				yc.addClassName(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}

yc.addLoadEvent(stripeTables);