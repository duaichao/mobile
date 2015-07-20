Ext.define('app.view.exercise.Main', {
    alternateClassName: 'exerciseview',
    extend: 'Ext.Container',
    requires: ['app.view.exercise.List'],
    xtype: 'exerciseview',
    defaultParams:{},
    config: {
 		title:'练习题',
        layout: 'vbox',
        items: [/*{
        	docked: 'top',
            xtype: 'panel',
            height:35,
            cls:'word-search',
            style:'background:#ffffff;',
            layout:'hbox',
            items:[{
            	xtype:'searchfield',
            	name:'KEYWORD',
            	placeHolder:'线路编号/线路名称/目的地',
            	flex:1
            },{
            	xtype:'button',
            	ui:'round',
            	text:'搜索',
            	action:'queryRoute',
            	style:'margin-left:5px;margin-top:5px;padding:2px 5px;font-size:12px;margin-right:3px;',
            	height:25,
            	width:45
            }]
        },*/{
        	xtype: 'exerciselist',
        	flex:1
        }],
	    listeners:{
	    	'activate':function(p, eOpts){
	    		var st = p.down('exerciselist').getStore();
	    		st.getProxy().setExtraParams(Ext.applyIf(p.defaultParams,st.getProxy().getExtraParams()));
	    		st.load();
	       	}
	    }
    }
});