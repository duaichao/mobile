Ext.define('app.controller.Index', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
        	'home button[iconCls=icon-geren]':{
        		tap : function(btn){
        			util.war('loading...');
        		}
        	}
        }
    }
});