Ext.define('Pass.controller.demo.Demo', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        },
        control: {
        	'demo button[action=play]':{
        		tap:function(){
        			util.audioPlayer();
        		}
        	},
        	'demo button[action=playonline]':{
        		tap:function(){
        			util.audioPlayer('http://qzone.haoduoge.com/music6/2015-07-25/1437805719.mp3');
        		}
        	},
        	'demo button[action=rec]':{
        		release:function(){
        			if(Ext.get('notification')&&Ext.get('notification').hasCls('exph-audio')){
        				util.audioStop();
        			}else{
        				util.war('时间太短');
        			}
        			
                }
        	}
        }
    }
});