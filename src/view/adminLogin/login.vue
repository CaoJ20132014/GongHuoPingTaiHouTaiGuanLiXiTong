<template>
    <div class="login_box snow_parent" id="js_sonw">
        <h1>供货平台后台管理系统</h1>
        <div id="clock">
            <p class="date" v-text="date"></p>
            <p class="time" v-text="time"></p>
        </div>
        <div class="content">
            <div class="center_box">
                <div class="weather_table">
                    <div class="todayWeather">今日天气：</div>
                    <ul>
                        <li class="common">
                            <span>PM10：</span>
                            <span>{{pm10}}</span>
                        </li>
                        <li class="common">
                            <span>PM2.5：</span>
                            <span>{{pm25}}</span>
                        </li>
                        <li class="common">
                            <span>湿度：</span>
                            <span>{{shidu}}</span>
                        </li>
                        <li>
                            <span>空气质量：</span>
                            <span>{{quality}}</span>
                        </li>
                    </ul>
                    <p>
                        <span>建议：</span>
                        <span>{{ganmao}}</span>
                    </p>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="time" label="日期" align="center" width="120"></el-table-column>
                            <el-table-column label="详细信息" align="center">
                                <el-table-column prop="type" align="center" label="天气" width="78"></el-table-column>
                                <el-table-column prop="temperature" align="center" label="温度" width="110"></el-table-column>
                                <el-table-column prop="fx" align="center" label="风向" width="68"></el-table-column>
                                <el-table-column prop="fl" align="center" label="风力" width="68"></el-table-column>
                                <el-table-column prop="sunrise" align="center" label="日出" width="68"></el-table-column>
                                <el-table-column prop="sunset" align="center" label="日落" width="68"></el-table-column>
                                <el-table-column prop="notice" align="center" label="温馨提示"></el-table-column>
                            </el-table-column>
                    </el-table>
                </div>
                <div class="input_box">
                    <h2>会员登录</h2>
                    <div class="common zhanghao">
                        <div class="lable">账号：</div><el-input placeholder="请输入账号" v-model="input1"></el-input>
                    </div>
                    <div class="common pwd">
                        <div class="lable">密码：</div><el-input placeholder="请输入密码" v-model="input2"></el-input>
                    </div>
                    <div class="common code">
                        <div class="lable">验证码：</div><el-input placeholder="请输入验证码" v-model="input3"></el-input>
                        <img :src="imageCode" height="36" width="85" @click="changeImg">
                    </div>
                    <div class="common code">
                        <div class="lable">短信验证码：</div><el-input placeholder="请输入验证码" v-model="input4"></el-input>
                        <el-button type="danger" :disabled="disabled" @click="getCode" v-text="btn_text"></el-button>
                    </div>
                    <el-button @click="goIndex" type="primary" :loading="load">登录</el-button>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
    import Public from '@/until/public/until';
    import Api from '@/api/api';
    import Axios from 'axios';
	import { Code } from '@/until/http/getData';
    export default {
        data(){
            return{
                time: '',               // 右上角动态时间
			    date: '',               // 右上角动态日期
                input1: "",             // 账号
                input2: "",             // 密码
                input3: "",             // 图片验证码
				input4: "",             // 短信验证码
                load: false,            // 登录按钮的加载状态
				tableData: [],
				quality: null,
				pm10: null,
				pm25: null,
				ganmao: null,
				shidu: null,
                btn_text:'获取验证码',
				disabled: false,
				Countdown: 0,
                imageCode: null
            }
        },
        mounted(){
        	const _that = this;
			_that.loadTime();            // 创建实例的时候调用一次，防止时间突变
            let timerID = setInterval(_that.loadTime, 1000);
            // 获取天气数据
            Axios.get('/weather/open/api/weather/json.shtml', {
                params: {
                    city: '杭州'
                }
            }).then(function (response) {
                if (response.status == 200 && response.statusText == 'OK' && response.data.status != 304){
                	const todayWeather = response.data.data;
					const dataArr = response.data.data.forecast;
                    dataArr.forEach((item, index) => {
						item["temperature"] = item.low.substring(3,item.low.length) + '~' + item.high.substring(3,item.high.length);
						item["time"] = Public.parseTime(Public.setTimes('d'+(index)),'{y}-{m}-{d}');
                    });
					_that.tableData = response.data.data.forecast;
					_that.quality = todayWeather.quality;
					_that.pm10 = todayWeather.pm10;
					_that.pm25 = todayWeather.pm25;
					_that.ganmao = todayWeather.ganmao;
					_that.shidu = todayWeather.shidu;
                }
            });
            // 判断当前环境，改变图片验证码的地址
			if (process.env.NODE_ENV == 'development') {
				_that.imageCode = '/api' + Api.imageCode;
			}else{
				_that.imageCode = 'http://a.91jfk.com' + Api.imageCode;
			}
        },
        methods: {
            loadTime(){
                this.time = Public.updateTime()[0];
                this.date = Public.updateTime()[1]; 
            },
			changeImg(){		// 改变图片验证码
				this.imageCode = this.imageCode +  '?c=' + Math.random();
			},
            goIndex(){
                this.load = true;
                let date = Public.setTimes('d1');
                Public.JS_Cookie('remove', 'type');
                Public.JS_Cookie('set', 'type', '1', date);
                this.$message({
                    message: '恭喜您，登陆成功！',
                    type: 'success',
                    center: true,
                    duration: 1200
                });
                setTimeout(() => {
                    this.$router.push({
                        name: 'index'
                    });
                    this.load = false;
                }, 1200);
            },
            getCode(){
                if (Public.checkType(this.input1, 'phone')) {
                    if (this.input3 != '') {
                        let data = {
                            state: 3,
                            verify: this.input3,
                            tel: this.input1
                        };
                        Code(data).then((res) => {
                            if (res.code == '1') {
                                this.alert('验证码已发送，请注意查收', 'success');
                                this.Countdown = 60;
                                this.timer();
                            } else if(res.code == '0'){
								this.alert('图片验证码错误，请重新获取', 'error');
								this.changeImg();
							} else {
                                this.alert(res.msg, 'warning');
                            }
                        }).catch((err)=>{
                            console.log(err);
                        });
                    } else {
                        this.alert('请输入右侧的图片验证码', 'warning');
                    }
                } else {
                    this.alert('请输入正确的手机号码', 'warning');
                }

            },
            timer: function () {
                if (this.Countdown > 0) {
                    this.Countdown--;
                    setTimeout(this.timer, 1000);
                    this.disabled = true;
                    this.btn_text = this.text();
                    if (this.Countdown == 0) {
                        this.Countdown = 0;
                        this.disabled = false;
                        clearTimeout(this.timer);
                    }
                }
            },
            text: function () {
                return this.Countdown > 0 ? this.Countdown + 's' : '重新获取';
            },
			alert(msg, alertType){
				this.$message({
					showClose: true,
					message: msg,
					type: alertType,
					center: true,
					duration: 2000
				});
			}
        }
    };
</script>
<style lang="scss" scoped>
    @import '../../style/sass/adminLogin/login.sass';
</style>