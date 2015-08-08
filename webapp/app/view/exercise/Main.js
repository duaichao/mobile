Ext.define('Pass.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    xtype: 'exerciseview',
    extend: 'Ext.Container',
    config: {
    	scrollable:null,
    	record:null,
    	layout:'fit',
    	dyBtnText:['已收藏','已收藏','','取消收藏','删除'],
    	dyBtnDefText:['未收藏','未收藏','','取消收藏','删除'],
    	dyBtnIcon:['fav','fav','','fav','del'],
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