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



#### (八)、 Bae64

```javascript
var Base64 = {
	_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	encode: function(e) {
		var t = "";
		var n, r, i, s, o, u, a;
		var f = 0;
		e = Base64._utf8_encode(e);
		while (f < e.length) {
			n = e.charCodeAt(f++);
			r = e.charCodeAt(f++);
			i = e.charCodeAt(f++);
			s = n >> 2;
			o = (n & 3) << 4 | r >> 4;
			u = (r & 15) << 2 | i >> 6;
			a = i & 63;
			if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
		}
		return t
	},
	decode: function(e) {
		var t = "";
		var n, r, i;
		var s, o, u, a;
		var f = 0;
		e = e.replace(/[^A-Za-z0-9+/=]/g, "");
		while (f < e.length) {
			s = this._keyStr.indexOf(e.charAt(f++));
			o = this._keyStr.indexOf(e.charAt(f++));
			u = this._keyStr.indexOf(e.charAt(f++));
			a = this._keyStr.indexOf(e.charAt(f++));
			n = s << 2 | o >> 4;
			r = (o & 15) << 4 | u >> 2;
			i = (u & 3) << 6 | a;
			t = t + String.fromCharCode(n);
			if (u != 64) { t = t + String.fromCharCode(r) }
			if (a != 64) { t = t + String.fromCharCode(i) }
		}
		t = Base64._utf8_decode(t);
		return t
	},
	_utf8_encode: function(e) {
		e = e.replace(/rn/g, "n");
		var t = "";
		for (var n = 0; n < e.length; n++) {
			var r = e.charCodeAt(n);
			if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) {
				t += String.fromCharCode(r >> 6 | 192);
				t += String.fromCharCode(r & 63 | 128)
			} else {
				t += String.fromCharCode(r >> 12 | 224);
				t += String.fromCharCode(r >> 6 & 63 | 128);
				t += String.fromCharCode(r & 63 | 128)
			}
		}
		return t
	},
	_utf8_decode: function(e) {
		var t = "";
		var n = 0;
		var r = c1 = c2 = 0;
		while (n < e.length) {
			r = e.charCodeAt(n);
			if (r < 128) {
				t += String.fromCharCode(r);
				n++
			} else if (r > 191 && r < 224) {
				c2 = e.charCodeAt(n + 1);
				t += String.fromCharCode((r & 31) << 6 | c2 & 63);
				n += 2
			} else {
				c2 = e.charCodeAt(n + 1);
				c3 = e.charCodeAt(n + 2);
				t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
				n += 3
			}
		}
		return t
	}
}
```

#### （九）cookie

```javascript
var GetCookie = {
	get: function(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) return unescape(arr[2]);
		else return '';
	}
}

var SetCookie = {
	set: function(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	}
}
```



#### （十）对象合并的 Polyfill 写法(Object.assign)


```javascript
if (!Object.assign) {
  Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      "use strict";
      if (target === undefined || target === null)
        throw new TypeError("Cannot convert first argument to object");
      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) continue;
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
        }
      }
      return to;
    }
  });
```

#### （十一）获取` yy-MM-dd hh:mm:ss` 的标准时间格式
- 小程序版本 获取` yy-MM-dd hh:mm:ss` 的标准时间格式

```
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

```

- 原生js 获取` yy-MM-dd hh:mm:ss` 的标准时间格式


```
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
  }
  return fmt
}
```

#### （十二）获取url参数实例

```
> url参数符合规范要求(like ?a=1&b=2&c=3)
 function getQueryString(name) {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	const search = window.location.search.split('?')[1] || '';
	const r = search.match(reg) || [];
	return r[2];
}
> url参数不符合规范要求(like ?a=1&b=2?c=3)
function GetParams(temp, name) {
    var theRequest = new Object();
    var strs = temp.split("&");
    for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
    }
    // 获取 参数对象的指定key 的 value值
    var result = theRequest[name] || null;
    return result;
}
function getQueryString(name) {
    // 获取当前 URL参数集
    var r = decodeURI(window.location.search);
    var arr1 = r.split("?");
    arr1.shift();
    var params = arr1.join("&");
    var res = GetParams(params, name);
    return res;
}
```
```
function downloadFile(fileName, content) {

	var aLink = document.createElement('a');

	var blob = base64Img2Blob(content);

	var evt = document.createEvent("MouseEvents");

	evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错

	aLink.download = fileName;

	aLink.href = URL.createObjectURL(blob);

	aLink.dispatchEvent(evt);

}

```
#### （十三）掘金式复制拦截


```javascript
document.body.oncopy = event => {
  event.preventDefault(); // 取消默认的复制事件 
  let textFont, copyFont = window.getSelection(0).toString(); // 被复制的文字 等下插入
  // 超过一定长度的文字 就添加版权信息
  if (copyFont.length > 10) {
    textFont = copyFont + '\n'
    + '作者：AppleSun\n'
    + '链接：'+ window.location.href +'\n'
    + '来源：博客\n'
    + '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。';
  } else {
    textFont = copyFont; // 没超过十个字 则采用被复制的内容。
  }
  if (event.clipboardData) {
    return event.clipboardData.setData('text', textFont); // 将信息写入粘贴板
  } else {
    // 兼容IE
    return window.clipboardData.setData("text", textFont);
  }
}
```



__Yours Sincerely AppleSun__
