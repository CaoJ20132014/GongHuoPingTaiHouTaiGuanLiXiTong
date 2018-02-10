<template>
    <div>
    	<el-table :data="tableData.data" border stripe style="width: 100%" @selection-change="check">
            <template>
                <el-table-column align="center" type="selection" width="60"></el-table-column>
            </template>
            <template>
                <el-table-column align="center" type="index" width="60" label="序号"></el-table-column>
            </template>
			<template v-for="column in columns" align="center">
                <el-table-column align="center" v-if="!column.isSort" :prop="column.prop" :label="column.label" :width="column.width"></el-table-column>
				<el-table-column align="center" v-else sortable :prop="column.prop" :label="column.label" :width="column.width"></el-table-column>
			</template>
		</el-table>
    </div>
</template>
<script>
    export default {
    	props: [
    		'tableData'
    	],
    	data(){
    		return {
				columns: this.tableData.columns
    		}
    	},
		methods: {
            check(item){
                if (item.length != 0) {
                    this.$emit("isCheck",item);
                }
            }
		}
    }
</script>
<style scoped>

</style>