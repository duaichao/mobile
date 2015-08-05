Ext.define("app.view.Main", {
    extend: 'Ext.navigation.View',
    alternateClassName: 'mainView',
    xtype:'mainView',
    config: {
    	fullscreen:true,
    	scrollable:false,
		defaultBackButtonText:'返回',
		navigationBar: {
			ui:'fred',
			items:[/*{
				text:'test',
				handler:function(){
					console.log(this.up('mainView').getInnerItems().length)
				}
			},*/{
				itemId:'rightTplButton',
				hidden:true,
				ui:'plain',
				align:'right'
			}]
	    },
	    items:[{xclass:'app.view.Tab'}]
    }
});