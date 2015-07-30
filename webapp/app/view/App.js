Ext.define('app.view.App', {
    extend: 'Ext.Container',
    alternateClassName: 'appContainer',
    xtype: 'appContainer',
    config: {
    	layout:'fit',
    	items:[{
        	title:'应用中心',
			docked: 'top',
			xtype: 'titlebar'
        },{
            xtype: 'dataview',
            scrollable:null,
            inline: true,
            cls: 'dv-basic inline',
            itemTpl: [
                  '<div class="tit" style="background-image: url({title});"></div>',
                  '<div class="img" style="background-image: url({pic});"></div>'
            ].join(''),
            loadingText:false,
            store: Ext.create("Ext.data.Store", {
                model: "app.model.App",
                proxy: {
                    type: "ajax",
                    actionMethods : 'POST',
                    url : config.url.getApps,
                    reader: {
                        type: "json",
                        messageProperty:'info',
                        successProperty:'state',
                        rootProperty: "result"
                    }
                },
                autoLoad: false
            })
        }],
        listeners:{
        	painted:function(){
    	    	var dv = this.down('dataview'),
        		st = dv.getStore();
    	    	st.getProxy().setExtraParams(config.user);
    	    	st.load({callback:function(){
    	    	}});
    	    }
        }
    }
});
