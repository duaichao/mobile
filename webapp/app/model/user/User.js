Ext.define('app.model.user.User', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [{
            name: 'id',
            type: 'string'
        },{
        	name:'nickname',
        	type:'string'
        },{
        	name:'sex',
        	type:'string'
        },{
        	name:'birthday',
        	type:'string'
        },{
        	name:'telphone',
        	type:'string'
        },{
        	name:'photo',
        	type:'string'
        },{
        	name:'district',
        	type:'string'
        },{
        	name:'exam_time',
        	type:'string'
        },{
        	name:'left_time',
        	type:'int'
        },{
        	name:'passing_percent',
        	type:'float'
        },{
            name: 'username',
            type: 'string'
        },{
            name: 'password',
            type: 'string'
        },{
        	name:'email',
        	type:'string'
        },{
        	name:'keepUser',
        	type:'string'
        }],
        validations: [{
            field: 'email',
            type: 'email',
            message: '邮箱格式不正确'
        }],
        proxy: {
            type: 'localstorage',
            id: 'login-data'
        }
    }
});