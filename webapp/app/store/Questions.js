Ext.define('Pass.store.Questions', {
    extend: 'Ext.data.Store',

    config :{
    	pageSize: 20,
        clearOnPageLoad: false,
        model: 'Pass.model.Questions'
    }
});
