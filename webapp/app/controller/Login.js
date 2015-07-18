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
        util.ePush('main');
    },
    logCheck: function () {
    	
    },
    keepUser: function (user) {
    }
});