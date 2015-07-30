Ext.define('app.view.user.Home', {
    extend: 'Ext.Container',
    alternateClassName: 'home',
    xtype: 'home',
    config: {
        autoDestroy:true,
        listeners:{
		    activate:function(){
		    	var person = this.down('container#u-person'),
		    		info = person.element.down('#u-info'),
		    		hello = info.down('h3'),
		    		other = info.down('#u-other'),
		    		face = person.element.down('#u-face');
		    	hello.setHtml(Ext.String.format('欢迎你，<span>{0}</span>', config.user.nickname||config.user.username));
		    	other.setHtml(Ext.String.format('距离考试还有<span class="font20 fnumber blue"> {0} </span>天', util.lastDays(config.user.exam_time)));
		    },
		    painted:function(){
		    	//该事件发生在dom加载完成时 
		    	var dv = this.down('dataview'),
	    		st = dv.getStore();
		    	st.getProxy().setExtraParams(config.user);
		    	st.load({callback:function(){
		    		dv.element.select('.progress-ring').each(function(ring,c,i){
		    			//util.loadingRing(ring);
		    			util.drawScore(ring);
		    		});
		    	}});
		    }
        },
        scrollable: {
            direction: 'vertical'
        },
        items: [{
        	title:'个人中心',
			docked: 'top',
			xtype: 'titlebar'
        },{
			xtype:'container',
			itemId:'u-person',
			cls:'u-person',
			listeners:{
				element:'element',
				tap:function(event, node, options, eOpts){
					var uc = app.app.getApplication().getController('user.User');
					if(event.target.tagName=='IMG'){
						uc.openFileSelector.call(uc);
					}else{
						util.ePush('userInfo');
						uc.loadPersonInfo.call(uc,config.user);
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
			scrollable:null,
            xtype: 'dataview',
            cls: 'dv-basic',
            itemTpl: [
                  '<div class="warp bg{xindex}"">',
                  '<div class="progress-ring" data-percent="{correct_percent}">',
          			'<canvas height="80" width="80"></canvas>',
         				'<div class="score"></div>',
          		  '</div>',	
                  '<div class="content">',
                  		'<div class="name">{course_name}</div>',
                  		'<div class="affiliation">已完成：{process_num}/{total_num}题    平均速度：{average_speed}秒</div>',
	                    '<div class="buttons">',
		                    '<button class="ui button kclx">练习题</button>',
		                    '<button class="ui button">自定义练习</button>',
		                    '<button class="ui button">模拟考试</button>',
	                    '</div>',
                  '</div>',
                  '</div>'
            ].join(''),
            loadingText:false,
            store: Ext.create("Ext.data.Store", {
                model: "app.model.Course",
                proxy: {
                    type: "ajax",
                    actionMethods : 'POST',
                    url : config.url.getCourseList,
                    reader: {
                        type: "json",
                        messageProperty:'info',
                        successProperty:'state',
                        rootProperty: "result"
                    }
                },
                autoLoad: false
            })
		}]
    }
});
