Ext.define('app.view.Guide', {
    extend: 'Ext.carousel.Carousel',
    alternateClassName: 'guide',
    xtype: 'guide',
    
    config: {
    	fullscreen: true,
        defaults: {
            xtype: 'image'
        },
        items: [{
        	src: 'resources/images/img_spalsh_01.jpg'
        },{
        	src: 'resources/images/img_spalsh_02.jpg'
        },{
        	src: 'resources/images/img_spalsh_03.jpg'
        },{
        	src: 'resources/images/img_spalsh_04.jpg'
        },{
        	itemId:'last',
        	src: 'resources/images/img_spalsh_05.jpg'
        }]
    }
});
