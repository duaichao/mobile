Ext.define('app.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    extend: 'Ext.Container',
    requires: ['app.view.exercise.List'],
    xtype: 'exerciseview',
    config: {
    	autoDestroy: true,
    	defaultParams:{},
    	layout:'fit',
        items: [{
        	title:'练习题',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				action: 'backhome',
				ui:'back',
				text:'Back'
			},{
				itemId: 'prev',
				//text:'上一页',
				//ui:'back'
				disabled:true,
				padding:0,
				align:'right',
				ui:'plain',
				iconCls:'icon-zuojiantou2 white'
			},{
				itemId: 'next',
				//text:'下一页',
				//ui:'forward'
				padding:0,
				ui:'plain',
				align:'right',
				iconCls:'icon-youjiantou2 white'
			}]
        },{
        	xtype: 'exerciselist'
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