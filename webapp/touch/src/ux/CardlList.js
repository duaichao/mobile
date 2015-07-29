Ext.define('Ext.ux.CardlList', {
	extend: 'Ext.Carousel',
	xtype: 'cardlist',
	config: {
        itemConfig: {},
        tpl: null,
        store: null,
        data: null
    },
    storeEventHooks: {
        load: 'onLoad'
    },
    updateData: function (data) {
        var me = this,
        store = me.getStore();
        if (!store) {
            this.setStore(Ext.create('Ext.data.Store', {
                data: data,
                autoDestroy: true
            }));
        } else {
            store.add(data);
        }
    },
    applyStore: function (store) {
        var me = this,
        bindEvents = Ext.apply({},
        me.storeEventHooks, {
            scope: me
        });
        if (store) {
            store = Ext.data.StoreManager.lookup(store);
            store.on(bindEvents);
        }
        return store;
    },
    onLoad: function (store) {
        var me = this,
        tpl = me.getTpl(),
        config = me.getItemConfig(),
        item;
        if (tpl) {
            config.tpl = tpl;
            store.each(function (record, index, length) {
            	record.set('xindex',index + 1+((store.currentPage - 1) * store.getPageSize()));
                config.record = record;
                item = Ext.factory(config, 'Ext.Container');
                item.element.on({
                    scope: me,
                    tap: 'onItemTap'
                });
                me.add(item);
            });
        }
    },
    updateStore: function (newStore, oldStore) {
        var me = this,
        bindEvents = Ext.apply({},
        me.storeEventHooks, {
            scope: me
        });
        if (oldStore && Ext.isObject(oldStore) && oldStore.isStore) {
            oldStore.un(bindEvents);
            if (oldStore.getAutoDestroy()) {
                oldStore.destroy();
            }
        }
        if (newStore.getCount()) {
            this.onLoad(newStore);
        }
    },
    onItemTap: function () {
        var me = this,
        item = me.getActiveItem();
        me.fireEvent('itemTap', me, me.getActiveIndex(), item, item.getRecord());
    }
});