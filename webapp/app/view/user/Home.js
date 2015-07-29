Ext.define('app.view.user.Home', {
    extend: 'Ext.Container',
    alternateClassName: 'home',
    xtype: 'home',
    config: {
        autoDestroy:false,
        listeners:{
		    activate:function(){
		    	var btn = this.down('button[action=hello]'),
		    		text = btn.getText();
		    	btn.setText(Ext.String.format(text, (config.user.nickname||config.user.username), util.lastDays(config.user.exam_time)));
		    },
		    painted:function(){//该事件发生在dom加载完成时 
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
        	title:'首页',
			docked: 'top',
			xtype: 'titlebar'
        },{
			xtype:'container',
			height:100,
			layout:'hbox',
			items:[{
				width:80,
				height:80,
				action:'face',
				cls:'ui face',
				xtype:'button',
				text:[
				      '<img src="resources/images/noface.png" style="top:8px;left:15px;height:50px;width:50px;">'
				].join('')
			},{
				flex:1,
				action:'hello',
				xtype:'button',
				cls:'ui hello',
				text:[
				      '<h3 class="font16">欢迎你，<span class="font20">{0}</span></h3>',
				      '<div class="ht30 time font14 ">距离考试还有<span class="font20 fnumber blue"> {1} </span>天</div>',
				      '<i class="iconfont">&#xe60b;</i>'
				].join('')
			}]
        },{
			scrollable:null,
            xtype: 'dataview',
            cls: 'dv-basic',
            itemTpl: [
                  '<div class="warp bg{xindex}"">',
                  '<div class="progress-ring" data-percent="{correct_percent}">',
          			'<canvas height="90" width="90" style="width:90px; height: 90px;" aa="{xindex}"></canvas>',
         				'<div class="score"></div>',
          		  '</div>',	
                  /*'<div class="progress-ring" data-precent="{passing_percent}">',
                  '<div class="progress-track"></div><div class="progress-left"></div><div class="progress-right"></div><div class="progress-cover"></div><div class="progress-text"><span class="progress-num">{passing_percent}</span><span class="progress-percent">%</span></div>',
                  '</div>',*/
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
