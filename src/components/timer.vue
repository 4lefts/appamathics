<template>
  <div>
      <header>
            <div class="container">
                <h1>Timer</h1>
            </div>
            <div class="button-group">
                <button v-on:click="showSettings = !showSettings">
                <img v-if="showSettings" src="../assets/icons/close.svg" alt="close settings button">
                <img v-else src="../assets/icons/settings.svg" alt="show settings button">
                </button>
                <button v-on:click="showAbout = !showAbout">
                <img v-if="showAbout" src="../assets/icons/close.svg" alt="close about button">
                <span v-else>?</span>
                </button>
                <router-link to="/"><img src="../assets/icons/arrow_back.svg" alt="back to home page"></router-link>
            </div>
        </header>
        <transition name="slide">
            <div class="settings" v-if="showSettings">
                <h3>Timer Length</h3>
                <label for="minutes-input">Minutes</label>
                <input 
                type="number"
                name="minutes-input"
                v-model.number="minutesInput" 
                min="0" max="60" value="0">
                <label for="seconds-input">Seconds</label>
                <input 
                type="number" 
                name="seconds-input" 
                v-model.number="secondsInput"
                min="0" max="59" value="5">
            </div>
        </transition>
        <transition name="slide">
            <div v-if="showAbout" class="about-info">
                <h2>A One-Minute Timer</h2>
                <p>"If you can fill the unforgiving minute<br>With sixty seconds worth of distance run,<br>Yours is the Earth and everything that’s in it..."</p>
            </div>
        </transition>
        <div>{{time}}</div>   
        <div id="countdown">{{countdown | parseTime}}</div>
        <button v-on:click="isRunning = !isRunning" class="go-button">
            <span v-if="isRunning">Stop</span>
            <span v-else>Go</span>
        </button>
  </div>
</template>

<script>
export default {
    data: function(){
       return {
            showSettings: false,
            showAbout: false,
            minutesInput: 0,
            secondsInput: 5,
            isRunning: false,
            countdown: 0,
        }
    },
    methods: {
        go: function(){
            this.countdown = this.time
            setInterval(_ => {
                if(this.isRunning){
                    if(this.countdown > 0){
                        this.countdown--
                    } else {
                        this.isRunning = false
                        //wait here!
                        setTimeout(_ => {
                            this.countdown = this.time
                        }, 1000)
                    }
                }
            }, 1000)
        }
    },
    filters: {
        parseTime: function(t){
            const m = Math.floor(t/60)
            const s = t % 60
            const mStr = m > 9 ? m.toString() : '0' + m.toString()
            const sStr = s > 9 ? s.toString() : '0' + s.toString()
            return `${mStr}:${sStr}`
        }
    },
    computed: {
        time: function(){
            return (this.minutesInput * 60) + this.secondsInput
        }
    },
    created: function(){
        this.go()
    }
}
</script>

<style lang="scss">
    @import '../base.scss';
    #countdown{
        font-size: 30vmin;
        text-align: center;
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
</style>
