Ext.define('app.store.Questions', {
    extend: 'Ext.data.Store',

    config :{
    	pageSize: 20,
        clearOnPageLoad: false,
        model: 'app.model.Questions'
    }
});
