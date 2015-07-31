Ext.define('app.view.about.More', {
	extend: 'Ext.NavigationView',
    xtype: 'moreContainer',
    alternateClassName: 'moreContainer',
    config:{
    	autoDestroy: false,
    	title: '更多',
    	items: [{
			scrollable:false,
			xtype: 'aboutList'
		}]
    }
});
