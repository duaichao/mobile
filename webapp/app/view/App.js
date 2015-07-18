Ext.define('app.view.App', {

    extend: 'Ext.navigation.View',
    xtype: 'appContainer',

    config: {

        title: '应用中心',
        iconCls: 'icon-yingyong',

        autoDestroy: false,

        items: [{
			title: '应用中心'
		}]
    }
});
