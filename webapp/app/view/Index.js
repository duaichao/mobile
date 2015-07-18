Ext.define("app.view.Index", {
    extend: 'Ext.tab.Panel',
    alternateClassName: 'index',
    xtype:'index',
    config: {
    	tabBarPosition: 'bottom',
        cls: 'tab',
        items: [
			{ xclass: 'app.view.user.Home' },
			{ xclass: 'app.view.App' },
			{ xclass: 'app.view.Setting'   },
			{ xclass: 'app.view.More' }
		]
        
    }
});