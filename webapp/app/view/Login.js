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
            xtype: 'fieldset',
            items: [{
				xtype:'panel',
				html:'<div class="login-logo"><img src="resources/images/logo.png" style="width:120px;"/></div>'
			},{
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
        	xtype:'button',
        	cls:'ui red',
        	action: 'login',
        	height:40,
            margin:'0 5px 0 5px',
            text: '登录'
        },{
        	height:35,
			xtype:'container',
			cls:'copyright',
			html:'Copyright ©2015-2015 All Rights Reserved <br> 版权所有'
		}]
    }
});