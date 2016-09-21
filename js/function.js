// 1.通过类名获取元素
function getClass(select,obj){
	// 确定获取元素的范围
	var obj=obj?obj:document;

	// 判断浏览器
	if(document.getElementsByClassName){
		// w3c
		return obj.getElementsByClassName(select);
	}else{
		// IE6-8
		// 获取页面中所有元素
		var all=obj.all;
		// 定义一个空数组，用于存放类名为select的元素
		var arr=[];
		// 遍历页面中的每一个元素的类名属性
		for(var i=0;i<all.length;i++){
		// 与自己想要找的类名进行匹配
		// if(all[i].className==select){
			// 	arr.push(all[i]);
		// }

			// 处理一个元素有多个类名的情况
			if(checkClass(all[i].className,select)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
	// 处理包含多个类名的元素的函数
	// search--->获取到的每个元素的类名
	// select--->要筛选出的类名

	function checkClass(search,select){
		// 将包含多个类名的字符串用空格分割成数组
		var brr=search.split(" ");

		// 遍历新数组中的每一个因素(类名)
		for(var i=0;i<brr.length;i++){
		// 与自己想要筛选的类名进行匹配
			if(brr[i]==select){
				return true;
			}
		}
		return false;
	}

// 2.操作文本内容
function handleText(obj,value){
	if(obj.innerText){
		if(value==undefined){
			return obj.innerText;
		}else{
			obj.innerText=value;
		}
	}else{
		if(value==undefined){
			return obj.textContent;
		}else{
			obj.textContent=value;
		}
	}
}

//3. $函数(获取元素、页面加载)
function $(selector,obj){
	if(typeof selector=="string"){
		// 1.实现获取元素的功能
		// 确定获取元素的范围
		var obj=obj||document;

		// 通过判断字符串的首个字符确定获取元素的方式
		if(selector.charAt(0)=="."){
			// 通过类名获取元素
			return getClass(selector.slice(1),obj);
		}else if(selector.charAt(0)=="#"){
			// 通过id获取元素
			return document.getElementById(selector.slice(1));			//不用改成obj也行
		}else if(/^[a-z][a-z1-6]{0,8}$/.test(selector)){
			// 通过标签获取元素
			return obj.getElementsByTagName(selector);
		}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1));
		}
	}else if(typeof selector=="function"){
		// 函数重载(参数不同，实现的功能不同)
		// 2.实现页面加载的功能(给window添加onload事件)
		window.onload=function(){
			selector();		//回调函数
		}	
	}
}

// 4.获取样式
function getStyle(obj,style){
	// 判断浏览器
	if(obj.currentStyle){
		//IE
		return obj.currentStyle[style];			//字符串必须写在方括号中
	}else{
		//w3c
		return getComputedStyle(obj,null)[style];
	}
}

/*
5.获取指定元素的子节点
	obj:指定的对象
	type:获取子节点的类型
	
	获取的只是元素节点  true		--->不传参或传true
	获取的既可以是元素节点;也可以是文本节点   false				--->传false
*/
function getChilds(obj,type){
	// 判断获取的是什么类型的有意义子节点
	var type=type==undefined?true:type;
	
	// 获取指定父节点的所有的子节点
	var childs=obj.childNodes;
	
	// 定义一个空数组，用于存放有意义的子节点
	var arr=[];
	
	// 遍历所有获取到的子节点
	for(var i=0;i<childs.length;i++){
		
		// 判断获取的是什么类型的有意义子节点
		if(type==true){
			if(childs[i].nodeType==1){
				arr.push(childs[i]);
			}
		}else if(type==false){
			if(childs[i].nodeType==1||childs[i].nodeType==3&&!(/^\s+$/.test(childs[i].nodeValue))){
				arr.push(childs[i]);
			}
		}
	}
	return arr;
}

// 6.获取第一个子节点
function getFirst(obj,type){
	return getChilds(obj,type)[0];
}

// 7.获取最后一个子节点
function getLast(obj,type){
	// 获取所有子节点的长度,用于定义最后一个子节点的下标
	var length=getChilds(obj,type).length;
	return getChilds(obj,type)[length-1];
}

// 8.获取随机子节点
function randomChild(obj,type,num){
	return getChilds(obj,type)[num];
}

// 9.获取下一个兄弟节点(元素节点或非空文本节点)
function getNext(obj){
	// 获取指定对象的下一个兄弟节点
	var next=obj.nextSibling;

	// 判断next是否存在
	if(next==null){
		return next;
	}

	// 当下一个兄弟节点是注释节点或空文本时继续获取下一个兄弟节点
	while(next.nodeType==8||next.nodeType==3&&(/^\s+$/.test(next.nodeValue))){
		// 更新next
		next=next.nextSibling;

		// 每次更新完再判断一次next是否存在
		if(next==null){
			return false;
		}
	}
	return next;		//最后返回next
}

// 10.获取上一个兄弟节点(元素节点或非空文本节点)
function getPrev(obj){
	// 获取指定元素的上一个兄弟节点
	var prev=obj.previousSibling;

	// 判断是否有上一个兄弟节点
	if(prev==null){
		return false;
	}

	// 当上一个兄弟节点是注释节点或空文本时继续获取上一个兄弟节点
	while(prev.nodeType==8||prev.nodeType==3&&(/^\s+$/.test(prev.nodeValue))){
		// 更新prev
		prev=prev.previousSibling;

		// 每次更新完再判断一次是否有上一个兄弟节点
		if(prev==null){
			return false;
		}
	}
	return prev;		//最后返回prev
}

// 11.插入到父元素中某个子节点之前
function insertBefore(obj,before){
	// obj--->要插的对象
	// before--->被插的对象
	// 获取父元素
	var parent=before.parentNode;
	parent.insertBefore(obj,before);
}

// 12.插入到父元素中某个子节点之后
function insertAfter(obj,after){
	// obj--->要插的对象
	// after--->被插的对象

	// 获取被插子节点的下一个兄弟节点
	var next=getNext(after);

	// 获取被插对象的父元素
	var parent=after.parentNode;

	// 判断被插的子节点是否有下一个兄弟节点
	// 有就插到下一个兄弟节点之前
	// 没有就追加到父元素的最后
	if(next){
		insertBefore(obj,next);
	}else{
		parent.appendChild(obj);
	}
}

// 13.插入到父元素的最前面(即父元素中第一个子节点之前)
function appendBefore(obj,parent){
	// 获取父元素的第一个子节点
	var first=getFirst(parent);

	// 判断父元素是否有子节点
	// 有就插入到父元素的第一个子节点之前
	// 没有就追加到父元素中

	if(first){
		insertBefore(obj,first);
	}else{
		parent.appendChild(obj);
	}
}