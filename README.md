# collectApplication
埋点程序

如果要在页面中引入进行如下的配置

在head标签中添加
<script>
	var _YS = _YS || [];
	_YS.push(["Url","http://192.168.1.4:9999/system/buriedPoint.howard?"]);
	// 收集的平台 host，默认不需要配置
	_YS.push(["systemName","myWap"]);
	// 用户自定义收集字段
	_YS.userConfig = {
	author: "mayijie"
	};
	_YS.push(["_setAccount", "YS-Test-1"]);
	//_YS.push(["Action","Title"]);
	_YS.push(["Target","a","div","button"]);
	_YS.syserror = [];
	//记录客户端脚本错误 
	window.onerror = function(error) {
	try { 
	var msg; 
	for (var i = 0; i < arguments.length; i++) { 
	if (i == 0 || i == 2) { 
	msg += " | " + arguments[i]; 
	} 
	} 
	if (msg.length > 0 ) { 
	_YS.syserror.push("syserror:"+msg);
	} 
	return true; 
	} catch (e) { }; 
	};  
</script>


在body标签之后添加
 <script>
  
	(function() {
	var collect = document.createElement("script");
	collect.type = "text/javascript";
	collect.async = true;
	// collect.js 所在的地址。如果是在本地直接改成本地地址；如果是在第三方服务器上，该第三方必须提供 http 和 https 地址。
	collect.src = "http://192.168.1.4:8080/advertisement/collect.js";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(collect, s);
	})();
	
</script>

