Ext.define('Pass.view.home.Course', {
	extend: 'Ext.dataview.DataView',
    alternateClassName: 'course',
    xtype: 'course',
    config: {
    	scrollable:false,
    	bgColors : ['rgba(41,128,185,.7)','rgba(26,188,156,.7)','rgba(211,84,0,.7)'],
    	cls: 'dv-basic',
        itemTpl: [
              '<div style="background:{bgcolor};width:100%;height:100%;">',
              '<div class="progress-ring" data-percent="{correct_percent}">',
      			'<canvas height="80" width="80" style="width:80px;height:80px;"></canvas>',
     				'<div class="score"></div>',
      		  '</div>',	
              '<div class="content">',
              		'<div class="name">{course_name}</div>',
              		'<div class="affiliation">已完成：{process_num}/{total_num}题    平均速度：{average_speed}秒</div>',
                    '<div class="buttons">',
	                    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small ob-btn-primary"><span>顺序练习</span></a>',
	                    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small ob-btn-success"><span>自定义练习</span></a>',
	                    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small ob-btn-danger"><span>模拟考试</span></a>',
                    '</div>',
              '</div>',
              '</div>'
        ].join(''),
        loadingText:false,
        store:'Course'
    },
    prepareData: function(data, index, record) {
    	data.bgcolor = this.getBgColors()[index];
    	return data;
    },
    onStoreUpdate: function(store, record, newIndex, oldIndex) {
        this.callParent(arguments);
        util.drawScore(Ext.get(this.getItemAt(newIndex)).down('.progress-ring'));
    }
});