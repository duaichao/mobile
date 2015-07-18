/**
 * 消息提醒插件注入
 * **/
(function(cordova) {
	var define = cordova.define;
	define("cordova/plugin/notify",function(require, exports, module){
		var argscheck = require('cordova/argscheck'),
	    exec = require('cordova/exec');
		exports.send=function(message,successCB,failCB){
				argscheck.checkArgs('AFF', 'notify.send', arguments);
				//console.log("send notification["+message[1]+"]");
		        if (!message) {
		        	failCB && failCB("请输入要通知的信息.");
		        } else {
		            exec(successCB, failCB, "Notify", "send", message);
		        }
			};
	});
	cordova.addConstructor(function() {
		if (!window.plugins) {
			window.plugins = {};
		}
		//console.log("将插件注入cordova...");
		window.plugins.notify = cordova.require("cordova/plugin/notify");
		//console.log("注入结果：" + typeof(window.plugins.notify));
	});
})(cordova);
