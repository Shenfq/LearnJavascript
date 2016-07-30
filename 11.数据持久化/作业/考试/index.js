function ShowQuestions(questions){
	this.que=questions;
}
ShowQuestions.prototype={
	showque:function(){
		var ques=yc.$("questions");
		//插入剩余时间的div
		var timebox=document.createElement("div");
		timebox.innerHTML="剩余时间(单位 s)：";
		var time=document.createElement("span");
		timebox.appendChild(time);
		var settime=new Date().getTime()+50000;
		timer=setInterval(function(){//给剩余时间设定一个定时器，保证实时更新
			var innertime=parseInt((settime-new Date().getTime())/1000);
			if(innertime==0){
				submit();
				clearInterval(timer);
			}
			time.innerHTML=innertime;
		},50);
		document.body.insertBefore(timebox,ques);
		//插入所有的题目
		for(var i=0;i<this.getTolal();i++){
			var num=document.createElement("span");
			num.id="q"+i;
			num.innerHTML=this.que[i][0]+"、";
			ques.appendChild(num);
			var question=document.createElement("span");
			question.innerHTML=this.que[i][1];
			ques.appendChild(question);
			var options=document.createElement("p");//当前题目的选项
			for(var j=0;j<4;j++){
				var inp=document.createElement("input");
				inp.type="radio";
				inp.name="ans"+i;
				inp.value=j+1;
				(function(i,j){
					yc.addEvent(inp,"change",function(){
						ansarr[i]=j+1;
						console.log(ansarr);
						sqlhelper.exesql("delete from answer");
						sqlhelper.exesql("insert into answer(num,answer) values(1,'"+ansarr.join()+"')");
					});
				})(i,j);
				
				var ans=document.createElement("span");
				ans.innerHTML="&#"+(65+j)+";、"+this.que[i][2+j];
				options.appendChild(inp);
				options.appendChild(ans);
			}
			ques.appendChild(options);
			ques.appendChild(document.createElement("hr"));
		}
		var btn=document.createElement("input");
		btn.type="button";
		btn.value="提交试卷";
		btn.onclick=submit;
		ques.appendChild(btn);
		var getlastans=document.createElement("button");
		getlastans.innerHTML="恢复上次答案";
		getlastans.onclick=function(){sqlhelper.select("answer","answer","num=?",[1],showlastans);}
		yc.prependChild(document.body,getlastans);
	},
	getTolal:function(){
		return this.que.length;
	}
}
function showlastans(rows){
	var answers=rows[0].answer;
	var ansarr=answers.split(",");
	var allp=document.getElementsByTagName("p");
	for(var i=0;i<allp.length;i++){
		var allopt=allp[i].getElementsByTagName("input");
		for(var j=0;j<allopt.length;j++){
			if(ansarr[i]==j+1){
				allopt[j].checked=true;
			}
		}
	}
}
function submit(){
	clearInterval(timer);//清除定时器
	var allinput=document.getElementsByTagName("input");
	for(var i=0;i<allinput.length;i++){
		allinput[i].disabled=true;
	}
	var ans=[];
	for(var i=0;i<allque.que.length;i++){
		var num="ans"+i;
		var answer=document.getElementsByName(num);
		var flag=true;
		for(var j=0;j<answer.length;j++){
			if(answer[j].checked){
				ans.push(answer[j].value);
				flag=false;
			}
		}
		if(flag){
			ans.push("0");
		}
	}
	var score=0;
	for(var i=0;i<allque.que.length;i++){
		if(ans[i]==allque.que[i][6]){
			score+=10;
		}
	}
	var allscore=que.length*10;
	var newpage="submit.html#"+allscore+"_"+score;
	window.open(newpage,"new window","width=300,height=300");
	close();
}


//往数据库中插入数据
var sqlhelper=new SqlHelper("Questions",2);
var queFields={"num":"int not null primary key","que":"text","opt1":"text","opt2":"text","opt3":"text","opt4":"text","ans":"int"};
sqlhelper.createTable("question",queFields);
//在sqlite中一次插入多条数据的语法：insert into tablename(fields) values(value1),(value2),(value3).....
sql="insert into question(num,que,opt1,opt2,opt3,opt4,ans) values(1,'中国的首都？','北京','长沙','上海','重庆',1)";
sql+=",(2,'湖南的省会？','北京','长沙','上海','重庆',2)";
sql+=",(3,'湖南位于中国的？','北部','南部','西部','东部',2)";
sql+=",(4,'下列哪个是沿海城市？','北京','衡阳','厦门','成都',3)";
sql+=",(5,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(6,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(7,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(8,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(9,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(10,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(11,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(12,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(13,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(14,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
sql+=",(15,'世界四大洋中面积最小的是?','太平洋','大西洋','印度洋','北冰洋',4)";
//sql="delete from question";
sqlhelper.exesql(sql);

var ansarr;

sqlhelper.select("answer","answer","num=?",[1],createans);
function createans(rows){
	if(rows){
		ansarr=rows[0].answer.split(",");
	}else{
		ansarr=new Array(15);
		for(var i=0;i<ansarr.length;i++){
			ansarr[i]=0;
		}
		//创建一个表用来存放选择的每项答案
		var ansFields={"num":"int not null primary key","answer":"text"};
		sqlhelper.createTable("answer",ansFields);
		sqlhelper.exesql("insert into answer(num,answer) values(1,'"+ansarr.join()+"')");
	}
}

