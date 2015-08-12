Ext.define('Pass.model.Local', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['guide','guideAction'],
        proxy: {
            type: 'localstorage',
            id: 'local'
        }
    }
});