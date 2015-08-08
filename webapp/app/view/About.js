Ext.define('Pass.view.About', {
	extend: 'Ext.Container',
    alternateClassName: 'aboutContainer',
    xtype:'aboutContainer',
    config:{
    	title: '更多',
        iconCls: 'more',
        layout:'fit',
        items:[{
        	scrollable:false,
			xtype: 'aboutList'
        }]
    }
});
