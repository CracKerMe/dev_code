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
   Yours Sincerely AppleSun

(二)、 waitting...


