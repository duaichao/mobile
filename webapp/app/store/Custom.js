Ext.define('Pass.store.Custom', {
    extend: 'Ext.data.Store',

    config :{
        clearOnPageLoad: true,
        model: 'Pass.model.Custom'
    }
});
