Ext.define('app.view.user.Info', {
	alternateClassName: 'userInfo',
	xtype:'userInfo',
    extend: 'Ext.form.Panel',
    config: {
        defaults: {
            labelWidth: '20%'
        },
        items: [{
        	title:'个人信息',
			docked: 'top',
			xtype: 'titlebar',
			items:[{
				action: 'backHome',
				ui:'back',
				text:'Back'
			},{
				action: 'saveInfo',
				text:'保存',
				align:'right'
			}]
        },{
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
                    yearFrom: 1960,
                    yearTo: 1990
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
	            label: '考试时间',
            	name: 'examtime',
	            xtype: 'datepickerfield',
                destroyPickerOnHide: true,
                dateFormat: 'Y-m-d',
                picker: {
                    yearFrom: 2015,
                    yearTo: 2025
                }
	        },{
	            xtype: 'textareafield',
	            name: 'examadd',
	            maxRows: 2,
	            label: '考试地址'
	        }]
		}]
    }
});
