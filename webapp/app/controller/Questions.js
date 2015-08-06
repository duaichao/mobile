Ext.define('app.controller.Questions', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	mainView:'mainView',
        	main:'exerciseview',
        	questionsList:'questionslist'
        },
        control: {
        	exerciseview:{
        		initialize:'showQuestions',
        		deactivate:'onExerciseViewDeactivate'
        	},
        	questionslist: {
                itemtap: 'onQuestionTap'
            },
            questions:{
            	finishQuestion:'onFinishQuestion'
            },
            'questions button#finish':{
            	tap:function(btn){
            		var item = btn.up('questions'),
            			checkedOptions = item.query('checkboxfield[checked=true]');
        			if(checkedOptions.length>1){
        				item.fireEvent('finishQuestion',item);
        			}else{
        				util.war('至少选择两个答案');
        			}
            	}
            },
            'exerciseview button#backhome':{
            	tap:'onBackHome'
            },
            'exerciseview button#prev':{
            	tap:'onQuestionPrev'
            },
            'exerciseview button#next':{
            	tap:'onQuestionNext'
            },
            'exerciseview button#anwser':{
            	tap:'onQuestionAnswer'
            },
            'exerciseview button#favorite':{
            	tap:'onQuestionFavorite'
            },
            'favoriteContainer':{
            	itemtap:'onFavoriteItemTap'
            }
        },
        questionsUrls:['getExercise','','','getFavorite','getWrong']//source值对应
    },
    showQuestions: function(questionsView) {
    	var viewRecord = questionsView.getRecord(),
    		questionsList,
	    	nbarRbtn,
	    	courseId,
	    	source,
	    	startCount,
	    	totalCount,
	    	store = Ext.getStore('Questions');
    	courseId = viewRecord.get('course_id');
    	source = viewRecord.get('source');
    	startCount = parseInt(viewRecord.get('process_num'));
    	totalCount = parseInt(viewRecord.get('total_num'));
    	questionsList = Ext.create('app.view.exercise.QuestionsList');
    	if(source==0){
	    	nbarRbtn = this.getMainView().getNavigationBar().down('#rightTplButton');
    		nbarRbtn.setText('00:00');
	    	//nbarRbtn.setUi('plain');
	    	nbarRbtn.show();
    	}
    	if(source==3||source==4){
    		startCount = 0;
    	}
    	
    	questionsList.setStartCount(startCount);
    	questionsList.setTotalCount(totalCount);
    	
        store.getProxy().setUrl(config.url[this.getQuestionsUrls()[source]]);
        store.getProxy().setExtraParams({
			course_id:courseId,
			token:config.user.token,
			username:config.user.username,
			course_offset:startCount,
			course_num:store.getPageSize()
		});
        store.load({
        	callback:function(records){
        		//初始化 首次加载第一道题收藏 状态
        		var favoriteBtn = questionsView.down('button#favorite'),
        			itemRecord = questionsList.getActiveItem().getRecord(),
        			isFavorite;
        		if(itemRecord){
        			isFavorite = itemRecord.get('is_favorite');
	        		favoriteBtn.setIconCls(isFavorite==1?questionsView.getDyBtnIcon()[source]+'1':questionsView.getDyBtnIcon()[source]);
	        		favoriteBtn.setText(isFavorite==1?questionsView.getDyBtnText()[source]:questionsView.getDyBtnDefText()[source]);
        		}
        		if(source==0){
	        		//开启计时器
	        		var beginTime = new Date();
	        		questionsList.setBeginTime(beginTime);
	        		questionsList.setTimer(setInterval(function(){
	        			var endTime = new Date(),h,mi,s;
	        			mi = Ext.Date.diff(beginTime, endTime, 'mi');
	        			s = Ext.Date.diff(beginTime, endTime, 's');
	        			mi = mi<10?'0'+mi:mi;
	        			s = s>60?s%60:s;
	        			s = s<10?'0'+s:s;
	        			nbarRbtn.setText(Ext.String.format('{0}:{1}',mi,s));
	        		},1000));
        		}else{
        			if(store.getCount()==0){
            			util.war('没有查询结果','exph-info');
            			questionsView.down('tabbar').hide();
            		}else{
            			questionsList.setStartCount(0);
            			questionsList.setTotalCount(store.getCount());
            			questionsView.down('button#pager').setText('1/'+store.getCount());
            		}
        		}
        	}
        });
        /*Ext.Ajax.on('requestcomplete',function (conn, response, options, eOpts) {
        	console.log(response.responseText);
        });*/
        var oldStore = questionsList.getStore();
        if (oldStore) {
        	oldStore.removeAll();
        }
        questionsList.setStore(store);
        questionsView.down('button#pager').setText((startCount+1)+'/'+totalCount);
        questionsView.add(questionsList);
    },
    onExerciseViewDeactivate:function(oldActiveItem, ct, newActiveItem){
    	var questionsList = oldActiveItem.down('questionslist'),
    		answers,
    		record = oldActiveItem.getRecord(),
    		source = record.get('source');
    		nbarRbtn = this.getMainView().getNavigationBar().down('#rightTplButton')
    	nbarRbtn.setText('');
    	nbarRbtn.hide();
    	answers = questionsList.getValueMaps();
    	
    	//souce 3 4 不提交答案
    	if(answers.length==0||source==3||source==4){
    		questionsList.setTimer(null);
    	}else{
	    	var beginTime = questionsList.getBeginTime(),
				speed = Ext.Date.diff(beginTime, new Date(), 's'),
				params = {
		    		username:config.user.username,
		    		token:config.user.token,
		    		course_id:record.get('course_id'),
		    		speed:speed,
		    		answers:Ext.encode(answers)
				};
	    	questionsList.setTimer(null);
			util.request(config.url.commitExcercise,Ext.applyIf({loaderText:'正在提交答案...'},params),function(data){
				//record是传递参数
				record.set('correct_percent',data.result.correct_percent);
				record.set('passing_percent',data.result.progress);
				record.set('process_num',data.result.hasdonum);
				record.set('average_speed',data.result.speed);
				record.set('total_num',data.result.totalnum);
				var dv = newActiveItem.down('course'),st = Ext.getStore('Course');
				util.drawScore(Ext.get(dv.getItemAt(st.indexOf(record))).down('.progress-ring'));
			},this);
    	}
    },
    onQuestionPrev:function(btn){btn.up('exerciseview').getActiveItem().previous();},
    onQuestionNext:function(btn){btn.up('exerciseview').getActiveItem().next();},
    onQuestionAnswer:function(btn){
    	var activeItem = btn.up('exerciseview').getActiveItem().getActiveItem(),
    		answerBox = activeItem.down('questionanswer'),
    		itemRecord = activeItem.getRecord();
    	answerBox.isHidden()?answerBox.show():answerBox.hide();
    	if(!itemRecord.get('finish')){
    		activeItem.fireEvent('finishQuestion',activeItem);
    	}else{
    		btn.setIconCls('visible');
    		btn.setText('显示答案');
    	}
    },
    onQuestionFavorite:function(btn){
    	var questionsView = btn.up('exerciseview'),
    		questionsList = questionsView.getActiveItem(),
    		activeItem = questionsList.getActiveItem(),
    		viewRecord = questionsView.getRecord(),
    		source = viewRecord.get('source'),
    		record = activeItem.getRecord();
		var params = {
				username:config.user.username,
				token:config.user.token,
				course_id:viewRecord.get('course_id'),
				id:record.get('id'),
				do_favorite:parseInt(record.get('is_favorite'))==1?0:1
		};
		var url = config.url.doFavorite;
		if(btn.getText()=='删除'){
			url = config.url.removeWrong;
		}
		util.request(url,params,function(data){
    		util.suc(params.do_favorite==1?'成功收藏题目':'取消题目收藏');
    		record.set('is_favorite',params.do_favorite);
    		btn.setIconCls(params.do_favorite==1?questionsView.getDyBtnIcon()[source]+'1':questionsView.getDyBtnIcon()[source]);
    		btn.setText(params.do_favorite==1?questionsView.getDyBtnText()[source]:questionsView.getDyBtnDefText()[source]);
    		
    		if(source==3||source==4){
    			var store = questionsList.getStore();
    			store.load({
    	        	callback:function(records){
    	        		//初始化 首次加载第一道题收藏 状态
    	        		var favoriteBtn = questionsView.down('button#favorite'),
    	        			itemRecord = questionsList.getActiveItem().getRecord(),
    	        			isFavorite;
    	        		if(itemRecord){
    	        			isFavorite = itemRecord.get('is_favorite');
    		        		favoriteBtn.setIconCls(questionsView.getDyBtnIcon()[source]+'1');
    		        		favoriteBtn.setText(questionsView.getDyBtnDefText()[source]);
    	        		}
    	        		if(store.getCount()==0){
	            			util.war('没有查询结果','exph-info');
	            			questionsView.down('tabbar').hide();
	            			questionsList.removeAll(true);
	            		}else{
	            			questionsList.setStartCount(0);
	            			questionsList.setTotalCount(store.getCount());
	            			questionsView.down('button#pager').setText('1/'+store.getCount());
	            			questionsList.customReset();
	            		}
    	        		
    	        	}
    	        });
    			
    		}
    	},this);
    },
    onFinishQuestion:function(item){
    	var record = item.getRecord(),
    		carousel = item.up('questionslist'),
    		answerBtn = carousel.up('exerciseview').down('button#anwser'),
    		finishBtn = item.down('button#finish'),options,checkedOptions,rightString,valueString,valueMap;
    	if(finishBtn){
    		finishBtn.hide();
    	}
    	options = item.query(record.get('type')=='02'?'checkboxfield':'radiofield');
    	checkedOptions = item.query(record.get('type')=='02'?'checkboxfield[checked=true]':'radiofield[checked=true]');
    	rightString='';
    	Ext.Array.each(options, function(option, index) {
    		if(option.config.isRight==1){
    			rightString+=option.getValue();
    			option.addCls('qe-answer-right');
    		}else{
    			if(option.isChecked()){
    				option.addCls('qe-answer-wrong');
    			}
    		}
    	});
    	//缓存选中值
    	/**{
			id:'',题目id
			type:'',题目类型
			user_answer_array:[{
				user_answer:'A'//多选 ABD 判断题 中文字 正确/错误
			}]
		}**/
    	valueMap={
			id:record.get('id'),
			type:record.get('type'),
			user_answer_array:[]
    	};
    	valueString = '';
    	Ext.Array.each(checkedOptions, function(option, index) {
    		valueString+=option.getValue();
    	});
    	//再次进来上次选中的值已丢失
    	if(valueString==''){
    		Ext.Array.each(carousel.getValueMaps(), function(value, index) {
    			if(value.id==record.get('id')){
    				valueString = value.user_answer_array[0].user_answer;
    				return false;
    			}
        	});
    	}
    	valueMap.user_answer_array.push({
    		user_answer:valueString
    	});
    	carousel.setValueMaps(valueMap);
    	var answerBox = item.down('questionanswer');
    	if(rightString!=valueString){
    		//util.err('回答错误');
    		answerBox.addCls('qe-answer-wrong');
    	}else{
    		//util.suc('回答正确');
    		answerBox.addCls('qe-answer-right');
    	}
    	answerBox.show();
    	
    	record.set('finish',1);
    	item.disable();
    	answerBtn.setIconCls('hidden');
    	answerBtn.setText('隐藏答案');
    },
    onFavoriteItemTap:function(favoriteView, index, target, record){
    	var sb = favoriteView.down('segmentedbutton').getPressedButtons()[0];
    	//source 0 顺序1自定义2考试3收藏4错题
    	record.set('source',sb.getText()=='收藏'?3:4);
    	this.getMainView().push(Ext.create('app.view.exercise.Main',{title:'<span class="font14">'+record.get('course_name')+'</span>',record:record}));
    }
});