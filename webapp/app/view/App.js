Ext.define('app.view.App', {
    extend: 'Ext.Container',
    alternateClassName: 'appContainer',
    xtype: 'appContainer',
    config: {
    	items:[{
        	title:'应用中心',
			docked: 'top',
			xtype: 'titlebar'
        }]
    }
});
