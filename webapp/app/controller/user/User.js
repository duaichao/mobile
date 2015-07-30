Ext.define('app.controller.user.User', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	index:'index',
        	home:'home',
        	userLogin: 'userLogin',
        	userRegist: 'userRegist',
        	userInfo:'userInfo',
        	exerciseView:'exerciseview'
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
            		util.ePush('userLogin',null,'right');
            	}
            },
        	'index tabbar':{
        		activetabchange :function(tb,newView,oldView){
        			var me = this,xtype=newView.getItemId(xtype);
        			var view = Ext.create(xtype,{});
        			this.getIndex().animateActiveItem(view, {
                        type: 'slide',
                        direction: 'left'
                    });
        			Ext.defer(function () {
        				var old = me.getIndex().down(oldView.getItemId());
        				if(old.getAutoDestroy()){me.getIndex().remove(old,true);}
        			}, 500);
        		}
        	},
            'home dataview':{
            	itemtap:function(dv, index, target, record, e, eOpts){
            		if(e.target.className.indexOf('kclx')!=-1){
            			var params = config.user;
            			params = Ext.applyIf(record.data,params)
            			util.ePush('exerciseview',{
            				defaultParams:params
            			});
            		}
            	}
            },
            'userInfo button[action=saveInfo]':{
            	tap: 'saveInfo'
            },
            'userInfo button[action=backHome]':{
            	tap:function(){
            		util.ePush('index',null,'right');
            	}
            },
            'exerciseview button[action=backhome]':{
            	tap:function(){
            		util.ePush('index',null,'right');
            	}
            }
        }
    },
    logUserIn: function (params) {
    	util.request(config.url.login,params,function(data){
        	params.token = data.result.token;
        	config.user = params;
        	var logUser = Ext.create('app.model.user.User', {
                id: 1
            });
            logUser.set(config.user);
            logUser.save();
        	util.ePush('index');
    	},this);
    },
    loadPersonInfo:function(params){
    	util.request(config.url.getPersonalInfo,params,function(data){
        	var d = config.user = Ext.applyIf(data.result,params),
        		f = this.getUserInfo();
        	if(d.birthday!=''){
        		if(!Ext.isDate(d.birthday)){
        			d.birthday = Ext.Date.parse(d.birthday,'Y-m-d');
        		}
        	}
        	if(d.exam_time!=''){
        		if(!Ext.isDate(d.exam_time)){
        			d.exam_time = Ext.Date.parse(d.exam_time,'Y-m-d');
        		}
        	}
        	d.examtime = d.exam_time;
        	d.examadd = d.district;
        	f.setValues(d);
        	Ext.ModelMgr.getModel('app.model.user.User').load(1, {
                scope: this,
                success: function (cfg) {
                	d.birthday = Ext.Date.format(d.birthday,'Y-m-d');
                	d.exam_time = Ext.Date.format(d.examtime,'Y-m-d');
                	cfg.setData(d);
                	cfg.save();
                }
            });
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
    		Ext.ModelMgr.getModel('app.model.user.User').load(1, {
                scope: this,
                success: function (cfg) {
                	console.log(params);
                	var d = params;
                	d.birthday = Ext.Date.format(d.birthday,'Y-m-d');
                	d.district = params.examadd;
                	d.exam_time = Ext.Date.format(d.examtime,'Y-m-d');
                	
                	d.examtime = null;
                	d.examadd = null;
                	cfg.setData(d);
                	cfg.save();
                }
            });
    	},this);
    },
    //上传图片
    openFileSelector: function () {
    	var　me = this;
        /*
        *图片选择方式
        *PHOTOLIBRARY：从相册中选取
        *CAMERA:调用摄像头
        *AVEDPHOTOALBUM：左右不明
        */
        var source = navigator.camera.PictureSourceType.PHOTOLIBRARY;
        /*
        *图片返回格式
        *DATA_URL：64位字符串
        *FILE_URI:返回文件路径
        *NATIVE_URI：返回系统路径 iOS：eg. assets-library://  Android： content://
        */
        var destinationType = navigator.camera.DestinationType.DATA_URL;
        /*
        *媒体类型
        *PICTURE：图片
        *VIDEO:视频 始终返回FILE_URI格式
        *ALLMEDIA：支持任意文件选择 
        */
        var mediaType = navigator.camera.MediaType.PICTURE;
        var options = {
            quality: 50,
            //图像质量[0-100]
            destinationType: destinationType,
            sourceType: source,
            mediaType: mediaType,
            allowEdit:true, //出现裁剪框
		    targetWidth:100,//图片裁剪高度
		    targetHeight:100 //图片裁剪高度
        };
        navigator.camera.getPicture(function(fileURI){
        	var params = {
        			username:config.user.username,
        			token:config.user.token,
        			photo:fileURI
        	};
        	util.request(config.url.setPhoto,params,function(data){
        		util.suc(data.info);
            	config.user.photo = data.result.icon;
            	Ext.get('u-face').dom.src = config.url.host+config.user.photo;
            	//放入缓存
            	Ext.ModelMgr.getModel('app.model.user.User').load(1, {
                    scope: this,
                    success: function (cfg) {
                    	cfg.set('photo',data.result.icon);
                    	cfg.save();
                    }
                });
            	
            	
        	},me);
        }, this.uploadBroken, options);
    },
    //图片选择失败 
    uploadBroken: function (message) {
        util.err('图片选取失败');
    },
    //选择图片后上传 暂时不用
    uploadFile: function (fileURI) {
    	var me = this,
        	options = new FileUploadOptions();
        options.fileKey = "photo";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "multipart/form-data";
        options.chunkedMode = false;
        options.params = config.user;
        ft = new FileTransfer();
        var uploadUrl = encodeURI(config.url.setPhoto);
        util.loader('开始上传...');
        ft.onprogress = function (progressEvt) {//显示上传进度条
            if (progressEvt.lengthComputable) {
            	util.loader('正在上传{0}%',Math.round(( progressEvt.loaded / progressEvt.total ) * 100));
            }
        };
        ft.upload(fileURI, uploadUrl, function(r){
        	util.hideMessage();
            var res = Ext.decode(r.response);
            if(res.state==1){
            	util.suc(res.info);
            	config.user.photo = res.result.icon;
            	this.getHome().down('button[action=face]').setText('<img src="'+config.user.photo+'">');
            }else{
            	util.err(res.info);
            }
        }, function(e){
        	util.hideMessage();
            util.err('图片上传失败');
        }, options);
    }
});