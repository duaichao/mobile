Ext.define('app.controller.About', {
    extend: 'Ext.app.Controller',
    config: {
    	refs: {
    		aboutContainer: 'moreContainer'
		},
		control: {
			aboutList: {
				itemtap: 'onAboutItemTap',
				activate: 'onAboutListActivate'
			}
		}
    },
    onAboutListActivate: function(list) {
		list.deselectAll();
	},

	onAboutItemTap: function(list, idx) {
		if(idx<3){
			this.getAboutContainer().push(config.aboutPages[idx]);
		}else{
			this.logOut();
		}
	},
	
    logOut:function(){
    	var me = this;
        Ext.ModelMgr.getModel('app.model.User').load(1, {
            success: function (user) {
                user.erase();
                config.user = null;
                util.ePush('userLogin');
            }
        });
    }
});