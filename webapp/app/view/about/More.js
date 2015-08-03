Ext.define('app.view.about.More', {
	extend: 'Ext.NavigationView',
    xtype: 'moreContainer',
    alternateClassName: 'moreContainer',
    config:{
    	navigationBar: {
    	    ui: 'fred',
    	    docked: 'top'
    	},
    	autoDestroy: true,
    	title: '更多',
    	items: [{
			scrollable:false,
			xtype: 'aboutList'
		}]
    }
});
