<template>
    <div class="button-container">
        <button class="print-button" v-on:click.prevent="printSheet"><img src="../../assets/icons/print.svg" alt="print button"></button>
    </div>
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
    .button-container{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        .print-button{
            @include icon-button();
        }
    }
    @media print {
       .button-container{
            display: none;
       } 
    }
</style>
