Ext.define('app.view.exercise.QuestionsList', {
	extend: 'Ext.carousel.Infinite',
    xtype: 'questionslist',
    
    config: {
    	directionLock: true,
        innerItemConfig: {
            xclass: 'app.view.exercise.Questions'
        },
        count: 1,
        offsetLimit: 10,
        store: null,
        animation: {
            duration: 650
        },
        listeners: {
            activeitemchange: 'onActiveItemChange',
            itemindexchange: 'onItemIndexChange'
        }
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
    onActiveItemChange: function(carousel, newItem, oldItem) {
        var index = carousel.getActiveIndex(),
            count = this.getCount(),
            offsetLimit = this.getOffsetLimit(),
            store = this.getStore(),
            storeCount = store.getCount();

        if (storeCount - (count * index) < offsetLimit && !store.isLoading()) {
            store.nextPage();
        }
    },
    onItemIndexChange: function(me, item, index) {
        var store = this.getStore(),
            count = this.getCount(),
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
                return record;
            }
        }, this);
        item.setRecords(records);
    }
});
