Ext.define("Pass.view.Main", {
    extend: 'Ext.navigation.View',
    alternateClassName: 'mainView',
    xtype:'mainView',
    config: {
    	fullscreen:true,
    	scrollable:false,
		defaultBackButtonText:'返回',
		navigationBar: {
			ui:'fred',
			items:[{
				text:'test',
				handler:function(){
					//console.log(this.up('mainView').getInnerItems().length)
					util.request(config.url.commitExamExercise,{
						course_id:'263',
						answers:'[{"id":39868,"type":"03","user_answer_array":[{"user_answer":1}]}]',
						exam_id:'240709',
						total_time:'8',
						username:'哈哈',
						token:'ee69ce96cb5f4f8cf4c7a0bebb3e265e'
					},function(data){
						console.log(data);
					});
						
				}
			},{
				itemId:'rightTplButton',
				hidden:true,
				ui:'plain',
				align:'right'
			}]
	    },
	    items:[{xclass:'Pass.view.Tab'}]
    }
});