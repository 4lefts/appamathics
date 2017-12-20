<template>
    <div>
        <top
            v-bind:title="title"
            v-bind:show-settings="showSettings"
            v-bind:show-about="showAbout"
            v-on:toggleSettings="showSettings = !showSettings"
            v-on:toggleAbout="showAbout = !showAbout"
        ></top>
        <div class="info-boxes-container">
            <transition name="slide">
                <div v-if="showAbout" class="about-info">
                    <h3>Something</h3>
                    <p>Stuff stuff stuff.</p>
                </div>
            </transition>
            <transition name="slide">
                <div class="settings" v-if="showSettings">
                    <h3>Some Settings</h3>
                    <p>Settings stuff etc blah</p>
                </div>
            </transition>
        </div>
        <div>
            <div class="sheet-container">
                <div class="sheet-inner">
                    <div class="controls-container">
                        <button class="reroll-button" v-on:click.prevent="generateQuestions"><img src="../../assets/icons/refresh.svg" alt="re-generate sheet button"></button>
                        <printButton></printButton>
                    </div>
                    <div class="sheet-output">
                        <h2>Fluency Practice</h2>
                        <div v-for="(q, i) in questionData">
                            <span>{{i + 1}}.</span>
                            <span 
                            v-if="q.a.hasOwnProperty('numerator')"
                            class="frac">
                                <span class="numerator">{{q.a.numerator}}</span>
                                <span class="line">/</span>
                                <span class="denominator">{{q.a.denominator}}</span>
                            </span>
                            <span v-else>{{q.a}}</span>
                            <span>{{q.op}}</span>
                            <span 
                            v-if="q.b.hasOwnProperty('numerator')"
                            class="frac">
                                <span class="numerator">{{q.b.numerator}}</span>
                                <span class="line">/</span>
                                <span class="denominator">{{q.b.denominator}}</span>
                            </span>
                            <span v-else>{{q.b}}</span>
                            <span>=</span>
                            <span class="answer"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import top from '../top.vue'
import printButton from '../general/printButton.vue'
export default {
    components: {
        top,
        printButton,
    },
    data: function(){
        return {
            title: 'Fluency Sheets',
            showSettings: false,
            showAbout: false,
            questionData: []
        }
    },
    methods: {
        generateQuestions: function(){
            this.questionData = [
                {
                    a: makeProperFraction(10),
                    b: makeProperFraction(10),
                    op: '+'
                },
                {
                    a: '1%',
                    b: '2',
                    frac: 'foo',
                    op: 'of'
                }
            ]
        }
    }
}

function makeProperFraction(lim){
    const denominator = Math.floor(Math.random() * (lim - 2)) + 2
    const numerator = Math.floor(Math.random() * (denominator - 1) + 1)
    return {
        numerator,
        denominator
    } 
}
</script>

<style lang="scss">
    @import '../../base.scss';
    .sheet-container{
        margin: 0 $gutter $gutter $gutter;
        .sheet-inner{
            @include container();
            @include card(1);
            box-sizing: border-box;
            padding: $gutter;
            background-color: #ffffff;
            .controls-container{
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                button{
                    margin-right: $gutter;
                    &:last-child{
                        margin: 0;
                    }
                }
            }
            .sheet-output{
                font-size: 2em;
                // .answer{
                //     display: inline-block;
                //     width: 3em;
                //     border-bottom: 2px solid $text;
                // }
                .frac{
                    display: inline-block;
                    position: relative;
                    vertical-align: middle;
                    letter-spacing: 0.001em;
                    text-align: center;
                }
                .frac > span{
                    display: block;
                    font-size: 0.8em;
                    padding: 0.1em;
                }
                .frac > span.denominator{
                    border-top: 1.4px solid black;
                }
                .frac > span.line{
                    display: none;
                }
            }
        }
    }
    .reroll-button{
        @include icon-button(50px, $accent);
    }
</style>
