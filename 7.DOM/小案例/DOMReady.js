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