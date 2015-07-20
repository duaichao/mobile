Ext.define('app.view.Guide', {
    extend: 'Ext.carousel.Carousel',
    alternateClassName: 'guide',
    xtype: 'guide',
    
    config: {
    	fullscreen: true,
        defaults: {
            styleHtmlContent: true
        },
        items: [
            {
                html : 'Item 1',
                style: 'background-color: #2980b9'
            },
            {
                html : 'Item 2',
                style: 'background-color: #7f8c8d'
            },
            {
                html : 'Item 3',
                style: 'background-color: #d35400'
            },
            {
        		styleHtmlContent: false,
        		layout:{
        			type:'vbox',
        			align:'center',
        			pack:'center'
        		},
        	    style: 'background-color: #1abc9c',
        	    items:[{
        	    	flex:1,
        	    	width:100,
        	    	items:[{
        	    		xtype:'button',
        	    		action:'tologin',
        	    		cls:'ui red',
        	    		height:40,
        	        	bottom:40,
        	        	width:100,
        	        	text:'点击进入'
        	    	}]
        	    	
        	    }]
            }
        ]
    }
});
