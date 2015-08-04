Ext.define('app.view.exercise.QuestionsList', {
	extend: 'Ext.carousel.Infinite',
    xtype: 'questionslist',
    
    config: {
    	directionLock: true,
        innerItemConfig: {
            xclass: 'app.view.exercise.Questions'
        },
        count: 1,
        startCount:0,
        totalCount:0,
        offsetLimit: 10,
        store: null,
        animation: {
            duration: 650
        },
        listeners : [{
        	event : 'activeitemchange',
        	order : 'before',
        	fn    : 'onBeforeActiveItemChange'
        },{
        	event : 'activeitemchange',
        	fn    : 'onActiveItemChange'
        },{
        	event : 'itemindexchange',
        	fn    : 'onItemIndexChange'
        }]
    },
    initialize: function() {
        Ext.Viewport.on('orientationchange', this.onOrientationChange, this);
    },
    applyCount: function(count) {
        if (count == "auto") {
            count = 8;
            if (Ext.Viewport.getOrientation() == "landscape") {
                count = 7;
            }
        }
        return count;
    },
    onOrientationChange: function(vewport, orientation) {
        var oldCount = this.getCount(),
            newCount = this.applyCount(this.config.count);

        if (oldCount != newCount) {
            this.setCount(newCount);
            this.refreshItems();
        }
    },
    updateStore: function(newStore) {
        var me = this;
        if (newStore.isLoading()) {
            newStore.on('load', function() {
                me.updateStore(newStore);
            }, me, {
                single: true
            });
        } else {
            me.reset();
        }
    },
    onBeforeActiveItemChange:function(carousel, newItem, oldItem){
    	var view = this.up('exerciseview'),
	    	itemRecord = newItem.getRecord(),
	    	index = carousel.getActiveIndex();
    	if(view){
	    	var	pagerBtn = view.down('button#pager'),
	    		favoriteBtn = view.down('button#favorite'),
	    		answerBtn = view.down('button#anwser'),
	    		isFavorite = itemRecord.get('is_favorite');
	    	pagerBtn.setText((parseInt(this.getStartCount())+index+1)+'/'+this.getTotalCount());
	    	favoriteBtn.setIconCls(isFavorite==1?'fav1':'fav');
			favoriteBtn.setText(isFavorite==1?'已收藏':'未收藏');
			if(itemRecord.get('finish')){
				newItem.setMasked({transparent:true});
				newItem.down('questionanswer').show();
				answerBtn.setIconCls('hidden');
		    	answerBtn.setText('隐藏答案');
			}else{
				newItem.setMasked(false);
				newItem.down('questionanswer').hide();
				answerBtn.setIconCls('visible');
		    	answerBtn.setText('显示答案');
			}
    	}
    },
    onActiveItemChange: function(carousel, newItem, oldItem) {
        var index = carousel.getActiveIndex(),
            count = this.getCount(),
            offsetLimit = this.getOffsetLimit(),
            store = this.getStore(),
            storeCount = store.getCount(),
            oldParams = store.getProxy().getExtraParams();
        //当前浏览题目当前数小于offsetLimit 10时，加载下一页
        if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
        	oldParams.course_offset = parseInt(this.getStartCount())+parseInt(store.getPageSize());
        	store.getProxy().setExtraParams(oldParams);
			this.setStartCount(oldParams.course_offset);
            store.nextPage();
        }
        
    },
    onItemIndexChange: function(me, item, index) {
        var store = this.getStore(),
            count = this.getCount(),
            startCount = parseInt(this.getStartCount()),
            records, startIndex, endIndex,
            i;
        if (!store) {
            return;
        }
        startIndex = index * count;
        if (count > 1) {
            endIndex = startIndex + count;
        } else {
            endIndex = startIndex;
        }
        records = store.queryBy(function(record, id) {
            i = store.indexOf(record);
            if (i >= startIndex && i <= endIndex) {
            	record.set('xindex',startCount+i+1);
                return record;
            }
        }, this);
        item.setRecord(records.items[0]);
    }
});
