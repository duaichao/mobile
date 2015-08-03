Ext.define("app.view.Index", {
	alternateClassName: 'index',
    xtype:'index',
    extend: 'Ext.Container',
    config: {
    	layout:'card',
    	items:[{
    		xtype:'tabbar',
    		activeTab:0,
    		docked:'bottom',
    		defaults:{
    			minWidth:'25%'
    		},
    		items:[{
    			iconCls: 'home',
    			itemId:'home',
    	        title:'个人中心'
    		},{
    			itemId:'favoriteContainer',
    	    	title: '我的收藏',
    	        iconCls: 'favorite'
    	    },{
    	    	itemId:'appContainer',
    	    	title: '应用精选',
    	        iconCls: 'apps'
    	    },{
    	    	itemId:'moreContainer',
	   			title: '更多',
			    iconCls: 'more'
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