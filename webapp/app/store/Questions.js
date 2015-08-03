Ext.define('app.store.Questions', {
    extend: 'Ext.data.Store',

    config :{
    	pageSize: 100,
        clearOnPageLoad: false,
        model: 'app.model.Questions'
    }
});
