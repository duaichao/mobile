Ext.define('app.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    xtype: 'exerciseview',
    extend: 'Ext.Container',
    config: {
    	defaultParams:{},
    	layout:'fit',
        items: [{
        	title:'练习题',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				action: 'backhome',
				ui:'back',
				text:'返回'
			}]
        },{
        	xtype:'tabbar',
    		cls:'ui tab',
    		activeTab:0,
    		docked:'bottom',
    		defaults:{
    			minWidth:'20%'
    		},
    		items:[{
    			iconCls: 'icon-wwwzuojiantou',
    			itemId:'prev',
    	        title:'上一题'
    		},{
    			itemId:'anwser',
    	    	title: '显示答案',
    	        iconCls: 'icon-xianshi'
    	    },{
    	    	itemId:'pager',
    	    	title: '0/100',
    	        iconCls: 'icon-list'
    	    },{
    	    	itemId:'favorite',
	   			title: '收藏',
			    iconCls: 'icon-shoucang'
			},{
    			iconCls: 'icon-wwwyoujiantou',
    			itemId:'next',
    	        title:'下一题'
    		}]
        }]
    }
});