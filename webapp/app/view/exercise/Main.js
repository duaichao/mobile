Ext.define('app.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    extend: 'Ext.Container',
    xtype: 'exerciseview',
    config: {
    	defaultParams:{},
    	layout:'fit',
        items: [{
        	title:'练习题',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				action: 'backhome',
				ui:'back',
				text:'返回'
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
        }]
    }
});