<template>
    <div class="customTabs" ref="scroll">
        <el-tag size="medium" type="success" @click.native="toHome">首页</el-tag>
        <el-tag size="medium" v-for="(tag,index) in tabs" :key="index" :type="$route.meta.route == tag.route ? 'danger' : 'info'" closable :disable-transitions="true" @click.native="changePath(tag)" @close="handleClose(tag)">{{tag.title}}</el-tag>
    </div>
</template>
<script>
    import Public from '../../until/public/until';
    export default {
        props: [
            'tabs'
        ],
        data () {
            return {
                 
            }
        },
        watch: {
            tabs(curVal,oldVal){
                this.$nextTick(() => {      // 两种方法都可以实现    
                    let list = this.$refs.scroll;
                    list.scrollLeft = list.scrollWidth;
                });
            }
        },
        methods: {
            handleClose(tag) {
                let index = this.tabs.indexOf(tag);
                this.tabs.splice(this.tabs.indexOf(tag), 1);
                if (index == 0) {
                    this.$router.push({
                        name: 'index'
                    });
                } else {
                    this.$router.push({
                        name: this.tabs[index-1].route
                    });
                }
            },
            changePath(item){
                this.$router.push({
                    name: item.route
                });
            },
            toHome(){
                this.$router.push({
                    name: 'index'
                });
            }
        }
    }
</script>
<style lang='scss' scoped>
    .customTabs{
        height: 28px;
        margin: 13px 0 10px 0;
        overflow-x: scroll;
        white-space: nowrap;
        &::-webkit-scrollbar{
            display: none;
        }
        .el-tag{
            margin-right: 10px;
            &:hover{
                cursor: pointer;
            }
        }
    }
</style>