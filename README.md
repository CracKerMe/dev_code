## 基于小业务的一些基础功能性代码



#### (一)、网页中 点击复制到剪贴板 功能 实现

1. IE有一个 `window.clipboardData`接口设置复制内容,考虑兼容性即可
2. 最早尝试的是 使用execCommand;

```javascript
function jsCopy(){  
    var e=document.getElementById("target-dom");//获取目标dom  
    e.select(); //选择对象  
    document.execCommand("Copy"); //执行浏览器复制命令  
    alert("复制成功");  
}
```

在 Chrome 60版本并没有生效，直接pass掉

1. clipboard.min.js

   与其在原生js 一棵树上吊死，不如考虑 jQuery(老夫上去就是一把jQuery)的一些插件啊

   对着 文档一顿操作，初始化插件，需要的地方 布置 __data-clipboard-action="copy" data-clipboard-target__ 然而在我调试的时间内 ，我并未完成 点击复制多个内容 遂放弃 兼容性并未测试，不过 根据官方提供的是Chrome 42+、Firefox 41+、IE 9+、Opera 29+ 并不满足我的需求

2. 继续 尝试新的姿势

   博客园等给我的推荐 zeroClipboard 这款插件，看到 flash 止步。毕竟flash这货儿 我不熟，而且逐渐被主流浏览器遗弃，为他默哀一秒，好 时间到

3. How to resolve this FXXking question

   模拟一个看不见的textarea，获取里面预设的内容信息。show you the code

   ```javascript
   function copyTextToClipboard(value) {
       var textArea = document.createElement("textarea");
       textArea.style.background = 'transparent';//尽量不让用户感知
       textArea.value = value;
       document.body.appendChild(textArea);
       textArea.select();
       try {
         var successful = document.execCommand('copy');
         var msg = successful ? 'successful' : 'unsuccessful';
         console.log(msg);//
       } catch (err) {
         console.log('Oops, unable to copy');
       }
       document.body.removeChild(textArea);//去除textarea 容器
     }
   ```

   完美解决我的需求

#### (二)、 读写localStorage

```javascript
function writeClientStorage(key,val){
   localStorage.setItem(key, JSON.stringify(val));
}
function readClientStorage(key){
    var readValue = localStorage.getItem(key);
    if(readValue=='undefined' || readValue == null){
        return null;
    }else{
        return JSON.parse(readValue);
    }
}
```



#### (三)、 关于随机数

```javascript
//获取不同的随机数
function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

// 拟定sort排序规则
function sequence(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1
    } else {
        return 0;
    }
}
// 
```

#### (四)、 移动端比较好用的 reset.css

亮点在于 设计稿除以40px 等于 对应的 rem 布局,实际表现良好

```css
body,html{height:100%; user-select:none;}
html{font-size: 100% !important;}
body{-webkit-overflow-scrolling: touch;background:#fafafa;}
*{margin:0; padding:0;-webkit-tap-highlight-color:rgba(0,0,0,0);
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form, fieldset,input,textarea,p,blockquote,th,td{margin:0; padding:0; }
body, div, ul, li, h1, h2, h3, h4, h5, h6,  input, button, p, a, i {margin:0; padding:0; font-family:PingFang-SC-Regular,sans-serif; font-weight:normal; font-style:normal;}
ul,li {list-style:none }
h1,h2,h3,h4,h5,h6{font-weight:normal;}
table{border-collapse:collapse }
img{width:100%; height:auto; display:block; overflow:hidden; border:0; }
select, input{vertical-align:middle; _vertical-align:baseline; outline:none;}
a{text-decoration:none; outline:0; cursor:pointer; outline:none;}
a:active{text-decoration:none;opacity: 0.5;}
a:visited{text-decoration:none;opacity: 0.5;}
input[type="reset"]::-moz-focus-inner, 
input[type="button"]::-moz-focus-inner, 
input[type="submit"]::-moz-focus-inner, 
input[type="file"]>input[type="button"]::-moz-focus-inner {border:0 none ;padding:0; appearance:none; -moz-appearance:none; -webkit-appearance:none;}
input[type="button"], input[type="submit"], input[type="reset"] {-webkit-appearance:none;}
textarea{-webkit-appearance:none;resize:none; outline:none;} 
@media only screen and (min-width: 351px) {
	html {font-size:125%!important/*换算比例：设计稿尺寸除以40所得尺寸即为页面实际尺寸*/}
}
.clear{clear:both; font-size:0; height:0; overflow:hidden }
.clearfix{zoom:1 }
.clearfix:after{content:"."; display:block; height:0; clear:both; visibility:hidden }
::-webkit-scrollbar{width:0px;height: 0px;}/*滚动条*/
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  color:rgba(255,255,255,1);}
::-moz-placeholder { /* Mozilla Firefox 19+ */  color:rgba(255,255,255,1);}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder{color:rgba(255,255,255,1)}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder{color:rgba(255,255,255,1);}
```



#### (五)、 多组数据随机取几组数据

```javascript
/*
* 传入 数组，传入 最终需要 随机的 长度，返回 新的 数组
* like 6组数据 需要 随机 2组数据
* @arr： 被处理数组
* @res_len：最终返回 的 随机新数组的长度 
*/
function get_random_res_arr_with_length(arr,res_len) {
	var res_arr = [];
	var length = arr.length;
	var arr_with_num = new Array(length);
	for(var i = 0; i<length; i++){
		arr_with_num[i] = i;
	};
	var random_pause_num_arr = getArrayItems(arr_with_num, res_len);
	for (var i = 0; i < random_pause_num_arr.length; i++) {
		var index = random_pause_num_arr[i];
		res_arr.push(arr[index]);
	}
	return res_arr
}
// 根据数字数组，获取 不相同的随机数 的 下标，返回新数组
function getArrayItems(arr, num) {
	var temp_array = [];
	for (var index in arr) {
		temp_array.push(arr[index]);
	}
	var return_array = [];
	for (var i = 0; i<num; i++) {
		if (temp_array.length>0) {
			var arrIndex = Math.floor(Math.random()*temp_array.length);
			return_array[i] = temp_array[arrIndex];
			temp_array.splice(arrIndex, 1);
		} else {
			break;
		}
	}
	return return_array;
}
```



#### (六)、 时间比较（time Differ）

```javascript
// 处理/比较 时间戳
function get_timestamp_diff(timestamps){
  var result = '';

  var minute = 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;

  var now = (new Date()).getTime()/1000;
  var distance = now-timestamps;
  if(distance<0){return;}
  var monthC = distance/month;
  var weekC = distance/(7*day);
  var dayC = distance/day;
  var hourC = distance/hour;
  var minC = distance/minute;
  if(monthC>=1){
    result = parseInt(monthC)+'月前';
  }else if(weekC>=1){
    result = parseInt(weekC)+'周前';
  }else if(dayC>=1){
    result = parseInt(dayC)+'天前';
  }else if(hourC>=1){
    result = parseInt(hourC)+'小时前';
  }else if(minC>=1){
    result = parseInt(minC)+'分钟前';
  }else{
    result = '刚刚';
  }
  return result
}
```



#### (七)、 洗牌算法，随机排序 非常好用

```javascript
// 洗牌算法 -- MadeBy SunPing
function shuffle(arr){
    var result = [],
        random;
    while(arr.length>0){
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random])
        arr.splice(random, 1)
    }
    return result;
}
```



__Yours Sincerely AppleSun__