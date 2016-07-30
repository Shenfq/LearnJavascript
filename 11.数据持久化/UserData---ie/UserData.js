UserData={
	storageObject:null,
	init:function(){
		if(!this.storageObject){
			this.storageObject=document.createElement('div');
			this.storageObject.addBehavior('#default#userData');   //将节点指定为一个UserData
			this.storageObject.style.display='none';
			document.body.appendChild(this.storageObject);
		}
	},
	set:function(key,value){
		if(!this.storageObject){
			this.init();
		}
		this.storageObject.setAttribute(key,value);   //在创建的节点对象中存入数据
		this.storageObject.save('a');    //将对象中的数据序列化到磁盘上 ， save()中的参数是文件名
		return value;
	},
	get:function(key){
		if(!this.storageObject){
			this.init();
		}
		this.storageObject.load('a');   //从磁盘上读取 a这个文件，将a 中的数据反序列化到节点div的UserData中
		return this.storageObject.getAttribute(key);
	},
	del:function(key){
		if(!this.storageObject){
			this.init();
		}
		this.storageObject.removeAttribute(key);
		this.storageObject.save('a');   //删除完div中的UserData数据后， 在把空的a文件覆盖到原来的a文件上
	},
	isAvailable:function(){
		return ('\v'=='v');//检测是否为ie浏览器，在ie浏览器中，'\v' 和 'v' 是相等的 
							//	在其他浏览器中   '\v' 当成一个转义字符看，表示垂直制表位
	}
}