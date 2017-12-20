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

<style lang="scss" scoped>
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
            justify-content: space-around;
            .number-choice-button{
                font-size: 1.7rem;
                line-height: 2em;
                width: 2em;
                text-align: center;
                margin-bottom: $gutter;
                @include card(1);
                background-color: #ffffff;
                color: $light;
                border-radius: 50%;
                transition: all 0.3s ease;
                &:hover{
                    transform: scale(1.05);
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
    @media screen and (min-width: 480px) {
        .chooser-container{
                .number-chooser{
                    .number-choice-button{
                    font-size: 2.3rem;
                }
            }
        }
    }
    @media screen and (min-width: 720px) {
        .chooser-container{
                .number-chooser{
                    .number-choice-button{
                    font-size: 3rem;
                }
            }
        }
    }
</style>
