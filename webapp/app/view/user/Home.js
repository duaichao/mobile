Ext.define('app.view.user.Home', {
    extend: 'Ext.Container',
    alternateClassName: 'home',
    xtype: 'home',
    config: {
        autoDestroy:false,
        listeners:{
		    activate:function(){
		    	var person = this.down('container#u-person'),
		    		info = person.element.down('#u-info'),
		    		hello = info.down('h3'),
		    		other = info.down('#u-other'),
		    		face = person.element.down('#u-face');
		    	hello.setHtml(Ext.String.format('欢迎你，<span>{0}</span>', config.user.nickname||config.user.username));
		    	other.setHtml(Ext.String.format('距离考试还有<span class="font20 fnumber blue"> {0} </span>天', util.lastDays(config.user.exam_time)));
		    	face.dom.src = config.url.host+config.user.photo;
		    },
		    painted:function(){
		    	//该事件发生在dom加载完成时 
		    	var me = this,
			    	dv = this.down('dataview');
		    	//画圆环 
	    		dv.element.select('.x-dataview-item').each(function(item,c,i){
	    			//util.drawScore(item.down('.progress-ring'));
	    		});
		    }
        },
        scrollable: {
            direction: 'vertical'
        },
        layout:'vbox',
        items: [{
        	title:'个人中心',
			docked: 'top',
			ui:'fred',
			xtype: 'titlebar'
        },{
			xtype:'container',
			itemId:'u-person',
			cls:'u-person',
			listeners:{
				element:'element',
				tap:function(event, node, options, eOpts){
					var uc = app.app.getApplication().getController('User');
					if(event.target.tagName=='IMG'){
						uc.openFileSelector.call(uc);
					}else{
						util.ePush('userInfo');
					}
				}
			},
			styleHtmlContent:true,
			height:88,
			html:[
			      '<img src="resources/images/noface.png" id="u-face">',
			      '<div id="u-info">',
			      '<h3>欢迎你，<span>{0}</span></h3>',
			      '<div id="u-other" class="ht30 other font14 ">距离考试还有<span class="font20 fnumber blue"> {1} </span>天</div>',
			      '<i class="iconfont">&#xe60b;</i>',
			      '</div>'
			].join('')
        },{
			scrollable:false,
            xtype: 'course',
            flex:1
		}]
    }
});
