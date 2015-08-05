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
    showQuestions: function(view) {
    	var record = view.getRecord(),
    		questionsView = Ext.create('app.view.exercise.QuestionsList'),
	    	nbarRbtn,
	    	source = record.get('source'),
	    	beginCount,
	    	store = Ext.getStore('Questions');
    	beginCount = 0;
    	
    	if(source==0){
    		questionsView.setStartCount(record.get('process_num'));
        	questionsView.setTotalCount(record.get('total_num'));
    		beginCount = record.get('process_num');
	    	nbarRbtn = this.getMainView().getNavigationBar().down('#rightTplButton');
    		nbarRbtn.setText('00:00');
	    	//nbarRbtn.setUi('plain');
	    	nbarRbtn.show();
    	}
    	
        
        store.getProxy().setUrl(config.url[this.getQuestionsUrls()[source]]);
        
        store.getProxy().setExtraParams({
			course_id:record.get('course_id'),
			token:config.user.token,
			username:config.user.username,
			course_offset:beginCount,
			course_num:store.getPageSize()
		});
        store.load({
        	callback:function(records){
        		//初始化 首次加载第一道题收藏 状态
        		var favoriteBtn = view.down('button#favorite'),
        			itemRecord = questionsView.getActiveItem().getRecord(),
        			isFavorite;
        		if(itemRecord){
        			isFavorite = itemRecord.get('is_favorite');
	        		favoriteBtn.setIconCls(isFavorite==1?'fav1':'fav');
	        		favoriteBtn.setText(isFavorite==1?'已收藏':'未收藏');
        		}
        		
        		if(source==0){
	        		//开启计时器
	        		var beginTime = new Date();
	        		questionsView.setBeginTime(beginTime);
	        		questionsView.setTimer(setInterval(function(){
	        			var endTime = new Date(),h,mi,s;
	        			//h = Ext.Date.diff(beginTime, endTime, 'h');
	        			mi = Ext.Date.diff(beginTime, endTime, 'mi');
	        			s = Ext.Date.diff(beginTime, endTime, 's');
	        			//h = h<10?'0'+h:h;
	        			mi = mi<10?'0'+mi:mi;
	        			s = s>60?s%60:s;
	        			s = s<10?'0'+s:s;
	        			//Ext.String.format('{0}:{1}:{2}',h,mi,s)
	        			//view.down('button#timer').setText(Ext.String.format('{0}:{1}',mi,s));
	        			nbarRbtn.setText(Ext.String.format('{0}:{1}',mi,s));
	        		},1000));
        		}else{
	        		if(records.length==0){
	        			util.war('没有查询结果','exph-info');
	        			view.down('button#pager').setText('0/0');
	        		}else{
	        			questionsView.setStartCount(0);
	        	    	questionsView.setTotalCount(records.length);
	        			view.down('button#pager').setText('1/'+records.length);
	        		}
        		}
        	}
        });

        var productsStore = questionsView.getStore();
        if (productsStore) {
            productsStore.removeAll();
        }
        questionsView.setStore(store);
        view.down('button#pager').setText((parseInt(record.get('process_num'))+1)+'/'+record.get('total_num'));
        view.add(questionsView);
    },
    onExerciseViewDeactivate:function(oldActiveItem, ct, newActiveItem){
    	var questionsView = oldActiveItem.down('questionslist'),
    		answers,
    		record = oldActiveItem.getRecord(),
    		nbarRbtn = this.getMainView().getNavigationBar().down('#rightTplButton')
    	nbarRbtn.setText('');
    	nbarRbtn.hide();
    	answers = questionsView.getValueMaps();
    	
    	//souce 3 4 不提交答案
    	if(answers.length==0||record.get('source')==3||record.get('source')==4){
    		questionsView.setTimer(null);
    		return;
    	}
    	console.log(111);
    	var beginTime = questionsView.getBeginTime(),
			speed = Ext.Date.diff(beginTime, new Date(), 's'),
			params = {
	    		username:config.user.username,
	    		token:config.user.token,
	    		course_id:record.get('course_id'),
	    		speed:speed,
	    		answers:Ext.encode(answers)
			};
		questionsView.setTimer(null);
		util.request(config.url.commitExcercise,Ext.applyIf({loaderText:'正在提交答案...'},params),function(data){
			//record是传递参数
			record.set('correct_percent',data.result.correct_percent);
			record.set('passing_percent',data.result.progress);
			record.set('process_num',data.result.hasdonum);
			record.set('average_speed',data.result.speed);
			record.set('total_num',data.result.totalnum);
			//var indexPage = util.ePush('index',null,'right','no');
			var dv = newActiveItem.down('course'),st = Ext.getStore('Course');
			util.drawScore(Ext.get(dv.getItemAt(st.indexOf(record))).down('.progress-ring'));
		},this);
    },
    onQuestionPrev:function(btn){this.getQuestionsList().previous();},
    onQuestionNext:function(btn){this.getQuestionsList().next();},
    onQuestionAnswer:function(btn){
    	var activeItem = this.getQuestionsList().getActiveItem(),
    		answerBox = activeItem.down('questionanswer'),
    		itemRecord = activeItem.getRecord();
    	answerBox.isHidden()?answerBox.show():answerBox.hide();
    	if(!itemRecord.get('finish')){
    		activeItem.fireEvent('finishQuestion',activeItem);
    	}
    },
    onQuestionFavorite:function(btn){
    	var activeItem = this.getQuestionsList().getActiveItem();
		record = activeItem.getRecord();
		var params = {
				username:config.user.username,
				token:config.user.token,
				course_id:record.get('course_id'),
				id:record.get('id'),
				do_favorite:parseInt(record.get('is_favorite'))==1?0:1
		};
		util.request(config.url.doFavorite,params,function(data){
    		util.suc(params.do_favorite==1?'成功收藏题目':'取消题目收藏');
    		record.set('is_favorite',params.do_favorite);
    		btn.setIconCls(params.do_favorite==1?'fav1':'fav');
    		btn.setText(params.do_favorite==1?'已收藏':'未收藏');
    	},this);
    },
    onFinishQuestion:function(item){
    	var record = item.getRecord(),
    		carousel = item.up('questionslist'),
    		answerBtn = this.getMain().down('button#anwser'),
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
    	if(rightString!=valueString){
    		//util.err('回答错误');
    		item.addCls('qe-answer-wrong');
    	}else{
    		//util.suc('回答正确');
    		item.addCls('qe-answer-right');
    	}
    	carousel.setValueMaps(valueMap);
    	item.down('questionanswer').show();
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