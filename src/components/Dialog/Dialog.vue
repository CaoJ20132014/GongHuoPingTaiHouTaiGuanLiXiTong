<template>
	<div>
		<el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" custom-class="successOperate">
		  	<el-form>
		    	<el-form-item v-for="(item,index) in dialog.form" :key="index" :label="item.lable">
		      		<el-input v-model="item.prop" auto-complete="off"></el-input>
		    	</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible">取消</el-button>
		    	<el-button type="primary" @click="dialogFormVisible">确定</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		props:[
			'dialog'
		],
		data() {
			return {
				
			};
		},
		computed: {
			
		},
		methods: {
			dialogFormVisible(){

			}
		}
	};
</script>
<style lang="scss" scoped>
	.el-input{
		width: 300px;
	}
</style>