Ext.define('Pass.model.Course', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'id',
            convert: function(value, record) {
                return record.get('course_id');
            }
        },{
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
        },{
        	//0 顺序1自定义2考试3收藏4错题
        	name:'source',
        	type:'int',
        	convert: function(value){
        		value = value||0;
	        	return value;
	        }
        }],
        proxy: {
        	type: "ajax",
            actionMethods : 'POST',
            url : config.url.getCourseList,
            reader: {
                type: "json",
                messageProperty:'info',
                successProperty:'state',
                rootProperty: "result"
            }
        }
    }
});