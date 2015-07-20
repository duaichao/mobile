Ext.define('app.Util', {
    alternateClassName: 'util',
    statics: {
    	loadingRing :function(target){
    		var defaultOpt = {
	            trackColor: '#fff',
	            progressColor: '#6ec84e',
	            precent: 75,
	            duration: 1500
	        }; // 默认选项
            var color = target.getAttribute('data-color'); // 颜色
            var oldPrecent = target.getAttribute('data-precent');
            var precent = parseInt(oldPrecent, 10); // 百分比
            var duration = parseFloat(target.getAttribute('data-duration'), 10) * 1000; // 持续时间
            var trackColor, progressColor;
            if (color && color.split(',').length === 2) {
                var colorSet = color.split(',');
                trackColor = colorSet[0];
                progressColor = colorSet[1];
            } else {
                trackColor = defaultOpt.trackColor;
                progressColor = defaultOpt.progressColor;
            }
            if (!precent)
                precent = defaultOpt.precent;
            if (!duration)
                duration = defaultOpt.duration;
            
            Ext.DomHelper.append(target,'<div class="progress-track"></div><div class="progress-left"></div><div class="progress-right"></div><div class="progress-cover"></div><div class="progress-text"><span class="progress-num">' + oldPrecent +'</span><span class="progress-percent">%</span></div>');
            
            var x = target.down('.progress-cover').getHeight(); // 触发 Layout

            target.select('.progress-track, .progress-cover').each(function(el){
            	el.setStyle('border-color', trackColor);
            });
            target.select('.progress-left, .progress-right').each(function(el){
            	el.setStyle('border-color', progressColor);
            });

            target.down('.progress-left').setStyle({
                'transform': 'rotate(' + precent * 3.6 + 'deg)',
                '-o-transform': 'rotate(' + precent * 3.6 + 'deg)',
                '-ms-transform': 'rotate(' + precent * 3.6 + 'deg)',
                '-moz-transform': 'rotate(' + precent * 3.6 + 'deg)',
                '-webkit-transform': 'rotate(' + precent * 3.6 + 'deg)',
                'transition': 'transform ' + duration + 'ms linear',
                '-o-transition': '-o-transform ' + duration + 'ms linear',
                '-ms-transition': '-ms-transform ' + duration + 'ms linear',
                '-moz-transition': '-moz-transform ' + duration + 'ms linear',
                '-webkit-transition': '-webkit-transform ' + duration + 'ms linear'
            });

            if (precent > 50) {
                var animation = 'toggle ' + (duration * 50 / precent) + 'ms';
                target.down('.progress-right').setStyle({
                    'opacity': 1,
                    'animation': animation,
                    'animation-timing-function': 'step-end'
                });
                target.down('.progress-cover').setStyle({
                    'opacity': 0,
                    'animation': animation,
                    'animation-timing-function': 'step-start'
                });
            }
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
		        } else if (diff < 60 * 60 * 24) {
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
        loader:function(format,progress){
        	format = Ext.String.format(format, progress);
        	if(Ext.get('notification')){
        		if(progress){
        			Ext.get('notification').down('span').setHtml(format);
        		}
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
        //app初始化执行
        init: function () {
            this.eActiveitemchange();
            this.overrideList();
            this.overrideAjax();
            this.overridePick();
        }
    }
});