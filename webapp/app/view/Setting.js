Ext.define('app.view.Setting', {
    extend: 'Ext.Container',
    xtype: 'settingContainer',
    config: {
        title: '设置',
        iconCls: 'icon-shezhi',
        items: [{
        	title:'设置',
			docked: 'top',
			xtype: 'titlebar'
        }]
    }
});
