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
			}/*,{
				itemId: 'prev',
				disabled:true,
				padding:0,
				align:'right',
				ui:'plain',
				iconCls:'icon-zuojiantou2 white'
			},{
				itemId: 'next',
				padding:0,
				ui:'plain',
				align:'right',
				iconCls:'icon-youjiantou2 white'
			}*/]
        },{
        	xtype:'tabbar',
    		cls:'ui tab',
    		activeTab:0,
    		docked:'bottom',
    		defaults:{
    			minWidth:'20%'
    		},
    		items:[{
    			iconCls: 'icon-zuojiantou2',
    			itemId:'prev',
    	        title:'上一题'
    		},{
    			itemId:'anwser',
    	    	title: '显示答案',
    	        iconCls: 'icon-show'
    	    },{
    	    	itemId:'pager',
    	    	title: '0/100',
    	        iconCls: 'icon-svgliebiao'
    	    },{
    	    	itemId:'favorite',
	   			title: '收藏',
			    iconCls: 'icon-shoucang'
			},{
    			iconCls: 'icon-youjiantou2',
    			itemId:'next',
    	        title:'下一题'
    		}]
        },{
        	xtype: 'exerciselist'
        }]
    }
});