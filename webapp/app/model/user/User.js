Ext.define('app.model.user.User', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'username',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        },
        {
        	name:'email',
        	type:'string'
        },
        ],
        validations: [
        {
            field: 'password',
            type: 'presence',
            message: '请输入密码!'
        }, {
            field: 'username',
            type: 'presence',
            message: '请输入用户名!'
        }],
        proxy: {
            type: 'localstorage',
            id: 'login-data'
        }
    }
});