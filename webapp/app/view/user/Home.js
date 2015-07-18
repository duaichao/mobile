Ext.define('app.view.user.Home', {

    extend: 'Ext.navigation.View',
    xtype: 'home',
    config: {

        title: '首页',
        iconCls: 'icon-gerenzhongxin',
		
        autoDestroy: false,
		navigationBar: {
			
            items: [{
                xtype: 'button',
                iconCls:'icon-geren',
                align: 'right',
                ui: 'plain'
            }],
            docked: 'top'
        },
        items: [{
			title:'首页'
		}]
    }
});
