window.onload = function(){
	var clock = document.getElementById("clock");
var ctx = clock.getContext("2d");
var width = clock.width;//获取元素宽度
var height = clock.height;//获取元素高度
var r =width/2;

ctx.translate(r,r);//重新定义起始位置

	function drawClock(){
		//画外援
		ctx.beginPath();
		ctx.lineWidth="10";
		ctx.arc(0,0,(r-5),0,2*Math.PI,false);
		ctx.stroke();
		ctx.closePath();
		
		//number
		var hours = [3,4,5,6,7,8,9,10,11,12,1,2];
		hours.forEach(function(value,index){
			var rad = 2*Math.PI/12*index;
			var x = (r-30)*Math.cos(rad);
			var y = (r-30)*Math.sin(rad);
			ctx.fillStyle="black";
			ctx.font="16px Arial";
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.fillText(value,x,y);
		})
		
		//60个点
		for(var i=0;i<60;i++){
			var rad = 2*Math.PI/60*i;
			var x = (r-18)*Math.cos(rad);
			var y = (r-18)*Math.sin(rad);
			ctx.beginPath();
			if(i%5===0){
				ctx.fillStyle="black";
				ctx.arc(x,y,2,0,2*Math.PI,false);
			}else{
				ctx.fillStyle="#CCCCCC";
				ctx.arc(x,y,2,0,2*Math.PI,false);
			}
			ctx.fill();
			ctx.closePath();
		}
		
		
	}

	//hour
	function drawHour(hour,minute){
		ctx.save();
		var rad = 2*Math.PI / 12 * hour;
		var mrad = 2*Math.PI / 12 / 60 * minute;
		ctx.rotate(rad+mrad);	//在绘图之前旋转
		ctx.beginPath();
		ctx.lineWidth="4";
		ctx.lineCap="round";
		ctx.moveTo(0,10);
		ctx.lineTo(0,-r+60);
		ctx.stroke();
		ctx.restore();
	}
	
	function drawMinute(minute){
		ctx.save();
		var rad = 2*Math.PI / 60 * minute;
		ctx.rotate(rad);	//在绘图之前旋转
		ctx.beginPath();
		ctx.lineWidth="3";
		ctx.lineCap="round";
		ctx.moveTo(0,10);
		ctx.lineTo(0,-r+45);
		ctx.stroke();
		ctx.restore();
	}
	
	function drawSecond(second){
		ctx.save();
		var rad = 2*Math.PI / 60 * second;
		ctx.rotate(rad);	//在绘图之前旋转
		ctx.beginPath();
		ctx.fillStyle="coral";
		ctx.moveTo(-2,0);
		ctx.lineTo(0,14);
		ctx.lineTo(2,0);
		ctx.lineTo(0,-r+40);
		ctx.fill();
		ctx.restore();
	}
	
	function drawDot(){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle="#fff";
		ctx.arc(0,0,2,0,2*Math.PI,true);
		ctx.fill();
		ctx.restore();
	}
	
	
	setInterval(function(){
		ctx.clearRect(-r,-r,width,height);
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		drawClock();
		drawHour(hour,minute);
		drawMinute(minute);
		drawSecond(second);
		drawDot();
	},1000)
	/*function count(){
		var time = 0;
		function add(){
			ctx.clearRect(-r,-r,width,height);
			time+=1;
			drawClock();	
			drawSecond(time);
			drawMinute(time/60);
			drawHour(time/3600,time/60);
			drawDot();
		}
		var timer = setInterval(function(){
			add();
		},1000)
	}
	count();*/

}
