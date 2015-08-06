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
			ui:'fblack',
			xtype: 'titlebar',
			items:[{
				itemId: 'regist',
				text:'注册',
				ui:'fred',
				align:'right'
			}]
		},{
			xtype:'image',
			height:80,
			src:'resources/images/login_logo.png'
		},{
			xtype: 'container',
			padding:'0.6em',
			style:'text-align:center',
			html:'会计从业资格全真模拟考试系统'
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
        	itemId: 'login',
        	cls:'ob-btn ob-btn-danger',
        	height:40,
            text: '登录'
        }],
        listeners:{
        	activate:function(){
        		this.down('textfield').focus(); 
        	}
        }
    }
});