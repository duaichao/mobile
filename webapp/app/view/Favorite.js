Ext.define('app.view.Favorite', {
    extend: 'Ext.Container',
    xtype: 'favoriteContainer',
    alternateClassName: 'favoriteContainer',
    config: {
    	items:[{
        	title:'我的收藏',
        	ui:'fred',
			docked: 'top',
			xtype: 'titlebar'
        }]
    }
});
