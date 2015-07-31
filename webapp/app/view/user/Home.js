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
		    	var styles = ['rgba(41,128,185,1)','rgba(26,188,156,1)','rgba(211,84,0,1)'];
	    		//设置背景色 画圆环 子按钮监听
	    		dv.element.select('.x-dataview-item').each(function(item,c,i){
	    			item.setStyle({background:styles[i]});
	    			util.drawScore(item.down('.progress-ring'));
	    			var blue = item.down('.blue'),
	    				green = item.down('.green'),
	    				red = item.down('.red');
	    			green.on('touchstart', me.onPress, green);
	    			red.on('touchstart', me.onPress, red);
	    			blue.on('touchstart', me.onPress, blue);
	    			green.on('touchend', me.onRelease, green);
	    			red.on('touchend', me.onRelease, red);
	    			blue.on('touchend', me.onRelease, blue);
	    		});
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
			scrollable:null,
            xtype: 'dataview',
            cls: 'dv-basic',
            itemTpl: [
                  '<div class="progress-ring" data-percent="{correct_percent}">',
          			'<canvas height="80" width="80"></canvas>',
         				'<div class="score"></div>',
          		  '</div>',	
                  '<div class="content">',
                  		'<div class="name">{course_name}</div>',
                  		'<div class="affiliation">已完成：{process_num}/{total_num}题    平均速度：{average_speed}秒</div>',
	                    '<div class="buttons">',
		                    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small blue"><span>练习题</span></a>',
		                    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small green"><span>自定义练习</span></a>',
		                    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small red"><span>模拟考试</span></a>',
	                    '</div>',
                  '</div>'
            ].join(''),
            loadingText:false,
            store: 'Course'
		}]
    },
    onPress:function(){console.log(1);
    	var cls = this.dom.className,
    		key = cls.substring(cls.lastIndexOf(' ')+1,cls.length),
			o = {'red':'ob-btn-danger','blue':'ob-btn-primary','green':'ob-btn-success'};
    	this.addCls(o[key]);
    },
    onRelease:function(){
    	var cls = this.dom.className,
		key = cls.substring(cls.lastIndexOf(' ')+1,cls.length);
    	this.removeCls(key);
    }
});
