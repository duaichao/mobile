Ext.define('Pass.controller.Questions', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	mainView:'mainView'
        },
        control: {
        	'mainView titlebar':{
        		back:'onMainViewBackTap'
        	},
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
            		var item = btn.up('questions'); 
            		if(item.getRecord().get('type')=='06'){
            			var noWay = false;
            			Ext.Array.each(item.query('container[cls=qe-sub-container]'),function(subItem,index){
            				if(subItem.query('checkboxfield[checked=true]').length==0){
            					noWay = true;
            					return false;
            				}
            			});
            			if(noWay){
            				util.war('还有选择题没做完');
            			}else{
            				item.fireEvent('finishQuestion',item);
            			}
            		}else{
	            		var checkedOptions = item.query('checkboxfield[checked=true]');
	        			if(checkedOptions.length>1){
	        				item.fireEvent('finishQuestion',item);
	        			}else{
	        				util.war('至少选择两个答案');
	        			}
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
            },
            'customQuery button#submit':{
            	tap:'onCustomQuerySubmit'
            },
            'examView button#create':{
        		tap:'onCreateExam'
        	},
        	'examPaperView button#submit':{
        		tap:function(){
        			this.onMainViewBackTap.call(this,this.getMainView().getNavigationBar());
        		}
        	}
        },
        questionsUrls:['getExercise','getCustomExercise','getExamExercise','getFavorite','getWrong'],//source值对应
        commitQuestionsUrls:['commitExcercise','commitCustomExercise','commitExamExercise','','']
    },
    onMainViewBackTap:function(nav){
    	var mainView = nav.up('mainView'),
    		innerItem = mainView.getActiveItem(),
    		questionsList = innerItem.getActiveItem();
    	if(innerItem.isXType('examPaperView')){
    		var count = parseInt(innerItem.getExamCount())-parseInt(questionsList.getValueMaps().length);
	        Ext.Msg.confirm('休息一下', Ext.String.format('你还有{0}道题没答，确认交卷？',count), function(btnId) {
	            if(btnId === 'yes') {
	            	mainView.pop();
	            }
	        }, this);
	        return false;
    	}else{
    		return true;
    	}
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
    	questionsList = Ext.create('Pass.view.exercise.QuestionsList');
    	if(source==0||source==1||source==2){
	    	nbarRbtn = this.getMainView().getNavigationBar().down('#rightTplButton');
    		nbarRbtn.setText('00:00');
	    	//nbarRbtn.setUi('plain');
	    	nbarRbtn.show();
    	}
    	//if(source==1||source==2||source==3||source==4){
    	if(source!=0){
    		startCount = 0;
    	}
    	
    	questionsList.setStartCount(startCount);
    	questionsList.setTotalCount(totalCount);
    	
        store.getProxy().setUrl(config.url[this.getQuestionsUrls()[source]]);
       
        store.getProxy().setExtraParams({
        	exam_id:viewRecord.get('exam_id'),
        	dagang:viewRecord.get('dagang'),
        	zhishidian:viewRecord.get('zhishidian'),
        	tixing:viewRecord.get('tixing'),
        	nanyidu:viewRecord.get('nanyidu'),
			course_id:courseId,
			token:config.user.token,
			username:config.user.username,
			course_offset:startCount,
			course_num:store.getPageSize()
		});
        store.load({
        	callback:function(records){
        		if(records.length==0){
	        		util.war('没有查询结果','exph-info');
	        		if(nbarRbtn){nbarRbtn.hide();}
	    			questionsView.down('tabbar').hide();
	    			return;
        		}
        		//是否提示手势向导
        		Ext.ModelMgr.getModel('Pass.model.Local').load(1, {
                    scope: this,
                    success: function (cache) {
                    	if(!cache.get('guideAction')){
                    		cache.set('guideAction',1);
                    		cache.save();
                    		util.createGuide([{
                                xtype : 'image',
                                cls:'guide-action',
                                width:200,
                                height:160,
                                src : 'resources/images/helper.png'
                            }]);
                    	}
                    }
        		});
        		//初始化 首次加载第一道题收藏 状态
        		var favoriteBtn = questionsView.down('button#favorite'),
        			itemRecord = questionsList.getActiveItem().getRecord(),
        			isFavorite;
        		if(itemRecord&&favoriteBtn){
        			isFavorite = itemRecord.get('is_favorite');
	        		favoriteBtn.setIconCls(isFavorite==1?questionsView.getDyBtnIcon()[source]+'1':questionsView.getDyBtnIcon()[source]);
	        		favoriteBtn.setText(isFavorite==1?questionsView.getDyBtnText()[source]:questionsView.getDyBtnDefText()[source]);
        		}
        		//首次加载 题目计时器
        		itemRecord.set('beginTime',new Date());
        		if(source==0||source==1||source==2){
	        		//开启总计时器
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
        		}
        		if(source!=0){
        			totalCount = store.getCount();//==store.getPageSize()?store.getPageSize():store.getCount();
        			if(source==2){
        				questionsView.setExamCount(totalCount);
        			}
        			questionsList.setStartCount(0);
        			questionsList.setTotalCount(totalCount);
        			questionsView.down('button#pager').setText('1/'+totalCount);
        		}
        	}
        });
        var oldStore = questionsList.getStore();
        if (oldStore) {
        	oldStore.removeAll();
        }
        questionsList.setStore(store);
        if(source==0){
        	questionsView.down('button#pager').setText((startCount+1)+'/'+totalCount);
        }
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
				currInnerItem = questionsList.getActiveItem();
			var	params = {
	    		course_id:record.get('course_id'),
	    		speed:speed,
	    		answers:Ext.encode(answers),
	    		exam_id:currInnerItem.getRecord().get('exam_id'),//record.get('exam_id'),这个是试卷id  需要考试id
	    		total_time:speed
			};
	    	questionsList.setTimer(null);
	    	var urlKey = this.getCommitQuestionsUrls()[source];
			util.request(config.url[urlKey],Ext.applyIf({loaderText:'正在提交答案...'},params),function(data){
				//record是传递参数
				if(source==0){
					record.set({
						'correct_percent':data.result.correct_percent,
						'passing_percent':data.result.progress,
						'process_num':data.result.hasdonum,
						'average_speed':data.result.speed
					});
					var dv = newActiveItem.down('course'),st = Ext.getStore('Course');
					util.drawScore(Ext.get(dv.getItemAt(st.indexOf(record))).down('.progress-ring'));
		    	}
				//if(source==1){
				//自定义练习题不更新错误率 ？自定义练习题 原app未做
				//	newActiveItem = this.getMainView().pop();
				//}
				//提交试卷
				//if(source==2){
				//}
			},this);
    	}
    	//清空缓存值
    	questionsList.setValueMaps(null);
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
    		if(btn.getText()=='显示答案'){
    			btn.setIconCls('hidden');
        		btn.setText('隐藏答案');
        		if(itemRecord.get('type')=='06'){
        			activeItem.getScrollable().getScroller().scrollToEnd({
        				type: "slideOut",
        	            direction: "down",
        	            duration: 500
        			});
        		}
    		}else{
	    		btn.setIconCls('visible');
	    		btn.setText('显示答案');
    		}
    	}
    },
    onFinishQuestion:function(item){
    	var record = item.getRecord(),
    		carousel = item.up('questionslist'),
    		questionsView = carousel.up('exerciseview'),
    		source = questionsView.getRecord().get('source'),
    		answerBtn = questionsView.down('button#anwser'),
    		type = record.get('type'),
    		finishBtn = item.down('button#finish');
    	if(finishBtn){
    		finishBtn.hide();
    	}
    	//构造提交内容
    	/**{
			id:'',题目id
			type:'',题目类型
			time_cost:0,//答题耗时
			user_answer_array:[{
				user_answer:'A'//多选 ABD 判断题 中文字 正确/错误
			}]
		}**/
    	var answerBox = item.down('questionanswer'),
    		valueMap={
				id:record.get('id'),
				type:record.get('type'),
				oldAnswerValue:[],
				sumitResult:false,
				time_cost:0,
				user_answer_array:[]
	    	},
	    	vim = carousel.getValueIdMaps(),
	    	options,
	    	checkedOptions,
	    	returnObj;
    	if(!vim[record.get('id')]){
    		//单题耗时s
    		//console.log(Ext.Date.format(record.get('beginTime'),'Y-m-d h:m:s')+'==='+Ext.Date.format(new Date,'Y-m-d h:m:s'));
    		valueMap.time_cost = Ext.Date.diff(record.get('beginTime'), new Date(), 's');
    		record.set('beginTime',null);
    		//console.log(record.get('content')+'===='+valueMap.time_cost);
    		if(type=='06'){
    			item.getScrollable().getScroller().scrollToEnd();
    			Ext.Array.each(item.query('container[cls=qe-sub-container]'),function(subItem,index){
        			var subDatas = subItem.config.datas,
        				subValueMap = {
        					id:subDatas.id,
        					type:subDatas.type,
        					sumitResult:false,
        					oldAnswerValue:[],
        					user_answer_array:[]
        				},returnObj;
        			options = subItem.query('checkboxfield');
        			checkedOptions= subItem.query('checkboxfield[checked=true]');
        			returnObj = this.finishQuestionSetValue(options,checkedOptions,source);
        			subValueMap.user_answer_array.push({
        	    		user_answer:returnObj.valueString
        	    	});
        			subValueMap.sumitResult = returnObj.sumitResult;
        			subValueMap.oldAnswerValue=returnObj.oldAnswerValue;
        			valueMap.user_answer_array.push(subValueMap);
    			},this);
    		}else{
	    		//当前为查看历史回答
	    		options = item.query(type=='02'?'checkboxfield':'radiofield');
		    	checkedOptions = item.query(type=='02'?'checkboxfield[checked=true]':'radiofield[checked=true]');
	    		returnObj = this.finishQuestionSetValue(options,checkedOptions,source);
		    	valueMap.user_answer_array.push({
		    		user_answer:returnObj.valueString
		    	});
		    	valueMap.sumitResult = returnObj.sumitResult;
		    	valueMap.oldAnswerValue=returnObj.oldAnswerValue;
    		}
    		carousel.setValueMaps(valueMap);
    		record.set('finish',1);
    		//考题需要自动下一题
    		if(source==2){
    			carousel.next();
    		}
    	}else{
    		//默认选中
    		valueMap = vim[record.get('id')];
    		//考题需要默认到以前选的答案
    		if(type=='06'){
    			Ext.Array.each(item.query('container[cls=qe-sub-container]'),function(subItem,index){
    				var subDatas = subItem.config.datas,subValueMap;
    				options = subItem.query('checkboxfield');
    				subValueMap = valueMap.user_answer_array[index];
    				this.selectedFinishQuestionOptions(options, subValueMap.oldAnswerValue,source);
    			});
    		}else{
    			options = item.query(type=='02'?'checkboxfield':'radiofield');
    			this.selectedFinishQuestionOptions(options, valueMap.oldAnswerValue,source);
    		}
    	}
    	item.disable();
    	if(source==2)return;
    	if(answerBtn){
	    	answerBtn.setIconCls('hidden');
	    	answerBtn.setText('隐藏答案');
    	}
    	if(valueMap.sumitResult){
    		//util.suc('回答正确');
    		answerBox.addCls('qe-answer-right');
		}else{
			//util.err('回答错误');
    		answerBox.addCls('qe-answer-wrong');
		}
    	answerBox.show();
    },
    selectedFinishQuestionOptions:function(options,oldAnswerValue,source){
    	Ext.Array.each(options, function(option, index) {
    		for(var p=0;p<oldAnswerValue.length;p++){
    			if(option.getValue()==oldAnswerValue[p]){
    				option.check();
    				if(source!=2&&option.config.isRight!=1){
    					option.addCls('qe-answer-wrong');
    				}
    			}
    		}
    	});
    },
    finishQuestionSetValue:function(options,checkedOptions,source){
    	var rightString = '',
	    	valueString = '';
	    	oldAnswerValue = [],
	    	sumitResult = false;
    	Ext.Array.each(options, function(option, index) {
    		if(option.config.isRight==1){
    			rightString+=option.getValue();
    			//考试题不提示正确
    			//if(source!=2){
    			//	option.addCls('qe-answer-right');
    			//}
    		}else{
    			//考试题不提示错误
    			if(option.isChecked()&&source!=2){
    				option.addCls('qe-answer-wrong');
    			}
    		}
    	});
    	Ext.Array.each(checkedOptions, function(option, index) {
    		oldAnswerValue.push(option.getValue());
    		valueString+=option.getValue();
    	});
    	if(rightString==valueString){
    		sumitResult = true;
    	}
    	return {valueString:valueString,oldAnswerValue:oldAnswerValue,sumitResult:sumitResult};
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
    		util.suc(params.do_favorite==1?'成功'+btn.getText()+'题目':'取消题目收藏');
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
	            			util.info('没有查询结果');
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
    onFavoriteItemTap:function(favoriteView, index, target, record){
    	var sb = favoriteView.down('segmentedbutton').getPressedButtons()[0];
    	//source 0 顺序1自定义2考试3收藏4错题
    	record.set('source',sb.getText()=='收藏'?3:4);
    	this.getMainView().push(Ext.create('Pass.view.exercise.Main',{title:'<span class="font14">'+record.get('course_name')+'</span>',record:record}));
    },
    onCustomQuerySubmit:function(btn){
    	var customQueryView = btn.up('customQuery'),
    		values = customQueryView.getValues(),
    		record = customQueryView.getRecord();
    	record.set(values);
    	this.getMainView().push(Ext.create('Pass.view.exercise.Main',{title:'<span class="font14">'+record.get('course_name')+'</span>',record:record}));
    },
    onCreateExam:function(btn){
    	var examView = btn.up('examView'),
		record = examView.getRecord();
    	util.request(config.url.createExam,{
			course_id:record.get('course_id'),
			loaderText:'创建考试中...'
		},function(data){
			record.set({exam_id:data.result.exam_id});
			var ep = this.getMainView().push(Ext.create('Pass.view.exercise.ExamPaper',{title:'<span class="font14">'+record.get('course_name')+'</span>',record:record}));
			ep.setExamCount(examView.getExamCount());
			ep.setExamTime(examView.getExamTime());
		},this);
    }
});