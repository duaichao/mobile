Ext.define("Pass.view.Tab", {
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
	       {xclass:'Pass.view.Home'},
	       {xclass:'Pass.view.Favorite'},
	       {xclass:'Pass.view.App'},
	       {xclass:'Pass.view.About'}
		]
    }
});