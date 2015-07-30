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
        		fields = [{
            		xtype:'container',
            		styleHtmlContent:true,
            		cls:'qe-title',
            		html:idx+'、'+data.content
            	}],
        		answer = data.answer_array,
        		zm = ['A','B','C','D','E','F','G'];
        	if(Ext.isArray(answer)){
        		for(var p=0;p<answer.length;p++){
        			fields.push({
        				cls:'qe-answer',
        				xtype:data.type=='02'?'checkboxfield':'radiofield',
        				name:'user_answer',
        				labelWidth:'83%',
        				labelWrap:true,
        				label:''+zm[p]+' '+answer[p].content
        			});
        		}
        	}
            item = Ext.factory({
            	record:record,
            	items:fields
            }, 'Ext.Container');
            item.element.on({
                scope: me,
                tap: 'onItemTap'
            });
            me.add(item);
        });
	}
});
