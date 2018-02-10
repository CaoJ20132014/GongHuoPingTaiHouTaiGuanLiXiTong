<template>
    <span ref='countup'></span>
</template>
<script>
    import CountUp from 'countup.js';
    export default {
        props: {
            start: {
                type: Number,
                default: 0
            },
            end: {
                type: Number,
                default: 0
            },
            decimal: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 2.5
            },
            options: {
                type: Object
            },
            autoplay: {
                type: Boolean,
                required: false,
                default: true
            }
        },
        data() {
            return {
                numAnim: null
            }
        },
        mounted() {
            if (this.autoplay) {
                this.initCountUp();
            }
        },
        methods: {
            initCountUp(){
                this.numAnim = new CountUp(this.$refs.countup,this.start,this.end,this.decimal,this.duration,this.options);
                this.numAnim.start();
            }
        }
    }
</script>
<style scoped>

</style>