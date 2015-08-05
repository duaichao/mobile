Ext.define("app.view.Tab", {
    extend: 'Ext.tab.Panel',
    alternateClassName: 'indexView',
    xtype:'indexView',
    config: {
    	tabBarPosition: 'bottom',
    	tabBar: {
    		defaults:{
    			minWidth:'25%'
    		}
		},
		title:'个人中心',
		activeItem:0,
    	scrollable:false,
		items:[
	       {xclass:'app.view.Home'},
	       {xclass:'app.view.Favorite'},
	       {xclass:'app.view.App'},
	       {xclass:'app.view.About'}
		]
    }
});