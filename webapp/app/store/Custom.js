Ext.define('app.store.Custom', {
    extend: 'Ext.data.Store',

    config :{
        clearOnPageLoad: true,
        model: 'app.model.Custom'
    }
});
