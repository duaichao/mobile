Ext.define('app.Config', {
    alternateClassName: 'config',
    statics: {
    	tmpParams : {},
    	user:{},
    	defaultParams :{
    		ostype:0,
    		version:1
    	},
    	url:{
    		login:'http://211.101.20.203/api/Login',
    		regist:'http://211.101.20.203/api/Register',
    		getPersonalInfo:'http://211.101.20.203/api/getPersonalInfo',
    		setPersonalInfo:'http://211.101.20.203/api/setPersonalInfo'
    	}
    }
});