Ext.define('Pass.view.Favorite', {
	extend: 'Ext.dataview.DataView',
    xtype: 'favoriteContainer',
    alternateClassName: 'favoriteContainer',
    config: {
    	title:'我的收藏',
    	iconCls: 'favorite',
    	scrollable:false,
    	bgColors : ['rgba(41,128,185,.7)','rgba(26,188,156,.7)','rgba(211,84,0,.7)'],
    	items: [{
			docked: 'top',
			xtype: 'toolbar',
			ui: 'fred',
			cls:'fv-tbar',
			items: [{
				width: '100%',
				defaults: {
					flex: 1,
					height:35
				},
				xtype: 'segmentedbutton',
				allowDepress: false,
				items:[{
					text:'收藏',
					pressed:true
				},{
					text:'错题'
				}]
			}]
		}],
        variableHeights: true,
        useSimpleItems: true,
        loadingText:false,
        store:'Course',
        itemCls: 'fv-data-item',
		itemTpl: [
		    '<div style="background:{bgcolor};width:100%;height:100%;">',
			'<div class="name">{xindex+1}. {course_name}</div>',
            '</div>'
		]
    },
    prepareData: function(data, index, record) {
    	data.bgcolor = this.getBgColors()[index];
    	return data;
    }
});
