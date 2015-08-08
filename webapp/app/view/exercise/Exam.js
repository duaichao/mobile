Ext.define('Pass.view.exercise.Exam', {
	extend: 'Ext.Container',
    xtype: 'examView',
    config: {
    	title:'模拟考试',
    	record:null,
    	examCount:0,
    	examTime:0,
    	scrollable: false
    },
    initialize: function() {
    	var record = this.getRecord(),me = this;
    	if(record){
    		util.request(config.url.getExamInfo,{
    			course_id:record.get('course_id')
    		},function(data){
    			this.setExamCount(data.result.total_num);
    			this.setExamTime(data.result.total_time);
    			this.add([{
    				xtype:'fieldset',
    				items:[{
    					xtype:'container',
    					styleHtmlContent:true,
    					tpl:[
    					      '<div class="em-item"><span class="name">考试科目：</span>{name}</div>',
    					      '<div class="em-item"><span class="name">考试时间：</span>{total_time}分钟</div>',
    					      //'<div class="em-item"><span class="name">试题总数：</span>{total_num}</div>',
    					      '<div class="em-item"><span class="name">合格标准：</span>满分{full_mark}分，{pass_mark}分及格</div>'
    					],
    					data:data.result
    				}]
    			},{
    				xtype:'container',
					styleHtmlContent:true,
					html:Ext.String.format('<div class="em-history">你已经参加过<span class="blue">{0}</span>次模拟考试，最好成绩是<span class="blue">{1}</span>分，继续加油哦！</div>',
							data.result.times,
							data.result.high_score
					)
    			},{
    				height:40,
    	        	xtype:'button',
        			itemId:'create',
        			cls:'ob-btn ob-btn-danger',
        			margin:'0em 0.6em 1.2em 0.6em',
    				text:'开始考试'
    			},{
    				xtype:'container',
    				styleHtmlContent:true,
    				docked:'bottom',
    				html:'<div class="em-explain">说明：该考试题目是从现有练习题中随机抽取</div>'
    			}]);
        	},this);
    	}
    }
});