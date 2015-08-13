Ext.define('Pass.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
    	refs:{
    		userLogin: 'userLogin',
        	userRegist: 'userRegist',
    		mainView:'mainView'
    	},
        control: {
        	'guide':{
        		activeitemchange:'afterLastGuidePage'
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
    afterLastGuidePage:function(ca, value, oldValue, eOpts){
		if(value.getItemId()=='last'){
			if(!Ext.get('into')){
				var into = Ext.create('Ext.Container', {
                	id:'into',
                    centered : true,
                    modal    : false,
                    hideOnMaskTap : false,
                    margin:'25 0 0 5',
                    html:[
						'<div class="la-ball-scale-multiple la-2x">',
						'<div></div>',
						'<div></div>',
						'<div></div>',
						'</div>'
                    ].join(''),
                    listeners:[{
                    	element:'element',
                    	event:'tap',
                    	fn:function(){
                    		Ext.Viewport.remove(Ext.getCmp('into'));
                    		util.ePush('userLogin',{isFirst:true});
                    	}
                    }]
                });
                Ext.Viewport.add(into);
                into.show();
			}
		}
	},
    doLogin:function(btn){
    	var login = btn.up('userLogin'),
    		params = login.getValues();
	    if(params.username==''||params.password==''){
	    	util.war('用户名或密码不正确');
	    }else{
	    	util.request(config.url.login,params,function(data){
	        	params.token = data.result.token;
	        	//加载个人信息
	        	util.request(config.url.getPersonalInfo,params,function(data){
	            	var d = Ext.applyIf(data.result,params);
	            	var logUser = Ext.create('Pass.model.User', {
	                    id: 1
	                });
	                logUser.set(d);
	                logUser.save();
	            	
	            	//初始化配置参数
	            	config.user = d;
	            	//加载个人信息成功后 跳转页面
	            	var view = util.ePush('mainView',null,'left','no');
	            	if(!login.getIsFirst()){
	            		view.down('homeContainer').setDatas(d);
	            	}
	        	},this);
	    	},this);
	    }
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
        Ext.ModelMgr.getModel('Pass.model.Local').load(1, {
            scope: this,
            success: function (cache) {
            	//util.ePush('demo');
            	//检测是否自动登录
                Ext.ModelMgr.getModel('Pass.model.User').load(1, {
                    scope: this,
                    success: function (cfg) {
                    	//加载个人信息
                    	//去除遮罩
                    	util.request(config.url.getPersonalInfo,Ext.applyIf({noloader:false},cfg.data),function(data){
                        	var d = Ext.applyIf(data.result,cfg.data);
                        	Ext.ModelMgr.getModel('Pass.model.User').load(1, {
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
                var local = Ext.create('Pass.model.Local', {
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
    	util.checkConnection(true);
    	document.addEventListener("backbutton", function(){me.onBackButton.apply(me);}, false); //返回键
        document.addEventListener("menubutton", function(){me.onMenuButton.apply(me);}, false); //菜单键
        //document.addEventListener("searchbutton", eventSearchButton, false); //搜索键
    },
    onBackButton :function(){
    	var item = Ext.Viewport.getActiveItem(),innerTabView;
    	if (item.isXType('guide')||item.isXType('userLogin')||item.isXType('userRegist')) {
    		this.doExitApp();
    	}else{
    		if(item.getInnerItems().length>1){
    			if(Ext.Viewport.down('picker')){
    				Ext.Viewport.down('picker').hide();
    			}
    			item.pop();
    		}else{
    			//item = mainView
    			innerTabView = item.getActiveItem();
    			if(innerTabView.getActiveItem().isXType('homeContainer')){
    				this.doExitApp();
    			}else{
    				this.isExit = false;
    				if(Ext.Viewport.down('picker')){
        				Ext.Viewport.down('picker').hide();
        			}
    				innerTabView.setActiveItem(0);
    			}
    		}
    	}
    },
    doExitApp :function(){
    	var me = this;
    	if (this.isExit) {
    		navigator.app.exitApp();
    	} else {
    		this.isExit = true;
    		util.info('再按一次退出程序');
    		setTimeout(function(){me.isExit = false;},2000)
    	}
    }
});