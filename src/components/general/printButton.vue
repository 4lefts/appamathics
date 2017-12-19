<template>
    <button class="print-button" v-on:click.prevent="printSheet"><img src="../../assets/icons/print.svg" alt="print button"></button>
</template>

<script>
export default {  
    methods: {
        printSheet: function(){
            window.print()
        }
    },
}
</script>

<style lang="scss">
    @import '../../base.scss';
    .print-button{
        @include icon-button(50px, $accent);
    }
</style>
