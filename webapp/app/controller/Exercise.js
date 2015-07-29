Ext.define('app.controller.Exercise', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
        	exerciseView:'exerciseview'
        },
        control: {
        	'exerciseview':{
        		initialize:function(p){
        			var cardlist = Ext.create('app.view.exercise.View',{
    		        	store: Ext.create("Ext.data.Store", {
    		            	pageSize: 5,
    		            	clearOnPageLoad:true,
    		                model: "app.model.Exercise",
    		                proxy: {
    		                    type: "ajax",
    		                    actionMethods : 'POST',
    		                    startParam:'course_offset',
    		                    limitParam: 'course_num', //设置limit参数，默认为limit
    		                    pageParam: 'page', //设置page参数，默认为page
    		                    url : config.url.getExercise,
    		                    reader: {
    		                        type: "json",
    		                        messageProperty:'info',
    		                        successProperty:'state',
    		                        totalProperty:"QuestNum",
    		                        rootProperty: "result"
    		                    }
    		                },
    		                autoLoad: false
    		            })
        			});
        			p.add(cardlist);
        			cardlist.on('activeitemchange',function(cl, value, oldValue, eOpts ){
            			var st = cl.getStore(),
        					ind = cl.getActiveIndex();
            			//开始加载下一页数据
            			if(ind+1==st.getCount()){
            				st.nextPage();
            			}
            			console.log(ind+'=='+st.getCount());
	        		});
        		},
        		activate:function(p){
        			var lt = p.down('cardlist'),
        				st = lt.getStore(),
        				pagerBtn = p.down('button#pager'),
        				params = p.getDefaultParams(),
        				pageSize = st.getPageSize(),
        				totalCount = parseInt(params.total_num),
        				currCount = parseInt(params.process_num),
        				currPage = currCount/pageSize,
        				pp = {
        					course_id:params.course_id,
        					token:params.token,
        					username:params.username
        				};
        			if(currCount%pageSize>0){currPage++;}
        			st.getProxy().setExtraParams(pp);
        			st.loadPage(currPage+1,{
        				callback:function(){
        					//时间计时
        				}
        			});
        			pagerBtn.setText((currCount+1)+'/'+totalCount);
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
		st = p.down('carousellist').getStore(),
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