<template>
    <div>
        <el-collapse accordion>
            <el-collapse-item title="功能操作" name="1">
                <div class="operate">
                    <el-button type="warning" size="small" @click="success">批量成功</el-button>
                    <el-button type="danger" size="small" id="fail">批量失败</el-button>
                </div>
            </el-collapse-item>
        </el-collapse>
        <detailTable @detail="detailChange" :data="tableData"></detailTable>
        <Pagination @pageChange="pageNum" :paginationData='paginationData'></Pagination>
        <Dialog :dialog='dialog'></Dialog>
    </div>
</template>
<script>
    import detailTable from '@/components/table/detailTable';
    import Pagination from '@/components/Pagination/Pagination';
    import Dialog from '@/components/Dialog/Dialog';
    import Public from '@/until/public/until';
    import { validateURL, checkType } from '@/until/validate/validate';
    export default{
        components: {
            detailTable,
            Pagination,
            Dialog
        },
        data () {
            return {
                paginationData: {
                    pageSize: 10,
                    totalNum: 2000,
                    activePage: 1
                },
                nowPage: 0,
                tableData: {
                    data: [{
                        id: "129871221111",
                        name: "好滋好味鸡蛋仔1",
                        category: "江浙小吃、小吃零食1",
                        desc: "荷兰优质淡奶，奶香浓而不腻1",
                        address: "上海市普陀区真北路1",
                        shop: "王小虎夫妻店1",
                        shopId: "101111"
                    }, {
                        id: "129871232222",
                        name: "好滋好味鸡蛋仔2",
                        category: "江浙小吃、小吃零食2",
                        desc: "荷兰优质淡奶，奶香浓而不腻2",
                        address: "上海市普陀区真北路2",
                        shop: "王小虎夫妻店2",
                        shopId: "102222"
                    }, {
                        id: "129871253333",
                        name: "好滋好味鸡蛋仔3",
                        category: "江浙小吃、小吃零食3",
                        desc: "荷兰优质淡奶，奶香浓而不腻3",
                        address: "上海市普陀区真北路3",
                        shop: "王小虎夫妻店3",
                        shopId: "103333"
                    }, {
                        id: "129871264444",
                        name: "好滋好味鸡蛋仔4",
                        category: "江浙小吃、小吃零食4",
                        desc: "荷兰优质淡奶，奶香浓而不腻4",
                        address: "上海市普陀区真北路4",
                        shop: "王小虎夫妻店4",
                        shopId: "104444"
                    }],
					config: [{
	    				label: '商品ID',
				        prop: 'id'
	  				}, {
				        label: '商品名称',
				        prop: 'name'
	  				}, {
				        label: '描述',
				        prop: 'desc'
                    }],
                    formConfig: [{
                        label: '商品名称：',
				        prop: "name"
                    }, {
                        label: '所属店铺：',
				        prop: "name"
                    }, {
                        label: '商品的ID：',
				        prop: "name"
                    }, {
                        label: '店铺的ID：',
				        prop: "name"
                    }, {
                        label: '商品分类：',
				        prop: 'name'
                    }, {
                        label: '店铺地址：',
				        prop: "name"
                    }, {
                        label: '商品描述：',
				        prop: "name"
                    }]
                },
                dialog: {
                    title: '批量成功',
                    dialogVisible: false,
                    form: [{
                        lable: '活动名称1',
                        prop: ''
                    }, {
                        lable: '活动地点1',
                        prop: ''
                    }, {
                        lable: '活动时间1',
                        prop: ''
                    }, {
                        lable: '活动主持1',
                        prop: ''
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
            detailChange(val){
                this.tableData.formConfig[0].prop = val.category;
                this.tableData.formConfig[1].prop = val.shop;
                this.tableData.formConfig[2].prop = val.id;
                this.tableData.formConfig[3].prop = val.shopId;
                this.tableData.formConfig[4].prop = val.name;
                this.tableData.formConfig[5].prop = val.address;
                this.tableData.formConfig[6].prop = val.desc;
            },
            success(){  
                // this.dialog.dialogVisible = true;
                let timestamp = '#demo';
                console.log(Public.addEvent('#fail', 'click', this.console));
            },
            console(){
				console.log('添加点击事件');
				Public.removeEvent('#fail', 'click', this.console);
            }
        }
    }
</script>
<style lang="scss" scoped>
    
</style>