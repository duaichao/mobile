Ext.define('app.controller.user.User', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['Login','user.Regist','user.Home','user.Info'],
        models: ['user.User'],
        refs: {
        	home:'home',
        	userLogin: 'userLogin',
        	userRegist: 'userRegist'
        },
        control: {
        	'home':{
        		back:function(item){
        			var tbar = item.getNavigationBar(),
        				toInfoBtn = tbar.down('button[action=toinfo]'),
        				infoSaveBtn = tbar.down('button[action=saveInfo]');
        			toInfoBtn.show();
        			tbar.remove(infoSaveBtn);
        		}
        	},
            'userLogin button[action=login]': {
                tap: function () {
                    var login = this.getUserLogin(),
                    	values = login.getValues();
                    if(values.username==''||values.password==''){
                    	util.war('用户名或密码不正确');
                    }else{
                    	this.logUserIn(values);
                    }
                }
            },
            'userLogin button[action=regist]':{
            	tap: function(){
            		util.ePush('userRegist');
            	}
            },
            'userRegist button[action=save]': {
                tap: function () {
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
                }
            },
            'userRegist button[action=tologin]':{
            	tap: function(){
            		util.ePush('userLogin');
            	}
            },
            'home button[action=toinfo]':{
            	tap: function(){
            		this.getHome().push(Ext.create('app.view.user.Info'));
            		var tbar = this.getHome().getNavigationBar(),
            			toInfoBtn = tbar.down('button[action=toinfo]');
            		toInfoBtn.hide();
            		tbar.add({
                    	text:'保存',
        				action:'saveInfo',
        				align:'right'
                    });
            		this.loadPersonInfo(config.user);
            	}
            },
            'button[action=saveInfo]':{
            	tap: 'saveInfo'
            }
        }
    },
    logUserIn: function (params) {
    	util.request(config.url.login,params,function(data){
    		util.ePush('main');
        	params.token = data.result.token;
        	config.user = params;
    	},this);
    },
    loadPersonInfo:function(params){
    	util.request(config.url.getPersonalInfo,params,function(data){
        	var d = config.user = Ext.applyIf(params,data.result),
        		f = this.getHome().getActiveItem();
        	if(d.birthday!=''&&!Ext.isDate(d.birthday)){
        		d.birthday = Ext.Date.parse(d.birthday, "Y-m-d");
        	}
        	f.setValues(d);
        	/*for(var i in d){
        		var fd =f.down('[name='+i+']');
        		if(fd){
        			if(fd.setValue){
        				fd.resetOriginalValue();
        				fd.setValue(d[i]);
        				console.log(d[i]);
        			}else{
        				console.log(fd);
        			}
        		}
        	}*/
    	},this);
    },
    logRegist: function(params){
    	util.request(config.url.regist,params,function(data){
    		util.suc('注册成功，请登录');
        	util.ePush('userLogin');
    	},this);
    },
    keepUser: function (user) {
    },
    saveInfo :function(){
    	var params = this.getHome().getActiveItem().getValues();
    	util.request(config.url.setPersonalInfo,params,function(data){
    		util.suc('保存成功');
    	},this);
    }
});