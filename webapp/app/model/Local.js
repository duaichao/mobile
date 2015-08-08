Ext.define('Pass.model.Local', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['guide'],
        proxy: {
            type: 'localstorage',
            id: 'local'
        }
    }
});