Ext.define('app.controller.Exercise', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	exerciseView:'exerciseview'
        },
        control: {
        	'exerciseview':{
        		activate:function(p){
        			var lt = p.down('exerciselist'),
        				st = lt.getStore();
        			st.getProxy().setExtraParams(Ext.applyIf(p.getDefaultParams(),st.getProxy().getExtraParams()));
        			st.loadPage(1);
        			lt.hide();
        			st.on('load',function(){
        				lt.show();
        			});
        		}
        	},
        	'exerciseview button#prev':{
        		tap:'doPage'
        	},'exerciseview button#next':{
        		tap:'doPage'
        	}
        }
    },
    doPage :function(btn){
    	var p=this.getExerciseView(),
		st = p.down('exerciselist').getStore(),
		pbtn = p.down('button#prev'),
		nbtn = p.down('button#next'),
		total = st.getTotalCount(),pageSize = st.getPageSize(),
		pages = total/pageSize;
    	
    	if(st.getTotalCount()%st.getPageSize()>0){pages++;}
    	st.getProxy().setExtraParams(Ext.applyIf(p.getDefaultParams(),st.getProxy().getExtraParams()));
    	
    	if(pbtn.getItemId()==btn.getItemId()){
    		if(st.currentPage-1==1){
    			pbtn.disable();
    		}
    		if(st.currentPage-1<pages&&nbtn.isDisabled()){
    			nbtn.enable();
    		}
    		st.previousPage();
    	}else{
    		if(st.currentPage+1==pages){
				nbtn.disable();
			}
    		if(st.currentPage+1>1&&pbtn.isDisabled()){
    			pbtn.enable();
    		}
    		st.nextPage();
    	}
		
    }
});