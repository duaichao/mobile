Ext.define('app.view.about.List', {

	extend: 'Ext.List',
	xtype: 'aboutList',

	config: {
		title: '更多',
		cls:'about',
		itemTpl: [ '<div class="{cls}">{title}</div>' ]
	},

	initialize: function() {
		this.callParent();
		this.setData(config.aboutPages);
	}
});
