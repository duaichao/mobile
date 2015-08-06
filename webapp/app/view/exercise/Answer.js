Ext.define('app.view.exercise.Answer', {
    alternateClassName: 'questionanswer',
    xtype: 'questionanswer',
    extend: 'Ext.Container',
    config: {
        tabBarPosition: "bottom",
        ui: 'light',
        cls: "qe-answerbox",
        record: null,
        layout: "vbox",
        hidden: true,
        showAnimation: {
            type: "slideIn",
            direction: "up",
            duration: 500
        },
        hideAnimation: {
            type: "slideOut",
            direction: "down",
            duration: 500
        }
    },
    initialize: function() {
        var me = this;
        this.element.on("swipe", function(e) {
            me.fireEvent("swipe", me, e);
        })
    },
    updateRecord: function() {
        this.removeAll(false);
        this.createView();
    },
    createView: function() {
        var record = this.getRecord();
        if (record) {
            var header = this.getHeader(),
                content = this.getContent(),
                data = record.data;

            var levels = [];
            for(var i=0;i<5;i++){
            	if(i>parseInt(data.level)-1){
            		levels.push('&#xe623;');
            	}else{
            		levels.push('&#xe622;');
            	}
            }
            header.setHtml(this.getHeaderTemplate().apply(levels));
            if(record.get('type')=='06'){
            	var hasSubs =record.get('sub_array'),html='';
            	Ext.Array.each(hasSubs, function(sub, index) {
    				html+=Ext.String.format('<div>0{0}.{1}</div>',(index+1),sub.explain);
    			});
            	
            	content.setHtml(html);
            }else{
            	content.setHtml(record.get("explain"));
            }
            content.getScrollable().getScroller().scrollTo(null, 0, false);

            this.add(header);
            this.add(content);
        }
    },
    getHeader: function() {
        if (!this._header) {
        	this._header = Ext.create("Ext.Container", {
                layout: "vbox",
                cls:'qe-answer-header'
            });
        }
        return this._header;
    },
    getHeaderTemplate: function() {
        if (!this._headerTemplate) {
            this._headerTemplate = new Ext.XTemplate(
                '<div class="title">试题解析</div>',
                '<div class="rating clearfix">',
                '难度: ',
                '<tpl for=".">',
                '<i class="iconfont">{.}</i>',
                '</tpl>',
                '</div>'
            )
        }
        return this._headerTemplate;
    },
    getContent: function() {
        if (!this._content) {
            this._content = Ext.create("Ext.Container", {
                scrollable: true,
                flex:1,
                cls: "qe-answer-content"
            });
        }
        return this._content;
    }
});