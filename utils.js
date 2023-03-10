export const ua = navigator.userAgent.toLowerCase();
// 是否是IE浏览器
export const isIe = () => {
  return ua.indexOf("MSIE") >= 0 ? true : false;
};
// 是否是微信浏览器
export const isWeiXin = () => {
  return ua.match(/microMessenger/i) == "micromessenger";
};
// 是否是移动端
export const isMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
};
// 是否是QQ浏览器
export const isQQBrowser = () => {
  return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i);
};
// 是否是爬虫
export const isSpider = () => {
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(
    ua
  );
};
export const isEmail = (t) => {
  return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(t);
}
export const isAlipay = () => {
  return -1 !== ua.indexOf("alipay");
}
// export const copyTextToClipboard = (t, e) => {
//   let n = document.querySelector("#copy-input");
//   n ||
//     ((n = document.createElement("input")),
//     (n.id = "copy-input"),
//     (n.readOnly = "readOnly"),
//     (n.style.position = "fixed"),
//     (n.style.left = "-1000px"),
//     (n.style.zIndex = "-1000"),
//     document.body.appendChild(n)),
//     (n.value = t),
//     (function (t, e, n) {
//       if (t.createTextRange) {
//         const o = t.createTextRange();
//         o.collapse(!0),
//           o.moveStart("character", e),
//           o.moveEnd("character", n - e),
//           o.select();
//       } else t.setSelectionRange(e, n), t.focus();
//     })(n, 0, t.length);
//   try {
//     document.execCommand("copy");
//     e && e();
//   } catch (t) {
//     console.log("Oops, unable to copy");
//   }
// }
export const isHtmlXss = (t) => {
  return t.match(/<[^>]+>/g);
}
// 去除html标签
export const removeHtmltag = (str) => {
  return str.replace(/<[^>]+>/g, "");
};
// 获取url参数
export const getQueryString = (name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const search = window.location.search.split("?")[1] || "";
  const r = search.match(reg) || [];
  return r[2];
};
// 生成uuid
export const uuid = (len) => {
  let chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  let uuid = [],
    i;
  let radix = 16;
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
};
// 动态引入js
export const injectScript = (src) => {
  const s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = src;
  const t = document.getElementsByTagName("script")[0];
  t.parentNode.insertBefore(s, t);
};
// 根据url地址下载
export const download = (url) => {
  var isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
  var isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;
  if (isChrome || isSafari) {
    var link = document.createElement("a");
    link.href = url;
    if (link.download !== undefined) {
      var fileName = url.substring(url.lastIndexOf("/") + 1, url.length);
      link.download = fileName;
    }
    if (document.createEvent) {
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf("?") === -1) {
    url += "?download";
  }
  window.open(url, "_self");
  return true;
};
// el是否包含某个class
export const hasClass = (el, className) => {
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
  return reg.test(el.className);
};
// el添加某个class
export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(" ");
  newClass.push(className);
  el.className = newClass.join(" ");
};
// el去除某个class
export const removeClass = (el, className) => {
  if (!hasClass(el, className)) {
    return;
  }
  let reg = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
  el.className = el.className.replace(reg, " ");
};
// 获取滚动的坐标
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});
// 滚动到顶部
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};
// el是否在视口范围内
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
// 洗牌算法随机
export const shuffle = (arr) => {
  var result = [],
    random;
  while (arr.length > 0) {
    random = Math.floor(Math.random() * arr.length);
    result.push(arr[random]);
    arr.splice(random, 1);
  }
  return result;
};
// 劫持粘贴板
export const copyTextToClipboard = (value) => {
  var textArea = document.createElement("textarea");
  textArea.style.background = "transparent";
  textArea.value = value;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand("copy");
  } catch (err) {
    console.log("Oops, unable to copy");
  }
  document.body.removeChild(textArea);
};
// 阻止默认事件
export const stopDefault = (e) => {
	//阻止默认浏览器动作(W3C)
	if (e && e.preventDefault) {
		//火狐的 事件是传进来的e
		e.preventDefault();
	}
	//IE中阻止函数器默认动作的方式
	else {
		//ie 用的是默认的event
		event.returnValue = false;
	}
}
// 其他参考 http://static.699pic.com/js/utils.v1.js
/**
 * 将 new Date() 或者时间戳(秒或者 毫秒都可以) 格式化
 * 
 * @param {*} time new Date() 或者 1590131660 或者 1548221490638 
 * @param {*} cFormat 形如 '{y}年{m}月{d}日 {h}:{i} 周{a}'
 * @returns @String
 */
export const parseTimeFn = (time, cFormat) => {
  if (arguments.length === 0 || !time) {
    return null
  }
  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  var date = ''
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if (time.length === 10) { time = time * 1000 }
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  var time_str = format.replace(/{([ymdhisa])+}/g, function (result, key) {
    var value = formatObj[key]
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return paddingLeftZero(value.toString())
  })
  return time_str
}
