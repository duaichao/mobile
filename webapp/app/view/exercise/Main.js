Ext.define('app.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    extend: 'Ext.Container',
    requires: ['app.view.exercise.List'],
    xtype: 'exerciseview',
    config: {
    	autoDestroy: false,
    	defaultParams:{},
        layout: 'vbox',
        items: [{
        	title:'练习题',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				action: 'backhome',
				ui:'back',
				text:'Back'
			}]
        },{
        	xtype: 'exerciselist',
        	flex:1
        }],
	    listeners:{
	    	'activate':function(p, eOpts){
	    		var st = p.down('exerciselist').getStore();
	    		st.getProxy().setExtraParams(Ext.applyIf(p.getDefaultParams(),st.getProxy().getExtraParams()));
	    		st.loadPage(1);
	       	}
	    }
    }
});