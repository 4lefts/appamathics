<template>
    <div class="chooser-container">
        <p>Choose the tables you'd like to practice:</p>
        <div class="number-chooser">
            <div 
            class="number-choice-button"
            v-for="state, number in numbers"
            v-bind:class="{active: state}"
            v-on:click="toggleNumber(number, state)">
            <span>{{number}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['numbers'],
    methods: {
      toggleNumber: function(number, state){
         this.$emit('toggleNumber', number, state)
      }
    },
}
</script>

<style lang="scss">
    @import '../../base.scss';
    .chooser-container{
        @include card(1);
        @include container();
        margin-top: $gutter;
        width: 100%;
        box-sizing: border-box;
        padding: $gutter;
        background-color: #ffffff;
        .number-chooser{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;
            .number-choice-button{
                $sz: 2.1em;
                line-height: $sz;
                width: $sz;
                font-size: $sz;
                text-align: center;
                margin-bottom: $gutter;
                @include card(1);
                background-color: #ffffff;
                color: $light;
                border-radius: 50%;
                transition: all ease 0.2s;
                &:hover{
                    cursor: pointer;
                    @include card(3);
                }
            }
            .number-choice-button.active{
                background-color: $primary;
                color: #ffffff;
            }
        }
    }
</style>
