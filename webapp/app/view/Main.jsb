Ext.define("Pass.view.Main", {
    extend: 'Ext.ux.slidenavigation.View',
    alternateClassName: 'main',
    config: {
        fullscreen: true,
         
        /**
         *  Any component within the container with an 'x-toolbar' class
         *  will be draggable.  To disable draggin all together, set this
         *  to false.
         */
        slideSelector:  'x-toolbar',

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
                ui: 'fred',                    
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
            'Group 2': 2
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
            slideButton: false,
            /*slideButton: {
                selector: 'container[docked=top]',
                iconMask: false,
                iconCls:'icon-svgliebiao font18',
                ui: 'plain'
            },*/
            items: [{
            	maskOnOpen:true,
            	xclass : 'Pass.view.Index'
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
                xclass:'Pass.view.demo.Demo'
            }]
        }]
    }
});
