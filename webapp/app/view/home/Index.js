Ext.define('app.view.home.Index', {
    extend: 'Ext.Container',
    alternateClassName: 'homeIndexContainer',
    xtype: 'homeIndexContainer',
    config: {
    	title:'个人中心',
    	layout:'fit',
        autoDestroy:true,
		userInfo:null,
    },
	applyUserInfo:function(cfg){
    	var r = config.user,html,me = this;
    	if(r){
    		html = [
		        '<div class="ue-info-name">欢迎你，<span>{0}</span></div>',
		        '<div class="ue-info-other">距离考试还有<span class="font20 fnumber blue"> {1} </span>天</div>'
    		].join('');
	    	return Ext.factory(Ext.applyIf(cfg,{
	    		layout:'hbox',
	    		items:[{
	    			height: 70,
	    		    width: 70,
	    			cls:'ue-info-face',
	    			xtype:'image',
	    			src:config.url.host+r.photo
	    		},{
	    			flex:1,
	    			cls:'ue-info',
	    			xtype:'container',
	    			listeners  : {
	    		        element : 'element',
	    		        tap     : function(e) {
	    		            me.up('userCard').push(Ext.create('app.view.user.Info'));
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
			courseView = Ext.create('app.view.user.Course');
		store.getProxy().setExtraParams({
			token:config.user.token,
			username:config.user.username
		});
	    store.load({
	    	callback:function(records, operation, success){
	    		Ext.Array.each(records,function(record,index){
	    			util.drawScore(Ext.get(courseView.getItemAt(index)).down('.progress-ring'));
	    		});
	    	}
	    });
	    this.add(courseView);
	    this.callParent();
	}
});
