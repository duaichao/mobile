Ext.define('Pass.view.exercise.Custom', {
	extend: 'Ext.form.Panel',
    xtype: 'customQuery',
    config: {
    	title:'自定义练习',
    	record:null,
    	scrollable: false,
    	listeners:{
    		deactivate:'onCustomDeactivate'
    	}
    },
    onCustomDeactivate:function(customView){
    	if(customView.down('picker')){
    		customView.down('picker').hide();
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
    		
    		store.load({callback:function(){
    			store.insert(0,Ext.create('Pass.model.Custom',{
        			id:'不限',
        			syllabusID:'',
        			syllabusName:'不限',
        			points:[{pointName:'不限',pointID:''}]
        		}));
    			
    			me.add({
    	        	xtype:'fieldset',
    	        	defaults:{
    	        		usePicker:true,
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
    	        			painted:function(){
    	        				var zs = me.down('selectfield#zhishidian').getStore();
    	        				if(zs.getData().length==0){
    	        					zs.setData([{pointName:'不限',pointID:''}]);
    	        				}
    	        			},
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
    	        		name:'tixing',
    	        		options: [
            		          {text: '不限',  value: ''},
            		          {text: '单项选择题', value: '01'},
            		          {text: '多项选择题',  value: '02'},
            		          {text: '判断题',  value: '03'},
            		          {text: '综合题',  value: '06'}
    					]
    	        	},{
    	        		label:'难易程度',
    	        		name:'nanyidu',
    	        		options: [
            		          {text: '不限',  value: ''},
            		          {text: '简单', value: '1'},
            		          {text: '一般',  value: '2'},
            		          {text: '较难',  value: '3'},
            		          {text: '困难',  value: '4'}
    					]
    	        	}]
    	        });
    	        me.add({
    	        	height:40,
    	        	xtype:'button',
        			itemId:'submit',
        			cls:'ob-btn ob-btn-success',
        			margin:'1.2em 0.6em',
        			text:'开始练习'
    	        });
    			
    			
    			
    			
    		}});
	        
    	}
    }
});