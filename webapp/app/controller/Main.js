Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        routes: {
            'go/:view': 'handleRoute',
            'go/:view/:isPop': 'handleRoute',
        },
        control: {
        	'guide':{
        		activeitemchange:function(ca, value, oldValue, eOpts){
        			if(value.getItemId()=='last'){
	        			var dh = Ext.DomHelper,
		        			inbtn = {
		    				    tag:'div',
		    				    style:'position:absolute;',
		    				    children: [    
		    	    				{cls: 'inbutton scaleout',tag: 'div'} 
		    				    ]
		    				};
	        			var nf = dh.append(value.element,inbtn,true);
	        			nf.setXY(nf.getAlignToXY(value.element,'c-c',[0,10]));
	        			nf.on('tap',function(){util.ePush('userLogin');});
        			}
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
            success: function (cache) {
            	//util.ePush('demo');
            	//检测是否自动登录
                Ext.ModelMgr.getModel('app.model.User').load(1, {
                    scope: this,
                    success: function (cfg) {
                    	//创建课程数据源
                    	app.app.getApplication().createCourseStore(cfg.data).load();
                    	//加载个人信息
                    	
                    	
                    	//debug
                    	//util.ePush('index',null,'left','no');
                    	//return;
                    	
                    	
                    	//去除遮罩
                    	util.request(config.url.getPersonalInfo,Ext.applyIf({noloader:false},cfg.data),function(data){
                        	var d = Ext.applyIf(data.result,cfg.data);
                        	Ext.ModelMgr.getModel('app.model.User').load(1, {
                                scope: this,
                                success: function (cfg) {
                                	cfg.setData(d);
                                	cfg.save();
                                	//关闭加载进度
                                	//初始化配置参数
                                	config.user = d;
                                	//加载个人信息成功后 跳转页面
                                	util.ePush('index',null,'left','no');
                                	
                                }
                            });
                    	},this);
                    	
                    },
        			failure: function(record, operation) {
        				util.ePush('userLogin');
        			}
                });
            },
            failure: function (error) {
            	//util.ePush('demo');
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
	        height:40,
	        ui: 'decline',
	        cls:'ui red',
	        scope: this,
	        handler: function() {
	        	this.actions.hide();
	        	navigator.app.exitApp();
	        }
	    },
	    {
	        xtype: 'button',
	        text: '取消',
	        cls:'ui gray',
	        height:40,
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