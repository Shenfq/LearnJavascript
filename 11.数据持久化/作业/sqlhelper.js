 function SqlHelper(dbname,size){//创建一个数据库，并指定数据库名和数据库的大小，单位（M）
	this.dbname=dbname;
	this.size=size;
	this.init();
}

SqlHelper.prototype={
	init:function(){//初始化一个数据库
		if(!this.db){
			if(window.openDatabase){//判断该浏览器是否支持websql的API
				this.db=openDatabase(this.dbname,1.0,"database",this.size*1024*1024);
			}else{
				return false;
			}
		}
	},

	exesql:function(sql,replace){//执行普通的sql语句
		if(replace){
			this.db.transaction(function(tx){tx.executeSql(sql,replace);});
		}else{
			this.db.transaction(function(tx){tx.executeSql(sql,[]);});
		}
		
	},

	 //创建一张表   
	 //tableName 表名   
	 //表字段信息，是一段json格式的数据    如：{"id":"int primary key autoincrement","uname":"text"}
	createTable:function(tableName,fields){
	    var sql = 'CREATE TABLE IF NOT EXISTS '+tableName+' (';
	    for(i in fields){
	        if(fields.hasOwnProperty(i)){
	        	sql+=i+" "+fields[i]+",";
	        }
	    }
	    sql = sql.substr(0,sql.length-1);
	    sql += ")";

	    this.exesql(sql);
	},

	 //查询
	 //tableName：表名     selectFields：要查询的字段，查询所有用 *
	 //whereStr   where语句，参数用?代替    例如，"id=?"
	 //wherParams    用来替代上面参数中的 ? 一个数组
	 //callback 对select返回数据的操作的回调函数
	select: function(tableName, selectFields, whereStr, wherParams, callback) {
		var sql = "SELECT " + selectFields + " FROM " + tableName;
		if (typeof(whereStr) != "undefined" && typeof(wherParams) != "undefined" && whereStr != "") {
			sql += " where " + whereStr;
		}
		this.db.transaction(function(tx) {
			tx.executeSql(sql, wherParams, function(tx, results) {
				if (results.rows.length < 1) {
					if (typeof(callback) == 'function') {
						callback(false)
					} //没有数据
				} else {
					if (typeof(callback) == 'function') {
						callback(results.rows)
					}
				}
			}, function(tx, error) {
				return false;
			});
		});
	},


	//删除数据
	//tableName：表名    
	//whereStr：where语句，参数用?代替    例如，"id=?"
	//wherParams：用来替代上面参数中的 ? 一个数组
	deleteRow:function (tableName,whereStr,wherParams){
	    var sql = "delete from "+tableName;
	    if(typeof(whereStr)!="undefined" && typeof(wherParams)!="undefined"){
	        sql += " where " + whereStr;
	    }
	    this.exesql(sql,wherParams);
	}
}