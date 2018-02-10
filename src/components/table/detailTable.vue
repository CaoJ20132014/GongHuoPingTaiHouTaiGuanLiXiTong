<template>
	<el-table :data="data.data" align="center" style="width: 100%" border stripe @expand-change="OpenDetail">
		<template>
            <el-table-column align="center" type="index" width="60" label="序号"></el-table-column>
        </template>
		<template v-for="item in data.config">
			<el-table-column align="center" :prop="item.prop" :label="item.label"></el-table-column>
		</template>
		<el-table-column align="center" type="expand" label="详情" width="60">
			<template slot-scope="props">
				<el-form label-position="left" inline class="demo-table-expand">
					<el-form-item v-for="(item,index) in data.formConfig" :key="index" :label="item.label">
						<span>{{item.prop}}</span>
					</el-form-item>
				</el-form>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
	export default {
		props:[
			'data'
		],
		data() {
			return {
				
			};
		},
		computed: {
			reversedMessage: function(){
				return 1111;
			}
		},
		methods: {
			OpenDetail(row, expandedRows){
				this.$emit("detail",row);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.demo-table-expand {
		font-size: 0;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 50%;
		border-bottom: 1px solid #f4f4f4;
	}
</style>