Ext.define('Pass.view.exercise.ExamResult', {
    alternateClassName: 'examResultView',
    xtype: 'examResultView',
    extend: 'Ext.Container',
    config: {
    	title:'考试结果',
    	datas:null
    },
    updateDatas:function(data){
    	if(data){
    		var tpl = [
			      '<div>',
			      '<i class="iconfont">&#xe608;</i>',//&#xe608; &#xe60a;
			      '<div>很遗憾，考试未通过！</div>',//很遗憾，考试未通过！恭喜你，考试通过！
			      '</div>',
			      '<div>答对{1}题，答错{2}题，未答{3}题</div>',
			      '<div>分数：{4}</div>',
			      '<div>用时：{5}</div>'
			];
    		this.add(Ext.create('Ext.Container',{
    			tpl:tpl,
    			data:data
    		}));
    		this.add(Ext.create('Ext.Button',{
    			height:40,
	        	xtype:'button',
    			itemId:'viewAnswer',
    			cls:'ob-btn ob-btn-active',
    			margin:'0em 0.6em 1.2em 0.6em',
				text:'查看答案'
    		}));
    	}
    }
});