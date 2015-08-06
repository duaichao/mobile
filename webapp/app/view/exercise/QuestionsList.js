Ext.define('app.view.exercise.QuestionsList', {
	extend: 'Ext.carousel.Infinite',
    xtype: 'questionslist',
    
    config: {
    	directionLock: true,
    	//direction:'vertical',
        innerItemConfig: {
            xclass: 'app.view.exercise.Questions'
        },
        count: 1,
        startCount:0,
        totalCount:0,
        timer:null,
        beginTime:null,
        endTime:null,
        valueMaps:[],
        offsetLimit: 5,
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
    applyTimer:function(newValue, oldValue){
    	if(oldValue){
    		clearInterval(oldValue);
    		return oldValue;
    	}
    	return newValue;
    },
    applyValueMaps:function(newMaps, oldMaps){
    	if(oldMaps){
    		oldMaps.push(newMaps);
    		return oldMaps;
    	}
    	return newMaps;
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
    	if(view&&itemRecord){
    		if(itemRecord.get('type')=='06'){
    			newItem.setScrollable(true);
    		}else{
    			newItem.setScrollable(false);
    		}
    		
    		
	    	var	pagerBtn = view.down('button#pager'),
	    		favoriteBtn = view.down('button#favorite'),
	    		answerBtn = view.down('button#anwser'),
	    		isFavorite = itemRecord.get('is_favorite'),
	    		finishBtn = newItem.down('button#finish'),
	    		source = view.getRecord().get('source'),
	    		dyText = view.getDyBtnText(),
	    		dyIcon = view.getDyBtnIcon(),
	    		dydefText = view.getDyBtnDefText() ;
	    	pagerBtn.setText((parseInt(this.getStartCount())+index+1)+'/'+this.getTotalCount());
	    	
	    	favoriteBtn.setIconCls(isFavorite==1?dyIcon[source]+'1':dyIcon[source]);
			favoriteBtn.setText(isFavorite==1?dyText[source]:dydefText[source]);
			if(itemRecord.get('finish')){
				newItem.fireEvent('finishQuestion',newItem);
			}else{
				answerBtn.setIconCls('visible');
		    	answerBtn.setText('显示答案');
		    	if(finishBtn){
		    		finishBtn.show();
		    	}
			}
    	}
    },
    onActiveItemChange: function(carousel, newItem, oldItem) {
        var index = carousel.getActiveIndex(),
            count = this.getCount(),
            offsetLimit = this.getOffsetLimit(),
            store = this.getStore(),
            storeCount = store.data.length,
            oldParams = store.getProxy().getExtraParams();
        //当前浏览题目当前数小于offsetLimit 5时，加载下一页
        if(storeCount==store.getPageSize()){
	        if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
	        	oldParams.course_offset = parseInt(this.getStartCount())+parseInt(store.getPageSize());
	        	store.getProxy().setExtraParams(oldParams);
				//this.setStartCount(oldParams.course_offset);
	            store.nextPage();
	        }
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
        if(store.getCount()<store.getPageSize()){
        	this.setMaxItemIndex(store.getCount()-1);
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
    },
    customReset:function(source){
    	this.rebuildInnerIndexes();
        this.setActiveItem(0);
        var favoriteBtn;
        favoriteBtn = this.up('exerciseview').down('button#favorite');
        if(source==3){
	    	favoriteBtn.setIconCls(questionsView.getDyBtnIcon()[source]+'1');
			favoriteBtn.setText(questionsView.getDyBtnDefText()[source]);
        }
    }
});
