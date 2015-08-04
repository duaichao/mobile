Ext.define('app.view.exercise.Questions', {
	extend: 'Ext.Container',
    xtype: 'questions',
    config: {
        baseCls: 'qe-container',
        //records: null,
        record: null,
        scrollable: false,
        dataTypes:{'01':'单选','02':'多选','03':'判断','06':'综合'},
        dataPinYin:['A','B','C','D','E','F','G'],
        name:null,
        options:null
    },
    /*updateRecords: function(newRecords) {
        var record = newRecords.items[0];
        console.log(record.data);
        this.setName(record.data);
    },*/
    updateRecord: function(newRecord) {
    	if(newRecord){
	        this.setName({docked:'top',cls:'qe-title',styleHtmlContent:true});
	        this.setOptions({cls:'qe-options-container'});
    	}
    },
    applyName:function(config){
    	var r = this.getRecord();
    	if(r){
    		var type = this.getDataTypes()[r.get('type')];
	    	return Ext.factory(Ext.applyIf(config,{
	    		html:Ext.String.format('{0}. ({1}) {2}',r.get('xindex'),type,r.get('content'))
	    	}), 'Ext.Container');
    	}
    },
    updateName: function(newName, oldName) {
        if (newName) {
            this.add(newName);
        }
        if (oldName) {
            this.remove(oldName);
        }
    },
    applyOptions:function(config){
    	var r = this.getRecord(),me = this;
    	if(r){
    		var options = r.get('answer_array'),
    			innerItems = [];
    		if(options==''){
        		//type=06
        	}
    		if(Ext.isArray(options)){
    			Ext.Array.each(options, function(option, index) {
    				innerItems.push(Ext.factory({
        				cls:'qe-options',
        				isRight:option.is_right,
        				name:'qeoptions-'+option.parent_id,
        				labelWidth:'100%',
        				labelWrap:true,
        				label:''+me.getDataPinYin()[index]+' '+option.content,
        				listeners:{
        					change:function(f, newValue, oldValue, eOpts){
        						if(f.isXType('radiofield')){
        							var item = f.up('questions');
        							item.fireEvent('finishQuestion',item);
        						}
        						if(newValue){f.addCls('selected');}else{f.removeCls('selected');}
        					}
        				}
        			},'Ext.field.'+(r.get('type')=='02'?'Checkbox':'Radio')));
    			});
    		}
    		if(r.get('type')=='02'){
        		//多选题需要手动提交答案
    			innerItems.push(Ext.factory({
    				height:40,
        			itemId:'finish',
        			cls:'ob-btn ob-btn-success',
        			margin:'1.2em 0.6em',
        			text:'提交答案'
    			},'Ext.Button'));
        	}
    		//显示答案element
    		innerItems.push(Ext.factory({
				width:'100%',
				height:160,
				record:r
    		},'app.view.exercise.Answer'));
	    	return Ext.factory(Ext.applyIf(config,{
	    		items:innerItems
	    	}), 'Ext.Container');
    	}
    },
    updateOptions: function(newOptions, oldOptions) {
        if (newOptions) {
            this.add(newOptions);
        }
        if (oldOptions) {
            this.remove(oldOptions);
        }
    }
});
