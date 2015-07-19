Ext.define('app.controller.user.User', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['Login','user.Regist','user.Home','user.Info'],
        models: ['user.User','Course'],
        refs: {
        	home:'home',
        	userLogin: 'userLogin',
        	userRegist: 'userRegist',
        	userInfo:'userInfo'
        },
        control: {
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
            		util.ePush('userInfo');
            		this.loadPersonInfo(config.user);
            	}
            },
            'userInfo button[action=saveInfo]':{
            	tap: 'saveInfo'
            },
            'userInfo button[action=backHome]':{
            	tap:function(){
            		util.ePush('index');
            	}
            }
        }
    },
    logUserIn: function (params) {
    	util.request(config.url.login,params,function(data){
    		util.ePush('index');
        	params.token = data.result.token;
        	config.user = params;
        	this.loadCourseList(params);
    	},this);
    },
    loadCourseList: function(params){
    	var dv = this.getHome().down('dataview'),
    		st = dv.getStore();
    	st.getProxy().setExtraParams(params);
    	st.load({callback:function(){
    		dv.el.select('.progress-ring').each(function(ring){
    			util.loadingRing(ring);
    		});
    	}});
    },
    loadPersonInfo:function(params){
    	util.request(config.url.getPersonalInfo,params,function(data){
        	var d = config.user = Ext.applyIf(params,data.result),
        		f = this.getUserInfo();
        	if(d.birthday!=''&&!Ext.isDate(d.birthday)){
        		d.birthday = Ext.Date.parse(d.birthday, "Y-m-d");
        	}
        	f.setValues(d);
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
    	var params = this.getUserInfo().getValues();
    	util.request(config.url.setPersonalInfo,params,function(data){
    		util.suc('保存成功');
    	},this);
    }
});