Ext.define('app.store.Course', {
    extend: 'Ext.data.Store',

    config :{
        clearOnPageLoad: false,
        model: 'app.model.Course'
    }
});
