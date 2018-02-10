import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(Router);

/* 登录 */
const login = resolve => require.ensure([], () => resolve(require('@/view/adminLogin/login.vue')), 'login');
const home = resolve => require.ensure([], () => resolve(require('@/view/adminHome/Index/home.vue')), 'home');
const index = resolve => require.ensure([], () => resolve(require('@/view/adminHome/Index/index.vue')), 'index');
/* 引入目录1的路由文件 */
const list1_1 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list1/list1.vue')), 'index1');
const list1_2 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list1/list2.vue')), 'index1');
const list1_3 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list1/list3.vue')), 'index1');
const list1_4 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list1/list4.vue')), 'index1');
const list1_5 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list2/list4.vue')), 'index1');
/* 引入目录2的路由文件 */
const list2_1 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list2/list1.vue')), 'index2');
const list2_2 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list2/list2.vue')), 'index2');
const list2_3 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list2/list3.vue')), 'index2');
/* 引入目录3的路由文件 */
const list3_1 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list3/list1.vue')), 'index3');
/* 引入目录4的路由文件 */
const list4_1 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list1.vue')), 'index4');
const list4_2 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list2.vue')), 'index4');
const list4_3 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list3.vue')), 'index4');
const list4_4 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list4.vue')), 'index4');
/* 引入目录5的路由文件 */
const list5_1 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list1.vue')), 'index5');
const list5_2 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list2.vue')), 'index5');
const list5_3 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list3.vue')), 'index5');
/* 引入目录6的路由文件 */
const list6_1 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list1.vue')), 'index6');
const list6_2 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list2.vue')), 'index6');
const list6_3 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list3.vue')), 'index6');
const list6_4 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list4.vue')), 'index6');
/* 引入目录7的路由文件 */
const list7_1 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list5.vue')), 'index7');
const list7_2 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list6.vue')), 'index7');
const list7_3 = resolve => require.ensure([], () => resolve(require('@/view/adminHome/list4/list7.vue')), 'index7');

// meta 里面的 route 和 path 保持一致
// breadcrumb 用于确定面包屑

const routes = [{
	path: '/',
	name: 'login',
	component: login
}, {
	path: '/Home',
	component: home,
	children: [{
		path: '',
		name: 'index',
		component: index
	}, {
		path: 'list1_1',
		name: 'list1_1',
		component: list1_1,
		meta: {
			route: 'list1_1',
			breadcrumb: ['记录查询', '全部记录']
		}
	}, {
		path: 'list1_2',
		name: 'list1_2',
		component: list1_2,
		meta: {
			route: 'list1_2',
			breadcrumb: ['记录查询', '卡密记录']
		}
	},
	{
		path: 'list1_3',
		name: 'list1_3',
		component: list1_3,
		meta: {
			route: 'list1_3',
			breadcrumb: ['记录查询', '扫码记录']
		}
	}, {
		path: 'list1_4',
		name: 'list1_4',
		component: list1_4,
		meta: {
			route: 'list1_4',
			breadcrumb: ['记录查询', '支付记录']
		}
	}, {
		path: 'list1_5',
		name: 'list1_5',
		component: list1_5,
		meta: {
			route: 'list1_5',
			breadcrumb: ['记录查询', '激活记录']
		}
	}, {
		path: 'list2_1',
		name: 'list2_1',
		component: list2_1,
		meta: {
			route: 'list2_1',
			breadcrumb: ['代充平台', '批量充值']
		}
	}, {
		path: 'list2_2',
		name: 'list2_2',
		component: list2_2,
		meta: {
			route: 'list2_2',
			breadcrumb: ['代充平台', '油卡代充']
		}
	},
	{
		path: 'list2_3',
		name: 'list2_3',
		component: list2_3,
		meta: {
			route: 'list2_3',
			breadcrumb: ['代充平台', '话费代充']
		}
	}, {
		path: 'list3_1',
		name: 'list3_1',
		component: list3_1,
		meta: {
			route: 'list3_1',
			breadcrumb: ['商品管理', '商品管理']
		}
	}, {
		path: 'list4_1',
		name: 'list4_1',
		component: list4_1,
		meta: {
			route: 'list4_1',
			breadcrumb: ['生成激活', '充值卡激活']
		}
	}, {
		path: 'list4_2',
		name: 'list4_2',
		component: list4_2,
		meta: {
			route: 'list4_2',
			breadcrumb: ['生成激活', '扫码卡激活']
		}
	},
	{
		path: 'list4_3',
		name: 'list4_3',
		component: list4_3,
		meta: {
			route: 'list4_3',
			breadcrumb: ['生成激活', '直充折扣']
		}
	}, {
		path: 'list4_4',
		name: 'list4_4',
		component: list4_4,
		meta: {
			route: 'list4_4',
			breadcrumb: ['生成激活', '通道维护']
		}
	}, {
		path: 'list5_1',
		name: 'list5_1',
		component: list5_1,
		meta: {
			route: 'list5_1',
			breadcrumb: ['统计管理', '充值统计']
		}
	}, {
		path: 'list5_2',
		name: 'list5_2',
		component: list5_2,
		meta: {
			route: 'list5_2',
			breadcrumb: ['统计管理', '支付统计']
		}
	},{
		path: 'list5_3',
		name: 'list5_3',
		component: list5_3,
		meta: {
			route: 'list5_3',
			breadcrumb: ['统计管理', '消耗统计']
		}
	}, {
		path: 'list6_1',
		name: 'list6_1',
		component: list6_1,
		meta: {
			route: 'list6_1',
			breadcrumb: ['商户管理', '账户管理']
		}
	}, {
		path: 'list6_2',
		name: 'list6_2',
		component: list6_2,
		meta: {
			route: 'list6_2',
			breadcrumb: ['商户管理', '充值管理']
		}
	},
	{
		path: 'list6_3',
		name: 'list6_3',
		component: list6_3,
		meta: {
			route: 'list6_3',
			breadcrumb: ['商户管理', '用户管理']
		}
	}, {
		path: 'list6_4',
		name: 'list6_4',
		component: list6_4,
		meta: {
			route: 'list6_4',
			breadcrumb: ['商户管理', '订单管理']
		}
	}, {
		path: 'list7_1',
		name: 'list7_1',
		component: list7_1,
		meta: {
			route: 'list7_1',
			breadcrumb: ['充值相关', '直充折扣']
		}
	},
	{
		path: 'list7_2',
		name: 'list7_2',
		component: list7_2,
		meta: {
			route: 'list7_2',
			breadcrumb: ['充值相关', '通道维护']
		}
	}, {
		path: 'list7_3',
		name: 'list7_3',
		component: list7_3,
		meta: {
			route: 'list7_3',
			breadcrumb: ['充值相关', '油卡接口']
		}
	}]
}];

const router = new Router({
	mode: "history",
	routes
});
router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});
router.afterEach( route => {
	NProgress.done();
});
export default router;