<template>
    <button class="reroll-button" v-on:click.prevent="reroll"><img src="../../assets/icons/print.svg" alt="re-generate sheet button"></button>
</template>

<script>
export default {  
    methods: {
        reroll: function(){
            this.$emit('reroll')
        }
    },
}
</script>

<style lang="scss">
    @import '../../base.scss';
    .reroll-button{
        @include icon-button(50px, $accent);
    }
</style>
