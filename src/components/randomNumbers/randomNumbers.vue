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
                    <h3>Random Number Generator</h3>
                    <p>Useful for all kinds of things. Ordering, sorting, comparison, quick starter activities, practising column addition, subtraction, long or short multiplication.</p>
                </div>
            </transition>
            <transition name="slide">
                <div class="settings" v-if="showSettings">
                    <h3>Choose Numbers</h3>
                    <label for="numberOne">Between...</label>
                    <input 
                    type="number"
                    name="numberOne"
                    v-model.number="numberOne"
                    v-on:change="initNumbers">
                    <label for="numberTwo">...and...</label>
                    <input 
                    type="number" 
                    name="numberTwo" 
                    v-model.number="numberTwo"
                    v-on:change="initNumbers">
                    <label for="decimalPlaces">Decimal Places:</label>
                    <input 
                    type="number" 
                    name="decimalPlaces"
                    min="0" 
                    max="6"
                    v-model.number="decimalPlaces">
                    <label for="numberOfNumbers">Number of Numbers:</label>
                    <input 
                    type="number" 
                    name="numberOfNumbers" 
                    min="1" 
                    v-bind:max="Math.abs(numberOne - numberTwo)" 
                    v-model.number="numberOfNumbers"
                    v-on:change="initNumbers">
                    <label for="unique">Make numbers unique?
                        <input 
                        type="checkbox"
                        name="unique"
                        class="unique-checkbox"
                        v-model="unique">
                    </label>
                    <p>(Choosing {{numberOfNumbers}} number<span v-if="numberOfNumbers > 1">s</span> between {{this.bounds.lower}} and {{this.bounds.upper}}, to {{decimalPlaces}} decimal places.)</p>
                </div>
            </transition>
        </div>
        
        <div class="numbers-container">
            <div v-for="(number, idx) in randomNumbers" class="number-output" v-bind:key="idx">{{number}}</div>
        </div>
        <button v-on:click="go" class="go-button">Go</button>

    </div>
</template>

<script>
import top from '../top.vue'
export default {
    components: {
        top   
    },
    data: function(){
        return {
            title: 'Random Numbers',
            showSettings: false,
            showAbout: false,
            numberTwo: 100,
            numberOne: 20,
            decimalPlaces: 0,
            numberOfNumbers: 3,
            randomNumbers: [],
            unique: false,
        }
    },
    methods: {
        makeNumbers: function(){
            this.randomNumbers = []
            if(!this.unique){
                for(let i = this.numberOfNumbers; i > 0; i--){
                    this.randomNumbers[i - 1] = this.chooseBoundedRandomNumber()
                }
            } else {
                for(let i = this.numberOfNumbers; i > 0; i--){
                    let tempN = this.chooseBoundedRandomNumber()
                    while(this.randomNumbers.includes(tempN)){
                        tempN = this.chooseBoundedRandomNumber()
                    }
                    this.randomNumbers[i - 1] = tempN
                }
            }

        },
        chooseBoundedRandomNumber(){
            return ((Math.random() * (this.bounds.upper - this.bounds.lower)) + this.bounds.lower).toFixed(this.decimalPlaces)
        },
        go: function(){
            this.initNumbers()
            let t = 0
            let r = setInterval(() => {
                if(t === 10){
                    clearInterval(r)
                } else {
                    this.makeNumbers()
                    t++
                }
            }, 50)
        },
        clampNumberOfNumbers(){
            const range = Math.abs(this.numberOne - this.numberTwo)
            if(this.numberOfNumbers < 1) this.numberOfNumbers = 1
            this.numberOfNumbers = this.numberOfNumbers > range ? range : this.numberOfNumbers
        },
        initNumbers: function(){
            this.clampNumberOfNumbers()
            this.randomNumbers = Array(this.numberOfNumbers).fill('?')
        },
    },
    computed: {
        bounds: function(){
            if(this.numberTwo > this.numberOne){
                return {
                    lower: this.numberOne,
                    upper: this.numberTwo
                }
            } else if(this.numberTwo < this.numberOne){
                return {
                    lower: this.numberTwo,
                    upper: this.numberOne
                }
            } else {
                return {
                    lower: this.numberOne,
                    upper: this.numberOne + 1
                }
            }
        },
        
    },
    created: function(){
        this.initNumbers()
    }
}
</script>

<style lang="scss">
    @import '../../base.scss';

    .go-button{
        @include icon-button(80px);
        @include card(2, $accent);
        margin: $gutter auto $gutter*2 auto;
        &:hover, &:focus{
            transform: scale(1);
            @include card(4, $accent);
        }
    }
    @media screen and (min-width: 480px){
        .go-button{
            @include icon-button(100px);
            @include card(2, $accent);
            margin: $gutter auto $gutter*2 auto;
            &:hover, &:focus{
                transform: scale(1);
                @include card(4, $accent);
            }
        }
    }

    .unique-checkbox{
        display: inline-block;
        position: relative;
        width: auto;
        vertical-align: bottom;
        margin-left: 8px;
    }

    .numbers-container{
        display: flex;
        flex-direction: column;
        flex-flow: wrap;
        justify-content: space-around;
        margin: 0 $gutter;
        .number-output{
            font-size: 2rem;
            box-sizing: border-box;
            overflow: hidden;
            margin: $gutter 0 0 0;
            padding: 0 $gutter;
            min-width: 49%;
            height: 2em;
            @include card(1);
            text-align: center;
            line-height: 2em;
       }
    }
    @media screen and (min-width: 480px) {
        .numbers-container{
            .number-output{
                font-size: 3rem;
                min-width: 49%;
            }
        }
    }
    @media screen and (min-width: 720px) {
        .numbers-container{
            .number-output{
                font-size: 4rem;
                min-width: 24%;
            }
        }
    }


</style>
