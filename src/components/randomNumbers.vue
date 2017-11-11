<template>
    <div>
        <header>
            <div class="button-group">
                <router-link to="/"><img src="../assets/icons/arrow_back.svg" alt="back to home page"></router-link>
                <h1>Random Numbers</h1>
            </div>
            <div class="button-group">
                <button v-on:click="toggleSettings">
                <img v-if="showSettings" src="../assets/icons/close.svg" alt="close settings button">
                <img v-else src="../assets/icons/settings.svg" alt="show settings button">
                </button>
                <button v-on:click="toggleAbout">
                <img v-if="showAbout" src="../assets/icons/close.svg" alt="close about button">
                <span v-else>?</span>
                </button>
             </div>
        </header>
        <div class="info-boxes-container">
            <transition name="slide">
                <div v-if="showAbout" class="about-info">
                    <h3>Random Numbergy Generator</h3>
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
                    v-model.number="numberOne">
                    <label for="numberTwo">...and...</label>
                    <input 
                    type="number" 
                    name="numberTwo" 
                    v-model.number="numberTwo">
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
                    max="10" 
                    v-model.number="numberOfNumbers">
                    <p>(Choosing {{numberOfNumbers}} numbers between {{this.bounds.lower}} and {{this.bounds.upper}}, to {{decimalPlaces}} decimal places.)</p>
                </div>
            </transition>
        </div>
        
        <div class="numbers-container">
            <div v-for="number in randomNumbers" class="number-output">{{number}}</div>
        </div>
        
        <button v-on:click="go" class="go-button">Go</button>

    </div>
</template>

<script>
export default {
    data: function(){
        return {
            showSettings: false,
            showAbout: false,
            numberTwo: 100,
            numberOne: 20,
            decimalPlaces: 0,
            numberOfNumbers: 3,
            randomNumbers: [],
        }
    },
    methods: {
        toggleAbout: function(){
            this.showAbout = !this.showAbout
        },
        toggleSettings: function(){
            this.showSettings = !this.showSettings
        },
        makeNumbers: function(){
            this.randomNumbers = []
            for(let i = this.numberOfNumbers; i > 0; i--){
                this.randomNumbers[i - 1] = ((Math.random() * (this.bounds.upper - this.bounds.lower)) + this.bounds.lower).toFixed(this.decimalPlaces)
            }
        },
        go: function(){
            let t = 0
            let r = setInterval(() => {
                if(t === 10){
                    clearInterval(r)
                } else {
                    this.makeNumbers()
                    t++
                }
            }, 50)
        }
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
        }
    },
    created: function(){
        this.makeNumbers()
    }
}
</script>

<style lang="scss">
    @import '../base.scss';

    .go-button{
        @include icon-button(100px);
        @include card(2, $accent);
        margin: $gutter auto $gutter*2 auto;
        &:hover, &:focus{
            transform: scale(1);
            @include card(4, $accent);
        }
    }

    .numbers-container{
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        justify-content: space-around;
        .number-output{
            font-size: 4rem;
            box-sizing: border-box;
            margin: $gutter 0 0 0;
            padding: 0 $gutter;
            min-width: 24%;
            height: 2em;
            @include card(1);
            text-align: center;
            line-height: 2em;
       }
    }

</style>
