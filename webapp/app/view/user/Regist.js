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
			ui:'fblack',
			xtype: 'titlebar',
			items:[{
				text:'返回',
				ui:'back fgray',
				action:'tologin'
			},{
				text:'保存',
				ui:'fblue',
				action:'save',
				align:'right'
			}]
		},{
			xtype: 'fieldset',
            layout: 'vbox', 
            defaults: {
                labelWidth: '25%'
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
		}/*,
        {
        	xtype:'button',
        	cls:'ui green',
        	action: 'save',
        	height:40,
            margin:'0 5px 0 5px',
            text: '注册'
        }*/]
    }
});
