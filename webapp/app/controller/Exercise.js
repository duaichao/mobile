Ext.define('app.controller.Exercise', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	exerciseView:'exerciseview',
        	exerciseList:'exerciselist',
        	answerBox:'answer'
        },
        control: {
        	'exerciseview':{
        		initialize:function(p){
        			var pagerBtn =p.down('button#pager'),
        				favoriteBtn=p.down('button#favorite'),
        				me = this,
	        			totalCount = parseInt(p.getDefaultParams().total_num),
	    				currCount = parseInt(p.getDefaultParams().process_num);
        			this._exerciseQuestion = Ext.create('app.view.exercise.View',{
        				currNo:currCount,
    		        	store: Ext.create("Ext.data.Store", {
    		            	pageSize: 5,
    		            	clearOnPageLoad:true,
    		                model: "app.model.Exercise",
    		                proxy: {
    		                    type: "ajax",
    		                    actionMethods : 'POST',
    		                    startParam:'course_offset',
    		                    limitParam: 'course_num', //设置limit参数，默认为limit
    		                    pageParam: 'page', //设置page参数，默认为page
    		                    url : config.url.getExercise,
    		                    reader: {
    		                        type: "json",
    		                        messageProperty:'info',
    		                        successProperty:'state',
    		                        totalProperty:"QuestNum",
    		                        rootProperty: "result"
    		                    }
    		                },
    		                autoLoad: false,
    		                listeners:{
    		                	'load':function(){
    		                		var pagerBtn = p.down('button#pager');
    		                		pagerBtn.setText((me._exerciseQuestion.getCurrNo())+'/'+totalCount);
    		                	}
    		                }
    		            })
        			});
        			p.add(this._exerciseQuestion);
        			this._exerciseQuestion.on('activeitemchange',function(cl, value, oldValue, eOpts ){
            			var st = cl.getStore(),
        					ind = cl.getActiveIndex(),
        					currNo = cl.getCurrNo();
            			pagerBtn.setText((currCount+ind+1)+'/'+totalCount);
            			favoriteBtn.setIconCls(value.getRecord().data.is_favorite==1?'icon-shoucang1':'icon-shoucang');
            			if(me._exerciseAnswerBox){
            				if(value.getRecord().get('finish')){
            					me._exerciseAnswerBox.show();
            				}else{
            					me._exerciseAnswerBox.hide();
            				}
            			}
            			
            			if(cl.dragDirection<0){
	            			//开始加载下一页数据
	            			if((ind+1)%st.getPageSize()==0){
	            				var pp = st.getProxy().getExtraParams();
	            				pp.course_offset = currNo+st.getPageSize();
	            				if(currNo>=(currCount+ind+1))return;
	            				st.getProxy().setExtraParams(pp);
	            				cl.setCurrNo(pp.course_offset);
	            				st.load();
	            			}
            			}
	        		});
        			this._exerciseQuestion.on('itemTap',function(answer, index, item, record){
        				//多选题、综合题排除
        		    	if(record.data.type=='02'||record.data.type=='06'){
        		    		return;
        		    	}
        				me.tapAnswers.call(me,answer, index, item, record);
        			});
        		},
        		activate:function(p){
        			var lt = p.down('cardlist'),
        				st = lt.getStore(),
        				params = p.getDefaultParams(),
        				pageSize = st.getPageSize(),
        				totalCount = parseInt(params.total_num),
        				currCount = parseInt(params.process_num),
        				pp = {
        					course_id:params.course_id,
        					token:params.token,
        					username:params.username,
        					course_offset:currCount,
        					course_num:pageSize
        				};
        			st.getProxy().setExtraParams(pp);
        			st.load({
        				callback:function(){
        					//时间计时
        				}
        			});
        			
        		}
        	},
            'exerciseview button[action=backhome]':{
            	tap:function(){
            		util.ePush('index',null,'right','no');
            		if(this._exerciseAnswerBox){
            			Ext.Viewport.remove(this._exerciseAnswerBox);
            		}
            	}
            },
        	'exerciseview button#anwser':{
        		tap:function(btn){
        			var list = btn.up('formpanel').down('exerciselist'),
        				item = list.getActiveItem(),
        				record = item.getRecord();
        			if(record.get('finish')){
        				if(this._exerciseAnswerBox.isHidden()){
        					this._exerciseAnswerBox.show();
        	    		}else{
        	    			this._exerciseAnswerBox.hide();
        	    		}
        			}else{
        				this.tapAnswers.call(this,list,list.getActiveIndex(),item,record);
        			}
        		}
        	},
        	'exerciselist container[itemId=questionOptionsContainer]':{
        		activate:function(c){
        			var btn = c.down('button[itemId=submit]'),me = this;
        			if(btn){
	        			btn.on('tap',function(b){
	            			var ct = b.up('#questionOptionsContainer'),
	            				record = ct.getRecord();
	            			if(record.data.type!='02'){return;}
	            			var checkedOptions = ct.query('checkboxfield[checked=true]')
	            			if(checkedOptions.length>1){
	            				me.tapAnswers.call(me,ct.up('exerciselist'),ct.up('exerciselist').getActiveIndex(),ct,record);
	            			}else{
	            				util.war('至少选择两个答案');
	            			}
	            		});
        			}
        		}
        	}
        }
    },
    tapAnswers:function(list, index, item, record){
    	
    	if(item.down('button#submit')){
    		item.down('button#submit').hide();
    	}
    	
    	
    	var options = item.query('checkboxfield'),
    		ckopt = item.query('checkboxfield[checked=true]'),
    		ok = 0,
    		radios = item.query('radiofield'),
    		answerBtn = list.up('formpanel').down('#anwser');
    	for(var i=0;i<options.length;i++){
    		var option = options[i];
    		if(parseInt(option.config.correct)==0){
    			if(option.isChecked()){
    				util.err('回答错误');
    				option.addCls('qe-answer-wrong');
    			}
    		}else{
    			ok++;
    			option.addCls('qe-answer-right');
    		}
    		option.disable();
    	}
    	//多选题 答案不全
    	if(ckopt.length!=ok){
    		util.err('回答错误');
    	}
    	for(var i=0;i<radios.length;i++){
    		var radio = radios[i];
    		if(parseInt(radio.config.correct)==0){
    			if(radio.isChecked()){
    				util.err('回答错误');
    				radio.addCls('qe-answer-wrong');
    			}
    		}else{
    			radio.addCls('qe-answer-right');
    		}
    		radio.disable();
    	}
    	record.set('finish',1);
    	
    	if(this._exerciseAnswerBox){
    		this._exerciseAnswerBox.setRecord(record);
    		if(this._exerciseAnswerBox.isHidden()){
    			this._exerciseAnswerBox.show();
    		}else{
    			//this._exerciseAnswerBox.hide();
    		}
    		return;
    	}
    	this._exerciseAnswerBox = Ext.create("app.view.exercise.Answer",{height:160});
    	this._exerciseAnswerBox.setRecord(record);
    	Ext.Viewport.add(this._exerciseAnswerBox);

    	this._exerciseAnswerBox.on({
            show: {
                fn: function() {
                	//answerBtn.up('tabbar').setActiveItem(1);
                	answerBtn.setIconCls('hidden');
                	answerBtn.setText('隐藏答案');
                },
                scope: this,
                single: true
            },hide: {
                fn: function() {
                	//answerBtn.up('tabbar').setActiveItem(-1);
                	answerBtn.setIconCls('visible');
                	answerBtn.setText('显示答案');
                },
                scope: this,
                single: true
            }
        });

    	this._exerciseAnswerBox.show();
    }
});