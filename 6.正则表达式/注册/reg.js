function $(id){
	return document.getElementById(id);
}

//验证会员名
//会员名以字母或汉字开头，由3-18位的数字、字母、下划线、汉字、组成
function checkusername(obj,thisid){
	//alert($(thisid).className);
	// alert(obj.value);
	var reg=/^[a-zA-Z\u4e00-\u9fa5][_1-9a-zA-Z\u4e00-\u9fa5]{2,17}$/; 
	if(reg.test(obj.value)){
		$(thisid).className="ok";
	}else{
		$(thisid).className="err";
	}
}

//验证姓名
//请输入您的真实姓名
function checkname(obj,thisid){
	//alert(obj.value);
	var reg=/^[\u4e00-\u9fa5]{2,6}$/;
	if(reg.test(obj.value)){
		$(thisid).className="ok";
	}else{
		$(thisid).className="err";
	}
}

//验证密码
//密码由6-16位的数字、字母、下划线组成
function checkpwd(obj,thisid){
	var reg=/^[_\wa-zA-Z]{6,16}$/;
	if(reg.test(obj.value)){
		$(thisid).className="ok";
	}else{
		$(thisid).className="err";
	}
}

//验证重复密码
function checkpwda(obj,thisid,frontid){
	if(obj.value==$(frontid).value){
		$(thisid).className="ok";
	}else{
		$(thisid).className="err";
	}
}

//验证证件号
function checkidnum(obj,thisid){
	var reg=/^[1-9]\d{5}[1-2]\d{3}((0[1-9])|1[0-2])(([0-2]\d)|3[0-1])\d{3}([0-9]|X)$/; 
	if(reg.test(obj.value)){
		$(thisid).className="ok";
	}else{
		$(thisid).className="err";
	}
}

//验证email
function checkemail(obj,thisid){
	var reg=/^[1-9a-zA-Z]\w+@\w+\.[a-zA-Z]{1,3}$/; 
	if(reg.test(obj.value)){
		$(thisid).className="ok";
	}else{
		$(thisid).className="err";
	}
}
//验证联系方式
function checkphonenum(obj,thisid){
	var reg=/^1[3,4,5,7,8]\d{9}$/; 
	if(reg.test(obj.value)){
		$(thisid).className="ok";
	}else{
		$(thisid).className="err";
	}
}