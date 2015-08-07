Ext.define('app.view.exercise.ExamPaper', {
    alternateClassName: 'examPaperView',
    xtype: 'examPaperView',
    extend: 'app.view.exercise.Main',
    config: {
    	scrollable:null,
    	record:null,
    	examCount:0,
    	examTime:0,
    	layout:'fit',
        items: [{
        	xtype:'tabbar',
    		docked:'bottom',
    		cls:'noactive',
    		defaults:{
    			minWidth:'25%'
    		},
    		items:[{
    			iconCls: 'prev',
    			itemId:'prev',
    	        title:'上一题'
    		},{
    			itemId:'submit',
    	    	title: '交卷',
    	        iconCls: 'visible'
    	    },{
    	    	itemId:'pager',
    	    	title: '0/0',
    	        iconCls: 'flist'
    	    },{
    			iconCls: 'next',
    			itemId:'next',
    	        title:'下一题'
    		}]
        }]
    }
});