Ext.define('app.view.Setting', {
    extend: 'Ext.Container',
    xtype: 'settingContainer',
    alternateClassName: 'settingContainer',
    config: {
    	items:[{
        	title:'设置',
			docked: 'top',
			xtype: 'titlebar'
        }]
    }
});
