Ext.define('Pass.store.Course', {
    extend: 'Ext.data.Store',

    config :{
        clearOnPageLoad: false,
        model: 'Pass.model.Course'
    }
});
