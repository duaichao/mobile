Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        routes: {
            'go/:view': 'handleRoute',
            'go/:view/:isPop': 'handleRoute',
        },
        refs: {
        },
        control: {
        	'guide button[action=tologin]':{
        		tap:function(){
        			util.ePush('userLogin');
        		}
        	}
        }
    },
    launch: function () {
        var me = this;
        //phonepga
        document.addEventListener('deviceready', function(){me.onDeviceReady.call(me);}, false);
        //检测是否第一次启动程序
        Ext.ModelMgr.getModel('app.model.Local').load(1, {
            scope: this,
            success: function (config) {
            	util.ePush('userLogin');
            },
            failure: function (error) {
            	//存储配置信息
                var local = Ext.create('app.model.Local', {
                    id: 1
                });
                local.save();
                util.ePush('guide');
            }
        });
    },
    onDeviceReady :function(){
    	var me = this;
    	this.checkConnection();
    	/*Ext.get(document).addListener({
		    backbutton  : { fn: this.onBackButton, scope: this},
		    menubutton: { fn: this.onMenuButton, scope: true }
		});*/
    	document.addEventListener("backbutton", function(){me.onBackButton.apply(me);}, false); //返回键
        document.addEventListener("menubutton", function(){me.onMenuButton.apply(me);}, false); //菜单键
        //document.addEventListener("searchbutton", eventSearchButton, false); //搜索键
    },
    checkConnection :function(){
    	var networkState = navigator.network.connection.type;        
        var states = {}; 
        states[Connection.UNKNOWN]  = 'Unknown connection'; 
        states[Connection.ETHERNET] = 'Ethernet connection'; 
        states[Connection.WIFI]     = 'WiFi connection'; 
        states[Connection.CELL_2G]  = 'Cell 2G connection'; 
        states[Connection.CELL_3G]  = 'Cell 3G connection'; 
        states[Connection.CELL_4G]  = 'Cell 4G connection'; 
        states[Connection.NONE]     = 'No network connection'; 
        if(states[networkState]=='No network connection'||typeof states[networkState] == "undefined"){
        	util.war('请打开网络链接');
        	setTimeout(function(){
        		navigator.device.exitApp();
        	},3000); 
        }
    },
    onBackButton :function(){
    	var item = Ext.Viewport.getActiveItem(),
    		id = item.getItemId();
    	if (id == 'main') {
    		var home = item.down('index').getActiveItem();
    		if(home.id.indexOf('home')!=-1){
    			this.doExitApp();
    		}else{
    			if(home.isXType('navigationview')){
    				if(home.$backButton){
    					home.pop(1);
    				}else{
    					item.down('index').setActiveItem(0);
    				}
    			}else{
    				item.down('index').setActiveItem(0);
    			}
    		}
    	}else{
    		this.doExitApp();
    	}
    },
    doExitApp :function(){
    	/*Ext.Msg.confirm("提示", "您确定要退出应用吗?", function(e) {
			if (e == "yes") {
				navigator.app.exitApp();
			}
		}, this);*/
		this.onMenuButton();
    },
    onMenuButton :function(){
    	var items = [{
	        text: '退出程序',
	        ui: 'decline-round',
	        scope: this,
	        handler: function() {
	        	this.actions.hide();
	        	navigator.app.exitApp();
	        }
	    },
	    {
	        xtype: 'button',
	        ui: 'round',
	        text: '取消',
	        scope: this,
	        handler: function() {
	            this.actions.hide();
	        }
	    }];
        if (!this.actions) {
            this.actions = Ext.create('Ext.ActionSheet', {
            	hideOnMaskTap :true,
                items: items
            });
        }
        Ext.Viewport.add(this.actions);
        this.actions.show();
    },
    handleRoute : function (xtype, isPop) {
        var params = config.tmpParams|| {};
        this.pushView({ xtype: xtype, params: params, isPop: isPop });
    },
    pushView: function (params) {
        delete config.tmpParams;
    }
});