<template>
    <el-container>
        <el-header>
			<div class="heard_left">
				<div class="goBack" @click="goBack">
					<img src="../../../assets/image/adminindex/ka_pur.png" alt="">
					<img src="../../../assets/image/adminindex/jifenka.png" alt="">
				</div>
			</div>
			<div class="heard_right">
				<el-tooltip class="item" effect="dark" :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
					<i class="iconfontele" :class="fullScreenIcon" @click="fullScreen"></i>
				</el-tooltip>
				<span>您好，</span>
				<span>{{name}}</span>
				<el-button icon="iconfont icon-tuichu" @click="loginOut">退出</el-button>
			</div>
		</el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col :span="24">
                    	<!-- <div class="menu-top"><i class="iconfont icon-zhuangtailan-daohang"></i>商城管理</div> -->
						<el-menu :style="{'height': height}" class="el-menu-vertical-demo" :unique-opened="true" :router="true" :default-active="active" :default-openeds="opened">
							<el-submenu v-for="items of navList" :key="items.sort" :index="items.sort">
								<template slot="title">
									<i class="iconfont" :class="items.icon"></i>
									<span>{{items.title}}</span>
								</template>
								<el-menu-item-group v-for="item of items.secondNav" :key="item.sort">
									<el-menu-item :index="item.router" @click="AddTabs(item)">
										<i class="iconfont" :class="item.icon"></i>
										<span>{{item.secondTitle}}</span>
									</el-menu-item>
								</el-menu-item-group>
							</el-submenu>
						</el-menu>
  					</el-col>
  				</el-row>
				<div class="time">
					<p v-text="time"></p>
					<p v-text="date"></p>
				</div>
            </el-aside>
            <el-main>
				<breadcrumb></breadcrumb>
				<div class="tabs">
					<Tabs :tabs="tabs"></Tabs>
				</div>
				<el-dropdown @command="handleCommand" v-show="isShow" size="mini" split-button type="primary" trigger='click'>
				  	关闭
				  	<el-dropdown-menu slot="dropdown">
				    	<el-dropdown-item command="all">关闭全部</el-dropdown-item>
				    	<el-dropdown-item command="other">关闭其他</el-dropdown-item>
				  	</el-dropdown-menu>
				</el-dropdown>
				<router-view/>
			</el-main>
        </el-container>
    </el-container>
</template>

<script>
	import computed from '@/until/changeNav/change';		    // 引入改变导航栏展开与选中状态的JS文件
	import Tabs from '@/components/Tabs/Tabs.vue';
	import breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue';
	import Public from '@/until/public/until';
	import NavList1 from '@/until/rechargrNavList/navList';	// 引入导航栏标题图标JS文件
	import NavList2 from '@/until/shopNavList/shopNavList.js';	// 引入导航栏标题图标JS文件
	export default {
		components: {
			Tabs,
			breadcrumb
		},
		data() {
			return {
				date: '',
				time: '',
				navList: '',				// 由导航栏标题图标js文件引入
				opened: [],					// 展开状态的一级导航	数组["1","2"]
				active: '',					// 选中状态的二级导航	字符串
				name: "张三",				// 用户名
				tabs:[],
				height: document.body.clientHeight - 182 + 'px',
				isFullScreen: false,
				fullScreenIcon: 'el-icon-rank',
				screenHeight: document.body.scrollHeight
			};
		},
        created(){
            this.loadTime();          // 创建实例的时候调用一次，放置时间突变
            let timerID = setInterval(this.loadTime, 1000);
            if (Public.JS_Cookie('get', 'type') == '1') {
            	this.navList = NavList2.navList;
			} else if(Public.JS_Cookie('get', 'type') == '2'){
				this.navList = NavList1.navList;
			}
		},
		computed:{
			isShow(){
				if (this.tabs.length == 0) {
					return false;
				} else {
					return true;
				}
			}
		},
		watch:{
			$route(){			// 监听路由变化，页面刷新时改变导航栏的展开与选中状态
				let Arr = computed.change(this.$route.path);
				this.opened = [];			// 先清空再push
				this.opened.push(Arr[0]);
				this.active = Arr[1];
			},
			time(){
				const element = this.$createElement;
				if (this.time == '18:00:00') {
					this.$notify({
						title: '消息提示',
						message: element('b', { style: 'color: red'}, '亲，下班了，多回去陪陪家人！'),
						duration: 10000
					});
				} else if(this.time == '12:00:00'){
					this.$notify({
						title: '消息提示',
						message: element('b', { style: 'color: red'}, '亲，吃饭时间到了，休息一会吧！'),
						duration: 10000
					});
				}
			},
			tabs(curVal, oldVal){
				Public.JS_Cookie('remove', 'cookieTabs');
				let data = this.tabs;
                let date = Public.setTimes('h1');
				Public.JS_Cookie('set', 'cookieTabs', data, date);
			},
			screenHeight(newVal, oldVal){
				if (newVal > oldVal) {
					this.fullScreenIcon = 'el-icon-close';
				} else if(newVal < oldVal){
					this.fullScreenIcon = 'el-icon-rank';
				}
			}
		},
		mounted () {			// 页面刷新时根据路由来判断导航栏的展开与选中状态
			window.onresize = () => {
				const _that = this;
                return (() => {
                    window.screenHeight = document.body.clientHeight;
                    _that.screenHeight = window.screenHeight;
					_that.height = window.screenHeight - 182 + 'px';
                })();
            }
			if (Public.JS_Cookie('get', 'cookieTabs')) {
				this.tabs = Public.JS_Cookie('get', 'cookieTabs');
			}
			let Arr = computed.change(this.$route.path);
			this.opened = [];				// 先清空再push
			this.opened.push(Arr[0]);
			this.active = Arr[1];
			if(this.$route.path != '/adminindex/'){
				let arr = this.$route.path.split('/');
			}
		},
		methods: {
			loadTime(){
                this.time = Public.updateTime()[0];
                this.date = Public.updateTime()[1]; 
            },
			loginOut(){			// 退出登录
				Public.JS_Cookie('remove', 'type');
				this.$confirm('确定退出管理系统?', '消息提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push({
						name:'login'
					});
				}).catch(() => {});
			},
			goBack(){			// 回到首页
				this.$router.push({
					name:'index'
				});
			},
			AddTabs(item){
				let _that = this;
				let len = this.tabs.length + 1;
				let flag = false;
				let obj = {
					id: len,
					title: item.secondTitle,
					route: item.router
				}
				for (var i = 0; i < _that.tabs.length; i++) {
					if (_that.tabs[i].title == obj.title && _that.tabs[i].route == obj.route) {
						flag = true;
						break;
					} else {
						flag = false;
					}
				}
				setTimeout(() => {
					if (!flag) {
						_that.tabs.push(obj);
					}
				},300);
			},
			handleCommand(command) {
		        if (command == 'all') {
		        	this.closeAll();
		        } else if(command == 'other'){
		        	this.closeOther();
		        }
		    },
			closeAll(){
				this.tabs = [];
				this.$router.push({
					name:'index'
				});
			},
			closeOther(){
				let route = this.$route.path;
				let Array = route.split('/');
				this.tabs.forEach((item) => {
					if (item.route === Array[2]) {
						this.tabs = [];
						this.tabs.push(item);
					}				
				});
			},
			fullScreen(){
				if (!this.isFullScreen) {
					this.fullScreenIcon = 'el-icon-close';
					this.isFullScreen = !this.isFullScreen;
					Public.launchFullscreen(document.documentElement);
				} else {
					this.fullScreenIcon = 'el-icon-rank';
					this.isFullScreen = !this.isFullScreen;
					Public.exitFullscreen();
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import '../../../style/sass/adminHome/homeIndex/index.sass';
</style>