Ext.define('app.view.user.CustomItem', {
	extend: 'Ext.dataview.component.DataItem',
    alternateClassName: 'customitem',
    xtype: 'customitem',
    config: {
    	cls: 'x-dataview-item',
        chart:{
        	docked:'left',
        	xtype: 'polar',
			width:90,
			height:90,
	        colors: ['#eeeeee','#7ea568'],
	        innerPadding: 0,
	        series: [
	            {
	                type: 'pie',
	                xField: 'data',
	                rotation:0,
	                /*label: {
                        field: 'name',
                        display: 'rotate'
                    },*/
	                donut: 60
	                
	            }
	        ]
        },
        info:{
        	tpl:[
				'<div class="content">',
					'<div class="name">{course_name}</div>',
					'<div class="affiliation">已完成：{process_num}/{total_num}题    平均速度：{average_speed}秒</div>',
				'<div class="buttons">',
				    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small blue"><span>练习题</span></a>',
				    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small green"><span>自定义练习</span></a>',
				    '<a href="javascript:;" class="ob-btn ob-btn-inline ob-btn-small red"><span>模拟考试</span></a>',
				'</div>',
				'</div>'
        	].join('')
        },
        layout: {
            type: 'fit'
        }
    },
    updateRecord:function(record){
    	this.callParent(arguments);
    	this.element.setStyle({'background':record.get('bgcolor')+''});
    },
    applyChart:function(config){
    	var re = this.getRecord(),
    		pe = parseInt(Math.round(re.get('correct_percent')), 10);
    	pe = 360 * parseInt(pe) / 100 || 1;
    	config = Ext.applyIf({
    		animate: false,
            shadow: false,
    		store: Ext.create('Ext.data.JsonStore', {
	            fields: ['name', 'data'],
	            data: [
	                   { 'name': (100-pe)+'%',   'data': 360-pe },
	                   { 'name': pe+'%',   'data':  pe }
	               ]
	        })
    	},config)
    	return Ext.factory(config, Ext.chart.PolarChart);
    },
    updateChart:function(newChart, oldChart){
    	if (newChart) {
            this.add(newChart);
        }
        if (oldChart) {
            this.remove(oldChart);
        }
    },
    applyInfo:function(config){
    	config = Ext.applyIf({data:this.getRecord().data},config);
    	return Ext.factory(config, Ext.Container);
    },
    updateInfo:function(newInfo,oldInfo){
    	if (newInfo) {
            this.add(newInfo);
        }

        if (oldInfo) {
            this.remove(oldInfo);
        }
    }
});