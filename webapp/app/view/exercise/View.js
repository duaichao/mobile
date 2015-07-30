Ext.define('app.view.exercise.View', {
	extend: 'Ext.ux.CardlList',
	alternateClassName: 'exerciselist',
	xtype:'exerciselist',
	config:{
		currNo:1,
		indicator:false
	},
	onLoad:function(store){
		var me = this,
        item;
		store.each(function (record, index, length) {
        	var idx = index +1+ me.getCurrNo(),
        		data = record.data,
        		types = {'01':'单选','02':'多选','03':'判断','06':'综合'},
        		fields = [{
            		xtype:'container',
            		styleHtmlContent:true,
            		cls:'qe-title',
            		html:idx+'.('+types[data.type]+')'+data.content
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
        	if(data.type=='02'){
        		//多选题需要手动提交答案
        		fields.push({
        			xtype:'button',
        			height:40,
        			cls:'ui blue',
        			margin:'1.2em 0.6em',
        			text:'提交答案'
        		});
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
