Ext.define('app.controller.user.User', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['user.Login'],
        models: ['user.UserModel'],
        refs: {
        	indexNavs:'index > nestedlist',
            main: 'main',
            userLogin: 'userLogin',
            login: 'userLogin [action=login]',
            logOut: '[action=logout]'
        },
        control: {
            //开始登录
            login: {
                tap: function () {
                    var login = this.getUserLogin();
                    if (util.valid('app.model.user.UserModel', login)) {
                        this.logCheck(login.getValues(),0);
                    }
                }
            },
            logOut: {
                //退出登录
                tap: function () {
                	Ext.Viewport.hideMenu('left');
                    Ext.Msg.confirm('', '注销后将接收不到飞鸡网消息，<br>确定要继续吗?',
                    function (confirmed) {
                        confirmed == 'yes' && this.logOut();
                    },
                    this);
                }
            },
            //用户详细页
            userInfo: {
                activate: function (t) {
                    t.setData(config.user);
                },
                loginOut: function (t) {
                    if (t.isExit) {
                        this.logOut();
                    } else {
                        t.isExit = true;
                        util.onAlert('再按一次退出登录...', true);
                    }
                }
            }
        }
    },
    launch: function () {
    	//console.log('获取登陆rsa秘钥');
    	Ext.Ajax.request({
			url:Ext.ctx+"/user/index!getPublicKeys.action",
			method: 'post',
			extraParams:{},
			success:function(resp,opts){
				var obj = Ext.decode(resp.responseText);
				config.rsa.m = obj[0].m;
				config.rsa.e = obj[0].e;
			}
		});
        //检测是否自动登录
        Ext.ModelMgr.getModel('app.model.user.UserModel').load(1, {
            scope: this,
            success: function (cachedLoggedInUser) {
                this.logCheck(cachedLoggedInUser.data,1);
            },
			failure: function(record, operation) {
		    	if(Ext.fly('appLoadingIndicator')){
            		Ext.fly('appLoadingIndicator').destroy();
            	}
				if(this.getMain()){
					this.getMain().push('userLogin', {title:"登录"});
				}
			}
        });
    },
    //登录成功
    logUserIn: function (user) {
        config.user = user;
        var login = this.getUserLogin();
        if (login) {
        	login.setValues({
			    password: user.password,
			});
            var redirect = user.userPurview+''+login.config.redirect || 0;
            this.redirectTo('redirec/' + redirect + '/0');
            Ext.get('currUserName').setHtml('用户：'+user.name);
            this.getIndexNavs().getStore().load();
        }
    },
    //开始登录
    logCheck: function (user,isAuto) {
    	var me = this;
    	setMaxDigits(130);
    	if(user.password.length<100){
			user.password = encryptedString(new RSAKeyPair(config.rsa.e,"",config.rsa.m), encodeURIComponent(user.password));
		}
        Ext.Ajax.request({
            url: config.userLogin,
            params: user,
            scope: this,
            success: function (result) {
            	if(Ext.fly('appLoadingIndicator')){
            		Ext.fly('appLoadingIndicator').destroy();
            	}
                result = Ext.decode(result.responseText);
                if (!result.success) {
                	if(result.info&&result.info=='1'){
                		util.onError('抱歉，用户已停用', true);
                	}else{
                    	util.onError('用户名或者密码不正确', true);
                    }
                    if(me.getMain()){
						me.getMain().push('userLogin', {title:"登录"});
					}
                } else {
                	user.userPurview = result.userPurview;//用户权限 详情查看UserModel
                	user.userPurviewId = result.userPurviewId;
                	user.isSub = result.isSub;
                	user.retailType = result.retailType;
                	user.msgCount = result.msgCount;
                	if(isAuto){
                		//console.log('自动登陆'+user.name);
                		//自动登陆 调整角色配置首页
                		config.user = user;
                		var redirect = user.userPurview+'home';
                		this.redirectTo('redirec/' + redirect + '/0');
                		Ext.get('currUserName').setHtml('欢迎你，<span style="font-size:15px;">'+user.name+'</span>');
                		//加载左边导航
                		this.getIndexNavs().getStore().load();
                	}else{
                		//console.log('第一次登陆');
                		//第一次登陆 需要配置参数
                    	this.logUserIn(user);
                    }
                    user.keepUser && this.keepUser(user);
                }
            }
        });
    },
    //保存用户信息
    keepUser: function (user) {
        //不这样写无法储存数据
        var logUser = Ext.create('app.model.user.UserModel', {
            id: 1
        });
        logUser.set(user);
        logUser.save();
        //console.log(logUser.getData());
    },
    //退出登录
    logOut: function (user) {
    	var me = this;
        Ext.ModelMgr.getModel('app.model.user.UserModel').load(1, {
            success: function (user) {
                user.erase();
                config.user = false;
        		me.getMain().push('userLogin', {title:"登录",otherMenu:null});
            }
        });
       
    }
});