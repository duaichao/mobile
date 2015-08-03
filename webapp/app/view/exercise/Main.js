Ext.define('app.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    xtype: 'exerciseview',
    extend: 'Ext.form.Panel',
    config: {
    	scrollable:null,
    	defaultParams:{},
    	layout:'fit',
        items: [{
        	title:'练习题',
        	ui:'fred',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				action: 'backhome',
				ui:'back',
				text:'返回'
			}]
        },{
        	xtype:'tabbar',
    		docked:'bottom',
    		defaults:{
    			minWidth:'20%'
    		},
    		items:[{
    			iconCls: 'prev',
    			itemId:'prev',
    	        title:'上一题'
    		},{
    			itemId:'anwser',
    	    	title: '显示答案',
    	        iconCls: 'visible'
    	    },{
    	    	itemId:'pager',
    	    	title: '0/100',
    	        iconCls: 'flist'
    	    },{
    	    	itemId:'favorite',
	   			title: '收藏',
			    iconCls: 'fav'
			},{
    			iconCls: 'next',
    			itemId:'next',
    	        title:'下一题'
    		}]
        }]
    }
});