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
                        <h2>Have some fluency practice...</h2>
                        <p>...it's like eating All Bran. No-one really likes it, but some old people said it was good for you.</p>
                        <div class="question" v-for="(q, i) in questionData">
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
                    a: makeProperFraction(10),
                    b: randomInt(2, 10),
                    op: String.fromCharCode(215)
                },
                {
                    a: makeProperFraction(10),
                    b: randomInt(2, 10),
                    op: String.fromCharCode(247)
                },
                {
                    a: makeProperFraction(10),
                    b: `${randomInt(10, 50) * 10}`,
                    op: 'of'
                },
                {
                    a: `${randomInt(1, 20) * 5}%`,
                    b: `${randomInt(10, 50) * 10}`,
                    op: 'of'
                },
                {
                    a: randomInt(200, 500),
                    b: randomInt(5, 10),
                    op: String.fromCharCode(247)
                },
                {
                    a: randomInt(1000, 5000),
                    b: randomInt(10, 30),
                    op: String.fromCharCode(215)
                }
            ]
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
            }
        }
        .reroll-button{
            @include icon-button(50px, $accent);
        }
    }

    .sheet-output{
        p{
            margin-bottom: 2em;
        }
        .question{
            font-size: 2em;
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
    }

    @media print {
        $printSz: 17cm;
        .controls-container{
            display: none;
        }
        .sheet-container{
            width: $printSz;
            margin: auto;
        }
    }
</style>
