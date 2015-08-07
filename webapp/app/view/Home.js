Ext.define('app.view.Home', {
	extend: 'Ext.Container',
    alternateClassName: 'homeContainer',
    xtype:'homeContainer',
    config:{
    	title: '个人中心',
        iconCls: 'home',
        layout:'fit',
        datas:null,
        userInfo:null
    },
	applyUserInfo:function(cfg){
    	var r = config.user,html,me = this,photo = 'resources/images/noface.png';
    	if(r){
    		html = [
		        '<div class="ue-info-name">欢迎你，<span>{0}</span></div>',
		        '<div class="ue-info-other">距离考试还有<span class="font20 fnumber blue"> {1} </span>天</div>'
    		].join('');
    		if(r.photo){
    			photo = config.url.host+r.photo;
    		}
	    	return Ext.factory(Ext.applyIf(cfg,{
	    		layout:'hbox',
	    		items:[{
	    			height: 70,
	    		    width: 70,
	    			cls:'ue-info-face',
	    			xtype:'image',
	    			src:photo
	    		},{
	    			flex:1,
	    			cls:'ue-info',
	    			xtype:'container',
	    			listeners  : {
	    		        element : 'element',
	    		        tap     : function(e) {
	    		            me.up('mainView').push(Ext.create('app.view.home.Info'));
	    		        }
	    		    },
	    			styleHtmlContent:true,
	    			html:Ext.String.format(html,(r.nickname||r.username),util.lastDays(r.exam_time))
	    		}]
	    	}), 'Ext.Container');
    	}
    },
    updateUserInfo: function(newInfo, oldInfo) {
        if (newInfo) {
            this.add(newInfo);
        }
        if (oldInfo) {
            this.remove(oldInfo);
        }
    },
    initialize: function() {
    	this.setUserInfo({docked:'top',cls:'ue-info-container'});
		var store = Ext.getStore('Course'),
			courseView = Ext.create('app.view.home.Course');
		store.getProxy().setExtraParams({
			token:config.user.token,
			username:config.user.username
		});
	    store.load({
	    	callback:function(){
	    		courseView.element.select('.x-dataview-item').each(function(item,c,i){
	    			util.drawScore(item.down('.progress-ring'));
	    		});
	    	}
	    });
	    this.add(courseView);
	    this.callParent();
	},
	updateDatas:function(newDatas,oldDatas){
		this.setUserInfo({docked:'top',cls:'ue-info-container'});
		var courseView = this.down('course');
		courseView.getStore().load({
	    	callback:function(){
	    		courseView.element.select('.x-dataview-item').each(function(item,c,i){
	    			util.drawScore(item.down('.progress-ring'));
	    		});
	    	}
	    });
	}
});
