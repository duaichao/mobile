Ext.define('app.model.user.User', {
    extend: 'Ext.data.Model',
    requires: ['Ext.data.JsonP'],
    config: {
        fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'userPurviewId',
            type: 'string'
        },
        {
            name: 'userPurview',//用户类型 分销商 供应商 站长 集团站长 代理社站长 admin
            type: 'string'
        },
        {
        	name:'retailType',//是否是代理社 siteGroup,siteProxy
        	type:'string'
        },
        {
            name: 'isSub',//是否是子用户
            type: 'string'
        },
        {
            name: 'msgCount',//消息数量
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        }],
        validations: [
        {
            field: 'password',
            type: 'presence',
            message: '请输入密码!'
        }, {
            field: 'name',
            type: 'presence',
            message: '请输入用户名!'
        }],
        proxy: {
            type: 'localstorage',
            id: 'login-data'
        }
    }
});