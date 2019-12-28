//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    touchS : [0,0],
    touchE : [0,0],
	startTime:0,
	endTime:0,
	swiperBox:{height:0,width:0},
	animationData:'',
	moveDistance:0
  },
  onLoad(){
	  let that=this;
	  //获取swiper盒子的宽度和高度
	  wx.createSelectorQuery().selectAll('.swipers-warp').boundingClientRect(function (rect) {
	    // console.log('height='+rect[0].height,'width='+rect[0].width);
		that.data.swiperBox.height=rect[0].height;
		that.data.swiperBox.width=rect[0].width;
	  }).exec();
	  var animation = wx.createAnimation({
	         duration: 1000,  //动画的持续时间
	         timingFunction: "linear", //	动画的效果设置为平均
	         delay: 0  //动画延迟时间无
	       });
		this.animation = animation
		animation.translateX(-600).step(); //效果自己设定为主
		this.setData({
		    animationData: animation.export()   //输出动画
		})
  },
  //事件处理函数
  startEvent(e){
	this.data.startTime=e.timeStamp;	
    let sx = e.touches[0].pageX;
    let sy = e.touches[0].pageY;
    this.data.touchS = [sx,sy];
	this.moveDistance=sx;

  },
  moveEvent(e){
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      this.data.touchE = [sx, sy];
	  console.log(sx);
	  // 加上平移效果
	  // animation.translateX(-600).step();
	  console.log(e);

	  let start = this.data.touchS;
	  let end = this.data.touchE;
	  // 判断是纵向滑动还是横向滑动
	  if(Math.abs(start[0]-end[0])>=Math.abs(start[1]-end[1])){
	  	console.log('横向滑动了');
	  	// 判断是左向滑动还是向右滑动
	  	if(start[0] < end[0]){	
	  	
	  	}else if(start[0] > end[0]){
	  	 
	  	}else{
	  	  console.log('静止')
	  	}
	  };
  },
  endEvent(e){
    console.log(e);
	this.data.endTime=e.timeStamp;
	
    let start = this.data.touchS;
    let end = this.data.touchE;
	let changeX=Math.abs(start[0]-end[0]);
	// 判断是纵向滑动还是横向滑动
	if(Math.abs(start[0]-end[0])>=Math.abs(start[1]-end[1])){
		console.log('横向滑动了');
		// 判断是左向滑动还是向右滑动
		if(start[0] < end[0]){	
			// 判断是快滑还是慢滑
		  if(e.timeStamp-this.data.startTime>500){
		  	console.log('右滑=>慢滑');
		  	//慢滑
		  }else{
		  	console.log('右滑=>快滑');
		  	//快滑
		  }
		}else if(start[0] > end[0]){
		  if(e.timeStamp-this.data.startTime>500){
		  	console.log('左滑=>慢滑');
		  	if(changeX>=(this.data.swiperBox.width/2)){
				//滑动的距离够了
				console.log('左滑=>慢滑=>距离够了');
			}else{
				console.log('左滑=>慢滑=>距离不够');
			}
		  }else{
		  	console.log('左滑=>快滑');
		  	//快滑
			if(changeX>=(this.data.swiperBox.width/5)){
				//滑动的距离够了
				console.log('左滑=>快滑=>距离够了');
			}else{
				console.log('左滑=>快滑=>距离不够');
			}
		  }
		}else{
		  console.log('静止')
		}
	};
   this.moveDistance=0;
  },
  

})
