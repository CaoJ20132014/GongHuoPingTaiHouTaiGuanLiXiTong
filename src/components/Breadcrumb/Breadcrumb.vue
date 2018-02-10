<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
    export default {
        props: [
            'breadcrumb'
        ],
        data () {
            return {
                isShow: true
            }
        },
        watch: {
            
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>
<style lang="scss" scoped>
    .el-breadcrumb{
        font-size: 16px;
        padding-top: 9px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e6e6e6;
    }
</style>