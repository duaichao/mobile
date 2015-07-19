Ext.define('app.view.user.Home', {
    extend: 'Ext.navigation.View',
    xtype: 'home',
    config: {

        iconCls: 'icon-gerenzhongxin',
        title:'首页',
        autoDestroy: false,
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
			layout: 'fit',
			items:[{
	            xtype: 'dataview',
	            scrollable: {
	                direction: 'vertical'
	            },
	            cls: 'dv-basic',
	            itemTpl: [
	                  '<div class="dv-item">',
	                  '<div class="progress-ring" data-precent="{passing_percent}"></div>',
	                  '<div class="content">',
	                  '<h3>{course_name}</h3>',
	                  '<div class="ht20 font12">已完成：{process_num}/{total_num}题    平均速度：{average_speed}秒</div>',
	                  
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
