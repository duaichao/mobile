Ext.define('app.controller.Questions', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	main:'exerciseview'
        },
        control: {
        	exerciseview:{
        		initialize:'showQuestions'
        	},
        	questionslist: {
                itemtap: 'onQuestionTap'
            }
        },
        currentRecord:null//课程record
    },
    showQuestions: function(view) {
    	var record = view.getRecord(),
    		questionsView = Ext.create('app.view.exercise.QuestionsList');
        this.setCurrentRecord(record);
        var store = Ext.getStore('Questions');
        store.getProxy().setExtraParams({
			course_id:record.get('course_id'),
			token:config.user.token,
			username:config.user.username
		});
        store.load();

        //empty the store before adding the new one
        var productsStore = questionsView.getStore();
        if (productsStore) {
            productsStore.removeAll();
        }

        questionsView.setStore(store);

        this.getMain().add(questionsView);
    },
    onQuestionTap: Ext.emptyFn,
});