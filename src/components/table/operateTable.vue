<template>
    <div>
    	<el-table :data="tableData.data" border stripe style="width: 100%">
        <template>
            <el-table-column align="center" type="index" width="60" label="序号"></el-table-column>
        </template>
      	<template v-for="column in tableData.columns">
        	<el-table-column v-if="column.operations" align="center" :prop="column.prop" :label="column.label" :width="column.width">
            	<template slot-scope="scope">
              		<el-button v-for="(operate,index) in column.operations" v-if="scope.row.state[0] == operate.state || scope.row.state[1] == operate.state || scope.row.state[2] == operate.state" :key="index" size="mini" :type="operate.type" @click="operate.func(scope.$index, scope.row)" v-text="operate.label"></el-button>
            	</template>
         	</el-table-column>
            <el-table-column v-else-if="column.isSort" sortable align="center" :prop="column.prop" :label="column.label" :width="column.width"></el-table-column>
            <el-table-column v-else align="center" :prop="column.prop" :label="column.label" :width="column.width"></el-table-column>
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
                
    		}
        }
    }
</script>
<style scoped>

</style>