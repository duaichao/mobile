Ext.define('app.model.Config', {
    extend: 'Ext.data.Model',
    config: {
        fields: [],
        proxy: {
            type: 'localstorage',
            id: 'config'
        }
    }
});