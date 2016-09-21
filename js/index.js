$(function(){
/*主导航选项卡开始--------------------------------------------------------------------------------------------------*/ 
	// 获取元素
	var item=$(".item");
	var list=$(".list");

	for(var i=0;i<item.length;i++){
		// 给每个item加一个index属性，用来保存下标
		item[i].index=i;
		
		// 添加鼠标移入事件
		item[i].onmouseover=function(){
			list[this.index].style.display="block";
		}

		// 添加鼠标移出事件
		item[i].onmouseout=function(){
			list[this.index].style.display="none";
		}
	}
/*主导航选项卡结束--------------------------------------------------------------------------------------------------*/ 
	
/*banner双下标轮播开始----------------------------------------------------------------------------------------------*/
	// 1.获取元素
	var imgs=$("a",$(".box")[0]);
	var win=$(".window")[0];
	var kuan=parseInt(getStyle(win,"width"));
	var cirs=$("li",win);
	var btnL=$(".btnL")[0];
	var btnR=$(".btnR")[0];

	// 2.状态初始化
	// (1)图片位置
	for(var i=0;i<imgs.length;i++){
		if(i==0){
			continue;		//跳出本次循环，继续下次循环
		}
		imgs[i].style.left=kuan+"px";
	}
	// (2)小点背景颜色
	cirs[0].style.background="#E21E7F";

	// 3.记录下标
	var index=0;		//当前显示的图片
	var next=0;			//接下来会显示的图片


	// 4.时间间隔函数
	var t=setInterval(moveR,2000);
	
	// 5.move函数
	// (1)点击右按钮执行的函数
	function moveR(){
		// 更新下标
		next++;

		// 判断边界
		if(next==imgs.length){
			next=0;
		}
		
		// 动画执行之前先让下一张图片就位
		imgs[next].style.left=kuan+"px";
		
		// 小点背景颜色随图片运动而变化
		cirs[index].style.background="#CECBC8";
		cirs[next].style.background="#E21E7F";
		

		// 动画执行
		animate(imgs[index],{left:-kuan});
		animate(imgs[next],{left:0},function(){
			flag=true;
		});

		// 动画执行完后更新下标
		index=next;
	}

	// (2)点击左按钮执行的函数
	function moveL(){
		// 更新下标
		next--;

		// 判断边界
		if(next<0){
			next=imgs.length-1;
		}
		
		// 动画执行之前先让下一张图片就位
		imgs[next].style.left=-kuan+"px";
		
		// 小点背景颜色随图片运动而变化
		cirs[index].style.background="#CECBC8";
		cirs[next].style.background="#E21E7F";
		

		// 动画执行
		animate(imgs[index],{left:kuan});
		animate(imgs[next],{left:0},function(){
			flag=true;
		});

		// 动画执行完后更新下标
		index=next;
	}

	// 6.添加鼠标移入轮播停止的事件
	win.onmouseover=function(){
		clearInterval(t);
	}

	// 7.添加鼠标移出轮播继续的事件
	win.onmouseout=function(){
		t=setInterval(moveR,2000);
	}

	// 8.给小点添加点击事件(选项卡)
	for(var i=0;i<cirs.length;i++){
		cirs[i].index=i;
		cirs[i].onclick=function(){
			// (1)当前显示的图片和点击的小点一致时，不执行下面的动画
			if(this.index==index){
				return;		//停止并跳出当前函数，不执行后面的函数体
			}
			
			// (2)动画执行前让小点就位
			// A.当前小点为灰色
			cirs[index].style.background="#CECBC8";
			// B.点击的小点为红色
			cirs[this.index].style.background="#E21E7F";
			
			// (3)分情况判断点击不同方向的小点时，动画执行的方向不同
			if(this.index>index){
				// A.动画执行前让图片就位
				imgs[this.index].style.left=kuan+"px";
				// B.动画执行
				animate(imgs[index],{left:-kuan});
				animate(imgs[this.index],{left:0},function(){
					flag=true;
				});
			}
			if(this.index<index){
				// A.动画执行前让图片就位
				imgs[this.index].style.left=-kuan+"px";
				// B.动画执行：
				animate(imgs[index],{left:kuan});
				animate(imgs[this.index],{left:0},function(){
					flag=true;
				});
			}
			
			
			// (4)动画执行完后更新下标：
			// this.index--->代表点的那个
			// index--->代表当前显示的
			next=this.index;
			index=this.index;
		}
	}

	// 9.定义开关
	var flag=true;
	
	// 10.给右按钮添加点击事件
	btnR.onclick=function(){
		if(flag){
			flag=false;
			moveR();
		}
		
	}

	// 11.给右按钮添加点击事件
	btnL.onclick=function(){
		if(flag){
			flag=false;
			moveL();
		}
	}
/*banner双下标轮播结束-------------------------------------------------------------------------------------------------*/
	
/*右下角的固定定位开始-------------------------------------------------------------------------------------------------*/
	// 1.获取元素--->在线咨询
	var zxzx=$("#zxzx");
	// 添加事件
	zxzx.onmouseover=function(){
		animate(zxzx,{right:35},500);
	}
	zxzx.onmouseout=function(){
		animate(zxzx,{right:-25},500);
	}

	// 2.获取元素--->常见问题
	var cjwt=$("#cjwt");
	// 添加事件
	cjwt.onmouseover=function(){
		animate(cjwt,{right:35},500);
	}
	cjwt.onmouseout=function(){
		animate(cjwt,{right:-25},500);
	}

	// 3.获取元素--->投诉建议
	var tsjy=$("#tsjy");
	// 添加事件
	tsjy.onmouseover=function(){
		animate(tsjy,{right:35},500);
	}
	tsjy.onmouseout=function(){
		animate(tsjy,{right:-25},500);
	}
/*右下角的固定定位结束-----------------------------------------------------------------------------------------*/
	
/*给图片添加移入移出的动画事件开始------------------------------------------------------------------------------*/
	// 获取元素
	var pic=$(".tp");
	for(var i=0;i<pic.length;i++){
		pic[i].index=i;
		pic[i].onmouseover=function(){
			animate(pic[this.index],{right:20},Tween.Quad.easeIn,200);
		}
		pic[i].onmouseout=function(){
			animate(pic[this.index],{right:0},Tween.Bounce.easeInOut,200);
		}
	}
/*给图片添加移入移出的动画事件结束-------------------------------------------------------------------------------*/

/*节点轮播开始----------------------------------------------------------------------------------------------------*/
// (一)获取元素
	
	// 1.动的盒子
	var hz=$(".hz")[0];
	// 2.节点的宽度
	var k=parseInt(getStyle(($("a",hz)[0]),"width"));
	// 3.左右按钮
	var anL=$(".anL")[0];
	var anR=$(".anR")[0];
	// 4.大盒子
	var dHz=$(".node-lb")[0];
	
	// (二)时间间隔函数
	var s=setInterval(dongL,2000);

	// (三)
	// 1.moveL函数(点击左按钮--->向右动)
	function dongR(){
		// 把最后一个子节点放到盒子的最前面
		var last=getLast(hz);
		appendBefore(last,hz);
		hz.style.left=-k+"px";
		animate(hz,{left:0},300,function(){
			kg=true;
		});
	}

	// 2.moveR函数(点击右按钮--->向左动)
	function dongL(){
		var first=getFirst(hz);
		animate(hz,{left:-k},300,function(){
			hz.appendChild(first);
			hz.style.left=0;
			kg=true;
		});
	}


	// (四)
	// 1.鼠标移入大盒子轮播停止
	dHz.onmouseover=function(){
		clearInterval(s);
	}

	// 2.鼠标移出大盒子轮播继续
	dHz.onmouseout=function(){
		s=setInterval(dongL,2000);
	}

	// (五)
	// 1.定义开关
	var kg=true;
	
	// 2.添加点击左按钮的事件
	anL.onclick=function(){
		if(kg){
			kg=false;
			dongR();
		}
	}
	// 3.添加点击左按钮的事件
	anR.onclick=function(){
		if(kg){
			kg=false;
			dongL();
		}
	}
/*节点轮播结束----------------------------------------------------------------------------------------------------*/

});

