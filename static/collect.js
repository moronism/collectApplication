(function(root) {
   'use strict';
    //公用方法
    var HowardHepler = {};
	 //
	HowardHepler.pushHistory=function () {  
		var state = {  
			title: "title",  
			url: "#"  
		};  
		window.history.pushState(state, "title", "");  
	}  
	
	HowardHepler.pushHistory();
	//全局记时器
	var globalTimer={};
    //用来记录当前在记时还是已经结束记时true代表在记时,false代表没有在记时
	var globalPoint=true;
	
    // 唯一标示 uuid
    HowardHepler.uuid = function() {
        return 'Howard_test_app_uuid'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
        });
    };

    // 得到cookie
    HowardHepler.getCookie = function(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr= document.cookie.match(reg)){
        return unescape(arr[2]);
      } else {
        return null;
      }
    };

    HowardHepler.setCookie = function(name, value, time) {
      if(time) {
        document.cookie = name + "=" + escape(value) + ";expires=" + time;
      } else {
        document.cookie = name + "=" + escape(value) + ";";
      }
    };

    //遍历
    /**
     * @method each
     * @parame loopable 要遍历的对象
     * @parame callback 回调函数
     * @parame self 上下文
     **/
     HowardHepler.each = function(loopable, callback, self) {
       	var additionalArgs = Array.prototype.slice.call(arguments,3);
       	if(loopable) {	
       	  if(loopable.length === +loopable.length) {
       	  	var i;
       	  	for(var i=0; i<loopable.length; i++) {
       	  	  callback.apply(self, [loopable[i],i].concat(additionalArgs));
       	  	}
       	  } else {
       	  	  for(var item in loopable) {
       	  	  	callback.apply(self, [loopable[item], item].concat(additionalArgs));
       	  	  }
       	  }
       	}
     }; 

   //扩展
   /**
    *@method extend
    *@parame base 要扩展的对象
    *@return base  返回扩展后的对象
    **/
    HowardHepler.extend = function(base) {
      HowardHepler.each(Array.prototype.slice.call(arguments, 1), function(extensionObject) {
      	HowardHepler.each(extensionObject, function(value, key) {
      	  if(extensionObject.hasOwnPrototype(key)) {
      	  	base[key] = value;
      	  }
      	});
      });
      return base;	
    };

   //返回数组元素所在的位置，确定是否包含在里面
    /**
     *@method indexOf
     *@parame arrayToSearch 查找的对象
     *@parame item 查找的元素
     *@return args  返回位置
     **/
     HowardHepler.indexOf = function(arrayToSearch,item){
       	if(Array.prototype.indexOf){
       		return arrayToSearch.indexOf(item);
       	} else {
       		for(var i=0; i< arrayToSearch.length; i++){
       			if(arrayToSearch[i] === item) return i;
       		}
       		return -1;
       	}
     }; 

    // 绑定事件
    HowardHepler.on = function(target, type, handler) {
       if(target.addEventListener) {
       	  target.addEventListener(type, handler, false);
       } else {
       	  target.attachEvent("on" + type, 
       	  	function(event) {
       	  	   return handler.call(target, event);
       	  	}, false);
       }	
    };
   
    // 请求，保存数据
    HowardHepler.send = function(obj, url) {
        var img = new Image(0, 0);
        img.src = url + obj + '&random=' +Math.random();
		
	    //img.src = url + obj;
    };

  	HowardHepler.changeJSON2Query =  function (jsonObj) {
  		var args = '';
  		for (var i in jsonObj) {
			
  			if (args != '') {
  				args += '&';
  			}
			args += i + '=' + jsonObj[i];
  		}
  		return args;
  	};

    // 监听页面所有ajax请求
    /**
     * @parames {function} callback 回调 
     */
    HowardHepler.listenAjax = function(callback) {
       var open = window.XMLHttpRequest.prototype.open;
       var send = window.XMLHttpRequest.prototype.send;

       var openReplacement = function(method,url) {
          open.apply(this, arguments);
       };

       var readystatechangeReplacement = function() {
          if(this.readyState === 4 && this.status === 200) {
            callback && callback(this);
          }
       };

       var sendReplacement = function() {
          var that = this; 
          send.apply(this, arguments);
          setTimeout(function() {
             that.onreadystatechange = readystatechangeReplacement; 
          },0);
       };

       window.XMLHttpRequest.prototype.open = openReplacement;
       window.XMLHttpRequest.prototype.send = sendReplacement;
    };
	/**调用微信JSSDK在点击关闭按钮的时候使用**/
	/**
		http://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign
		从这个地址获取signature
	**/
    /**HowardHepler.weixinConfig=function(){
		//此处没有调试成功
		wx.config({
			debug: false,
			//debug: true,
			appId: 'wx6d70526a37c6c0d6',
			timestamp: 1492269598,
			nonceStr: 'aace2f4c-5974-490d-ab0b-5e59450a19e7',
			signature: '4d7c71af02fdd1a1e9b623d5d43102ac1f56e13a',
			jsApiList: [
				'checkJsApi',
				'closeWindow' 
			]
		});
		
	}**/
	
	
    var HowardBuriedPoint = {};
    var host = window.location.host;
    
    HowardBuriedPoint.parmas = {};

    HowardBuriedPoint.url = '';

    HowardBuriedPoint.uuid = HowardHepler.uuid();

    HowardBuriedPoint.setParames = function() {
       if(document) {
       	  HowardBuriedPoint.parmas.domain = document.domain || '';
       	  HowardBuriedPoint.parmas.url = document.URL || '';
       	  HowardBuriedPoint.parmas.title = document.title || '';
       	  HowardBuriedPoint.parmas.referrer = document.referrer;
       }
       if(window && window.screen) {
       	  HowardBuriedPoint.parmas.sh = window.screen.height || 0;
       	  HowardBuriedPoint.parmas.sw = window.screen.width || 0;
       	  HowardBuriedPoint.parmas.cd = window.screen.colorDepth || 0;
       }
  	   if (navigator) {
  		   HowardBuriedPoint.parmas.lang = navigator.language || '';
  		   HowardBuriedPoint.parmas.userAgent = navigator.userAgent || '';
  	   }
  	   if(document && document.cookie) {
  	   	   HowardBuriedPoint.parmas.cookie = document.cookie;
  	   }
  	   if(!HowardBuriedPoint.parmas.systemName) {
  	   	   HowardBuriedPoint.parmas.systemName = host.split('.')[0] || '';
  	   }
       HowardBuriedPoint.parmas.target = [];
       //解析 配置项
       if(typeof _YS != "undefined") {
       	  for(var i in _YS) {
       	  	switch(_YS[i][0]) {
       	  		case '_setAccount':
       	  		    HowardBuriedPoint.parmas.accout = _YS[i][1];
       	  		    break;
       	  		case 'Action':
       	  		    HowardBuriedPoint.parmas.action = _YS[i].slice(1);
       	  		    break;
       	  		case 'Target':
       	  		    HowardBuriedPoint.parmas.target = _YS[i].slice(1);
       	  		    break;
       	  		case 'Url':
       	  		    HowardBuriedPoint.url = _YS[i][1];
       	  		    break;
       	  		case 'CookieBool':
       	  		    if(_YS[i][1] == 'false') {
       	  		   	    delete HowardBuriedPoint.parmas.cookie;
       	  		    } 
       	  		    break;   
       	  		case 'systemName': // 指定哪个平台下的数据标记
       	  		    HowardBuriedPoint.parmas.systemName = _YS[i][1];   
       	  		    break;      
       	  		default:
       	  		    break;       
       	  	}
       	  }
          if(_YS.syserror && _YS.syserror.length) {
            HowardBuriedPoint.parmas.syserror = _YS.syserror;
            _YS.syserror = [];
          } else {
            delete HowardBuriedPoint.parmas.syserror;
          }

          // 用户自定义字段
          if(_YS.userConfig) {
             for(var k in _YS.userConfig) {
                 if(_YS.userConfig.hasOwnProperty(k)) {
                     this.parmas[k] = _YS.userConfig[k]
                 }
             }
          }
       } else {
       	  throw "必须定义全局配置变量 _YS，配置指定的请求Url。示例： var _YS = _YS || []; _YS.push(['Url','127.0.0.1/users?']);";
       }
    };

    HowardBuriedPoint.getParames = function() {
        return HowardBuriedPoint.parmas;
    };

    // 用户的停留时间
    HowardBuriedPoint.timer = function() {
    	this.disp = new Date().getTime();
    };
    /**
	事件冒泡在一个对象上触发某类事件（比如单击onclick事件）	如果此对象定义了此事件的处理程序，那么此事件就会调用这个处理程序，如果没有定义此事件处理程序或者事件返回true，	那么这个事件会向这个对象的父级对象传播，从里到外，直至它被处理（父级对象所有同类事件都将被激活），
	或者它到达了对象层次的最顶层，即document对象（有些浏览器是window）
	**/
	/**监听事件 
	超过30s对页面没有什么响应就停止计时
	超过15分钟，弹出窗口询问用户是否在线，如果没有响应，停止计时，响应后继续计时，待下一个15分钟再询问。
	如果对页面有所操作拦截到了用户响应页面事件后将倒计时定时器值为初始值
	**/
    HowardBuriedPoint.event = function() {
		//HowardHepler.weixinConfig();
      	var that = this;
		
		//可以通过document.hidden属性判断当前页面是否是激活状态。
		var hiddenProperty = 'hidden' in document ? 'hidden' :    
			'webkitHidden' in document ? 'webkitHidden' :    
			'mozHidden' in document ? 'mozHidden' :    
			null;
		var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
		/**监控页面是否被激活**/
		var onVisibilityChange = function(){
			if (!document[hiddenProperty]) {  
			    //TODO 页面激活操作逻辑(开始记录时间)
				//计时function
				//再重置SecondTimer
				that.setParames();
				//if(true==globalPoint){
				globalPoint=true;
				HowardBuriedPoint.initSecondTimer();
				that.parmas.clickElement = 'ExecutiveOperation(页面激活操作逻辑开始记录时间再重置SecondTimer)';	
				//}else{
					//that.parmas.clickElement = 'ExecutiveOperation(页面激活操作逻辑已经超过的最大未操作时间所以不再记时)';	
				//}		
      		    HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);	   
			}else{
			    //TODO 页面非激活(停止记录时间)
				//停止计时function
				//停止SecondTimer
			    globalTimer.clearTimeoutTimer(globalTimer.secondTimer);
      		    that.setParames();	
				that.parmas.clickElement = 'ExecutiveOperation(页面非激活操作逻辑停止记录时间停止SecondTimer)';
      		    HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);
			}
		}
		document.addEventListener(visibilityChangeEvent, onVisibilityChange);
		
		// 触摸事件跟鼠标事件的触发先后顺序：
		//Touchstart > toucheend > mousemove > mousedown > mouseup > click
		HowardHepler.on(document.body,'touchstart', function(e) {
      		that.setParames();	
			if(true==globalPoint){
				//停止SecondTimer
				globalTimer.clearTimeoutTimer(globalTimer.secondTimer);
				//在重置SecondTimer
				HowardBuriedPoint.initSecondTimer();
				that.parmas.clickElement = 'ExecutiveOperation(touchstart事件重置SecondTimer定时器)';
			}else{
				that.parmas.clickElement = '页面激活操作逻辑已经超过的最大未操作时间所以不再记时';
			}
      		HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);
		});
		/** 移动端不监听click事件
      	HowardHepler.on(document.body,'click', function(e) {
      		var $target = e.target || e.srcElement;
            var currtagName = $target.nodeName.toLowerCase();
            if(currtagName == "body" || currtagName == "html" || currtagName == "") {
               return 0;
            }
      		if(HowardHepler.indexOf(that.parmas.target, currtagName) > -1 || $target.getAttribute('HowardBuriedPoint')) {
	             if(!HowardHepler.getCookie('_YS_userAccect')) {
	                HowardHepler.setCookie('_YS_userAccect', that.uuid);
	                // 初次进入网站，返回用户凭证。
	                that.parmas.cookie = '_YS_userAccect='+that.uuid + ';'+ that.parmas.cookie;
	             }
	             var attrCo = $target.getAttribute('HowardBuriedPoint');
	             if(attrCo) {
	               that.parmas.HowardBuriedPointMark = attrCo;
	             } else {
	               delete that.parmas.HowardBuriedPointMark; 
	             }

                that.parmas.clickElement = '{ExecutiveOperation:click事件重置SecondTimer定时器,nodeName:'+$target.nodeName +
                   ',title:' + $target.title + ',text:' +$target.innerHTML + '}';
      		    that.setParames();	
      		    HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);
      		}
      	});
        **/
		// 
        /**
		window.onpopstate来监听url的变化,并且可以获取存储在该历史记录点的状态对象
		每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件
		**/			
		window.addEventListener("popstate", function(e) { 
			//TODO 微信内置浏览器返回操作逻辑(停止记录时间)	
            //function 停止记录时间			
			that.setParames();	
			that.parmas.clickElement = 'ExecutiveOperation(微信内置浏览器返回操作逻辑停止记录时间)';
			HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);
		    //go(-1): 返回上一页，原页面表单中的内容会丢失；back(): 返回上一页，原页表表单中的内容会保留
			//history.go(-1):后退+刷新 history.back():后退 
			history.back();
        }, false);    
        // 用户离开页面时返回逗留时间
		/** 在非微信浏览器环境或者 PC 可以使用 JS：window.onbeforeunload 来监控和回调
        window.onbeforeunload = function(evt){
           that.parmas.disp = new Date().getTime() - that.disp;
           if(!HowardHepler.getCookie('_YS_userAccect')) {
              HowardHepler.setCookie('_YS_userAccect', that.uuid);
           }
           delete that.parmas.HowardBuriedPointMark;
           delete that.parmas.clickElement;
    	   that.setParames();	
    	   HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);
        }; 
		**/
		
    };
	
    globalTimer.controlSecondTimerFunc=function(){
		globalPoint=false;
		//TODO 
		//结束计时function
		HowardBuriedPoint.setParames();	
		HowardBuriedPoint.parmas.clickElement = 'ExecutiveOperation(30秒执行页面结束计时将全局变量globalPoint置为false)';
		HowardHepler.send(HowardHepler.changeJSON2Query(HowardBuriedPoint.getParames()), HowardBuriedPoint.url);		
	}
	
	globalTimer.controlMinuteTimerFunc=function(){
		globalPoint=false;
		//首先暂停
		var check = confirm("还在使用吗？如你不点击确定，系统将会退出计时。");
		//TODO
		HowardBuriedPoint.setParames();
		HowardBuriedPoint.parmas.clickElement = 'ExecutiveOperation(15分钟执行controlMinuteTimerFunc将全局变量globalPoint置为false)';		
		HowardHepler.send(HowardHepler.changeJSON2Query(HowardBuriedPoint.getParames()), HowardBuriedPoint.url);	
	}
	
	globalTimer.clearTimeoutTimer=function(intervalID){
		window.clearTimeout(intervalID); 
	}
	
	HowardBuriedPoint.initSecondTimer=function(){
		//30s对页面没有响应停止记时(如果有操作就需要将定时器重置)
		globalTimer.secondTimer=window.setTimeout(globalTimer.controlSecondTimerFunc, 10000);
	}
	
	HowardBuriedPoint.initMinuteTimer=function(){
		//超过15分钟弹出窗口询问用户是否在线
		globalTimer.minuteTimer=window.setTimeout(globalTimer.controlMinuteTimerFunc, 900000);
	}
	
	HowardBuriedPoint.timeController=function(){
		//setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式
		//setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式
		//判断是否属于文章类如果是文章类开启此计时器
		HowardBuriedPoint.initSecondTimer();
		//判断是否属于视频类如果是视频类开启此计时器
		HowardBuriedPoint.initMinuteTimer();
	}
	
    HowardBuriedPoint.init = function() {
        var that = this;
        /*
        HowardHepler.listenAjax(function(request) {
          var obj = {
            response: request.responseText,
            responseURL: request.responseURL
          };
          that.parmas.request = JSON.stringify(obj);
          that.setParames(); 
          HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);
          delete that.parmas.request;
        });
        */
        that.timer();  
        that.event();
        that.setParames();
        if(!HowardHepler.getCookie('_YS_userAccect')) {
           HowardHepler.setCookie('_YS_userAccect', that.uuid);
        }
        //TODO 页面进入开始进行计时	
		that.parmas.clickElement = '{ExecutiveOperation:页面进入开始进行计时}';	   
        HowardHepler.send(HowardHepler.changeJSON2Query(that.getParames()), that.url);
	    that.timeController();
        delete that.parmas.syserror;
    };

    HowardBuriedPoint.init();
	

})(window);