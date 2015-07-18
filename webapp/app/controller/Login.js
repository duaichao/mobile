Ext.define('app.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            userLogin: 'userLogin',
            login: 'userLogin [action=login]'
        },
        control: {
            login: {
                tap: function () {
                    this.logUserIn();
                }
            }
        }
    },
    logUserIn: function () {
    	var login = this.getUserLogin();
    	Ext.Ajax.request({
            url: config.url.login,
            params:login.getValues(),
            scope: this,
            success: function (result) {
            	
                result = Ext.decode(result.responseText);
                if (result.state==0) {
                	util.err(result.info);
                } else {
                	util.suc('登录成功');
                	
                }
            }
        });
    },
    logCheck: function () {
    	
    },
    keepUser: function (user) {
    }
});