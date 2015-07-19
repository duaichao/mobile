Ext.define("app.view.Main", {
    extend: 'Ext.ux.slidenavigation.View',
    alternateClassName: 'main',
    config: {
        fullscreen: true,
         
        /**
         *  Any component within the container with an 'x-toolbar' class
         *  will be draggable.  To disable draggin all together, set this
         *  to false.
         */
        slideSelector: 'x-toolbar',

        /**
         *  Container must be dragged 10 pixels horizontally before allowing
         *  the underlying container to actually be dragged.
         *
         *  @since 0.2.2
         */
        containerSlideDelay: 10,
        
        /**
         *  Time in milliseconds to animate the closing of the container
         *  after an item has been clicked on in the list.
         */
        selectSlideDuration: 200,

        /**
         *  Enable content masking when container is open.
         *
         *  @since 0.2.0
         */
        itemMask: true,

        /**
         *  Define the default slide button config.  Any item that has
         *  a `slideButton` value that is either `true` or a button config
         *  will use these values at the default.
         */
        slideButtonDefaults: {
            selector: 'toolbar'
        },
         
        /**
         *  This allows us to configure how the actual list container
         *  looks.  Here we've added a custom search field and have
         *  modified the width.
         */
        list: {
            maxDrag: 400,
            width: 200,
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                ui: 'light',                    
                title: {
                    title: '导航',
                    centered: false,
                    width: 200,
                    left: 0
                }
                
                /**
                 *  Here's an example of how to add a different type of
                 *  component into the toolbar of the list.
                 */
                /*
                items: [{
                    docked: 'top',
                    xtype: 'searchfield',
                    placeHolder: 'search',
                    width: 180
                }]
                */
            }]
            
        },
        
        /**
         *  Change this to 'right' to dock the navigation list to the right.
         */
        listPosition: 'left',

        /**
         *  Example of how to re-order the groups.
         */
        groups: {
            'Group 1': 1,
            'Group 2': 2,
            'Group 3': 3
        },
        
        /**
         *  These are the default values to apply to the items within the
         *  container.
         */
        defaults: {
            style: 'background: #fff',
            xtype: 'container'
        },
        
        items: [{
            title: 'Item 1',
            group: 'Group 1',

            // Enable the slide button using the defaults defined above in
            // `slideButtonDefaults`.
            slideButton: true,
            /*slideButton: {
                selector: 'container[docked=top]',
                iconMask: false,
                iconCls:'icon-svgliebiao font18',
                ui: 'plain'
            },*/
            items: [{
            	maskOnOpen:true,
            	xclass : 'app.view.Index'
            }]
        },{
            title: 'Item 2',
            group: 'Group 2',
            slideButton: {
                selector: 'toolbar',
                iconMask: false,
                iconCls:'list',
                ui: 'plain'
            },
            items: [{
            	maskOnOpen:true,
                xclass:'app.view.demo.Demo'
            }]
        },{
            title: 'Item 3',
            group: 'Group 3',
            order: 0,
            // Extend `slideButtonDefaults`
            slideButton: {
                iconMask: false,
                iconCls:'list',
                ui: 'plain'
            },
            items: [{
                xtype: 'toolbar',
                title: 'Item 3',
                docked: 'top'
            },{
                xtype: 'container',
                scrollable: 'vertical',
                style: 'margin: auto !important; text-align: center;',
                maskOnOpen: true,
                defaults: {
                    style: "float: left; margin: 10px; box-shadow: "+
                           "#999 0px 0px 6px 2px; border: 1px solid #888; "+
                           "overflow: hidden;",
                    height: 170,
                    width: 110
                },
                items: [{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/13/43/11134356_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content9.flixster.com/movie/11/16/11/11161107_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/16/10/11161098_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/15/75/11157588_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content9.flixster.com/movie/11/16/13/11161343_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/16/12/11161272_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content7.flixster.com/movie/11/16/24/11162445_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/15/92/11159214_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/16/03/11160390_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/16/05/11160598_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/16/09/11160942_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content7.flixster.com/movie/11/15/25/11152577_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/16/09/11160962_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/16/02/11160244_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content9.flixster.com/movie/11/16/25/11162555_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content9.flixster.com/movie/11/15/83/11158339_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/15/65/11156544_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content7.flixster.com/movie/11/15/66/11156693_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/15/90/11159072_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content9.flixster.com/movie/11/16/26/11162639_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/16/26/11162672_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/15/92/11159258_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content6.flixster.com/movie/11/15/84/11158472_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content7.flixster.com/movie/11/15/65/11156581_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content9.flixster.com/movie/11/15/16/11151659_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content8.flixster.com/movie/11/15/81/11158182_pro.jpg" />'
                },{
                    html: '<img class="image-wrap" src="http://content9.flixster.com/movie/11/15/90/11159075_pro.jpg" />'
                }]
            }]
        }]
    }
});
