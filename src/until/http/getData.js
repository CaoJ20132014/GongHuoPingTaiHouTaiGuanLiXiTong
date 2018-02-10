import {fetch} from './http';
import api from '../../api/api';

/*
* 账号密码登录
*/
export const accountLogin = data => fetch('/api'+api.accountLogin, data,'POST');
/*
* 手机短信登录
*/ 
export const telLogin = data => fetch('/api'+api.telLogin, data, 'POST');
/*
* 获取图片验证码
*/
export const Code = data => fetch('/api'+api.telCode, data, 'POST');
/*
* 忘记密码
*/
export const Forget = data => fetch('/api'+api.forget, data, 'POST');
/*
* 验证该账号是否已经注册过
*/
export const isRegister = data => fetch('/api'+api.alreadyRegister, data, 'POST');
/*
* 注册
*/ 
export const Register = data => fetch('/api'+api.register, data, 'POST');