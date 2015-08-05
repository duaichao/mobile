Ext.define('app.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    xtype: 'exerciseview',
    extend: 'Ext.Container',
    config: {
    	scrollable:null,
    	record:null,
    	layout:'fit',
        items: [{
        	xtype:'tabbar',
    		docked:'bottom',
    		cls:'noactive',
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
    	    	title: '0/0',
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