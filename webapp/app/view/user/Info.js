Ext.define('app.view.user.Info', {
	alternateClassName: 'userInfo',
	xtype:'userInfo',
    extend: 'Ext.form.Panel',
    config: {
    	listeners:{
		    activate:function(){
		    	var d = config.user;
		    	if(d.birthday!=''){
	        		if(!Ext.isDate(d.birthday)){
	        			d.birthday = Ext.Date.parse(d.birthday,'Y-m-d');
	        		}
	        	}
	        	if(d.exam_time!=''){
	        		if(!Ext.isDate(d.exam_time)){
	        			d.exam_time = Ext.Date.parse(d.exam_time,'Y-m-d');
	        		}
	        	}
	        	d.examtime = d.exam_time;
	        	d.examadd = d.district;
	        	this.setValues(d);
		    }
    	},
        items: [{
        	title:'个人信息',
			docked: 'top',
			ui:'fred',
			xtype: 'titlebar',
			items:[{
				action: 'backHome',
				ui:'back',
				text:'返回'
			},{
				action: 'saveInfo',
				cls:'tool blue',
				text:'保存',
				align:'right'
			}]
        },{
			xtype: 'fieldset',
            layout: 'vbox', 
            defaults: {
                labelWidth: '25%'
            },
			items:[{
	            xtype: 'hiddenfield',
	            name: 'token'
	        },{
	            xtype: 'hiddenfield',
	            name: 'username'
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
	        }]
		},{
			xtype: 'fieldset',
            layout: 'vbox', 
            defaults: {
                labelWidth: '25%'
            },
			items:[{
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
