Ext.define('app.store.Questions', {
    extend: 'Ext.data.Store',

    config :{
    	pageSize: 50,
        clearOnPageLoad: false,
        model: 'app.model.Questions'
    }
});