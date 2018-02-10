<template>
    <div>
        <Table :tableData="tabledata"></Table>
        <Pagination @pageChange="pageNum" :paginationData='paginationData'></Pagination>
    </div>
</template>
<script>
    import Table from '../../../components/table/operateTable';
    import Pagination from '@/components/Pagination/Pagination';
    export default{
        components: {
            Table,
            Pagination
        },
        data () {
            return {
                paginationData: {
                    pageSize: 10,
                    totalNum: 2000,
                    activePage: 1
                },
                nowPage: 0,
                tabledata: {
    				data: [{
    					id: '1',
			          	operator: '大旭',
			          	lastOperatedAt: '2017-3-18 10:30',
						IP: '192.168.110.121',
						money: 88888888.88,
                        card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '2',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-19 10:30',
						IP: '192.168.110.121',
						money: 8888888.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '3',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-20 10:30',
						IP: '192.168.110.121',
						money: 888888.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '4',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-21 10:30',
						IP: '192.168.110.121',
						money: 888.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '5',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-22 10:30',
						IP: '192.168.110.121',
						money: 8888.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '6',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-23 10:30',
						IP: '192.168.110.121',
						money: 88.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '7',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-24 10:30',
						IP: '192.168.110.121',
						money: 888888888.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '8',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-26 10:30',
						IP: '192.168.110.121',
						money: 8888888888.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '9',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-27 10:30',
						IP: '192.168.110.121',
						money: 88888888888.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}, {
    					id: '10',
	      				operator: '大旭',
	      				lastOperatedAt: '2017-3-28 10:30',
						IP: '192.168.110.121',
						money: 88888888889.88,
						card: '1245679585544521451475',
                        state: ['1','2','3']
	    			}],
					columns: [{
	    				label: '操作人',
				        prop: 'operator',
				        isSort: false,
			            width: 120
	  				}, {
				        label: 'IP',
				        prop: 'IP',
				        isSort: false,
			            width: 210
	  				}, {
				        label: '金额',
				        prop: 'money',
				        isSort: true,
			            width: 180
	  				}, {
				        label: '银行卡',
				        prop: 'card',
				        isSort: false,
			            width: ''
	  				}, {
				        label: '最后操作时间',
				        prop: 'lastOperatedAt',
				        isSort: true,
			            width: 210
	  				}, {
                        label: '操作',
                        width: 310,
                        operations: [{
                            label: '编辑',
                            type: 'success',
                            func: this.editTag,
                            state: '1'
                        }, {
                            label: '详情',
                            type: 'warning',
                            func: this.checkMountedUser,
                            state: '2'
                        }, {
                            label: '禁用',
                            type: 'danger',
                            func: this.disableTag,
                            state: '3'
                        }]
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
            disableTag(index,row){
    			console.log(index);
    			console.log(row);
    		},
    		checkMountedUser(index,row){
    			console.log(index);
    			console.log(row);
    		},
    		editTag(index,row){
    			console.log(index);
    			console.log(row);
    		}
        }
    }
</script>
<style scoped>

</style>