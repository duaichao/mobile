Ext.define('app.view.exercise.View', {
	extend: 'Ext.ux.CardlList',
	alternateClassName: 'exerciselist',
	xtype:'exerciselist',
	config:{
		currNo:1,
		indicator:false
	},
	onLoad:function(store){
		//答案格式
		/*[{
			id:'',
			type:'',
			user_answer_array:[{
				user_answer:'A'//多选 ABD 判断题 中文字 正确/错误
			}]
		}]*/
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
        		options = data.answer_array,
        		zm = ['A','B','C','D','E','F','G'];
        	if(options==''){
        		//type=06
        	}
        	if(Ext.isArray(options)){
        		for(var p=0;p<options.length;p++){
        			fields.push(Ext.factory({
        				cls:'qe-options',
        				correct:options[p].is_right,
        				name:'qeoptions-'+data.id,
        				labelWidth:'100%',
        				labelWrap:true,
        				label:''+zm[p]+' '+options[p].content,
        				listeners:{
        					change:function(f, newValue, oldValue, eOpts){
        						if(newValue){f.addCls('selected');}else{f.removeCls('selected');}
        					}
        				}
        			},'Ext.field.'+(data.type=='02'?'Checkbox':'Radio')));
        		}
        	}
        	if(data.type=='02'){
        		//多选题需要手动提交答案
        		fields.push({
        			xtype:'button',
        			height:40,
        			itemId:'submit',
        			cls:'ob-btn ob-btn-success',
        			margin:'1.2em 0.6em',
        			text:'提交答案'
        		});
        	}
            item = Ext.factory({
            	record:record,
            	itemId:'questionOptionsContainer',
            	items:fields
            }, 'Ext.Container');
            item.element.on({
                scope: me,
                tap: 'onItemTap'
            });
            me.add(item);
        });
	},
	finishAnswer:function(record){
		Ext.Viewport.add(this._movieDetails);
        Ext.util.InputBlocker.blockInputs();

        this._movieDetails.on({
            show: {
                fn: function() {
                    list.deselectAll(true);
                },
                scope: this,
                single: true
            }
        });

        this._movieDetails.show();
	}
});
