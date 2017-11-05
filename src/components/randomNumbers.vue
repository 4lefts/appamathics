<template>
    <div>
        <header>
            <div class="container">
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
                <router-link to="/"><img src="../assets/icons/arrow_back.svg" alt="back to home page"></router-link>
            </div>
        </header>
        <transition name="slide">
            <div v-if="showAbout" class="about-info">
                <h2>Random Number Generator</h2>
                <p>Useful for all kinds of things. Ordering, sorting, comparison, quick starter activities, practising column addition, subtraction, long or short multiplication.</p>
            </div>
        </transition>
        <transition name="slide">
            <div class="numberSettings" v-if="showSettings">
                <h3>Settings</h3>
                <label for="lowerBound">Between...</label>
                <input 
                type="number"
                name="lowerBound"
                v-model.number="lowerBound">
                <label for="upperBound">...and...</label>
                <input 
                type="number" 
                name="upperBound" 
                v-model.number="upperBound">
                <label for="numberOfNumbers">Number of Numbers:</label>
                <input 
                type="number" 
                name="numberOfNumbers" 
                min="1" 
                max="10" 
                v-model.number="numberOfNumbers">
                <label for="decimalPlaces">Decimal Places:</label>
                <input 
                type="number" 
                name="decimalPlaces"
                min="0" 
                max="6"
                v-model.number="decimalPlaces">
                <p>(Choosing {{numberOfNumbers}} numbers between {{this.bounds.lower}} and {{this.bounds.upper}}.)</p>
            </div>
        </transition>
        
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
            upperBound: 100,
            lowerBound: 20,
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
            if(this.upperBound > this.lowerBound){
                return {
                    lower: this.lowerBound,
                    upper: this.upperBound
                }
            } else if(this.upperBound < this.lowerBound){
                return {
                    lower: this.upperBound,
                    upper: this.lowerBound
                }
            } else {
                return {
                    lower: this.lowerBound,
                    upper: this.lowerBound + 1
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
    .numberSettings{
        @include card(1);
        @include container();
        margin: $gutter auto;
        box-sizing: border-box;
        padding: $gutter;
        background-color: #ffffff;
        p{
            margin-bottom: 0;
        }
        h3{
            margin-top: 0.3em;
            margin-bottom: 0.15em; 
        }
    }

    input{
        margin-bottom: 20px;
        &:last-child{
            margin-bottom: 0;
        }
    }

    .go-button{
        @include icon-button(75px);
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
            font-size: 4em;
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
