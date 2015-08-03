Ext.define('app.model.Exercise', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'course_id',
            type: 'string'
        },{
        	name:'id',
        	type:'int'
        },{
        	name:'type',
        	type:'string'
        },{
        	name:'content',
        	type:'string'
        },{
        	name:'explain',
        	type:'string'
        },{
        	name:'answer_array',
        	type:'auto'
        	/*parent_id id type content is_right*/
        },{
        	name:'RightAnswer',
        	type:'string'
        },{
        	name:'sub_array',
        	type:'auto'
        	/*parent_id id type content explain answer_array*/
        },{
        	name:'level',
        	type:'int'
        },{
        	name:'is_favorite',
        	type:'int'
        },{
            name: 'finish',
            type: 'int'
        }]
    }
});