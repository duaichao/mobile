Ext.define('app.controller.demo.Demo', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
        	'demo button[action=play]':{
        		tap:function(){
        			util.mediaPlayer();
        		}
        	},
        	'demo button[action=rec]':{
        		release:function(){
        			if(Ext.get('notification')&&Ext.get('notification').hasCls('exph-recer')){
        				util.stopRecord();
        			}else{
        				util.war('时间太短');
        			}
        			
                }
        	}
        }
    },
    startRecording:function(){
    	console.log(this);
    }
});