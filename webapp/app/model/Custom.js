Ext.define('Pass.model.Custom', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            convert: function(value, record) {
                return record.get('syllabusID');
            }
        },{
            name: 'syllabusID',
            type: 'string'
        },{
        	name:'syllabusName',
        	type:'string'
        },{
        	name:'points',
        	type: 'auto'
        }],
        proxy: {
        	type: "ajax",
            actionMethods : 'POST',
            url : config.url.getCustomCategory,
            reader: {
                type: "json",
                messageProperty:'info',
                successProperty:'state',
                rootProperty: "result"
            }
        }
    }
});