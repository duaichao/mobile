Ext.define('app.Util', {
    alternateClassName: 'util',
    statics: {
    	//时间字符串转换
    	timeAgoInWords:function(date){
    		try {
    			date = date.replace(/\.\d\d\d+/,""); 
				date = date.replace(/-/,"/").replace(/-/,"/");
				date = date.replace(/T/," ").replace(/Z/," UTC");
				date = date.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");
		        var now = Math.ceil(Date.parse(new Date()) / 1000),
		            dateTime = Math.ceil(Date.parse(new Date(date)) / 1000),
		            diff = now - dateTime,
		            str;
		
		        if (diff < 60) {
		            return String(diff) + '秒前';
		        } else if (diff < 3600) {
		            str = String(Math.ceil(diff / (60)));
		            return str + (str == "1" ? '分钟' : '分钟') + '前';
		        } else if (diff < 86400) {
		            str = String(Math.ceil(diff / (3600)));
		            return str + (str == "1" ? '小时' : '小时') + '前';
		        } else if (diff < 60 * 60 * 24 * 30) {
		            str = String(Math.ceil(diff / (60 * 60 * 24)));
		            return str + (str == "1" ? '天' : '天') + '前';
		        } else {
		            return Ext.Date.format(new Date(date), 'Y/m/d');
		        }
		    } catch (e) {
		        return '';
		    }
    	},
    	request :function(url,params,callback,scope){
    		Ext.Ajax.request({
                url: url,
                params:params,
                success: function (result) {
                    result = Ext.decode(result.responseText);
                    if (result.state==0) {
                    	util.err(result.info);
                    } else {
                    	callback.call(scope,result);
                    }
                }
            });
    	},
    	//model验证
    	valid: function (model, form) {
            var tmpModel = Ext.create(model),
            me = this,
            errors, valid;
            form.updateRecord(tmpModel);
            errors = tmpModel.validate();
            valid = errors.isValid();
            if (!valid) {
                errors.each(function (err) {
                    util.err(err.getMessage());
                    return;
                });
            }
            return valid;
        },
        //加载stroe
        storeLoad: function (id,params) {
        	params = params || {};
            var store = Ext.isString(id)?Ext.getStore(id):id,rePage = false;
            if (store.getCount() > 0) {
            	store.currentPage = 1;
            	params.start = 0;
            	params.page = 1;
            	rePage = true;
            }
            store.setParams(Ext.applyIf(params, store.getParams()));
            store.load();
            if(rePage){
            	params.start = null;
            	delete params.start;
            	params.page = null;
            	delete params.page;
            	store.setParams(Ext.applyIf(params, store.getParams()));
            }
            
        },
        //加载data数据
        dataLoad: function (view, url, params) {
            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (result, request) {
                    result = Ext.decode(result.responseText);
                    console.log(result.result[5]);
                    view.setData(result.result[5]);
                }
            });
        },
        //加载record数据
        recordLoad: function (record, view, url, params, ckName) {
            if (record.data.ckName) {
                view.setData(record.data);
                return;
            }
            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (result, request) {
                    result = Ext.decode(result.responseText);
                    record.set(result);
                    view.setData(record.data);
                }
            });
        },
        //显示pick
        showPick: function (xtype, params) {
            var pick = Ext.create(xtype);
            Ext.Viewport.add(pick);
            pick.show(params);
        },
        //结束pick
        endPick: function (xtype) {
            var pick = Ext.Viewport.down(xtype);
            if (pick) {
                pick.endPick();
            }
        },
        //Viewport添加新项,Viewport之中始终只有一项
        ePush: function (xtype) {
            var me = Ext.Viewport,
            view = me.getActiveItem();
            if (view && view.getItemId() == xtype) {
                return;
            }
            view = Ext.create(xtype, {
                itemId: xtype
            });
            
            
            //切换
            me.animateActiveItem(view, {
                type: 'slide',
                direction: 'left'
            });
        },
        //监控Viewport界面切换,切换时销毁旧项
        eActiveitemchange: function () {
            var me = Ext.Viewport;
            me.onAfter('activeitemchange',
            function (t, value, oldValue, eOpts) {
                if (oldValue) {
                    //强制销毁，防止销毁不完全引发错误
                    me.remove(oldValue, true);
                }
            });
        },
        loader:function(format){
        	format = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 0));
        	if(Ext.get('notification')){
        		return;
        	}
    		var dh = Ext.DomHelper,
    			notification = {
				    tag:'div',
				    id:'notification',
				    cls: 'ex-popoup-hint exph-loader',
				    children: [    
				        {tag: 's'},
	    				{tag: 'span', html: format||''} 
				    ]
				};
    		var nf = dh.append(Ext.getBody(),notification,true);
    			nf.setXY(nf.getAlignToXY(document,'c-c'));
			Ext.Viewport.setMasked({
    			xtype: 'mask',
                transparent: true
    		});
        },
        war:function(format){
        	format = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 0));
    		util.showMessage('exph-war',format);
        },
        suc:function(format){
        	format = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 0));
    		util.showMessage('exph-suc',format);
        },
        err:function(format){
        	format = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 0));
    		util.showMessage('exph-err',format);
        },
        showMessage: function (type,format) {
        	if(Ext.get('notification')){
        		return;
        	}
    		var dh = Ext.DomHelper,
    			notification = {
				    tag:'div',
				    id:'notification',
				    cls: 'ex-popoup-hint '+type,
				    children: [    
				        {tag: 's'},
	    				{tag: 'span', html: format||''} 
				    ]
				};
    		var nf = dh.append(Ext.getBody(),notification,true);
    		
    		nf.setXY(nf.getAlignToXY(document,'c-c'));
    		
    		Ext.Viewport.setMasked({
    			xtype: 'mask',
                transparent: true
    		});
    		setTimeout(function(){
    			util.hideMessage();
    		},3000);
        },
        hideMessage:function(){
        	Ext.Viewport.setMasked(false);
        	if(Ext.get('notification')){
   				Ext.get('notification').destroy();
   			}
        },
        //重写ajax
        overrideAjax: function () {
            //开始加载
            Ext.Ajax.on('beforerequest',function (connection, options) {
            	options.params = Ext.applyIf(options.params,config.defaultParams);
            	util.loader('加载中...');
            });
            //加载成功
            Ext.Ajax.on('requestcomplete',function (conn, response, options, eOpts) {
                util.hideMessage();
            });
            //加载失败
            Ext.Ajax.on('requestexception',function (connection, options) {
                util.hideMessage();
                util.err('加载失败，请稍后再试');
            });
        },
        //重写list
        overrideList: function () {
            //重写分页插件
            Ext.define("dac.app.plugin.ListPaging", {
                override: "Ext.plugin.ListPaging",
                config: {
                    //自动加载
                    autoPaging: true,
                    loadMoreText:'更多',
	        		noMoreRecordsText:'没有更多数据了'
                }
            });
            //重写List
            Ext.define("dac.app.List", {
                override: "Ext.List",
                config: {
                    //取消选择效果
                    //selectedCls: '',
                    //禁用加载遮罩，防止跳转时页面卡顿，使用统一的遮罩效果
                    loadingText: false,
                    emptyText: '<p class="no-searches">没有数据，请刷新重试</p>'
                }
            });
        },
        //重写Pick相关
        overridePick: function () {
            Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            Ext.Date.dayNames = ['周日','周一','周二','周三','周四','周五','周六'];
            Ext.define("Jianghu.app.DatePicker", {
                override: "Ext.picker.Date",
                config: {
                    yearFrom: 2000,
                    monthText: '月',
                    dayText: '日',
                    yearText: '年'
                }
            });
            Ext.define("Ext.local_zh_cn.Picker", {
                override: "Ext.picker.Picker",
                applyDoneButton: function (config) {
                    if (config) {
                        if (Ext.isBoolean(config)) {
                            config = {};
                        }
                        if (typeof config == "string") {
                            config = {
                                text: config
                            };
                        }
                        Ext.applyIf(config, {
                            ui: 'action',
                            align: 'right',
                            text: '确定'
                        });
                    }
                    return Ext.factory(config, 'Ext.Button', this.getDoneButton());
                },
                applyCancelButton: function (config) {
                    if (config) {
                        if (Ext.isBoolean(config)) {
                            config = {};
                        }
                        if (typeof config == "string") {
                            config = {
                                text: config
                            };
                        }
                        Ext.applyIf(config, {
                            align: 'left',
                            text: '取消'
                        });
                    }
                    return Ext.factory(config, 'Ext.Button', this.getCancelButton());
                }

            });
        },
        //上传图片
        openFileSelector: function () {
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
            var destinationType = navigator.camera.DestinationType.FILE_URI;
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
                mediaType: mediaType
            };
            navigator.camera.getPicture(this.uploadFile, this.uploadBroken, options);
        },
        //图片选择失败 
        uploadBroken: function (message) {
            this.showMessage(message, true);
        },
        //选择图片后上传
        uploadFile: function (fileURI) {
            var options = new FileUploadOptions();
            options.fileKey = "userfile";
            options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
            options.mimeType = "multipart/form-data";
            options.chunkedMode = false;
            ft = new FileTransfer();
            var uploadUrl = encodeURI(config.imgUp);
            this.showMessage('正在上传中,请等待...');
            ft.upload(fileURI, uploadUrl, this.uploadSuccess, this.uploadFailed, options);
        },
        //文件上传成功
        uploadSuccess: function (r) {
            var res = Ext.decode(r.responseText);
            this.showMessage(res.message, true);
        },
        //文件上传失败
        uploadFailed: function (error) {
            this.showMessage('图片上传失败...', true);
        },
        //app初始化执行
        init: function () {
            this.eActiveitemchange();
            this.overrideList();
            this.overrideAjax();
            this.overridePick();
        }
    }
});