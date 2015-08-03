Ext.Loader.setPath({
    'Ext': 'touch/src',
    'ux':'touch/src/ux'
});
Ext.application({
	name: 'app',
	//sets up the icon and startup screens for when the app is added to a phone/tablet home screen
    startupImage: {
        '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
        '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
        '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
        '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
    },
    createCourseStore:function(data){
    	//读取课程列表
    	return Ext.create("Ext.data.Store", {
    		id:'Course',
    		params:Ext.applyIf({noloader:true},data),
            model: "app.model.Course",
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
            },
            autoLoad: false
        });
    },
    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },
    requires: [
   		'Ext.MessageBox',
   		'app.Config',
   		'app.Util'
   	],
	controllers: [
		'Main',
		//'demo.Demo',
		'User',
		'Exercise'
	],
	views: [
        //'demo.Demo',
        'Guide','Main','Index',
        'App','Favorite',
        
        'exercise.Main',
        'exercise.View',
        'exercise.Answer',
        
        'user.Login',
        'user.Regist',
        'user.Home',
        'user.Course',
        'user.CustomItem',
        'user.Info',
        
        
        'about.More',
        'about.List',
        'about.HtmlPage'
	],
    models: [
         'Local',
         'User',
         'Course',
         'Exercise',
         'App'
    ],
    launch: function() {
    	Ext.fly('appLoadingIndicator').destroy();
    	util.init();
    },onUpdated: function() {
        Ext.Msg.confirm(
            "更新完成",
            "已更新至程序最新版本，立即体验?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
