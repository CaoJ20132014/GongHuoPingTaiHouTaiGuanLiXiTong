import { Message, MessageBox } from 'element-ui';
/**
 * @desc element-ui顶部公共弹窗
 * @param {types} 弹窗的类型 success / info / warning / error
 * @param {msg} 弹窗的信息
 */
export function topAlert(types, msg) {
	Message({
		type: types,
		message: msg,
		center: true,
		duration: 2000
	});
}
/**
 * @desc 公共弹窗
 * @param {types} 弹窗的类型 success / info / warning / error
 * @param {msg} 弹窗内容
 * @param {confirm} 弹窗确定时的回调
 * @param {cancel} 弹窗取消时的回调
 * @param {title} 弹窗的标题
 */
export function confirmAlert(msg, title, types, confirm, cancel) {
	MessageBox.confirm(msg, title, {
		confirmButtonText: '确定',
		showCancelButton: false,
		type: types
	}).then(() => {
		if (confirm) {
			confirm();
		}
	}).catch(() => {
		if (cancel) {
			cancel();
		}
	});
}