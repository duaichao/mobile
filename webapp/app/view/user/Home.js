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
		    		dv.el.select('.progress-ring').each(function(ring,c,i){
		    			util.loadingRing(ring);
		    			ring.parent().setStyle('background',config.color[i]||'#53a93f');
		    		});
		    	}});
		    	var btn = this.down('button[action=hello]'),
		    		text = btn.getText();
		    	btn.setText(Ext.String.format(text, (config.user.nickname||config.user.username), util.lastDays(config.user.examtime)));
		    	
		    }
        },
		navigationBar: {
            items: [{
                xtype: 'button',
                iconCls:'icon-geren',
                action:'toinfo',
                align: 'right',
                ui: 'plain'
            }],
            docked: 'top'
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
					      '<img src="resources/images/noface.png">'
					].join('')
				},{
					flex:1,
					action:'hello',
					xtype:'button',
					cls:'hello',
					text:[
					      '<h3 class="font16">欢迎你，<span class="font20">{0}</span></h3>',
					      '<div class="ht30 time font14 ">距离考试还有<span class="font20 fnumber blue"> {1} </span>天</div>'
					].join('')
				}]
			},{
				scrollable:null,
	            xtype: 'dataview',
	            cls: 'dv-basic',
	            itemTpl: [
	                  '<div class="dv-item">',
	                  '<div class="progress-ring" data-precent="{passing_percent}"></div>',
	                  '<div class="content">',
	                  '<h3>{course_name}</h3>',
	                  '<div class="ht20 font12 detail">已完成：{process_num}/{total_num}题    平均速度：{average_speed}秒</div>',
	                  
	                  '<div class="bars">',
	                  '<button class="action"><span class="label">顺序练习</span></button>',
	                  '<button class="action"><span class="label">自定义练习</span></button>',
	                  '<button class="action"><span class="label">模拟考试</span></button>',
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
