Ext.define("app.view.Index", {
	alternateClassName: 'index',
    xtype:'index',
    extend: 'Ext.Container',
    config: {
    	layout:'card',
    	items:[{
    		xtype:'tabbar',
    		cls:'ui tab',
    		activeTab:0,
    		docked:'bottom',
    		defaults:{
    			minWidth:'25%'
    		},
    		items:[{
    			iconCls: 'icon-gerenzhongxin',
    			itemId:'home',
    	        title:'个人中心'
    		},{
    			itemId:'appContainer',
    	    	title: '应用中心',
    	        iconCls: 'icon-yingyong'
    	    },{
    	    	itemId:'settingContainer',
    	    	title: '设置',
    	        iconCls: 'icon-shezhi'
    	    },{
    	    	itemId:'moreContainer',
	   			title: '更多',
			    iconCls: 'icon-gengduo'
			}]
    	},{
        	xclass: 'app.view.user.Home'
        }]
    }
    /*extend: 'Ext.tab.Panel',
    alternateClassName: 'index',
    xtype:'index',
    config: {
    	autoDestroy: false,
    	tabBarPosition: 'bottom',
        cls: 'tab',
        items: [
			{ xclass: 'app.view.user.Home' },
			{ xclass: 'app.view.App' },
			{ xclass: 'app.view.Setting'   },
			{ xclass: 'app.view.More' }
		]
        
    }*/
});