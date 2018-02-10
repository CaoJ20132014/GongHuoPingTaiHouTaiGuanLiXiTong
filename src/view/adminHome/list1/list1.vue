<template>
    <div>
		<el-collapse accordion>
            <el-collapse-item title="功能操作" name="1">
                <div class="operate">
                    <el-button type="warning" size="small"  @click="add">动态添加</el-button>
                </div>
            </el-collapse-item>
        </el-collapse>
		<Table @isCheck="check" :tableData="tabledata"></Table>
		<Pagination @pageChange="pageNum" :paginationData='paginationData'></Pagination>
    </div>
</template>
<script>
	import Table from '../../../components/table/table.vue';
	import Pagination from '../../../components/Pagination/Pagination.vue';
    export default {
    	components: {
    		Table,
    		Pagination
    	},
    	data(){
    		return {
    			paginationData: {
                    pageSize: 10,
                    totalNum: 2000,
                    activePage: 1
                },
				flag: false,
                nowPage: 0,
                checkedId: [],				// 被选中的ID
    			tabledata: {
    				data: [{
    					id: '1',
			          	operator: '大旭',
			          	lastOperatedAt: '2017-3-18 10:30',
						IP: '192.168.110.121',
						money: 88888888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '2',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-19 10:30',
						IP: '192.168.110.121',
						money: 8888888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '3',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-20 10:30',
						IP: '192.168.110.121',
						money: 888888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '4',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-21 10:30',
						IP: '192.168.110.121',
						money: 888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '5',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-22 10:30',
						IP: '192.168.110.121',
						money: 8888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '6',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-23 10:30',
						IP: '192.168.110.121',
						money: 88.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '7',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-24 10:30',
						IP: '192.168.110.121',
						money: 888888888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '8',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-26 10:30',
						IP: '192.168.110.121',
						money: 8888888888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '9',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-27 10:30',
						IP: '192.168.110.121',
						money: 88888888888.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}, {
    					id: '10',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-28 10:30',
						IP: '192.168.110.121',
						money: 88888888889.88,
						card: '1245679585544521451475',
						auth: '柳岩'
	    			}],
					columns: [{
	    				label: '操作人',
				        prop: 'operator',
				        isSort: false,
						width: 100
	  				}, {
				        label: 'IP',
				        prop: 'IP',
				        isSort: false,
						width: 180
	  				}, {
				        label: '金额',
				        prop: 'money',
						isSort: true,
						width: 150
	  				}, {
				        label: '银行卡',
				        prop: 'card',
				        isSort: false,
						width: ''
	  				}, {
				        label: '最后操作时间',
				        prop: 'lastOperatedAt',
				        isSort: true,
						width: 200
	  				}]
    			}
    		}
    	},
        watch: {
            nowPage(){            // 监听当前页的变化，如果有变化开始请求当前页的数据
                console.log(this.nowPage);
            }
        },
        methods: {
            pageNum(val){
                this.nowPage = val;
            },
            check(val){
            	console.log(val);
            	if (val.length != 0) {
            		this.checkedId = [];		// 先清空再push，放置重复
              		val.forEach((item, index) => {
            			this.checkedId.push(item.id);
            		});
            		console.log(this.checkedId);
            	}
            },
			add(){
				const obj = {
					label: '作者',
					prop: 'auth',
					isSort: false
				}
				if (this.flag) {
					this.tabledata.columns.forEach(item => {
						if (item.prop == obj.prop) {
							this.tabledata.columns.splice(this.tabledata.columns.indexOf(item),1);
						}
					});
					this.flag = false;
				} else {
					this.tabledata.columns.push(obj);
					this.flag = true;
				}
			},
			remove(Array, val) {
				var index = Array.indexOf(val);
				if (index > -1) {
					Array.splice(index, 1);
				}
			}
		},
		mounted(){
			
		}
    }
</script>
<style scoped>

</style>