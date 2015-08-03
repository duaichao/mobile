Ext.define('app.view.exercise.Questions', {
	extend: 'Ext.Container',
    xtype: 'questions',
    config: {
        baseCls: 'questions',

        records: null,
        scrollable: {
            directionLock: true,
            direction: 'vertical'
        }
    },
    updateRecords: function(newRecords) {
        var record = newRecords.items[0];
        console.log(record.data);
    }
    
});
