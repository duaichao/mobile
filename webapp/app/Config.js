Ext.define('app.Config', {
    alternateClassName: 'config',
    statics: {
    	tmpParams : {},
    	user:{},
    	defaultParams :{
    		ostype:0,
    		version:1
    	},
    	aboutPages: [{
			title: '功能介绍',
			xtype: 'htmlPage',
			url: 'data/about.html',
			cls:''
    	},{
			title: '版本更新',
			xtype: 'htmlPage',
			url: 'data/about.html',
			cls:''
    	},{
    		title: '关于我们',
    		xtype: 'htmlPage',
    		url: 'data/about.html',
			cls:''
    	},{
    		title: '退出当前账号',
    		xtype: 'button',
    		url: '',
    		cls:'ob-btn ob-btn-danger'
    	}],
    	url:{
    		host:'http://211.101.20.203',
    		login:'http://211.101.20.203/api/Login',
    		regist:'http://211.101.20.203/api/Register',
    		getPersonalInfo:'http://211.101.20.203/api/getPersonalInfo',
    		setPersonalInfo:'http://211.101.20.203/api/setPersonalInfo',
    		getCourseList:'http://211.101.20.203/api/CourseList',
    		setPhoto:'http://211.101.20.203/api/setPhoto',
    		getExercise:'http://211.101.20.203/api/Exercise',
    		commitExcercise:'http://211.101.20.203/api/CommitExcercise',
    		getApps:'http://211.101.20.203/api/Apps',
    		doFavorite:'http://211.101.20.203/api/DoFavorite',
    		getFavorite:'http://211.101.20.203/api/Favorite',
    		getWrong:'http://211.101.20.203/api/Wrong',
    		removeWrong:'http://211.101.20.203/api/RemoveWrong',
    		about:'http://211.101.20.203/api/About',
    		getCustomCategory:'http://211.101.20.203/api/getpracticebyyouinfo',
    		getCustomExercise:'http://211.101.20.203/api/getquestionbyyou',
    		commitCustomExercise:'http://211.101.20.203/api/commitpracticebyyou',
    		getExamInfo:'http://211.101.20.203/api/ExamIntroduction',
    		createExam:'http://211.101.20.203/api/CreateExam',
    		getExamExercise:'http://211.101.20.203/api/Exam',
    		commitExamExercise:'http://211.101.20.203/api/CommitExam'
    	}
    }
});