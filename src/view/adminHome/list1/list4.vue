<template>
    <div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabs" :key="index+1" :label="item.lable" :name="item.name">
                <el-collapse accordion>
                    <el-collapse-item title="功能操作" name="1">
                        <div class="operate">
                            <el-button type="success" size="small" @click="success">批量成功</el-button>
                            <el-button type="warning" size="small">批量失败</el-button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
                <template>
                    <Table @isCheck="check" :tableData="tabledata"></Table>
		            <Pagination @pageChange="pageNum" :paginationData='paginationData'></Pagination>
                </template>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Public from '@/until/public/until';
    import Table from '../../../components/table/table.vue';
	import Pagination from '../../../components/Pagination/Pagination.vue';
    export default {
    	components: {
    		Table,
    		Pagination
    	},
        data() {
            return {
                paginationData: {
                    pageSize: 10,
                    totalNum: 2000,
                    activePage: 1
                },
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
    			},
                activeName: 'bill',
                tabs: [{
                    lable: '话费',
                    name: 'bill'
                }, {
                    lable: '流量',
                    name: 'flow'
                }, {
                    lable: '油卡',
                    name: 'fuel'
                }]
            };
        },
        methods: {
            handleClick(tab) {
                this.activeName = tab.name;
                if (tab.name === 'bill') {
                    console.log('bill');
                } else if (tab.name === 'flow') {
                    console.log('flow');
                } else if (tab.name === 'fuel') {
                    console.log('fuel');
                }
            },
            pageNum(val){
                this.nowPage = val;
            },
            check(val){
            	if (val.length != 0) {
            		this.checkedId = [];		// 先清空再push，放置重复
              		val.forEach((item, index) => {
            			this.checkedId.push(item.id);
            		});
            		console.log(this.checkedId);
            	}
            },
            success(){
                if (this.activeName === 'bill') {
                    console.log('bill');
                } else if (this.activeName === 'flow') {
                    console.log('flow');
                } else if (this.activeName === 'fuel') {
                    console.log('fuel');
                }
            }
        }
    };
</script>
<style lang="scss" scoped>

</style>