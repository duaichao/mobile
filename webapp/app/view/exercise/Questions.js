Ext.define('Pass.view.exercise.Questions', {
	extend: 'Ext.Container',
    xtype: 'questions',
    config: {
        baseCls: 'qe-container',
        //records: null,
        record: null,
        scrollable: false,
        dataTypes:{'01':'单选','02':'多选','03':'判断','06':'综合'},
        dataPinYin:['A','B','C','D','E','F','G'],
        dataPanDuan:['正确','错误'],
        name:null,
        options:null,
        listeners : [{
        	event : 'deactivate',
        	order : 'before',
        	fn    : 'onBeforeDeActiveItem'
        }],
        listeners:{
        	deactivate:'onQuestionDeactivate'
        }
    },
    /*updateRecords: function(newRecords) {
        var record = newRecords.items[0];
        console.log(record.data);
        this.setName(record.data);
    },*/
    onQuestionDeactivate:function(oldActiveItem, carousel, newActiveItem, eOpts){
    	oldActiveItem.enable();
    	oldActiveItem.removeCls(['qe-answer-wrong','qe-answer-right']);
    	oldActiveItem.down('questionanswer').hide();
		
    },
    applyRecord:function(record){
    	if(!record){
    		 if(util.checkConnection()){
    			this.addCls('load-empty');
    		}else{
    			this.addCls('load-no-network');
    		}
    	}
    	return record;
    },
    updateRecord: function(newRecord) {
    	if(newRecord){
	        this.setName({cls:'qe-title',styleHtmlContent:true});
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
    			hasSubs = r.get('sub_array'),
    			innerItems = [],
    			ptype = r.get('type');
    		if(ptype=='06'&&Ext.isArray(hasSubs)){
        		//type=06
    			me.setScrollable(true);
    			Ext.Array.each(hasSubs, function(sub, index) {
    				var cnt = me.creaetOptions(sub.answer_array, sub.type);
    				cnt.splice(0, 0, {
						docked:'top',cls:'qe-title',styleHtmlContent:true,
						html:Ext.String.format('0{0}. ({1}) {2}',(index+1),me.getDataTypes()[sub.type],sub.content),
						xtype:'container'
					}); 
    				innerItems.push(Ext.factory({
    					cls:'qe-sub-container',
    					datas:sub,
    					items:cnt
    				}, 'Ext.Container'));
    			});
        	}else{
        		innerItems = this.creaetOptions(options, ptype);
        		me.setScrollable(false);
        	}
    		if(ptype=='02'||ptype=='06'){
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
    		},'Pass.view.exercise.Answer'));
	    	return Ext.factory(Ext.applyIf(config,{
	    		items:innerItems
	    	}), 'Ext.Container');
    	}
    },
    creaetOptions:function(options,type){
    	var optionsArray = [],me=this;
    	if(Ext.isArray(options)){
			Ext.Array.each(options, function(option, index) {
				optionsArray.push(Ext.factory({
    				cls:'qe-options',
    				isRight:option.is_right,
    				name:'qeoptions-'+option.parent_id,
    				labelWidth:'100%',
    				labelWrap:true,
    				value:(type==''?me.getDataPanDuan()[index]:me.getDataPinYin()[index]),
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
    			},'Ext.field.'+(type=='02'?'Checkbox':'Radio')));
			});
			return optionsArray;
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
