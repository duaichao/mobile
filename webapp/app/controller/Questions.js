Ext.define('app.controller.Questions', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	main:'exerciseview',
        	questionsList:'questionslist'
        },
        control: {
        	exerciseview:{
        		initialize:'showQuestions'
        	},
        	questionslist: {
                itemtap: 'onQuestionTap'
            },
            questions:{
            	finishQuestion:'onFinishQuestion'
            },
            'questions button#finish':{
            	tap:function(btn){this.onFinishQuestion.call(this,btn.up('questions'));}
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
            }
        }
    },
    showQuestions: function(view) {
    	var record = view.getRecord(),
    		questionsView = Ext.create('app.view.exercise.QuestionsList');
    	questionsView.setStartCount(record.get('process_num'));
    	questionsView.setTotalCount(record.get('total_num'));
    	
    	view.down('titlebar').setTitle(record.get('course_name'));
    	
        var store = Ext.getStore('Questions');
        store.getProxy().setExtraParams({
			course_id:record.get('course_id'),
			token:config.user.token,
			username:config.user.username,
			course_offset:record.get('process_num'),
			course_num:store.getPageSize()
		});
        store.load({
        	callback:function(){
        		//初始化 首次加载第一道题收藏 状态
        		var favoriteBtn = view.down('button#favorite'),
        			isFavorite = questionsView.getActiveItem().getRecord().get('is_favorite');
        		favoriteBtn.setIconCls(isFavorite==1?'fav1':'fav');
        		favoriteBtn.setText(isFavorite==1?'已收藏':'未收藏');
        	}
        });

        //empty the store before adding the new one
        var productsStore = questionsView.getStore();
        if (productsStore) {
            productsStore.removeAll();
        }

        questionsView.setStore(store);
        view.down('button#pager').setText((parseInt(record.get('process_num'))+1)+'/'+record.get('total_num'));
        view.add(questionsView);
    },
    onQuestionTap: Ext.emptyFn,
    onBackHome:function(){
    	util.ePush('index',null,'right','no');
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
    		answerBtn = this.getMain().down('button#anwser');
    	record.set('finish',1);
    	item.setMasked({transparent:true});
    	answerBtn.setIconCls('visible');
    	answerBtn.setText('显示答案');
    }
});