import Cookie from 'js-cookie';
import { isIdCard } from '../validate/validate';
const PublicMethod = {
    updateTime: () => {
        let nowTime = new Date();
        let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        let time = PublicMethod.zeroPadding(nowTime.getHours(), 2) + ':' + PublicMethod.zeroPadding(nowTime.getMinutes(), 2) + ':' + PublicMethod.zeroPadding(nowTime.getSeconds(), 2);
        let date = PublicMethod.zeroPadding(nowTime.getFullYear(), 4) + '-' + PublicMethod.zeroPadding(nowTime.getMonth() + 1, 2) + '-' + PublicMethod.zeroPadding(nowTime.getDate(), 2) + ' ' + week[nowTime.getDay()];
        return [time, date];
    },
    zeroPadding: (num, digit) => {
        let zero = '';
        for (let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    },
    /**
     * @desc 设置cookies
     * @param {name} 设置cookie名
     * @param {value} 需要存储到cookie的数据
     * @param {time} cookie存储的时间
     */
    setCookie:(name, value, time) => {
        let strsec = PublicMethod.getsec(time);
        let exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape (value) + ";expires=" + exp.toGMTString();
    },
    /**
     * @desc 获取时间间隔
     * @param {str} s是指秒，s20代表20秒 h是指小时，h12代表12小时 d是指天，d30代表30天
     */
    getsec: (str) => {
        let str1 = str.substring(1, str.length) * 1;
        let str2 = str.substring(0, 1);
        if (str2 == "s"){
            return str1 * 1000;
        } else if (str2 == "h"){
            return str1 * 60 * 60 * 1000;
        } else if (str2 == "d"){
            return str1 * 24 * 60 * 60 * 1000;
        }
    },
    /**
     * @desc 获取cookies
     * @param {name} cookie名
     */
    getCookie:(name) => {
        let arr,reg = new RegExp("(^| )"+ name + "=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
    },
    /**
     * @desc 删除cookies
     * @param {name} cookie名
     */
    delCookie:(name) => {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = getCookie(name);
        if(cval != null) {
            document.cookie = name + "="+ cval + ";expires=" + exp.toGMTString();
        }
    },
    /**
     * @param {time} 时间字符串 s20 表示20秒，m30 表示30分钟 h12 表示12小时 d30 表示30天 new Date()时间戳转对象
	 * @returns {object}
     */
    setTimes: (time) => {
        let date = new Date();
        let str1 = time.substring(1, time.length) * 1;
        let str2 = time.substring(0, 1);
        if (str2 == 's') {
            return new Date(date.setTime(date.getTime() + 1000 * str1));
        } else if(str2 == 'm'){
            return new Date(date.setTime(date.getTime() + 1000 * 60 * str1));
        } else if (str2 == 'h') {
            return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * str1));
        } else if (str2 == 'd') {
            return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * str1));
        }
    },
    /**
     * @param {type} set设置, get获取, remove移除
     * @param {name} cookie 别名
     * @param {data} cookie 数据
     * @param {time} cookie 过期时间
     * @param {Path} cookie 路径
     */
    JS_Cookie: (type, name, data, time, Path) => {
        if (Path) {
            if (type == 'set' && name && data) {
                Cookie.set(name, data, { expires: time, path: Path });
            } else if (type == 'get' && name && !data) {
                return Cookie.getJSON(name);
            } else if (type == 'remove' && name && data && time && Path) {
                Cookie.remove(name, { path: Path });
            }
        } else {
            if (type == 'set' && name && data) {
                Cookie.set(name, data, { expires: time });
            } else if (type == 'get' && name && !data) {
                return Cookie.getJSON(name);
            } else if (type == 'remove' && name && !data) {
                Cookie.remove(name);
            }
        }
    },
    /**
     * @param {time} 时间字符串 s20 表示20秒，m30 表示30分钟 h12 表示12小时 d30 表示30天 new Date()时间戳转对象
	 * @returns {object}
     */
    setTimes: (time) => {
        let date = new Date();
        let str1 = time.substring(1, time.length) * 1;
        let str2 = time.substring(0, 1);
        if (str2 == 's') {
            return new Date(date.setTime(date.getTime() + 1000 * str1));
        } else if(str2 == 'm'){
            return new Date(date.setTime(date.getTime() + 1000 * 60 * str1));
        } else if (str2 == 'h') {
            return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * str1));
        } else if (str2 == 'd') {
            return new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * str1));
        } else if (str2 == 'D') {
            return new Date(date.setTime(date.getTime() - 1000 * 60 * 60 * 24 * str1));
        }
    },
    /**
     * @desc 格式化时间
     * @param {time} 需要格式化的时间
     * @param {cFormat} 格式化的规则 {y}-{m}-{d} {h}:{i}:{s} {a} 或 {y}-{m}-{d} {h}:{i}:{s}
     */
    parseTime: (time, cFormat) => {
        if (arguments.length === 0) {
            return null
        }
        const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
        let date;
        if (typeof time === 'object') {
            date = time;
        } else {
            if (('' + time).length === 10) time = parseInt(time) * 1000;
            date = new Date(time);
        }
        const formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            let value = formatObj[key];
            if (key === 'a') return ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'][value - 1];
            if (result.length > 0 && value < 10) {
                value = '0' + value;
            }
            return value || 0;
        });
        return time_str;
    },
    /**
     * @desc 获取近期时间
     * @param {str} 'week'最近一周 'oneMonth'最近一个月 'threeMonth'最近三个月 'today'今天
     */
    getRecentTime: (str) => {
        const end = new Date(new Date().toDateString());
        const start = new Date();
        if (str === 'week') {
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
        } else if (str === 'oneMonth') {
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
        } else if (str === 'threeMonth') {
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
        } else if (str === 'today') {
            start.setTime(start.getTime());
            return [start, end];
        }
    },
    /**
     * @desc 判断当前时间
     * @param {time} 时间戳
     * @param {cFormat} 格式化的规则 {y}-{m}-{d} {h}:{i}:{s} {a} 或 {y}-{m}-{d} {h}:{i}:{s}
     */
    formatTime: (time, cFormat) => {
        time = +time * 1000;
        const d = new Date(time);
        const now = Date.now();
        const diff = (now - d) / 1000;
        if (diff < 30) {
            return '刚刚';
        } else if (diff < 3600) {
            return Math.ceil(diff / 60) + '分钟前';
        } else if (diff < 3600 * 24) {
            return Math.ceil(diff / 3600) + '小时前';
        } else if (diff < 3600 * 24 * 2) {
            return '1天前';
        }
        if (cFormat) {
            return PublicMethod.parseTime(time, cFormat);
        } else {
            return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分' + d.getSeconds() + '秒';
        }
    },
    /**
     * @desc 获取地址中的查询参数，输出对象
     * @param {url} 地址连接（可不传，即为当前地址）
     */
    getQueryParam:(url) => {
        url = url == null ? window.location.href : url;
        const search = url.substring(url.lastIndexOf('?') + 1);
        const queryObj = {};
        const reg = /([^?&=]+)=([^?&=]*)/g;
        search.replace(reg, (rs, $1, $2) => {
            const name = decodeURIComponent($1);
            let val = decodeURIComponent($2);
            val = String(val);
            queryObj[name] = val;
            return rs;
        });
        return queryObj;
    },
    /**
     * @desc 拼接查询参数
     * @param {url} 地址连接
     * @param {param} object 拼接到地址后面的查询参数
     */
    createURL:(url, param) => {
        let Url;
        let queryStr = '';
        for (let key in param) {
            let link = '&' + key + "=" + param[key];
            queryStr += link;
        }
        Url = url + "?" + queryStr.substr(1);
        return Url;
    },
    /**
     * @desc 判断浏览器信息
     * @returns Firefox-火狐 Opera-欧朋 Safari Chrome-谷歌 Edge
     */
    BrowserType:() => {
        let userAgent = navigator.userAgent;                //取得浏览器的userAgent字符串
        let isOpera = userAgent.indexOf("Opera") > -1;      //判断是否Opera浏览器
        let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
        let isEdge = userAgent.indexOf("Edge") > -1;        //判断是否IE的Edge浏览器
        let isFF = userAgent.indexOf("Firefox") > -1;       //判断是否Firefox浏览器
        let isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1;   //判断是否Safari浏览器
        let isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1;    //判断Chrome浏览器
        if (isIE) {
            let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            let fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) { return "IE7"; }
            else if (fIEVersion == 8) { return "IE8"; }
            else if (fIEVersion == 9) { return "IE9"; }
            else if (fIEVersion == 10) { return "IE10"; }
            else if (fIEVersion == 11) { return "IE11"; }
        }
        if (isFF) { return "Firefox"; }
        if (isOpera) { return "Opera"; }
        if (isSafari) { return "Safari"; }
        if (isChrome) { return "Chrome"; }
        if (isEdge) { return "Edge"; }
    },
    /**
     * @desc 得到一个月的头一天
	 * @returns 当月第一天的日期
     */
    getMonthBeginDay:() => {
        let today = new Date();
        today.setDate(1);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        let dateStr = PublicMethod.parseTime(today);
        return dateStr;
    },
    /**
     * @desc 得到一个月的最后一天
	 * @returns 当月最后一天的日期
     */
    getMonthEndDay:() => {
        let today = new Date();
        today.setMonth(today.getMonth() + 1);
        today.setDate(0);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        let dateStr = PublicMethod.parseTime(today);
        return dateStr;
    },
    /**
     * @desc 数字转人民币大写
     * @param {money} 数字金额
	 * @returns 大写的金额
     */
    ConvertChineseMoney:(money) => {
        let cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
        let cnIntRadice = new Array("", "拾", "佰", "仟");     //基本单位
        let cnIntUnits = new Array("", "万", "亿", "兆");      //对应整数部分扩展单位
        let cnDecUnits = new Array("角", "分", "毫", "厘");    //对应小数部分单位
        let cnInteger = "整";                                 //整数金额时后面跟的字符
        let cnIntLast = "元";                                 //整型完以后的单位
        let maxNum = 999999999999999.9999;                    //最大处理的数字
        let IntegerNum;                                       //金额整数部分
        let DecimalNum;                                       //金额小数部分
        let ChineseStr = "";                                  //输出的中文金额字符串
        let parts;                                            //分离金额后用的数组，预定义
        if (money == "") {
            return "";
        }
        money = parseFloat(money);
        if (money >= maxNum) {
            return "超出最大处理数字";
        }
        if (money == 0) {
            ChineseStr = cnNums[0] + cnIntLast + cnInteger;
            return ChineseStr;
        }
        money = money.toString(); //转换为字符串
        if (money.indexOf(".") == -1) {
            IntegerNum = money;
            DecimalNum = '';
        } else {
            parts = money.split(".");
            IntegerNum = parts[0];
            DecimalNum = parts[1].substr(0, 4);
        }
        if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
            let zeroCount = 0;
            let IntLen = IntegerNum.length;
            for (let i = 0; i < IntLen; i++) {
                let n = IntegerNum.substr(i, 1);
                let p = IntLen - i - 1;
                let q = p / 4;
                let m = p % 4;
                if (n == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        ChineseStr += cnNums[0];
                    }
                    zeroCount = 0;          //归零
                    ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    ChineseStr += cnIntUnits[q];
                }
            }
            ChineseStr += cnIntLast;        //整型部分处理完毕
        }
        if (DecimalNum != '') {             //小数部分
            let decLen = DecimalNum.length;
            for (let i = 0; i < decLen; i++) {
                n = DecimalNum.substr(i, 1);
                if (n != '0') {
                    ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
                }
            }
        }
        if (ChineseStr == '') {
            ChineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (DecimalNum == '') {
            ChineseStr += cnInteger;
        }
        if (ChineseStr.indexOf('分') >= 0 && ChineseStr.indexOf('角') < 0) {          //处理没有角有分的情况
            if (ChineseStr.indexOf('元') > 0) {
                ChineseStr = ChineseStr.substr(0, ChineseStr.indexOf('元') + 1) + '零' + ChineseStr.substr(ChineseStr.indexOf('元') + 1);
            }
        }
        return ChineseStr;
    },
    /**
     * @desc 判断两个数组是否相等
     * @param {Array} arr1
     * @param {Array} arr2
     * @returns {Boolean}
     */
    arrayEqual: (arr1, arr2) => {
        if (arr1 === arr2) return true;
        if (arr1.length != arr2.length) return false;
        for (let i = 0; i < arr1.length; ++i) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    },
    /**
     * @desc 数组去重
     * @param {arr} 需要去重的数组
	 * @returns {array} 去重后的数组
     */
    unique:(arr) => {
        let result = [], json = {};
        for (let i = 0, len = arr.length; i < len; i++) {
            if (!json[arr[i]]) {
                json[arr[i]] = 1;
                result.push(arr[i]); //返回没被删除的元素
            }
        }
        return result;
    },
    /**
     * @desc 判断数组是否有重复项
     * @param {arr} 需要判断的数组
	 * @returns {Boolean}
     */
    isRepeat:(arr) => {
        let hash = {};
        for (let i in arr) {
            if (hash[arr[i]]) return true;
            hash[arr[i]] = true;
        }
        return false;
    },
    /**
     * @desc 数组从小到大排序，返回排序后的数组
     * @param {arr} 需要排序的数组
	 * @returns {array} 排序后的数组
     */
    arraySort: (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    },
    /**
     * @desc 获取数组的最大值或最小值
     * @param {arr} 数组
     * @param {maxmin} 'max'最大值，'min'最小值
	 * @returns {number} 最大值或最小值
     */
    getMaximin:(arr, maximin) => {
        if (maximin == "max") {
            return Math.max.apply(Math, arr);
        }
        else if (maximin == "min") {
            return Math.min.apply(Math, arr);
        }
    },
    /**
     * @desc 去除数组的最大值最小值
     * @param {arry} 数组
	 * @returns {array} 去除最大值和最小值的数组
     */
    spliceMaxMin: (arry) => {
        let result = arry.splice(0),
            max = Math.max(...result),
            min = Math.min(...result)
        for (let i = 0; i < result.length; i++) {
            if (result[i] == max) {
                result.splice(i, 1);
            }
            if (result[i] == min) {
                result.splice(i, 1);
            }
        }
        let len = result.length;
        return PublicMethod.arraySum(result) / len;
    },
    /**
     * @desc 去除数组的最大值最小值然后求平均值
     * @param {array} 数组
	 * @returns {number} 去除数组的最大值最小值然后的平均值
     */
    spliceMaxMinSum: (array) => {
        let result = array.splice(0),
            max = Math.max(...result),
            min = Math.min(...result)
        for (let i = 0; i < result.length; i++) {
            if (result[i] == max) {
                result.splice(i, 1);
            }
            if (result[i] == min) {
                result.splice(i, 1);
            }
        }
        let len = result.length;
        return PublicMethod.arraySum(result)/len;
    },
    /**
     * @desc 数组求和
     * @param {arr} 数组
	 * @returns {number} 数组每一项的总和
     */
    arraySum(arr) {
        let len = arr.length;
        if (len == 0) {
            return 0;
        } else if (len == 1) {
            return arr[0];
        } else {
            return arr[0] + PublicMethod.arraySum(arr.slice(1));
        }
    },
    /**
     * @desc 控制浏览器全屏
     * @param {element} 传document.documentElement
     */
    launchFullscreen:(element) => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    },
    /**
     * @desc 退出浏览器全屏
     */
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    },
    /**
     * @desc 根据身份证号获得出生日期
     * @param {psidno} 身份证号 psidno
     * @returns {String} 出生日期
     */
    GetBirthday: (psidno) => {
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
    },
    /**
     * @desc 根据身份证号获得性别
     * @param {psidno} 身份证号 psidno
     * @returns {String}：性别 'F'：女，'M'：男
     */
    Getsex: (psidno) => {
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
    },
    /**
     * @desc 根据身份证号获得年龄
     * @param {psidno} 身份证号 psidno
     * @returns {number} 年龄
     */
    GetAge:(psidno) => {
        let len = (psidno + "").length;
        if (len == 0) {
            return "错误的身份证号码，请核对！";
        } else {
            if ((len != 15) && (len != 18) && isIdCard(psidno)){    //身份证号码只能为15位或18位其它不合法
                return "错误的身份证号码，请核对！";
            }
        }
        let strBirthday = "";
        if (len == 18){     //处理18位的身份证号码从号码中得到生日和性别代码
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
    },
    /**
     * @desc 根据身份证号获得省份（含直辖市）、出生日期、性别
     * @param {code} 身份证号 code
     * @return 返回值：{Area: "", Birthday: "", Sex: ""}
     */
    IdentityCodeValid: (code) => {
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
    },
    /**
     * @desc 判断当前日期是不是节假日
     */
    HolidayAndVacations:() => {
        let calendar = new Date();
        let month = calendar.getMonth();
        let date = calendar.getDate();
        if ((month == 0) && (date == 1)) return("元旦");
        if ((month == 1) && (date == 13)) return("除夕");
        if ((month == 1) && (date == 14)) return("春节/情人节");
        if ((month == 2) && (date == 1)) return("国际海豹日");
        if ((month == 2) && (date == 8)) return("国际劳动妇女节/中国保护母亲河日");
        if ((month == 2) && (date == 12)) return("植树节");
        if ((month == 3) && (date == 1)) return("愚人节");
        if ((month == 3) && (date == 5)) return("清明节");
        if ((month == 4) && (date == 1)) return("国际劳动节");
        if ((month == 4) && (date == 9)) return("母亲节");
        if ((month == 5) && (date == 1)) return("国际儿童节");
        if ((month == 5) && (date == 26)) return("国际禁毒日");
        if ((month == 7) && (date == 1)) return("建军节");
        if ((month == 7) && (date == 15)) return("日本无条件投降日/世纪婚纱日");
        if ((month == 7) && (date == 16)) return("七夕情人节");
        if ((month == 9) && (date == 20)) return("世界厨师日");
        if ((month == 9) && (date == 22)) return("世界传统医药日");
        if ((month == 9) && (date == 24)) return("联合国日/世界发展信息日");
        if ((month == 9) && (date == 25)) return("世界骨质疏松日/抗美援朝纪念日/环卫工人节");
        if ((month == 9) && (date == 31)) return("世界勤俭日/中国男性健康日");
        if ((month == 11) && (date == 24)) return("平安夜");
        if ((month == 11) && (date == 25)) return("圣诞节");
        else return '今日无节日';
    },
    /**
     * @desc 计算两个日期之间的工作日天数（含法定节假日在内）
     * @param {sDay} 起始时间
     * @param {eDay} 终止时间
     */
    countWorkDay:(sDay, eDay) => {
        let s = PublicMethod.stringToDate(sDay),
            e = PublicMethod.stringToDate(eDay);
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
    },
    stringToDate: (dateString) => {
        dateString = dateString.split('-');
        return new Date(dateString[0], dateString[1] - 1, dateString[2]);
    },
    /**
     * @desc 计算两个日期之间的休息日天数（不含法定节假日）
     * @param {dtStart} 起始时间
     * @param {dtEnd} 终止时间
     */
    weekendBetween:(dtStart, dtEnd) => {
        if (typeof dtEnd == 'string') dtEnd = PublicMethod.stringToDate(dtEnd);
        if (typeof dtStart == 'string') dtStart = PublicMethod.stringToDate(dtStart);
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
    },
    stringToDate:(DateStr) => {
        let converted = Date.parse(DateStr);
        let myDate = new Date(converted);
        if (isNaN(myDate)) {
            let arys = DateStr.split('-');
            myDate = new Date(arys[0], arys[1], arys[2]);
        }
        return myDate;
    },
    /**
     * @desc 计算当前日期在当年是第几周
     */
    theWeek:() => {
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
    },
    /**
     * @desc 返回顶部
     */
    scrollTop:() => {
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
    },
    /**
     * @desc 返回顶部
     */
    scrollTo:() => {
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
    },
    /**
     * @desc 返回顶部
     */
    scrollBy:() => {
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
    },
    /**
     * @desc 字符串去除空格
     * @param {str} 需要去除空格的字符串
     * @param {type} {字符串} 1-所有空格  2-前后空格  3-前空格 4-后空格
     * @returns {String} 去除空格后的字符串
     */
    trimSpace: (str, type) => {
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
    },
    /**
     * @desc 字母大小写转换
     * @param {str} 需要转换的字符串
     * @param {type} {字符串} 1-首字母大写 2-首字母小写 3-大小写转换 4-全部大写 5-全部小写
	 * @returns {String} 转换后的字符串
     */
    changeCase: (str, type) => {
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
    },
    /**
     * @desc 格式化处理字符串
     * @param {str} 需要格式化处理的字符串
     * @param {size} 按照几个单位分割字符串，默认是3
     * @param {delimiter} 需要添加进去的字符串，默认是","
     * @returns {string} 格式化后的字符串
     */
    formatText: (str, size, delimiter) => {
        let _size = size || 3,
            _delimiter = delimiter || ',';
        let regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
        let reg = new RegExp(regText, 'g');
        return str.replace(reg, _delimiter);
    },
    /**
     * @desc 数组扁平化，将多维数组变成一维数组
     * @param {arr} 需要处理的数组
	 * @returns {array} 一维数组
     */
    steamroller: (arr) => {
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
    },
    /**
     * @desc 获取终止时间到当前时间的天数
     * @param {endTime} 结束时间
     * @use getEndTime('2017/7/22 16:0:0')
     * @returns {string} "剩余时间6天2小时28分钟20秒"
     */
    getEndTime: (endTime) => {
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
    },
    /**
     * @desc 清除对象中值为空的属性
     * @param {obj} 需要清除的对象
     * @use filterParams({a:"",b:null,c:"010",d:123})
     * @returns {object} {c: "010", d: 123}
     */
    filterParams: (obj) => {
        let _newPar = {};
        for (let key in obj) {
            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },
    /**
     * @desc 检测对象是否有某个类名
     * @param {obj} 需要检测的对象
     * @param {classStr} 检测是否拥有classStr属性
	 * @returns {boolean}
     */
    hasClass: (obj, classStr) => {
        if (obj.className && this.trim(obj.className, 1) !== "") {
            let arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
            return (arr.indexOf(classStr) == -1) ? false : true;
        } else {
            return false;
        }
    },
    /**
     * @desc 添加类名
     * @param {obj} 添加的对象
     * @param {classStr} 添加classStr属性
     */
    addClass: (obj, classStr) => {
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
    },
    /**
     * @desc 删除类名
     * @param {obj} 删除的对象
     * @param {classStr} 删除classStr属性
     */
    removeClass: (obj, classStr) => {
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
    },
    /**
     * @desc 替换类名
     * @param {obj} 需要替换对象
     * @param {newName} 被替换的类名
     * @param {oldName} 替换的类名
     */
    replaceClass: (obj, newName, oldName) => {
        this.removeClass(obj, oldName);
        this.addClass(obj, newName);
    },
    /**
     * @desc 设置样式
     * @param {obj} 需要蛇者样式的对象
     * @param {json} 设置的样式，键值对形式
     */
    setStyle: (obj, json) => {
        for (let attr in json) {
            obj.style[attr] = json[attr];
        }
    },
    /**
     * @desc 切换样式
     * @param {elem} 需要切换样式的对象
     * @param {classname} 类名
     */
    toggleClass: (elem, classname) => {
        this.flag = false;
        let oldClass = elem.className;
        if (oldClass.indexOf(classname) != -1 && !flag) {
            flag = true;
            elem.className = elem.className.replace(" " + classname, "");
        } else {
            flag = false;
            elem.className = oldClass + " " + classname;
        }
    },
    /**
     * @desc 关键字设置样式（多个关键词用空格隔开）
     * @param {str} 需要设置样式的对象
     * @param {key} 需要设置样式的关键字
     * @param {el} html标签名
     */
    findKey: (str, key, el) => {
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
    },
    /**
     * @desc 手机系统类型判断
     * @param {android} 手机系统类型
	 * @returns {boolean}
     */
    phoneBrowserInfo: (type) => {
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
    },
    /**
     * @desc 封装ajax函数
     * @param {string} obj.type http连接的方式，包括POST和GET两种方式
     * @param {string} obj.url 发送请求的url
     * @param {boolean} obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object} obj.data 发送的参数，格式为对象类型
     * @param {function} obj.success ajax发送并接收成功调用的回调函数
     * @param {function} obj.error ajax发送失败或者接收失败调用的回调函数
     */
    Ajax: (obj) => {
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
    },
    /**
     * @desc 进制转换
     * @param {type} bit-二进制转十进制 oct-八进制转十进制 hex-十六进制转十进制
     * @param {value} number 需要转换的值
	 * @returns {string}
     */
    hexTransform: (type, value) => {
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
    },
    /**
     * @desc 进制互换乘法函数，用来得到精确的乘法结果
     * @param {num} number 待转换的进制数，如 110(二进制),26(八进制),10(十进制),AF(十六进制)
     * @param {from} number 源进制 2|8|10|16
     * @param {to} number 目标进制 2|8|10|16
	 * @returns {string}
     */
    convert: (num, from, to) => {
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
    },
    /**
     * @desc 用来得到精确的乘法结果（因为两个浮点数相乘存在误差）
     * @param {arg1}
     * @param {arg2}
	 * @returns {number}
     */
    Ride: (arg1, arg2) => {
        let m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try { m += s1.split(".")[1].length } catch (e) { };
        try { m += s2.split(".")[1].length } catch (e) { };
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    /**
     * @desc 用来得到精确的除法结果（因为两个浮点数相除存在误差）
     * @param {arg1}
     * @param {arg2}
	 * @returns {number}
     */
    Division:(arg1, arg2) => {
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
    },
    /**
     * @desc 用来得到精确的加法结果（因为两个浮点数相加存在误差）
     * @param {arg1}
     * @param {arg2}
	 * @returns {number}
     */
    Additive: (arg1, arg2) => {
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
    },
    /**
     * @desc 用来得到精确的减法结果（因为两个浮点数相减存在误差）
     * @param {arg1}
     * @param {arg2}
	 * @returns {number}
     */
    Reduce: (arg1, arg2) => {
        let r1, r2, m, n;
        try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 };
        try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 };
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;       //动态控制精度长度
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    /**
     * @desc 实现数据的四舍五入法
     * @param {v} 需要四舍五入的数据
     * @param {x} 保留小数点后x位
	 * @returns {number}
     */
    Rounding:(v, x) => {
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
    },
    /**
     * @desc 实现数据的向上取整
     * @param {v} 需要向上取整的数据
     * @param {x} 保留小数点后x位
	 * @returns {number}
     */
    Ceiling: (v, x) => {
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
    },
    /**
     * @desc 实现数据的向下取整
     * @param {v} 需要向下取整的数据
     * @param {x} 保留小数点后x位
	 * @returns {number}
     */
    Floor: (v, x) => {
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
    },
    /**
     * @desc 实现数据的四舍五入，向上取整，向下取整
     * @param {v} 需要处理的数据
     * @param {x} 保留小数点后x位
     * @param {type} 1-四舍五入，2-向上取整，3-向下取整
	 * @returns {number}
     */
    DecimalProcessing: (v, x, type) => {
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
    },
    /**
     * @desc html转义
     * @param {html} 需要转义的html代码
	 * @returns {string}
     */
    HTMLEncode: (html) => {
        let temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        let output = temp.innerHTML;
        temp = null;
        return output;
    },
    /**
     * @desc html反转义
     * @param {text} 需要反转义的html代码
	 * @returns {string}
     */
    HTMLDecode: (text) => {
        let temp = document.createElement("div");
        temp.innerHTML = text;
        let output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    /**
     * @desc 过滤字符串
     * @param {str} 需要反转义的html代码
     * @param {type} 需要替换的类型（space-空格,special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文）字符串形式，中间以逗号隔开
     * @param {restr} 需要替换成什么，默认''
     * @param {spstr} 需要保留的特殊符号
	 * @returns {string}
     */
    filterStr: (str, type, restr, spstr) => {
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
    },
    /**
     * @desc 鼠标位置坐标
	 * @returns {object}
     */
    MouseCoordinate: (event) => {
        var event = event || window.event;
        return {
            x: event.pageX || event.clientX + document.documentElement.scrollLeft,
            y: event.pageY || event.clientY + document.documentElement.scrollTop
        };
    },
	/**
	 * @desc 屏幕的可视宽高
	 * @returns {object}
	 */
    windowClient: () => {
        return {
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
        };
    },
    /**
     * @desc 元素淡出
     * @param {elem} html元素对象
     * @param {time} 时间
     * @param {callback} 回调函数
     */
    fadeOut: (elem, time, callback) => {
        let elemOpcity = PublicMethod.getStyle(elem, "opcity");
        if (!elemOpcity) {
            elem.style.opacity = "1";
        }
        setInterval(function () {
            let intOpacityValue = parseFloat(elem.style.opacity); //将透明度转变为整形
            if (intOpacityValue > 0) {
                elem.style.opacity = (intOpacityValue - 0.05) + "";
            } else {
                elem.style.opacity = "0";
                elem.style.display = "none";
                if (typeof callback == "funtion") {
                    callback();
                }
            }
        }, time);
    },
    /**
     * @desc 元素淡入
     * @param {elem} html元素对象
     * @param {time} 时间
     * @param {callback} 回调函数
     */
    fadeIn: (elem, time, callback) => {
        let elemOpcity = PublicMethod.getStyle(elem, "opcity");
        if (!elemOpcity) {
            elem.style.opacity = "0";
        }
        let timerId = setInterval(function () {
            let intOpacityValue = parseFloat(elem.style.opacity); //将透明度转变为整形
            if (intOpacityValue < 1) {
                elem.style.opacity = (intOpacityValue + 0.05) + "";
            } else {
                elem.style.opacity = "1";
                clearTimeout(timerId);
                if (typeof callback == "funtion") {
                    callback();
                }
            }
        }, time);
    },
    /**
     * @desc 获取元素的css属性
     * @param {elem} html元素对象
     * @param {prop} css属性名称
	 * @returns {boolean}
     */
    getStyle: (elem, prop) => {
        if (window.getComputedStyle) {
            return window.getComputedStyle(elem)[prop];
        } else {
            return elem.currentStyle[prop];
        }
    },
    /**
     * @desc 元素Z轴旋转
     * @param {elem} html元素对象
     * @param {time} 时间
     * @param {deg} 角度
     * @param {callback} 回调函数
     */
    zRotate: (elem, time, deg, callback) => {
        let flag = true;
        elem.style.webkitTransform ? {} : elem.style.webkitTransform = "rotate(0deg)";
        let timeId = setInterval(function () {
            let rotateStr = elem.style.webkitTransform.replace("rotate(", "");
            let rotate = parseInt(rotateStr);
            if (rotate < deg && flag) {
                elem.style.webkitTransform = "rotate(" + (rotate + 1) + "deg)";
            } else {
                flag = false;
                elem.style.webkitTransform = "rotate(" + (rotate - 1) + "deg)";
                if (rotate < 0) {
                    elem.style.webkitTransform = "rotate(0deg)";
                    flag = true;
                    if (typeof callback == "function") {
                        callback();
                    }
                }
            }
        }, time);
    },
    /**
     * @desc 元素放大缩小,仅支持高版本浏览器
     * @param {elem} html元素对象
     * @param {time} 时间
     * @param {multiple} 放大的倍数
     * @param {callback} 回调函数
     */
    transformScale: (elem, time, multiple, callback) => {
        let flag = true;
        elem.style.webkitTransform = "scale(1)";
        let timeId = setInterval(function () {
            let scaleStr = elem.style.webkitTransform.replace("scale(", "");
            let scale = parseFloat(scaleStr);
            if (scale < multiple && flag) {
                elem.style.webkitTransform = "scale(" + (scale + 0.01) + ")";
            } else {
                flag = false;
                elem.style.webkitTransform = "scale(" + (scale - 0.01) + ")";
                if (scale < 1) {
                    elem.style.webkitTransform = "scale(1)";
                    flag = true;
                    clearTimeout(timeId);
                    if (typeof callback == "function") {
                        callback();
                    }
                }
            }
        }, time);
    },
    /**
     * @desc 元素左右或者上下运动
     * @param {elem} html元素对象
     * @param {dir} 运动方向
     * @param {time} number 时间
     * @param {speed} number 速度
     */
    elemMove: (elem, dir, time, speed) => {
        let flag = true, value;
        dir == "top" ? value = "height" : value = "width";
        let elemWith = parseInt(PublicMethod.getStyle(elem, value));    //获取宽度值
        let elemPosition = PublicMethod.getStyle(elem, "position");     //获取position属性
        if (elemPosition == "static") {
            elem.style.position = "relative";
            elem.style[dir] = "0px";
        }
        setInterval(function () {
            let left = parseInt(PublicMethod.getStyle(elem, dir));
            if (left < elemWith && flag) {
                elem.style[dir] = (left + speed) + "px";
            } else {
                flag = false;
                elem.style[dir] = (left - speed) + "px";
                if (parseInt(PublicMethod.getStyle(elem, dir)) < 0) {
                    elem.style[dir] = "0px";
                    flag = true;
                }
            }
        }, time);
    },
    /**
     * @desc 判断字符串中哪个字符出现的次数最多，出现了多少次
     * @param {str} 字符串
	 * @returns {object}
     */
    maxTimeChar: (str) => {
        let json = {};
        for (let i = 0; i < str.length; i++) {
            if (json[str.charAt(i)]) {
                json[str.charAt(i)] += 1;
            } else {
                json[str.charAt(i)] = 1;
            }
        };
        let max = 0;
        let maxName;
        for (let name in json) {
            if (json[name] > max) {
                max = json[name];
                maxName = name;
            }
        };
        return {
            str: maxName,
            second: max
        };
    },
    /**
     * @desc 添加事件
     * @param {str} 元素的class或id 例如：#demo或.demo，还可以是对象
	 * @param {object} 事件类型 click
	 * @param {fnHandler} 执行的函数
     */
    addEvent: function (oTarget, oType, fnHandler) {
        let oT;
        if (typeof oTarget == "string") {
            if (oTarget.substr(0, 1) == '.') {
                oT = document.getElementsByClassName(oTarget.substring(1, oTarget.length));
            } else if (oTarget.substr(0, 1) == '#') {
                oT = document.getElementById(oTarget.substring(1, oTarget.length));
            }
        } else {
            oT = oTarget;
        }
        if (!oT) {
            return '没有找到该元素';
        }
        if (oT.addEventListener) {
            oT.addEventListener(oType, fnHandler, false);
        } else if (oT.attachEvent) {
            oT.attachEvent('on' + oType, fnHandler);
        } else {
            oT['on' + oType] = fnHandler;
        }
    },
    /**
     * @desc 移除事件
     * @param {oTarget} 元素的class或id 例如：#demo或.demo，还可以是对象
	 * @param {oType} 事件类型 click
	 * @param {fnHandler} 执行的函数
     */
    removeEvent: function (oTarget, oType, fnHandler) {
        let oT;
        if (typeof oTarget == "string") {
            if (oTarget.substr(0, 1) == '.') {
                oT = document.getElementsByClassName(oTarget.substring(1, oTarget.length));
            } else if (oTarget.substr(0, 1) == '#') {
                oT = document.getElementById(oTarget.substring(1, oTarget.length));
            }
        } else {
            oT = oTarget;
        }
        if (!oT) {
            return '没有找到该元素';
        }
        if (oT.removeEventListener) {
            oT.removeEventListener(oType, fnHandler, false);
        } else if (oT.detachEvent) {
            oT.detachEvent('on' + oType, fnHandler);
        } else {
            oT['on' + oType] = null;
        }
    }
}
export default PublicMethod;
