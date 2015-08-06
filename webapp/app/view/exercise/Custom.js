Ext.define('app.view.exercise.Custom', {
	extend: 'Ext.form.Panel',
    xtype: 'customQuery',
    config: {
    	title:'自定义练习',
    	record:null,
    	scrollable: false,
    	listeners:{
    		activate:'onActivate'
    	}
    },
    initialize: function() {
    	var record = this.getRecord(),me = this;
    	if(record){
    		var store = Ext.getStore('Custom'),
    			subStore = Ext.create('Ext.data.JsonStore',{
    				fields:['pointName','pointID']
    			});
    		store.getProxy().setExtraParams({
    			course_id:record.get('course_id')
    		});
    		store.load();
	        this.add({
	        	xtype:'fieldset',
	        	defaults:{
	        		xtype:'selectfield',
	        		labelWidth:'25%'
	        	},
	        	items:[{
	        		label:'大纲',
	        		itemId:'dagang',
	        		name:'dagang',
	        		displayField:'syllabusName',
	        		valueField:'syllabusID',
	        		store:store,
	        		listeners:{
                        change: function(select,newValue,oldValue){
                            var subSelect = select.up('fieldset').down('selectfield#zhishidian'),
                            	r = select.getStore().getById(newValue);      
                            if(r){
                            	subSelect.getStore().setData(r.get('points'));
                            }
                          
                        }
                    }
	        	},{
	        		label:'知识点',
	        		itemId:'zhishidian',
	        		name:'zhishidian',
	        		displayField:'pointName',
	        		valueField:'pointID',
	        		store:subStore
	        	},{
	        		label:'题型',
	        		options: [
        		          {text: '不限',  value: '不限'},
        		          {text: '单项选择题', value: '单项选择题'},
        		          {text: '多项选择题',  value: '多项选择题'},
        		          {text: '判断题',  value: '判断题'},
        		          {text: '综合题',  value: '综合题'}
					]
	        	},{
	        		label:'难易程度',
	        		options: [
        		          {text: '不限',  value: '不限'},
        		          {text: '简单', value: '简单'},
        		          {text: '一般',  value: '一般'},
        		          {text: '较难',  value: '较难'},
        		          {text: '困难',  value: '困难'}
					]
	        	}]
	        });
	        this.add({
	        	height:40,
	        	xtype:'button',
    			itemId:'submit',
    			cls:'ob-btn ob-btn-success',
    			margin:'1.2em 0.6em',
    			text:'开始练习'
	        });
    	}
    }
});