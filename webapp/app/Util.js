Ext.define('Pass.Util', {
    alternateClassName: 'util',
    statics: {
    	drawScore : function(target) {
    		var percent = target.getAttribute('data-percent'),
    			old = target.getAttribute('data-old');
    		if(old==percent)return;
    		//console.log('draw');
    		target.set({'data-old':percent});
            var a = parseInt(Math.round(percent), 10); // 百分比
            var b = 360 * parseInt(a) / 100 || 1,
    	    c = [{
    	        value: b,
    	        color: "#53a93f"
    	    },
    	    {
    	        value: 360 - b,
    	        color: "#ffffff"
    	    }],
    	    d = {
    	        percentageInnerCutout: 70,
    	        segmentShowStroke: !1,
    	        animationEasing: "easeOutQuart"
    	    };
    	    function e() {
    	        var b = target.down('canvas').dom.getContext("2d");
    	        new Chart(b).Doughnut(c, d);
    	        target.down(".score").setHtml(a+'<span>%</span>');
    	    }
    	    e();
    	},
    	lastDays :function(date){
    		var now,dateTime;
    		if(Ext.isString(date)){
	    		date = date || '';
	    		date = date.replace(/\.\d\d\d+/,""); 
				date = date.replace(/-/,"/").replace(/-/,"/");
				date = date.replace(/T/," ").replace(/Z/," UTC");
				date = date.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");
				dateTime = Math.ceil(Date.parse(date==''?new Date():new Date(date)) / 1000);
	    	}
			now = Math.ceil(Date.parse(new Date()) / 1000);
			dateTime = Math.ceil(Date.parse(date) / 1000),
            diff = dateTime - now,
            str = 0;
			if(diff >= 60 * 60 * 24){
				str = String(Math.ceil(diff / (60 * 60 * 24)));
			}
			return str;
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
        //Viewport添加新项,Viewport之中始终只有一项
        ePush: function (xtype,params,turn,destory) {
        	destory = destory || 'yes';
            var me = Ext.Viewport,
            view = me.getActiveItem();
            if(me.down(xtype)&&!me.down(xtype).getAutoDestroy()){
            	view = me.down(xtype);
            }else{
            	if(Ext.isString(xtype)){
    		        if (view && view.getItemId() == xtype) {
    		            return;
    		        }
    		        view = Ext.create(xtype, params||{
    		            itemId: xtype,
    		            autoDestroy:destory=='yes'
    		        });
                }else{
                	if (view && view.getItemId() == xtype.getItemId) {
    		            return;
    		        }
                	view = xtype;
                }
            }
            //切换
            me.animateActiveItem(view, {
                type: 'slide',
                direction: turn||'left'
            });
            return view;
        },
        //监控Viewport界面切换,切换时销毁旧项
        eActiveitemchange: function () {
            var me = Ext.Viewport;
            me.onAfter('activeitemchange',
            function (t, value, oldValue, eOpts) {
                if (oldValue) {
                	
                    //强制销毁，防止销毁不完全引发错误
                	Ext.defer(function () {
                		//me.remove(oldValue, true);
                		//console.log(oldValue.getAutoDestroy());
                		if(oldValue.getAutoDestroy()){oldValue.destroy();}
                	}, 500);
                }
            });
        },
        log:function(message){
        	 if (Ext.os.is('iPhone'))
                 console.log(message);
             else
                 console.info(message);
        },
        audioVar:null,
        audioTimer:null,
        audioDir:'duaichao',
        audioFileName:'recording.wav',
        audioStart :function(){
        	if(util.audioVar){
        		util.audioVar.release();
        	}
        	util.loader('正在录音 {0}','00:00',true);
        	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        		fileSystem.root.getDirectory(util.mediaDir, {create:true,exclusive:false},function(dirEntry){
        			util.log('创建了一个文件夹');
        		}, util.errorRecord);
        	}, util.errorRecord);  
        	if (Ext.os.is('iPhone')) {
                //first create the file
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                    fileSystem.root.getFile(util.audioFileName, {
                        create: true,
                        exclusive: false
                    }, function(fileEntry){
                        util.log("File " + util.audioFileName + " created at " + fileEntry.fullPath);
                        util.audioVar = new Media(fileEntry.fullPath, 
                        		util.audioSuccess,
                        		util.audioError,
            					util.audioStatus
            			); //of new Media
                        util.audioVar.startRecord();
                    }, util.audioError); //of getFile
                }, util.audioError); //of requestFileSystem
            } else{
                util.audioVar = new Media(
                		util.audioDir+'/'+util.audioFileName, 
    					util.audioSuccess, 
    					util.audioError,
    					util.audioStatus
    			);
                util.audioVar.startRecord();
                var recTime=0;
        	    util.audioTimer = setInterval(function() {
        	    	recTime++;
        	        util.loader('正在录音 {0}','00:'+(recTime<10?'0'+recTime:recTime),true);
        	    }, 1000);
            }
        },
        audioStop:function(){
        	if (util.audioVar){
        		util.audioVar.stopRecord(); 
        		util.hideMessage();
    		}
        	if (util.audioTimer) {
    	        clearInterval(util.audioTimer);
    	        util.audioTimer = null;
    	    } 
        },
        audioStatus:function(){
        },
        audioError:function(err){
        	if (typeof err.message != 'undefined')
                err = err.message;
        	util.log(err);
        },
        audioSuccess:function(){
        	util.log('success');
        },
        audioPlayer:function(url){
        	Ext.Viewport.add({
        		xtype:'container',
        		itemId:'mediaContainer',
        		modal: true,
                hideOnMaskTap: true,
                centered: true,
                width:150,
                height:100,
                listeners:{
                	show:function(p){
                		setTimeout(function(){
                			var ad = p.down('audio'),di=Math.round(ad.getDuration());
                			p.down('button').setText('<i class="iconfont green font20">&#xe61e;</i> '+di+'秒');
                		},500);
                		
                	},
                	hide:function(p){
                		var audio = p.down('audio');
                		audio.stop();
                		//p.remove(audio,true);
                		//p.destroy();
                	}
                },
                layout: Ext.os.is.Android ? {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                } : 'fit',
                items: Ext.os.is.Android ? [
                    {
                        xtype: 'audio',
                        url: url||"/sdcard/" + util.audioDir+'/'+ util.audioFileName,
                        loop: false,
                        enableControls: false,
                        listeners:{
                        	pause:function(ad,time){
                        		var p = ad.up('#mediaContainer');
	                    		time = Math.round(time);
	                			p.down('button').setText('<i class="iconfont green font20">&#xe61e;</i> '+(time)+' 秒');
                        	},
                        	timeupdate:function(ad,time){
                        		var p = ad.up('#mediaContainer');
                        		time = Math.round(time);
	                			p.down('button').setText('<i class="iconfont red font20">&#xe61c;</i> '+(time)+' 秒');
                        	}
                        }
                    },
                    {
                        xtype : 'button',
                        text  : '<i class="iconfont green font20">&#xe61e;</i> 0 秒',
                        margin: 20,
                        handler: function() {
                            var audio = this.getParent().down('audio');
                            if (audio.isPlaying()) {
                                audio.pause();
                            } else {
                            	audio.play();
                            }
                        }
                    }
                ] : [
                    {
                        xtype: 'audio',
                        url: url||util.audioDir+'/'+util.audioFileName,
                        loop: false
                    }
                ]
        	}).show();
        },
        war:function(msg,time){util.showMessage('war',msg,time);},
        suc:function(msg,time){util.showMessage('suc',msg,time);},
        err:function(msg,time){util.showMessage('err',msg,time);},
        info:function(msg,time){util.showMessage('info',msg,time);},
        loader:function(msg,progress,isAudio){
        	//msg
        	//进度 '上传中{0}' {0} = progress
        	//录音 '正在录音 {0}'
        	if(progress){
        		msg = Ext.String.format(msg, progress);
        	}
        	if(Ext.get('notification')){
        		if(progress){
        			Ext.get('notification').down('span').setHtml(format);
        		}
        		return;
        	}
        	util.showMessage(isAudio?'audio':'loader',msg);
        },
        showMessage: function (type,msg,time) {
        	if(Ext.get('notification')){return;}
        	msg = msg || '';
        	time = time || 1000;
        	var notification = Ext.create('Ext.Container', {
        		 id:'notification',
        		 cls:'notification '+type,
                 centered : true,
                 modal: {style: 'opacity: 0'},
                 hideOnMaskTap : false,
                 styleHtmlContent:true,
                 html:Ext.String.format('<div class="icon"></div><span class="text">{0}</span>',msg),
                 listeners:{
                 	hide:function(g){
                 		Ext.Viewport.remove(g);
                 	}
                 }
             });
             Ext.Viewport.add(notification);
             if(type!='loader'){
            	 notification.element.up('.x-center').addCls('nf-bottom');
	             setTimeout(function(){
		            util.hideMessage();
	             },time);
             }
             notification.show();
        },
        hideMessage:function(){
        	if(Ext.get('notification')){
        		Ext.get('notification').up('.x-center').removeCls('nf-bottom');
        		Ext.getCmp('notification').hide();
   			}
        },
        createGuide:function(innerItem){
        	if (!Ext.get('guideContainer')) {
                var guide = Ext.create('Ext.Container', {
                	id:'guideContainer',
                    centered : true,
                    modal    : true,
                    hideOnMaskTap : true,
                    items    : innerItem
                });
                Ext.Viewport.add(guide);
                guide.show();
            }
        },
        //重写ajax
        overrideAjax: function () {
            //开始加载
            Ext.Ajax.on('beforerequest',function (connection, options) {
            	if(config.user){
	            	Ext.applyIf(config.defaultParams,{
	            		username:config.user.username,
	            		token:config.user.token
	            	});
            	}
            	options.params = options.params||{}
            	Ext.applyIf(options.params,config.defaultParams);
            	if(!options.params.noloader){
            		util.loader(options.params.loaderText||'加载中...');
            		options.params.loaderText = '';
            		delete options.params.loaderText;
            		delete options.params.ostype;
            		delete options.params.version;
            	}
            });
            //加载成功
            Ext.Ajax.on('requestcomplete',function (conn, response, options, eOpts) {
            	options.params = options.params||{}
            	if(!options.params.noloader){
            		util.hideMessage();
            	}
            });
            //加载失败
            Ext.Ajax.on('requestexception',function (connection, options) {
                util.hideMessage();
                util.err('加载失败，请稍后再试');
            });
        },
        //重写Pick相关
        overridePick: function () {
            Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            Ext.Date.dayNames = ['周日','周一','周二','周三','周四','周五','周六'];
            Ext.define("Pass.app.DatePicker", {
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
        overrideMessageBox:function(){
        	Ext.MessageBox.YESNO =  [
	            {text: '取消',  itemId: 'no', ui: 'action'},
	            {text: '确定', itemId: 'yes', ui: 'action'}
	        ];
        },
        overrideList:function(){
        	Ext.define('xxx.overrides.dataview.DataView', {
                override: 'Ext.dataview.DataView',
                prepareData: function(data, index, record) {
                    if(Ext.isObject(data)) {
                        data.xindex = index + 1;
                    }
                    return data;
                }
            });
        },
        checkConnection :function(autoClose){
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
            	util.war('请打开网络链接',3000);
            	if(autoClose){
	            	setTimeout(function(){
	            		navigator.app.exitApp();
	            	},3000); 
            	}
            	return false;
            }else{return true;}
        },
        //app初始化执行
        init: function () {
            this.eActiveitemchange();
            this.overrideAjax();
            this.overridePick();
            this.overrideMessageBox();
            this.overrideList();
        }
    }
});