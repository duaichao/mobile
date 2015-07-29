Ext.define('app.model.Course', {
    extend: 'Ext.data.Model',
    config: {
    	identifier: 'sequential',
        fields: [{
            name: 'course_id',
            type: 'string'
        },{
        	name:'course_name',
        	type:'string'
        },{
        	name:'total_num',
        	type:'string'
        },{
        	name:'process_num',
        	type:'string'
        },{
        	name:'passing_percent',
        	type:'string'
        },{
        	name:'average_speed',
        	type:'string',
        	convert: function(value){
        		value = Math.floor(value);
	        	return value;
	        }
        },{
        	name:'correct_percent',
        	type:'string'
        }]
    }
});