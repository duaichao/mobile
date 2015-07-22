Ext.define('app.view.exercise.List', {
	extend: 'Ext.List',
	alternateClassName: 'exerciselist',
	xtype:'exerciselist',
	requires: [
		'Ext.plugin.PullRefresh',
		'Ext.plugin.ListPaging'
	],
    config: {
        plugins: [/*{ 
        	xclass: 'Ext.plugin.PullRefresh',
        	pullText:'下拉可以手动刷新...',
        	releaseText:'可以松手了，等待刷新',
        	loadingText:'正在加载...',
        	loadedText:'加载完成',
        	lastUpdatedText:'更新于:',
        	lastUpdatedDateFormat:'Y-m-d h:m:s'
        },{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: false,
            loadMoreText:'下一页',
    		noMoreRecordsText:'没有更多数据了',
            listeners:{
            	loadmorecmpadded:function(lp,list){
            		console.log(list);
            	}
            }
        }*/],
        loadingText: false,
        emptyText: '<p class="no-searches">没有更多数据了</p>',
        store: Ext.create("Ext.data.Store", {
        	pageSize: 5,
        	clearOnPageLoad:true,
            model: "app.model.Exercise",
            proxy: {
                type: "ajax",
                actionMethods : 'POST',
                startParam:'course_offset',
                limitParam: 'course_num', //设置limit参数，默认为limit
                pageParam: 'page', //设置page参数，默认为page
                url : config.url.getExercise,
                reader: {
                    type: "json",
                    messageProperty:'info',
                    successProperty:'state',
                    totalProperty:"QuestNum",
                    rootProperty: "result"
                }
            },
            autoLoad: false
        }),
        emptyText: '<p class="no-searches">没有数据，请刷新重试</p>',
        itemTpl: [
            '<div>{xindex}、{content}</div>'
        ].join('')
    }
});
