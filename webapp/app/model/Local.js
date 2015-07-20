Ext.define('app.model.Local', {
    extend: 'Ext.data.Model',
    config: {
        fields: [],
        proxy: {
            type: 'localstorage',
            id: 'local'
        }
    }
});