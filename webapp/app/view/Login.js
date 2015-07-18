Ext.define("app.view.Login", {
    alternateClassName: 'userLogin',
    extend: 'Ext.form.Panel',
    xtype: 'userLogin',
    requires: ['Ext.field.Toggle', 'Ext.form.FieldSet','Ext.field.Password'],
    config: {
    	layout: 'vbox', 
        scrollable: null,
        title: '登录',
        padding: '10',
        cls:'userLogin',
        items: [{
            xtype: 'fieldset',
            flex:1,
            layout: 'vbox', 
            defaults: {
                labelWidth: '35%'
            },
            items: [{
            	flex:1,
				xtype:'panel',
				html:'<div class="login-logo"><img src="resources/images/logo.png" style="width:120px;"/></div>'
			},{
                xtype: 'textfield',
                name: 'name',
                value:'',
                placeHolder: '输入用户名/手机号'
            },
            {
                xtype: 'passwordfield',
                name: 'password',
                placeHolder: '输入密码'
            }/*,
            {
                xtype: 'togglefield',
                label: '记住我',
                labelWidth: '60%',
                name: 'keepUser',
                value:true
            }*/]
        },
        {
            xtype: 'panel',
            layout:'hbox',
            height:35,
            items:[{
            	xtype:'button',
            	action: 'login',
	            margin:'0 5px 0 5px',
	            text: '登录',
	            flex:1,
	            ui: 'action-round'
            },{
            	xtype:'button',
            	width:80,
            	action: 'regist',
	            margin:'0 5px 0 5px',
	            text: '注册',
	            ui: 'confirm-round'
            }]
        },{
        	height:35,
			xtype:'container',
			cls:'copyright',
			html:'Copyright ©2015-2015 All Rights Reserved <br> 版权所有'
		}]
    }
});