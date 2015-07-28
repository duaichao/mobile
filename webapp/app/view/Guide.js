Ext.define('app.view.Guide', {
    extend: 'Ext.carousel.Carousel',
    alternateClassName: 'guide',
    xtype: 'guide',
    
    config: {
    	fullscreen: true,
        defaults: {
        	xtype:'container',
            styleHtmlContent: true
        },
        items: [{
            style: 'background: url(resources/images/img_spalsh_01.jpg) no-repeat center 0;'
        },{
            style: 'background: url(resources/images/img_spalsh_02.jpg) no-repeat center 0;'
        },{
            style: 'background: url(resources/images/img_spalsh_03.jpg) no-repeat center 0;'
        },{
            style: 'background: url(resources/images/img_spalsh_04.jpg) no-repeat center 0;'
        },{
    		styleHtmlContent: false,
    		style: 'background: url(resources/images/img_spalsh_05.jpg) no-repeat center 0;',
    	    layout:{
    	    	type:'vbox',
    	    	align: 'center', //垂直方向停靠起始位置
    	        pack: 'center' 
    	    },
    		items:[{
    	    	xtype:'button',
	    		action:'tologin',
	    		ui:'plain',
	    		height:150,
	        	width:150
    	    }]
        }]
    }
});
