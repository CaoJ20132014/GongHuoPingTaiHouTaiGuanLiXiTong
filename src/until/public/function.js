/** 
 * 清除左空格
 * @param {s} string
 */
export function ltrim(s) {
    return s.replace(/^(\s*| *)/g, '');
};
/** 
 * 清除右空格
 * @param {s} string
 */
export function rtrim(s) {
    return s.replace(/(\s*| *)$/g, '');
};
/** 
 * 转义html标签
 * @param {text} string
 */
export function HtmlEncode(text) {
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
};
/** 
 * 时间日期格式转换
 * @param {time} 时间对象
 * @param {formatStr} 时间格式 'YYYY-MM-DD hh:mm:ss w'
 */
export function Format(time, formatStr) {
    let str = formatStr;
    let Week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    str = str.replace(/yyyy|YYYY/, time.getFullYear());
    str = str.replace(/yy|YY/, (time.getYear() % 100) > 9 ? (time.getYear() % 100).toString() : '0' + (time.getYear() % 100));
    str = str.replace(/MM/, (time.getMonth() + 1) > 9 ? (time.getMonth() + 1).toString() : '0' + (time.getMonth() + 1));
    str = str.replace(/M/g, (time.getMonth() + 1));
    str = str.replace(/w|W/g, Week[time.getDay()]);
    str = str.replace(/dd|DD/, time.getDate() > 9 ? time.getDate().toString() : '0' + time.getDate());
    str = str.replace(/d|D/g, time.getDate());
    str = str.replace(/hh|HH/, time.getHours() > 9 ? time.getHours().toString() : '0' + time.getHours());
    str = str.replace(/h|H/g, time.getHours());
    str = str.replace(/mm/, time.getMinutes() > 9 ? time.getMinutes().toString() : '0' + time.getMinutes());
    str = str.replace(/m/g, time.getMinutes());
    str = str.replace(/ss|SS/, time.getSeconds() > 9 ? time.getSeconds().toString() : '0' + time.getSeconds());
    str = str.replace(/s|S/g, time.getSeconds());
    return str;
};
/** 
 * 判断是否为数字类型
 * @param {value} 要判断的量
 */
export function isDigit(value) {
    let patrn = /^[0-9]*$/;
    if (patrn.exec(value) == null || value == '') {
        return false;
    } else {
        return true;
    }
};
/** 
 * 加载样式文件
 * @param {url} 路径
 */
export function LoadStyle(url) {
    try {
        document.createStyleSheet(url);
    } catch (e) {
        let cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(cssLink);
    }
};
// 返回脚本内容  
export function evalscript(s) {
    if (s.indexOf('<script') == -1) return s;
    let p = /<script[^\>]*?>([^\x00]*?)<\/script>/ig;
    let arr = [];
    while (arr = p.exec(s)) {
        let p1 = /<script[^\>]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\/script>/i;
        let arr1 = [];
        arr1 = p1.exec(arr[0]);
        if (arr1) {
            appendscript(arr1[1], '', arr1[2], arr1[3]);
        } else {
            p1 = /<script(.*?)>([^\x00]+?)<\/script>/i;
            arr1 = p1.exec(arr[0]);
            appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);
        }
    }
    return s;
};
// 清除脚本内容  
export function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
};
// 动态加载脚本文件  
export function appendscript(src, text, reload, charset) {
    let id = hash(src + text);
    if (!reload && in_array(id, evalscripts)) return;
    if (reload && $(id)) {
        $(id).parentNode.removeChild($(id));
    }
    evalscripts.push(id);
    let scriptNode = document.createElement("script");
    scriptNode.type = "text/javascript";
    scriptNode.id = id;
    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);
    try {
        if (src) {
            scriptNode.src = src;
            scriptNode.onloadDone = false;
            scriptNode.onload = function () {
                scriptNode.onloadDone = true;
                JSLOADED[src] = 1;
            };
            scriptNode.onreadystatechange = function () {
                if ((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {
                    scriptNode.onloadDone = true;
                    JSLOADED[src] = 1;
                }
            };
        } else if (text) {
            scriptNode.text = text;
        }
        document.getElementsByTagName('head')[0].appendChild(scriptNode);
    } catch (e) { }
};
// 返回按ID检索的元素对象  
export function $(id) {
    return !id ? null : document.getElementById(id);
};
// 跨浏览器绑定事件  
export function addEvent(obj, evt, fn) {
    if (!obj) { return; }
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evt, fn);
    } else {
        obj["on" + evt] = fn;
    }
};
// 跨浏览器删除事件  
export function removeEvent(obj, evt, fn) {
    if (!obj) { return; }
    if (obj.removeEventListener) {
        obj.removeEventListener(evt, fn, false);
    } else if (oTarget.detachEvent) {
        obj.detachEvent("on" + evt, fn);
    } else {
        obj["on" + evt] = null;
    }
};
// getElementsByClassName  
export function getElementsByClassName(name) {
    let tags = document.getElementsByTagName('*') || document.all;
    let ele = [];
    for (let i = 0; i < tags.length; i++) {
        if (tags.className) {
            let temp = tags.className.split(' ');
            for (let j = 0; j < temp.length; j++) {
                if (name == temp[j]) {
                    ele.push(tags);
                    break;
                }
            }
        }
    }
    return ele;
};
// 获取页面高度  
export function getPageHeight() {
    let doc = document;
    let db = doc.body;
    let de = doc.documentElement;
    let dc = doc.compatMode == "BackCompat" ? bd : de;
    return Math.max(de.scrollHeight, db.scrollHeight, dc.clientHeight);
};
// 获取页面宽度  
export function getPageWidth() {
    let doc = document;
    let db = doc.body;
    let de = doc.documentElement;
    let dc = doc.compatMode == "BackCompat" ? db : de;
    return Math.max(de.scrollWidth, db.scrollWidth, dc.clientWidth);
};
// 获取页面可视宽度  
export function getPageViewWidth() {
    let doc = document;
    let dc = doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
    return dc.clientWidth;
};
// 获取页面可视高度  
export function getPageViewHeight() {
    let doc = document;
    let dc = doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
    return dc.clientHeight;
};
// 获取页面scrollLeft  
export function getPageScrollLeft() {
    let doc = document;
    return doc.documentElement.scrollLeft || doc.body.scrollLeft;
};
// 获取页面scrollTop  
export function getPageScrollTop() {
    let doc = document;
    return doc.documentElement.scrollTop || doc.body.scrollTop;
};
// 随机数时间戳  
export function uniqueId() {
    let a = Math.random, b = parseInt;
    return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
};
/**
 * 时间个性化输出功能
 * 1、< 60s, 显示为“刚刚” 
 * 2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前” 
 * 3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX” 
 * 4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX” 
 * 5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX” 
 */
export function timeFormat(time) {
    let date = new Date(time),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        curDate = new Date(),
        curYear = curDate.getFullYear(),
        curHour = curDate.getHours(),
        timeStr = '';
    if (year < curYear) {
        timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
    } else {
        let pastTime = curDate - date;
        let pastH = pastTime / (1000 * 60 * 60);
        if (pastH > curHour) {
            timeStr = month + '月' + day + '日 ' + hour + ':' + minute;
        } else if (pastH >= 1) {
            timeStr = '今天 ' + hour + ':' + minute + '分';
        } else {
            let pastM = curDate.getMinutes() - minute;
            if (pastM > 1) {
                timeStr = pastM + '分钟前';
            } else {
                timeStr = '刚刚';
            }
        }
    }
    return timeStr;
};
// 返回顶部的通用方法  
export function backTop(btnId) {
    let btn = document.getElementById(btnId);
    let d = document.documentElement;
    let b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function () {
        btn.style.display = "none";
        window.onscroll = null;
        time.timer = setInterval(function () {
            d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
            if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
        }, 10);
    };
    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none"
    }
};
// 获得URL中GET参数值  
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]  
export function get_get() {
    querystr = window.location.href.split("?")
    if (querystr[1]) {
        GETs = querystr[1].split("&");
        GET = [];
        for (i = 0; i < GETs.length; i++) {
            tmp_arr = GETs.split("=")
            key = tmp_arr[0]
            GET[key] = tmp_arr[1]
        }
    }
    return querystr[1];
};
// 按字母排序，对每行进行数组排序  
export function SetSort() {
    let text = K1.value.split(/[\r\n]/).sort().join("\r\n");//顺序  
    let test = K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//反序  
    K1.value = K1.value != text ? text : test;
};
// 字符串反序  
export function IsReverse(text) {
    return text.split('').reverse().join('');
};
// 清除html代码中的脚本
export function clear_script() {
    K1.value = K1.value.replace(/<script.*?>[\s\S]*?<\/script>|\s+on[a-zA-Z]{3,16}\s?=\s?"[\s\S]*?"|\s+on[a-zA-Z]{3,16}\s?=\s?'[\s\S]*?'|\s+on[a-zA-Z]{3,16}\s?=[^ >]+/ig, "");
};
// 动态执行JavaScript脚本
export function javascript() {
    try {
        eval(K1.value);
    } catch (e) {
        alert(e.message);
    }
};
/**
 * 金额大写转换函数
 * @param {tranvalue} 例如：'98765432122.98'
 */
export function transform(tranvalue) {
    let str = "";
    if (eval(tranvalue) > 0) {
        let i = 1;
        let dw2 = new Array("", "万", "亿"); //大单位  
        let dw1 = new Array("拾", "佰", "仟"); //小单位  
        let dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用  
        //以下是小写转换成大写显示在合计大写的文本框中       
        //分离整数与小数  
        let source = splits(tranvalue);
        let num = source[0];
        let dig = source[1];
        //转换整数部分  
        let k1 = 0; //计小单位  
        let k2 = 0; //计大单位  
        let sum = 0;
        let len = source[0].length; //整数的长度  
        for (i = 1; i <= len; i++) {
            let n = source[0].charAt(len - i); //取得某个位数上的数字  
            let bn = 0;
            if (len - i - 1 >= 0) {
                bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字  
            }
            sum = sum + Number(n);
            if (sum != 0) {
                str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面  
                if (n == '0') sum = 0;
            }
            if (len - i - 1 >= 0) { //在数字范围内  
                if (k1 != 3) { //加小单位  
                    if (bn != 0) {
                        str = dw1[k1].concat(str);
                    }
                    k1++;
                } else { //不加小单位，加大单位  
                    k1 = 0;
                    let temp = str.charAt(0);
                    if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位  
                        str = str.substr(1, str.length - 1);
                    str = dw2[k2].concat(str);
                    sum = 0;
                }
            }
            if (k1 == 3) { //小单位到千则大单位进一  
                k2++;
            }
        }
        //转换小数部分  
        let strdig = "";
        if (dig != "") {
            let n1 = dig.charAt(0);
            if (n1 != 0) {
                strdig += dw[Number(n1)] + "角"; //加数字  
            }
            let n2 = dig.charAt(1);
            if (n2 != 0) {
                strdig += dw[Number(n2)] + "分"; //加数字  
            }
        }
        str += "元" + strdig;
    } else {
        return "0元";
    }
    return str;
};
//拆分整数与小数
export function splits(tranvalue) {
    let value = new Array('', '');
    let temp = tranvalue.split(".");
    for (let i = 0; i < temp.length; i++) {
        value = temp;
    }
    return value;
};
// 实现base64解码
export function base64_decode(data) {
    let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
    if (!data) { return data; }
    data += '';
    do {
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    dec = utf8_decode(dec);
    return dec;
};
//实现utf8解码
export function utf8_decode(str_data) {
    let tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0; str_data += '';
    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join('');
};
//获取窗体可见范围的宽与高  
export function getViewSize() {
    let de = document.documentElement;
    let db = document.body;
    let viewW = de.clientWidth == 0 ? db.clientWidth : de.clientWidth;
    let viewH = de.clientHeight == 0 ? db.clientHeight : de.clientHeight;
    return Array(viewW, viewH);
};
// 判断是否移动设备访问  
export function isMobileUserAgent() {
    return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
};
// 判断是否苹果移动设备访问  
export function isAppleMobileDevice() {
    return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
};
// 判断是否安卓移动设备访问  
export function isAndroidMobileDevice() {
    return (/android/i.test(navigator.userAgent.toLowerCase()));
};
// 判断是否Touch屏幕  
export function isTouchScreen() {
    return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
};
// 正整数  
export function isPositiveInt(s) {
    let reg = /^[0-9]*[1-9][0-9]*$/;
    return reg.test(s);
};
// 负整数
export function isNegtiveInt(s) {
    let reg = /^-[0-9]*[1-9][0-9]*$/;
    return reg.test(s);
};
// 正浮点数
export function isPositveFloat(s) {
    let reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    return reg.test(s);
};
// 负浮点数
export function isNegtiveFloat(s) {
    let reg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
    return reg.test(s);
};
// 浮点数
export function isFloat(s) {
    let reg = /^(-?\d+)(\.\d+)?$/;
    return reg.test(s);
};
// email地址
export function isEmail(s) {
    let reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    return reg.test(s);
};
// url地址
export function isUrl(s) {
    let reg = /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;
    // let reg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;  
    return reg.test(s);
};
// 年/月/日（年-月-日、年.月.日）
export function isDate(s) {
    let reg = /^(19|20)\d\d[- \.](0[1-9]|1[012])[- \.](0[1-9]|[12][0-9]|3[01])$/;
    return reg.test(s);
};
//匹配中文字符
export function isChina(s) {
    let reg = /[\u4e00-\u9fa5]/;
    return reg.test(s);
};
// 匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线) 
export function isValid(s) {
    let reg = /^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
    return reg.test(s);
};
// 匹配空白行的正则表达式
export function isBlank(s) {
    let reg = /\n\s*\r/;
    return reg.test(s);
};
// 匹配中国邮政编码
export function isZipCode(s) {
    let reg = /[1-9]\d{5}(?!\d)/;
    return reg.test(s);
};
// 匹配身份证
export function isIdentityCard(s) {
    let reg = /\d{15}|\d{18}/;
    return reg.test(s);
};
// 匹配国内电话号码
export function isCivilTel(s) {
    let reg = /(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
    return reg.test(s);
};
// 匹配IP地址
export function isIp(s) {
    let reg = /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
    return reg.test(s);
};
// 匹配首尾空白字符的正则表达式
export function isLRBlank(s) {
    let reg = /^\s*|\s*$/;
    return reg.test(s);
};
// 匹配HTML标记的正则表达式
export function isHtml(s) {
    let reg = /< (\S*?)[^>]*>.*?|< .*? \/>/;
    return reg.test(s);
};
// sql 语句
export function isSql(s) {
    let reg = /^(select|drop|delete|create|update|insert).*$/;
    return reg.test(s);
};
// 提取信息中的网络链接
export function isGetNet(s) {
    let reg = /(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/;
    return reg.test(s);
};
// 提取信息中的邮件地址
export function isGetEmail(s) {
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(s);
};
// 提取信息中的图片链接
export function isGetImg(s) {
    let reg = /(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)?/;
    return reg.test(s);
};
// 提取信息中的 IP 地址
export function isGetIp(s) {
    let reg = /(\d+)\.(\d+)\.(\d+)\.(\d+)/;
    return reg.test(s);
};
// 取信息中的中国手机号码
export function isGetPhone(s) {
    let reg = /(86)*0*13\d{9}/;
    return reg.test(s);
};
// 提取信息中的中国邮政编码
export function isGetZipCode(s) {
    let reg = /[1-9]{1}(\d+){5}/;
    return reg.test(s);
};
// 提取信息中的浮点数（即小数）
export function isGetFloat(s) {
    let reg = /(-?\d*)\.?\d+/;
    return reg.test(s);
};
// 提取信息中的任何数字
export function isGetNum(s) {
    let reg = /(-?\d*)(\.\d+)?/;
    return reg.test(s);
};
// 电话区号
export function isGetAreaTel(s) {
    let reg = /^0\d{2,3}$/;
    return reg.test(s);
};
//帐号（字母开头，允许 5-16 字节，允许字母数字下划线）
export function isGetAccount(s) {
    let reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
    return reg.test(s);
};
//中文、英文、数字及下划线
export function isCommon(s) {
    let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
    return reg.test(s);
};
/*******************************************************************************************************************/
/** 
 * @desc 控制浏览器全屏
 * @param {element} 传document.documentElement
 */
export function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};
/** 
 * @desc 退出浏览器全屏
 */
export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
};
/** 
 * @desc 验证身份证号码
 */
export function isIdCard(idCard) {
    // 15位和18位身份证号码的正则表达式
    let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    // 如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            let idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 	// 将前17位加权因子保存在数组里
            let idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); 						// 这是除以11后，可能产生的11位余数、验证码，也保存成数组
            let idCardWiSum = 0; 	// 用来保存前17位各自乖以加权因子后的总和
            for (let i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            let idCardMod = idCardWiSum % 11; 			// 计算出校验码所在数组的位置
            let idCardLast = idCard.substring(17); 		// 得到最后一位身份证号码
            // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {	// 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
};
/** 
 * @desc 根据身份证号获得出生日期
 * @param {psidno} 身份证号 psidno
 * 返回值：出生日期
 */
export function GetBirthday(psidno) {
    let birthdayno,
        birthdaytemp;
    if (isIdCard(psidno)) {
        if (psidno.length == 18) {
            birthdayno = psidno.substring(6, 14);
        } else if (psidno.length == 15) {
            birthdaytemp = psidno.substring(6, 12);
            birthdayno = "19" + birthdaytemp;
        }
    } else {
        return "错误的身份证号码，请核对！";
    }
    let birthday = birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8);
    return birthday;
};
/** 
 * @desc 根据身份证号获得性别
 * @param {psidno} 身份证号 psidno
 * 返回值：性别 'F'：女，'M'：男
 */
export function Getsex(psidno) {
    let sexno,
        sex;
    if (isIdCard(psidno)) {
        if (psidno.length == 18) {
            sexno = psidno.substring(16, 17);
        } else if (psidno.length == 15) {
            sexno = psidno.substring(14, 15);
        }
    } else {
        return "错误的身份证号码，请核对！";
    }
    let tempid = sexno % 2;
    if (tempid == 0) {
        sex = 'F';
    } else {
        sex = 'M';
    }
    return sex;
};
/** 
 * @desc 根据身份证号获得年龄
 * @param {psidno} 身份证号 psidno
 * 返回值：年龄    数字
 */
export function GetAge(psidno) {
    let len = (psidno + "").length;
    if (len == 0) {
        return "错误的身份证号码，请核对！";
    } else {
        if ((len != 15) && (len != 18) && isIdCard(psidno)) {    //身份证号码只能为15位或18位其它不合法
            return "错误的身份证号码，请核对！";
        }
    }
    let strBirthday = "";
    if (len == 18) {     //处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = psidno.substr(6, 4) + "/" + psidno.substr(10, 2) + "/" + psidno.substr(12, 2);
    }
    if (len == 15) {    //处理15位的身份证号码从号码中得到生日和性别代码
        strBirthday = "19" + psidno.substr(6, 2) + "/" + psidno.substr(8, 2) + "/" + psidno.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    let birthDate = new Date(strBirthday);
    let nowDateTime = new Date();
    let age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
/** 
 * @desc 根据身份证号获得省份（含直辖市）、出生日期、性别
 * @param {code} 身份证号 code
 * 返回值：{Area: "", Birthday: "", Sex: ""}
 */
export function IdentityCodeValid(code) {
    code = code.replace(/^\s*|\s*$/g, "");
    let city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门" };
    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
        return "身份证号格式错误";
    }
    if (!city[code.substring(0, 2)]) {
        return "地址编码错误";
    }
    if (code.length == 18) {    //18位身份证需要验证最后一位校验位
        let codeArr = code.split('');
        let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];    //加权因子                
        let parity = [1, 0, 'x', 'X', 9, 8, 7, 6, 5, 4, 3, 2];                 //校验位
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += codeArr[i] * factor[i];
        }
        if (parity[sum % 11] != codeArr[17]) {
            return "身份证号格式错误";
        }
    }
    //省份
    let home = city[code.substring(0, 2)];
    //生日
    let birthday = code.substring(6, 10) + '年' + code.substring(10, 12) + '月' + code.substring(12, 14) + '日';
    //性别
    let sex;
    if (code.length == 15) {
        sex = code.substring(14, 15) % 2 == 0 ? '女' : '男';
    } else if (code.length == 18) {
        sex = code.substring(14, 17) % 2 == 0 ? '女' : '男';
    }
    return {
        Area: home,
        Birthday: birthday,
        Sex: sex
    }
};
/** 
 * @desc 判断当前日期是不是节假日
 */
export function HolidayAndVacations() {
    let calendar = new Date();
    let month = calendar.getMonth();
    let date = calendar.getDate();
    if ((month == 0) && (date == 1)) return ("元旦");
    if ((month == 1) && (date == 13)) return ("除夕");
    if ((month == 1) && (date == 14)) return ("春节/情人节");
    if ((month == 2) && (date == 1)) return ("国际海豹日");
    if ((month == 2) && (date == 8)) return ("国际劳动妇女节/中国保护母亲河日");
    if ((month == 2) && (date == 12)) return ("植树节");
    if ((month == 3) && (date == 1)) return ("愚人节");
    if ((month == 3) && (date == 5)) return ("清明节");
    if ((month == 4) && (date == 1)) return ("国际劳动节");
    if ((month == 4) && (date == 9)) return ("母亲节");
    if ((month == 5) && (date == 1)) return ("国际儿童节");
    if ((month == 5) && (date == 26)) return ("国际禁毒日");
    if ((month == 7) && (date == 1)) return ("建军节");
    if ((month == 7) && (date == 15)) return ("日本无条件投降日/世纪婚纱日");
    if ((month == 7) && (date == 16)) return ("七夕情人节");
    if ((month == 9) && (date == 20)) return ("世界厨师日");
    if ((month == 9) && (date == 22)) return ("世界传统医药日");
    if ((month == 9) && (date == 24)) return ("联合国日/世界发展信息日");
    if ((month == 9) && (date == 25)) return ("世界骨质疏松日/抗美援朝纪念日/环卫工人节");
    if ((month == 9) && (date == 31)) return ("世界勤俭日/中国男性健康日");
    if ((month == 11) && (date == 24)) return ("平安夜");
    if ((month == 11) && (date == 25)) return ("圣诞节");
    else return '今日无节日';
};
/** 
 * @desc 计算两个日期之间的工作日天数（含法定节假日在内）
 * @param {sDay} 起始时间
 * @param {eDay} 终止时间
 */
export function countWorkDay(sDay, eDay) {
    let s = stringToDate(sDay),
        e = stringToDate(eDay);
    let s_t_w = s.getDay(), e_t_w = e.getDay();
    //相差天数
    let diffDay = (e - s) / (1000 * 60 * 60 * 24) + 1;
    let diffWeekDay = diffDay - (s_t_w == 0 ? 0 : 7 - s_t_w) + e_t_w;
    //计算有几个完整的周
    let weeks = Math.floor(diffWeekDay / 7);
    if (weeks <= 0) { //在同一周内 即开始结束时间不可能同时为周天与周六（周天为一周第一天）
        return e_t_w - s_t_w + (s_t_w ? 1 : 0) + (e_t_w == 6 ? -1 : 0);
    } else {
        return weeks * 5 + (e_t_w == 6 ? 5 : e_t_w) + (s_t_w >= 1 && s_t_w <= 5 ? (6 - s_t_w) : 0);
    }
};
export function stringToDate(dateString) {
    dateString = dateString.split('-');
    return new Date(dateString[0], dateString[1] - 1, dateString[2]);
};
/** 
 * @desc 计算两个日期之间的休息日天数（不含法定节假日）
 * @param {dtStart} 起始时间
 * @param {dtEnd} 终止时间
 */
export function weekendBetween(dtStart, dtEnd) {
    if (typeof dtEnd == 'string') dtEnd = stringToDate(dtEnd);
    if (typeof dtStart == 'string') dtStart = stringToDate(dtStart);
    let days = parseInt((dtEnd - dtStart) / 86400000);
    let adds = 0;
    let m = (days + dtStart.getDay() + 1) % 7;
    if (m > 0) adds = m;
    if (m > 2) adds = 2;
    let redu = 0;
    if (dtStart.getDay() > 0) redu = 2;
    if (dtStart.getDay() == 1) redu = 1;
    let subtotal = parseInt((days + dtStart.getDay() + 1) / 7) * 2;
    return subtotal - redu + adds;
};
export function stringToDate(DateStr) {
    let converted = Date.parse(DateStr);
    let myDate = new Date(converted);
    if (isNaN(myDate)) {
        let arys = DateStr.split('-');
        myDate = new Date(arys[0], arys[1], arys[2]);
    }
    return myDate;
};
/** 
 * @desc 计算当前日期在当年是第几周
 */
export function theWeek() {
    let totalDays = 0,
        now = new Date(),
        years = now.getYear()
    if (years < 1000) years += 1900;
    let days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;
    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29;
    } else {
        days[1] = 28;
    }
    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();
    } else {
        let curMonth = now.getMonth();
        for (let count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    let week = Math.round(totalDays / 7);
    return week;
};
/** 
 * @desc 返回顶部
 */
export function scrollTop() {
    let timer = null;
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
            document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
            timer = requestAnimationFrame(fn);
        } else {
            cancelAnimationFrame(timer);
        }
    });
};
/** 
 * @desc 返回顶部
 */
export function scrollTo() {
    let timer = null;
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
            scrollTo(0, oTop - 50);
            timer = requestAnimationFrame(fn);
        } else {
            cancelAnimationFrame(timer);
        }
    });
};
/** 
 * @desc 返回顶部
 */
export function scrollBy() {
    let timer = null;
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(function fn() {
        let oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
            scrollBy(0, -50);
            timer = requestAnimationFrame(fn);
        } else {
            cancelAnimationFrame(timer);
        }
    });
};
/** 
 * @desc 字符串去除空格
 * @param {str} 需要去除空格的字符串
 * @param {type} {字符串} 1-所有空格  2-前后空格  3-前空格 4-后空格
 */
export function trimSpace(str, type) {
    switch (type) {
        case '1':
            return str.replace(/\s+/g, "");
        case '2':
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case '3':
            return str.replace(/(^\s*)/g, "");
        case '4':
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
};
/** 
 * @desc 字母大小写转换
 * @param {str} 需要转换的字符串
 * @param {type} {字符串} 1-首字母大写 2-首字母小写 3-大小写转换 4-全部大写 5-全部小写
 */
export function changeCase(str, type) {
    function ToggleCase(str) {
        let itemText = ""
        str.split("").forEach(
            function (item) {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
        return itemText;
    }
    switch (type) {
        case '1':
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
            });
        case '2':
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case '3':
            return ToggleCase(str);
        case '4':
            return str.toUpperCase();
        case '5':
            return str.toLowerCase();
        default:
            return str;
    }
};
/** 
 * @desc 正则验证
 * @param {str} 需要验证的字符串
 * @param {type} {字符串} 需要验证的类型
 */
export function checkType(str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'text':
            return /^\w+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
};
/** 
 * @desc 密码强度检测
 * @param {str} 需要检测的字符串
 * 返回 result：3(强度等级为3)      特殊字符：+-/*@#$^&*%`
 */
export function checkPwd(str) {
    let nowLv = 0;
    if (str.length < 6) return nowLv;
    if (/[0-9]/.test(str)) nowLv++;
    if (/[a-z]/.test(str)) nowLv++;
    if (/[A-Z]/.test(str)) nowLv++;
    if (/[\.|-]/.test(str)) nowLv++;
    if (/[_|@]/.test(str)) nowLv++;
    if (/[#|*]/.test(str)) nowLv++;
    if (/[&|^]/.test(str)) nowLv++;
    if (/[+|%]/.test(str)) nowLv++;
    if (/[$|`]/.test(str)) nowLv++;
    return nowLv;
};
/** 
 * @desc 格式化处理字符串
 * @param {str} 需要格式化处理的字符串
 * @param {size} 按照几个单位分割字符串
 * @param {delimiter} 需要添加进去的字符串
 */
export function formatText(str, size, delimiter) {
    let _size = size || 3,
        _delimiter = delimiter || ',';
    let regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    let reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
};
/** 
 * @desc 数组扁平化，将多维数组变成一维数组
 * @param {arr} 需要处理的数组
 */
export function steamroller(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // 如果是数组，调用(递归)steamroller 将其扁平化
            // 然后再 push 到 newArr 中
            newArr = newArr.concat(PublicMethod.steamroller(arr[i]));
        } else {
            // 不是数组直接 push 到 newArr 中
            newArr.push(arr[i]);
        }
    }
    return newArr;
};
/** 
 * @desc 获取终止时间到当前时间的天数
 * @param {endTime} 结束时间
 * getEndTime('2017/7/22 16:0:0')
 * result："剩余时间6天 2小时 28 分钟20 秒"
 */
export function getEndTime(endTime) {
    let startDate = new Date(); //开始时间，当前时间
    let endDate = new Date(endTime); //结束时间，需传入时间参数
    let t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    let d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
        return "剩余时间" + d + "天" + h + "小时" + m + "分钟" + s + "秒";
    } else {
        return '设置的结束时间应大于当前时间';
    }
};
/** 
 * @desc 清除对象中值为空的属性
 * @param {obj} 需要清除的对象
 * filterParams({a:"",b:null,c:"010",d:123})
 * result：{c: "010", d: 123}
 */
export function filterParams(obj) {
    let _newPar = {};
    for (let key in obj) {
        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
};
/** 
 * @desc 检测对象是否有某个类名
 * @param {obj} 需要检测的对象
 * @param {classStr} 检测是否拥有classStr属性
 */
export function hasClass(obj, classStr) {
    if (obj.className && this.trim(obj.className, 1) !== "") {
        let arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
        return (arr.indexOf(classStr) == -1) ? false : true;
    } else {
        return false;
    }
};
/** 
 * @desc 添加类名
 * @param {obj} 添加的对象
 * @param {classStr} 添加classStr属性
 */
export function addClass(obj, classStr) {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
        for (let i = 0, len = obj.length; i < len; i++) {
            if (!this.hasClass(obj[i], classStr)) {
                obj[i].className += " " + classStr;
            }
        }
    } else {
        if (!this.hasClass(obj, classStr)) {
            obj.className += " " + classStr;
        }
    }
};
/** 
 * @desc 删除类名
 * @param {obj} 删除的对象
 * @param {classStr} 删除classStr属性
 */
export function removeClass(obj, classStr) {
    if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
        for (let i = 0, len = obj.length; i < len; i++) {
            if (this.hasClass(obj[i], classStr)) {
                let reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                obj[i].className = obj[i].className.replace(reg, '');
            }
        }
    } else {
        if (this.hasClass(obj, classStr)) {
            let reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
            obj.className = obj.className.replace(reg, '');
        }
    }
};
/** 
 * @desc 替换类名
 * @param {obj} 需要替换对象
 * @param {newName} 被替换的类名
 * @param {oldName} 替换的类名
 */
export function replaceClass(obj, newName, oldName) {
    this.removeClass(obj, oldName);
    this.addClass(obj, newName);
};
/** 
 * @desc 设置样式
 * @param {obj} 需要蛇者样式的对象
 * @param {json} 设置的样式，键值对形式
 */
export function setStyle(obj, json) {
    for (let attr in json) {
        obj.style[attr] = json[attr];
    }
};
/** 
 * @desc 切换样式
 * @param {elem} 需要切换样式的对象
 * @param {classname} 类名
 */
export function toggleClass(elem, classname) {
    this.flag = false;
    let oldClass = elem.className;
    if (oldClass.indexOf(classname) != -1 && !flag) {
        flag = true;
        elem.className = elem.className.replace(" " + classname, "");
    } else {
        flag = false;
        elem.className = oldClass + " " + classname;
    }
};
/** 
 * @desc 关键字设置样式（多个关键词用空格隔开）
 * @param {str} 需要设置样式的对象
 * @param {key} 需要设置样式的关键字
 * @param {el} html标签名
 */
export function findKey(str, key, el) {
    let arr = null,
        regStr = null,
        content = null,
        Reg = null,
        _el = el || 'span';
    arr = key.split(/\s+/);
    regStr = this.createKeyExp(arr);
    content = str;
    Reg = new RegExp(regStr, "g");
    //过滤html标签 替换标签，往关键字前后加上标签
    content = content.replace(/<\/?[^>]*>/g, '')
    return content.replace(Reg, "<" + _el + ">$1</" + _el + ">");
};
/** 
 * @desc 手机系统类型判断
 * @param {android} 手机系统类型
 */
export function phoneBrowserInfo(type) {
    switch (type) {
        case 'android':
            return navigator.userAgent.toLowerCase().indexOf('android') !== -1;
        case 'iphone':
            return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
        case 'ipad':
            return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
        case 'weixin':
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
        default:
            return navigator.userAgent.toLowerCase();
    }
};
/** 
 * @desc 封装ajax函数
 * @param {string} obj.type http连接的方式，包括POST和GET两种方式
 * @param {string} obj.url 发送请求的url
 * @param {boolean} obj.async 是否为异步请求，true为异步的，false为同步的
 * @param {object} obj.data 发送的参数，格式为对象类型
 * @param {function} obj.success ajax发送并接收成功调用的回调函数
 * @param {function} obj.error ajax发送失败或者接收失败调用的回调函数
 */
export function Ajax(obj) {
    obj = obj || {};
    obj.type = obj.type.toUpperCase() || 'POST';
    obj.url = obj.url || '';
    obj.async = obj.async || true;
    obj.data = obj.data || null;
    obj.success = obj.success || function () { };
    obj.error = obj.error || function () { };
    let xmlHttp = null;
    if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    let params = [];
    for (let key in obj.data) {
        params.push(key + '=' + obj.data[key]);
    }
    let postData = params.join('&');
    if (obj.type.toUpperCase() === 'POST') {
        xmlHttp.open(obj.type, obj.url, obj.async);
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlHttp.send(postData);
    } else if (obj.type.toUpperCase() === 'GET') {
        xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
        xmlHttp.send(null);
    }
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            obj.success(xmlHttp.responseText);
        } else {
            obj.error(xmlHttp.responseText);
        }
    };
};
/** 
 * @desc 进制转换
 * @param {type} bit-二进制转十进制 oct-八进制转十进制 hex-十六进制转十进制
 * @param {value} number 需要转换的值
 */
export function hexTransform(type, value) {
    if (typeof value === "number") value += "";
    let scale = 0;
    let flag = false;
    if (type === "bit") {
        flag = /^[01]*$/g.test(value);
        scale = 2;
    } else if (type === "oct") {
        flag = /^[0-7]*$/g.test(value);
        scale = 8;
    } else if (type === "hex") {
        flag = /^[0-9a-fA-F]*$/g.test(value);
        scale = 16;
    }
    if (!flag || !value) return;
    let arr = value.split("");
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if (isNaN(parseInt(arr[i]))) {
            let charCode = arr[i].charCodeAt(0);
            if (charCode > 64 && charCode < 71) {
                result += (charCode - 55) * Math.pow(scale, arr.length - 1 - i);
            } else if (charCode > 96 && charCode < 103) {
                result += (charCode - 87) * Math.pow(scale, arr.length - 1 - i);
            }
        } else {
            result += arr[i] * Math.pow(scale, arr.length - 1 - i);
        }
    }
    return result;
};
/** 
 * @desc 进制互换乘法函数，用来得到精确的乘法结果
 * @param {num} number 待转换的进制数，如 110(二进制),26(八进制),10(十进制),AF(十六进制)
 * @param {from} number 源进制 2|8|10|16
 * @param {to} number 目标进制 2|8|10|16
 */
export function convert(num, from, to) {
    let pattern = /^(2|8|10|16){1}$/;
    if (!pattern.test(from) || !pattern.test(to)) {
        return '源进制from和目标进制to必须为2或8或10或16';
    }
    if (from == 10) {   // 如果源进制为十进制
        return parseInt(num).toString(to);
    }
    if (to == 10) {     // 如果目标进制是十进制
        return parseInt(num, from);
    }
    return parseInt(num, from).toString(to);    // 其他进制的转换
};
/** 
 * @desc 用来得到精确的乘法结果（因为两个浮点数相乘存在误差）
 * @param {arg1} 
 * @param {arg2} 
 */
export function Ride(arg1, arg2) {
    let m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { };
    try { m += s2.split(".")[1].length } catch (e) { };
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};
/** 
 * @desc 用来得到精确的除法结果（因为两个浮点数相除存在误差）
 * @param {arg1} 
 * @param {arg2} 
 */
export function Division(arg1, arg2) {
    let t1 = 0,
        t2 = 0,
        r1,
        r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { };
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { };
    while (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * Math.pow(10, t2 - t1);
    }
};
/** 
 * @desc 用来得到精确的加法结果（因为两个浮点数相加存在误差）
 * @param {arg1} 
 * @param {arg2} 
 */
export function Additive(arg1, arg2) {
    let r1,
        r2,
        m,
        c;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 };
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 };
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        let cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        }
        else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    }
    else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
};
/** 
 * @desc 用来得到精确的减法结果（因为两个浮点数相减存在误差）
 * @param {arg1} 
 * @param {arg2} 
 */
export function Reduce(arg1, arg2) {
    let r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 };
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 };
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;       //动态控制精度长度
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
/** 
 * @desc 实现数据的四舍五入法
 * @param {v} 需要四舍五入的数据
 * @param {x} 保留小数点后x位
 */
export function Rounding(v, x) {
    let isNegative = false;
    if (v < 0) {                //如果是负数
        isNegative = true;
        v = -v;
    }
    let IValue = 1;
    for (let i = 1; i <= x; i++) {
        IValue = IValue * 10;
    }
    let Int = Math.round(v * IValue, 0);
    v = Int / IValue;
    if (isNegative) {
        v = -v;
    }
    return v;
};
/** 
 * @desc 实现数据的向上取整
 * @param {v} 需要向上取整的数据
 * @param {x} 保留小数点后x位
 */
export function Ceiling(v, x) {
    let isNegative = false;
    if (v < 0) {    //如果是负数
        isNegative = true;
        v = -v;
    }
    let IValue = 1;
    for (let i = 1; i <= x; i++) {
        IValue = IValue * 10;
    }
    let Int = Math.ceil(v * IValue);
    v = Int / IValue;
    if (isNegative) {
        v = -v;
    }
    return v;
};
/** 
 * @desc 实现数据的向下取整
 * @param {v} 需要向下取整的数据
 * @param {x} 保留小数点后x位
 */
export function Floor(v, x) {
    let isNegative = false;
    if (v < 0) {    //如果是负数
        isNegative = true;
        v = -v;
    }
    let IValue = 1;
    for (let i = 1; i <= x; i++) {
        IValue = IValue * 10;
    }
    let Int = Math.floor(v * IValue);
    v = Int / IValue;
    if (isNegative) {
        v = -v;
    }
    return v;
};
/** 
 * @desc 实现数据的四舍五入，向上取整，向下取整
 * @param {v} 需要处理的数据
 * @param {x} 保留小数点后x位
 * @param {type} 1-四舍五入，2-向上取整，3-向下取整
 */
export function DecimalProcessing(v, x, type) {
    let result = 0;
    switch (type) {
        case "1":
            result = Round(v, x);
            break;
        case "2":
            result = Ceiling(v, x);
            break;
        case "3":
            result = Floor(v, x);
            break;
        default:
            result = Round(v, x);
            break;
    }
    return result;
};
/** 
 * @desc html转义
 * @param {v} 需要转义的html代码
 */
export function HTMLEncode(html) {
    let temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    let output = temp.innerHTML;
    temp = null;
    return output;
};
/** 
 * @desc html反转义
 * @param {text} 需要反转义的html代码
 */
export function HTMLDecode(text) {
    let temp = document.createElement("div");
    temp.innerHTML = text;
    let output = temp.innerText || temp.textContent;
    temp = null;
    return output;
};
/** 
 * @desc 过滤字符串
 * @param {str} 需要反转义的html代码
 * @param {type} 需要替换的类型（space-空格,special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文）字符串形式，中间以逗号隔开
 * @param {restr} 需要替换成什么，默认''
 * @param {spstr} 需要保留的特殊符号
 */
export function filterStr(str, type, restr, spstr) {
    let typeArr = type.split(','),
        _str = str;
    for (let i = 0, len = typeArr.length; i < len; i++) {
        let pattern;
        if (typeArr[i] === 'special') {     // 是否是过滤特殊符号
            let regText = '$()[]{}?\|^*+./\"\'+';
            if (spstr) {                    // 是否有哪些特殊符号需要保留
                let _spstr = spstr.split(""),
                    _regText = "[^0-9A-Za-z\\s";
                for (let j = 0, len1 = _spstr.length; j < len1; j++) {
                    if (regText.indexOf(_spstr[j]) === -1) {
                        _regText += _spstr[j];
                    } else {
                        _regText += '\\' + _spstr[j];
                    }
                }
                _regText += ']';
                pattern = new RegExp(_regText, 'g');
            } else {
                pattern = new RegExp("[^0-9A-Za-z\\s]", 'g');
            }
        }
        let _restr = restr || '';
        switch (typeArr[i]) {
            case 'special':
                _str = _str.replace(pattern, _restr);
                break;
            case 'html':
                _str = _str.replace(/<\/?[^>]*>/g, _restr);
                break;
            case 'emjoy':
                _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, _restr);
                break;
            case 'word':
                _str = _str.replace(/[a-z]/g, _restr);
                break;
            case 'WORD':
                _str = _str.replace(/[A-Z]/g, _restr);
                break;
            case 'number':
                _str = _str.replace(/[0-9]/g, _restr);
                break;
            case 'space':
                _str = _str.replace(/\s+/g, "");
                break;
            case 'chinese':
                _str = _str.replace(/[\u4E00-\u9FA5]/g, _restr);
                break;
        }
    }
    return _str;
};
/** 
 * @desc 鼠标位置坐标
 */
export function MouseCoordinate(event) {
    var event = event || window.event;
    return {
        x: event.pageX || event.clientX + document.documentElement.scrollLeft,
        y: event.pageY || event.clientY + document.documentElement.scrollTop
    };
};