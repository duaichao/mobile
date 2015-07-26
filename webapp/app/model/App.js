Ext.define('app.model.App', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            type: 'string'
        },{
        	name:'title',
        	type:'string'
        },{
        	name:'pic',
        	type:'string'
        },{
        	name:'type',
        	type:'string'
        },{
        	name:'address',
        	type:'string'
        }]
    }
});