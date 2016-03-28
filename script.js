(function() {
	var browser	= ['-webkit-','-o-','moz',''];
	var gallery = new _gallery ();
	var cssTitle = " ";
	var init=function(){
		for(var i=0;i<4;i++){
			if($('body').css(browser[i]+'transform')!=undefined){
				cssTitle=browser[i];
			}
		}
		addEvent();
		gallery.imgPosition();
	};
	function addEvent(){
		$(window).resize(function(){
			gallery.imgPosition();
		})
		for(var i=0;i<12;i++){
			$('.gallery').find('li').eq(i).data('value',i+1);
			$('.gallery').find('li').eq(i).on({
				'click':function(){
					if($(this).data('value')>4){
						gallery.addVideo('works'+$(this).data('value'));
						$('.video_mask').css('display','block');
					}
					
				},
				'mouseover':function(){
					gallery.mouseover(($(this).data('value'))-1);
				},
				'mouseout':function(){
					gallery.mouseout();
				}
			});
		}
		$('.video_mask').click(function(){
			gallery.removeVideo();
			$(this).css('display','none');
		})
	};
	function _gallery(){
		this.img_mc=$('.gallery').find('li');
		this.width=0;
		this.height=0;
		this.x=[];
		this.y=[];
		this.row=4;
		this.videoObject=$('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="623" height="468">');
		this.videoEmbed=$('<embed src="" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="623" height="468" wmode="opaque" controls="smallconsole"></embed>');
	}
	_gallery.prototype.imgPosition=function(){
		this.width=this.img_mc.eq(0).width();
		this.height=this.img_mc.eq(0).height();
		if($(window).width()>855){
			this.row=4;
		}else if(635<$(window).width()){
			this.row=3;
		}else{
			this.row=2;
		}
		console.log('test:'+this.row);
		for(var i=0;i<12;i++){
			if($(window).width()>413){
				if(i<(this.row)){
					this.y[i]=0;
					this.x[i]=this.width*i;
				}else{
					this.x[i]=(i%(this.row))*this.width;
					this.y[i]=Math.floor(i/(this.row))*this.height;
				}
			}else{
				this.x[i]=0;
				this.y[i]=i*this.height;
			}
			this.img_mc.eq(i).css(cssTitle+'transform','translate3d('+this.x[i]+'px,'+this.y[i]+'px,0px)');
			this.img_mc.eq(i).css('z-index','1');
		}
	}
	_gallery.prototype.addVideo=function(value){
		this.videoEmbed.attr('src','swf/'+value+'.swf');
		this.videoObject.append(this.videoEmbed);
		$('.flash_scream').append(this.videoObject);
	}
	_gallery.prototype.removeVideo=function(){
		this.videoObject.remove();
	}
	_gallery.prototype.mouseover=function(value){
		for(var i=0;i<12;i++){
			this.img_mc.eq(i).css(cssTitle+'transform','translate3d('+this.x[i]+'px,'+this.y[i]+'px,0px) scale(0.8)');
			this.img_mc.eq(i).css('opacity','0.6');
		}	
		this.img_mc.eq(value).css(cssTitle+'transform','translate3d('+this.x[value]+'px,'+(this.y[value]+10)+'px,0px) scale(1.2)');
		this.img_mc.eq(value).css({'z-index':'2','opacity':'1'});
	}
	_gallery.prototype.mouseout=function(){
		for(var i=0;i<12;i++){
			this.img_mc.eq(i).css(cssTitle+'transform','translate3d('+this.x[i]+'px,'+this.y[i]+'px,0px) scale(1)');
			this.img_mc.eq(i).css({'z-index':'1','opacity':'1'});
		}	
	}
	init();
})();
