/**
 * @desc 验证合法uri
 * @param url
 * @returns {boolean}
 */
export function validateURL(url) {
	const urlReg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
	return urlReg.test(url);
}

/**
 * @desc 验证小写字母
 * @param str
 * @returns {boolean}
 */
export function validateLowerCase(str) {
	const reg = /^[a-z]+$/;
	return reg.test(str);
}

/**
 * @desc 验证大写字母
 * @param str
 * @returns {boolean}
 */
export function validateUpperCase(str) {
	const reg = /^[A-Z]+$/;
	return reg.test(str);
}

/**
 * @desc 验证大小写字母
 * @param str
 * @returns {boolean}
 */
export function validatAlphabets(str) {
	const reg = /^[A-Za-z]+$/;
	return reg.test(str);
}

/**
 * @desc 验证email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/**
 * @desc 正则验证
 * @param {str} 需要验证的字符串
 * @param {type} {字符串} 需要验证的类型 email-邮箱 phone-手机号 tel-电话号 number-数字 english-英文
 * text-文本 chinese-中文 pwd-密码 qq-QQ号码 url-网址 ip-IP地址 lower-小写字母 upper-大写字母 special-特殊字符 idCard-身份证号码
 * @returns {boolean}
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
		case 'pwd':     // 包含大小写字母和数字的组合，不能使用特殊字符，长度在8-16之间 /[~#^$@%&!*]/
			return /^[A-Za-z0-9]{8,16}$/.test(str);
		case 'qq':
			return /[1-9]([0-9]{5,11})/.test(str);
		case 'url':
			return /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/.test(str);
		case 'ip':
			return /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/.test(str);
		case 'lower':
			return /^[a-z]+$/.test(str);
		case 'upper':
			return /^[A-Z]+$/.test(str);
		case 'idCard':
			return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2})$/.test(str);
		case 'special':
			return /[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/.test(str);
		default:
			return true;
	}
}

/**
 * @desc 验证身份证号码
 * @param {idCard} 需要验证的身份证号码
 * @returns {boolean}
 */
export function isIdCard(idCard) {			/* 验证身份证号码 */
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
}

/**
 * @desc 验证银行卡号码
 * @param {idCard} 需要验证的银行卡号码
 * @returns {boolean}
 */
export function isBankCard (card) {
	let lastNum = card.substr(card.length - 1, 1);      	//取出最后一位（与luhn进行比较）
	let first15Num = card.substr(0, card.length - 1);   	//前15或18位
	let newArr = new Array();
	for (let i = first15Num.length - 1; i > -1; i--) {      //前15或18位倒序存进数组
		newArr.push(first15Num.substr(i, 1));
	}
	let arrJiShu = new Array();                             //奇数位*2的积 <9
	let arrJiShu2 = new Array();                            //奇数位*2的积 >9
	let arrOuShu = new Array();                             //偶数位数组
	for (let j = 0; j < newArr.length; j++) {
		if ((j + 1) % 2 == 1) {                             //奇数位
			if (parseInt(newArr[j]) * 2 < 9) arrJiShu.push(parseInt(newArr[j]) * 2);
			else arrJiShu2.push(parseInt(newArr[j]) * 2);
		} else{                                             //偶数位
			arrOuShu.push(newArr[j]);
		}
	}
	let jishu_child1 = new Array();                         //奇数位*2 >9 的分割之后的数组个位数
	let jishu_child2 = new Array();                         //奇数位*2 >9 的分割之后的数组十位数
	for (let h = 0; h < arrJiShu2.length; h++) {
		jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
		jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}
	let sumJiShu = 0;                                       //奇数位*2 < 9 的数组之和
	let sumOuShu = 0;                                       //偶数位数组之和
	let sumJiShuChild1 = 0;                                 //奇数位*2 >9 的分割之后的数组个位数之和
	let sumJiShuChild2 = 0;                                 //奇数位*2 >9 的分割之后的数组十位数之和
	let sumTotal = 0;
	for (let m = 0; m < arrJiShu.length; m++) {
		sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	}
	for (let n = 0; n < arrOuShu.length; n++) {
		sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}
	for (let p = 0; p < jishu_child1.length; p++) {
		sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
		sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);	//计算总和
	let k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;	//计算luhn值
	let luhn = 10 - k;
	if (lastNum == luhn) {
		return true;
	} else {
		return false;
	}
}

/**
 * @desc 密码强度检测
 * @param {str} 需要检测的字符串
 * @returns {number}：3(强度等级为3)
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
}