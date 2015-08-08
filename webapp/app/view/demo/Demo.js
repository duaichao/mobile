Ext.define('Pass.view.demo.Demo', {
    extend: 'Ext.Panel',
	alternateClassName: 'demo',
	xtype:'demo',
	requires: 'Ext.layout.VBox',
    config: {
        defaults: {
            xtype: 'container',
            flex : 1,
            layout: {
                type : 'hbox',
                align: 'middle'
            },
            defaults: {
                xtype : 'button',
                flex  : 1,
                margin: 10
            }
        },
        items: [{
			items: [{
				xtype:'button',
				action:'rec',
				text:'录音',
				listeners : {
	                element : 'element',
	                taphold : function() {
	                	util.audioStart();
	                }
	            }
			},{
	          	xtype:'button',
	          	text:'播放录音',
	          	action:'play'		        
			},{
	          	xtype:'button',
	          	text:'在线播放',
	          	action:'playonline'		        
			},{
	          	xtype:'button',
	          	text:'录相',
	          	handler:function(){
					navigator.device.capture.captureVideo(function(files){
						//成功回调
						//navigator.notification.alert(files[0].fullPath);
						Ext.getCmp("video_files_mainview").config.param.sourceobj.startUpload(files[0].fullPath, 1);
					},function(){
						//失败回调
						//navigator.notification.alert('错误码：' + err.code, null, 'Uh oh!');
					});
				}  				        
			}]
          },{
			items: [{
	          	xtype:'button',
	          	text:'选择图片',
	          	handler:function(){
					navigator.camera.getPicture(function(imgtemp){
						console.log("文件路径："+imgtemp);
					},function(){
						console.log('选择出错');
					},{
						quality:10,//0-100
		       			destinationType:Camera.DestinationType.FILE_URL, 
		       			sourceType:Camera.PictureSourceType.PHOTOLIBRARY, 
		       			mediaType:Camera.MediaType.PICTURE
					});
				}
			},{
	          	xtype:'button',
	          	text:'拍照',
	          	handler:function(){
					navigator.camera.getPicture(function(imgtemp){
						//向列表中放圖片
					   	var acqimage =imgtemp;
				   		//acqimage.src = "data:image/jpeg;base64," + imageData;
						param.config.param.sourceobj.startUpload(imgtemp, 0);
					}, function(){
						console.log('什麼都沒有得到');
					}, { 
					   	quality: 5,
					   	destinationType:Camera.DestinationType.FILE_URL,
					   	sourceType:Camera.PictureSourceType.CAMERA 
			  		});
				}
			},{
	          	xtype:'button',
	          	text:'震动响铃',
	          	handler:function(){
	          		navigator.notification.vibrate(500);
	          		navigator.notification.beep(1);
	          	}
			}]
		}],
        
        
        
        title: '硬件测试'
    }
});
