# dev_code
# 基于业务代码的功能性抽离，非原创轮子 

基于小业务的一些基础功能性代码
<!--more-->


(一)、网页中 点击复制到剪贴板 功能 实现

1. IE有一个 window.clipboardData接口设置复制内容,考虑兼容性即可
2. 最早尝试的是 使用execCommand;
<pre>
    function jsCopy(){  
        var e=document.getElementById("target-dom");//获取目标dom  
        e.select(); //选择对象  
        document.execCommand("Copy"); //执行浏览器复制命令  
        alert("复制成功");  
    }
</pre>
在 Chrome 60版本并没有生效，直接pass掉

1. clipboard.min.js
   与其在原生js 一棵树上吊死，不如考虑 jQuery(老夫上去就是一把jQuery)的一些插件啊
   对着 文档一顿操作，初始化插件，需要的地方 布置 data-clipboard-action="copy" data-clipboard-target 然而在我调试的时间内 ，我并未完成 点击复制多个内容 遂放弃 兼容性并未测试，不过 根据官方提供的是Chrome 42+、Firefox 41+、IE 9+、Opera 29+ 并不满足我的需求
2. 继续 尝试新的姿势
   博客园等给我的推荐 zeroClipboard 这款插件，看到 flash 止步。毕竟flash这货儿 我不熟，而且逐渐被主流浏览器遗弃，为他默哀一秒，好 时间到
3. How to resolve this FXXking question
   模拟一个看不见的textarea，获取里面预设的内容信息。show you the code
   <pre>
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
   </pre>
   
   完美解决我的需求
   
(二)、 读写localStorage
<pre>
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
</pre>


(三)、 关于随机数
<pre>
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
</pre>

(四)、 移动端比较好用的 reset.css

亮点在于 设计稿除以40px 等于 对应的 rem 布局,实际表现良好
<pre>
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
</pre>


(五)、 waitting...





Yours Sincerely AppleSun
