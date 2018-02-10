<template>
    <div>
        <vue-count-up :start='countUpConfig.start' :end="value1" :duration="countUpConfig.duration" :options="countUpConfig.option" :autoplay="true"></vue-count-up>
    </div>
</template>
<script>
    import vueCountUp from '@/components/ConntUp/conutUp.vue';
    export default {
        components: {
            vueCountUp
        },
        data () {
            return {
                countUpConfig: {
                    duration: 2.5,
                    start: 0,
                    option: {
                        useEasing : true,
                        useGrouping : true,
                        separator : ',',
                        decimal : '.',
                        prefix : '$',
                        suffix : '元'
                    }
                },
                value1: 999900000000000.98
            }
        },
        mounted(){
            
        },
        methods:{
            
        }
    }
</script>
<style scoped>

</style>