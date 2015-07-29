Ext.define("app.view.Login", {
    alternateClassName: 'userLogin',
    extend: 'Ext.form.Panel',
    xtype: 'userLogin',
    config: {
        scrollable: null,
        padding: '10',  
        cls:'userLogin',
        items: [{
			title:'登录',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				action: 'regist',
				cls:'tool blue',
				text:'注册',
				align:'right'
			}]
		},{
			xtype:'container',
			styleHtmlContent: true,
			html:'<div class="login-logo"><img src="resources/images/login_logo.png" style="width:120px;"/><h3>全国会计从业资格全真模拟考试系统</h3></div>'
		},{
            xtype: 'fieldset',
            items: [{
                xtype: 'textfield',
                name: 'username',
                clearIcon:false,
                value:'',
                placeHolder: '输入用户名/手机号'
            },
            {
                xtype: 'passwordfield',
                name: 'password',
                clearIcon:false,
                placeHolder: '输入密码'
            }]
        },
        {
        	xtype:'button',
        	cls:'ui red',
        	action: 'login',
        	height:40,
            text: '登录'
        }]
    }
});