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
                        <div class="screen-header">
                            <h2>Have some fluency practice...</h2>
                            <p>...it's like eating All Bran. No-one really likes it, but some old people said it was good for you.</p>
                        </div>
                        <div class="print-header">
                            <h2>Fluency Practice</h2>
                        </div>
                        <geometryQuestion ref="angle"></geometryQuestion>
                        <div class="question" v-for="(q, i) in questionsData">
                            <span>{{i + 1}}.</span>
                            <span 
                            v-if="q.a.hasOwnProperty('numerator')"
                            class="frac">
                                <span class="numerator">{{q.a.numerator}}</span>
                                <span class="line">/</span>
                                <span class="denominator">{{q.a.denominator}}</span>
                            </span>
                            <span
                            v-else-if="q.a.hasOwnProperty('base')">
                            {{q.a.base}}<sup>{{q.a.exp}}</sup>
                            </span>
                            <span v-else>{{q.a}}</span>
                            <span>{{q.op}}</span>
                            <span v-if="i === 3">{{q.a.denominator * q.b}}</span> <!-- question 4 needs to be an int multiple of denominator -->
                            <span 
                            v-else-if="q.b.hasOwnProperty('numerator')"
                            class="frac">
                                <span class="numerator">{{q.b.numerator}}</span>
                                <span class="line">/</span>
                                <span class="denominator">{{q.b.denominator}}</span>
                            </span>
                            <span
                            v-else-if="q.b.hasOwnProperty('base')">
                            {{q.b.base}}<sup>{{q.b.exp}}</sup>
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
import geometryQuestion from './geometryQuestion.vue'

export default {
    components: {
        top,
        printButton,
        geometryQuestion
    },
    data: function(){
        return {
            title: 'Fluency Sheets, Set 2',
            showSettings: false,
            showAbout: false,
            questionsData: [],
        }
    },
    methods: {
        generateQuestions: function(){
            this.questionsData = [
                {
                    a: makeProperFraction(10),
                    b: makeProperFraction(10),
                    op: '+'
                },
                {
                    a: makeProperFraction(10),
                    b: makeProperFraction(10),
                    op: String.fromCharCode(215)
                },
                {
                    a: makeProperFraction(10),
                    b: randomInt(2, 10),
                    op: String.fromCharCode(247)
                },
                {
                    a: makeProperFraction(10),
                    b: randomInt(10, 50), //this is multiplied above so that it's a multiple of the denominator
                    op: String.fromCharCode(215)
                },
                {
                    a: makePower(randomInt(2, 10)),
                    b: makePower(randomInt(2, 10)),
                    op: (Math.random() > 0.5 ? '+' : '-')
                },
                {
                    a: `${randomInt(1, 20) * 5}%`,
                    b: `${randomInt(10, 30) * 20}`,
                    op: String.fromCharCode(215)
                },
                {
                    a: randomInt(200, 800),
                    b: randomInt(10, 20),
                    op: String.fromCharCode(247)
                },
                {
                    a:'cuboid',
                    b: 'volume',
                    op: String.fromCharCode(215)
                }
            ]
            //use refs to update triangle component
            this.$refs.angle.p5.init()
        }
    },
    mounted: function(){
        this.generateQuestions()
    }
}

function makeProperFraction(lim){
    const denominator = randomInt(2, lim + 1)
    const numerator = randomInt(1, denominator - 1)
    return {
        numerator,
        denominator
    }
}

function makePower(n){
    return {
        base: n,
        exp: (Math.random > 0.5 ? 2 : 3)
    }
}

//returns a random integer between lo and hi - 1
function randomInt(lo, hi){
    const range = hi - lo
    return Math.floor((Math.random() * range) + lo)
}
</script>

<style lang="scss" scoped>
    @import '../../base.scss';
    @media screen {
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
                .screen-header{
                    display: block;
                }
                .print-header{
                    display: none;
                }
            }
        }
        .reroll-button{
            @include icon-button(50px, $accent);
        }
    }

    .sheet-output{
        .screen-header, .print-header{
            margin-bottom: 2em;
        }
        .question{
            font-size: 1.6em;
            height: 3em;
        }
        .frac{
            display: inline-block;
            position: relative;
            vertical-align: middle;
            letter-spacing: 0.001em;
            text-align: center;
        }
        .frac > span{
            display: block;
            font-size: 0.64em;
            padding: 0.1em;
        }
        .frac > span.denominator{
            border-top: 1.4px solid black;
        }
        .frac > span.line{
            display: none;
        }
        sup{
            font-size: 0.5em;
        }
    }

    @media print {
        $printSz: 17cm;
        .controls-container, .screen-header{
            display: none;
        }
        .print-header{
            display: block;
            border-bottom: 1px solid $text;
            text-transform: uppercase;
        }
        .sheet-container{
            width: $printSz;
            margin: auto;
        }
    }
</style>
