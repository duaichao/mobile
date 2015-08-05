Ext.define('app.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
    	refs:{
    		userLogin: 'userLogin',
        	userRegist: 'userRegist',
    		mainView:'mainView'
    	},
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
        	},
        	'userLogin button#login': {
                tap: 'doLogin'
            },
            'userLogin button#regist':{
            	tap: function(){
            		util.ePush('userRegist');
            	}
            },
            'userRegist button#save': {
                tap: 'saveRegist'
            },
            'userRegist button#tologin':{
            	tap: function(){
            		util.ePush('userLogin',null,'right');
            	}
            },
        	'indexView':{
        		activeitemchange:'onActiveItemChange'
        	}
        }
    },
    doLogin:function(){
    	var login = this.getUserLogin(),
	    	values = login.getValues();
	    if(values.username==''||values.password==''){
	    	util.war('用户名或密码不正确');
	    }else{
	    	this.logUserIn(values);
	    }
    },
    logUserIn: function (params) {
    	util.request(config.url.login,params,function(data){
        	params.token = data.result.token;
        	//加载个人信息
        	util.request(config.url.getPersonalInfo,params,function(data){
            	var d = Ext.applyIf(data.result,params);
            	var logUser = Ext.create('app.model.User', {
                    id: 1
                });
                logUser.set(d);
                logUser.save();
            	
            	//初始化配置参数
            	config.user = d;
            	//加载个人信息成功后 跳转页面
            	util.ePush('mainView',null,'left','no');
        	},this);
        	
        	
    	},this);
    },
    saveRegist:function () {
        var regist = this.getUserRegist(),
			values = regist.getValues();
	    if(values.username==''){
	    	util.war('请输入用户名');
	    	return;
	    }
	    if(values.password==''){
	    	util.war('请输入密码');
	    	return;
	    }
	    if(!/\w@\w*\.\w/.test(values.email)){
	    	util.war('邮箱格式不正确');
	    	return;
	    }
	    this.logRegist(regist.getValues());
	},
    logRegist: function(params){
    	util.request(config.url.regist,params,function(data){
    		util.suc('注册成功，请登录');
        	util.ePush('userLogin');
    	},this);
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
                    	//加载个人信息
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
                                	util.ePush('mainView',null,'left','no');
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
    onActiveItemChange:function(indexView, item, oldItem){
    	this.getMainView().getNavigationBar().setTitle(item.getTitle());
    },
    onDeviceReady :function(){
    	var me = this;
    	this.checkConnection();
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
    	var item = Ext.Viewport.getActiveItem();
    	if (item.isXType('userLogin')||item.isXType('userRegist')) {
    		this.doExitApp();
    	}else{
    		
    		this.isExit = false;
    	}
    },
    doExitApp :function(){
    	var me = this;
    	if (this.isExit) {
    		navigator.app.exitApp();
    	} else {
    		this.isExit = true;
    		util.war('再按一次退出程序','exph-info');
    		setTimeout(function(){me.isExit = false;},2000)
    	}
    },
    handleRoute : function (xtype, isPop) {
        var params = config.tmpParams|| {};
        this.pushView({ xtype: xtype, params: params, isPop: isPop });
    },
    pushView: function (params) {
        delete config.tmpParams;
    }
});