Ext.define('app.view.user.Info', {
	alternateClassName: 'userInfo',
	xtype:'userInfo',
    extend: 'Ext.form.Panel',
    config: {
        defaults: {
            labelWidth: '20%'
        },
        title:'个人信息',
        items: [{
			xtype: 'fieldset',
            layout: 'vbox', 
            defaults: {
                labelWidth: '35%'
            },
			items:[{
	            xtype: 'hiddenfield',
	            name: 'token'
	        },{
	            xtype: 'textfield',
	            name: 'username',
	            readOnly:true,
	            label: '用户名'
	        },{
	            xtype: 'textfield',
	            name: 'nickname',
	            label: '昵称',
	            placeHolder: ''
	        },{
	            name: 'sex',
	            xtype: 'selectfield',
                label: '性别',
                options: [{
                    text : '男',
                    value: '男'
                },{
                    text : '女',
                    value: '女'
                }]
	        },{
	            name: 'birthday',
	            label: '生日',
	            xtype: 'datepickerfield',
                destroyPickerOnHide: true,
                dateFormat: 'Y-m-d',
                picker: {
                    yearFrom: 1990
                }
	        },{
	            xtype: 'emailfield',
	            label: 'Email',
	            placeHolder: 'example@email.com',
	            name: 'email'
	        },{
	            xtype: 'numberfield',
	            name: 'telphone',
	            label: '手机'
	        },{
	            xtype: 'textfield',
	            name: 'examtime',
	            label: '考试时间'
	        },{
	            xtype: 'textareafield',
	            name: 'examadd',
	            maxRows: 2,
	            label: '考试地址'
	        }]
		}]
    }
});
