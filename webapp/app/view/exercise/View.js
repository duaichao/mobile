Ext.define('app.view.exercise.View', {
	extend: 'Ext.ux.CardlList',
	alternateClassName: 'exerciselist',
	xtype:'exerciselist',
	config:{
		indicator:false
	},
	onLoad:function(store){
		var me = this,
        item;
		store.each(function (record, index, length) {
        	var idx = index + 1+((store.currentPage - 1) * store.getPageSize()),
        		data = record.data,
        		fields = [],
        		answer = data.answer_array,
        		zm = ['icon-letter-a-outline','icon-b','icon-letter-e-outline','icon-letter-d-outline','icon-e','icon-f','icon-g'];
        	if(Ext.isArray(answer)){
        		for(var p=0;p<answer.length;p++){
        			fields.push({
        				cls:'answer',
        				xtype:data.type=='02'?'checkboxfield':'radiofield',
        				name:'user_answer',
        				labelWidth:'80%',
        				labelWrap:true,
        				label:'<i class="iconfont '+zm[p]+'"></i> '+answer[p].content
        			});
        		}
        	}
            item = Ext.factory({
            	record:record,
            	items:[{
            		xtype:'container',
            		styleHtmlContent:true,
            		html:idx+'、'+data.content
            	},{
            		xtype:'fieldset',
            		items:fields
            	}]
            }, 'Ext.Container');
            item.element.on({
                scope: me,
                tap: 'onItemTap'
            });
            me.add(item);
        });
	}
});
