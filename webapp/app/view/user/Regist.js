Ext.define('app.view.user.Regist', {
	alternateClassName: 'userRegist',
	xtype:'userRegist',
    extend: 'Ext.form.Panel',
    config: {
        defaults: {
            labelWidth: '20%'
        },
        items: [{
			title:'注册',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				text:'登录',
				action:'tologin',
				align:'right'
			}]
		},{
			xtype: 'fieldset',
            layout: 'vbox', 
            defaults: {
                labelWidth: '35%'
            },
			items:[{
	            xtype: 'textfield',
	            name: 'username',
	            label: '用户名',
	            placeHolder: '用户名/手机号'
	        },
	        {
	            xtype: 'passwordfield',
	            name: 'password',
	            label: '密码',
	            placeHolder: '密码'
	        },{
	            xtype: 'emailfield',
	            label: 'Email',
	            placeHolder: 'example@email.com',
	            name: 'email'
	        }]
		},
        {
        	xtype:'button',
        	action: 'save',
            margin:'0 5px 0 5px',
            text: '注册',
            ui: 'confirm'
        }]
    }
});
