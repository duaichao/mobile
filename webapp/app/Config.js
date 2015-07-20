Ext.define('app.Config', {
    alternateClassName: 'config',
    statics: {
    	tmpParams : {},
    	color:['#2980b9','#1abc9c','#d35400','#2c3e50','#7f8c8d','#27ae60','#f1c40f'],
    	user:{},
    	defaultParams :{
    		ostype:0,
    		version:1
    	},
    	url:{
    		login:'http://211.101.20.203/api/Login',
    		regist:'http://211.101.20.203/api/Register',
    		getPersonalInfo:'http://211.101.20.203/api/getPersonalInfo',
    		setPersonalInfo:'http://211.101.20.203/api/setPersonalInfo',
    		getCourseList:'http://211.101.20.203/api/CourseList',
    		setPhoto:'http://211.101.20.203/api/setPhoto',
    		getExercise:'http://211.101.20.203/api/Exercise'
    	}
    }
});