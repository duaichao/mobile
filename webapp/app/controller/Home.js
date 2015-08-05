Ext.define('app.controller.Home', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	mainView:'mainView',
        	homeContainer:'homeContainer',
        	userInfoContainer:'userInfoContainer'
        },
        control: {
            'userInfoContainer button#saveInfo':{
            	tap: 'saveInfo'
            },
            'homeContainer image':{
        		tap:'openFileSelector'
        	},
            'homeContainer dataview':{
            	itemtap:'onDataViewItemTap'
            },
        }
    },
    saveInfo :function(){
    	var params = this.getUserInfoContainer().getValues();
    	util.request(config.url.setPersonalInfo,params,function(data){
    		util.suc('保存成功');
    		Ext.ModelMgr.getModel('app.model.User').load(1, {
                scope: this,
                success: function (cfg) {
                	var d = params;
                	d.birthday = Ext.Date.format(d.birthday,'Y-m-d');
                	d.district = params.examadd;
                	d.exam_time = Ext.Date.format(d.examtime,'Y-m-d');
                	
                	delete d.examtime;
                	delete d.examadd;
                	
                	d = Ext.applyIf(d,cfg.data)
                	config.user = d;
                	cfg.setData(d);
                	cfg.save();
                }
            });
    	},this);
    },
    onDataViewItemTap:function(dv, index, target, record, e, eOpts){
		if(e.target.className.indexOf('blue')!=-1){
			this.getMainView().push(Ext.create('app.view.exercise.Main',{title:record.get('course_name'),record:record}));
		}
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
            	this.getUserCard().down('image').setSrc(config.url.host+config.user.photo);
            	//放入缓存
            	Ext.ModelMgr.getModel('app.model.User').load(1, {
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