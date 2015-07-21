Ext.define('app.view.user.Home', {
    extend: 'Ext.navigation.View',
    xtype: 'home',
    config: {

        iconCls: 'icon-gerenzhongxin',
        title:'首页',
        autoDestroy: false,
        listeners:{
		    activate:function(){
		    	var dv = this.down('dataview'),
		    		st = dv.getStore();
		    	st.getProxy().setExtraParams(config.user);
		    	st.load({callback:function(){
		    		dv.element.select('.progress-ring').each(function(ring,c,i){
		    			util.loadingRing(ring);
		    		});
		    	}});
		    	var btn = this.down('button[action=hello]'),
		    		text = btn.getText();
		    	btn.setText(Ext.String.format(text, (config.user.nickname||config.user.username), util.lastDays(config.user.examtime)));
		    	
		    }
        },
        items: [{
			title:'首页',
			layout: 'vbox',
			scrollable: {
                direction: 'vertical'
            },
			items:[{
				height:100,
				layout:'hbox',
				items:[{
					width:80,
					height:80,
					action:'face',
					cls:'face',
					xtype:'button',
					text:[
					      '<img src="resources/images/noface.png" style="top:-10px;left:-3px;">'
					].join('')
				},{
					flex:1,
					action:'hello',
					xtype:'button',
					cls:'hello',
					text:[
					      '<h3 class="font16">欢迎你，<span class="font20">{0}</span></h3>',
					      '<div class="ht30 time font14 ">距离考试还有<span class="font20 fnumber blue"> {1} </span>天</div>',
					      '<i class="iconfont">&#xe60b;</i>'
					].join('')
				}]
			},{
				scrollable:null,
	            xtype: 'dataview',
	            cls: 'dv-basic',
	            itemTpl: [
	                  '<div class="warp bg{xindex}"">',
	                  '<div class="progress-ring" data-precent="{passing_percent}">',
	                  '<div class="progress-track"></div><div class="progress-left"></div><div class="progress-right"></div><div class="progress-cover"></div><div class="progress-text"><span class="progress-num">{passing_percent}</span><span class="progress-percent">%</span></div>',
	                  '</div>',
	                  '<div class="content">',
	                  		'<div class="name">{course_name}</div>',
	                  		'<div class="affiliation">已完成：{process_num}/{total_num}题    平均速度：{average_speed}秒</div>',
		                    '<div class="buttons">',
			                    '<a href="javascript:;" class="button kclx">练习题</a>',
			                    '<a href="javascript:;" class="button">自定义练习</a>',
			                    '<a href="javascript:;" class="button">模拟考试</a>',
		                    '</div>',
	                  '</div>',
	                  '</div>'
	            ].join(''),
	            loadingText:false,
	            store: Ext.create("Ext.data.Store", {
	                model: "app.model.Course",
	                proxy: {
	                    type: "ajax",
	                    actionMethods : 'POST',
	                    url : config.url.getCourseList,
	                    reader: {
	                        type: "json",
	                        messageProperty:'info',
	                        successProperty:'state',
	                        rootProperty: "result"
	                    }
	                },
	                autoLoad: false
	            })
			}]
		}]
    }
});
