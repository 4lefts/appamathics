<template>
  <div>
      <header>
            <div class="button-group">
                <router-link to="/"><img src="../assets/icons/arrow_back.svg" alt="back to home page"></router-link>
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
                <p><em>"If you can fill the unforgiving minute<br>With sixty seconds worth of distance run,<br>Yours is the Earth and everything that’s in it..."</em></p>
            </div>
        </transition>
        <div id="countdown" v-bind:class="{running: isRunning}">{{countdown | parseTime}}</div>
        <div class="control-buttons">
            <button 
            v-on:click="go"
            v-if="!isRunning" 
            class="start-button">Go</button>
            <button 
            v-on:click="stop"
            v-else 
            class="stop-button">Pause</button>
            <button 
            v-on:click="reset"
            class="reset-button">Reset</button>
       </div>
  </div>
</template>

<script>
export default {
    data: function(){
       return {
            showSettings: false,
            showAbout: false,
            minutesInput: 1,
            secondsInput: 0,
            isRunning: false,
            countdown: 0,
        }
    },
    methods: {
        go: function(){
            this.isRunning = true
            console.log(this.countdown)
            const i = setInterval(() => {
                if(this.isRunning){
                    if(this.countdown > 0){
                        this.countdown--
                    } else {
                        setTimeout(() => {
                            this.isRunning = false
                            this.countdown = this.initialSeconds
                        }, 2000)
                    }
                } else {
                    clearInterval(i)
                }
            } , 1000)
        },
        stop: function(){
            this.isRunning = false
        },
        reset: function(){
            this.countdown = this.initialSeconds
        }
    },
    watch:{
        minutesInput: function(){
            this.countdown = this.initialSeconds
        },
        secondsInput: function(){
            this.countdown = this.initialSeconds
        }
    },
    filters: {
        //convert seconds (number) into mm:ss string
        parseTime: function(t){
            const m = Math.floor(t/60)
            const s = t % 60
            const mStr = m > 9 ? m.toString() : '0' + m.toString()
            const sStr = s > 9 ? s.toString() : '0' + s.toString()
            return `${mStr}:${sStr}`
        }
    },
    computed: {
        initialSeconds: function(){
            return (this.minutesInput * 60) + this.secondsInput
        },
    },
    created: function(){
        this.countdown = this.initialSeconds
        console.log(this.countdown)
        console.log(typeof(this.countdown))
    }
}
</script>

<style lang="scss">
    @import '../base.scss';
    #countdown{
        font-size: 30vmin;
        text-align: center;
        @include text-card(2);
        color: $light;
        transition: all .2s ease;
        &.running{
            color: $text;
            @include text-card(5);
        }
    }
    .control-buttons{
        margin: $gutter auto $gutter*2 auto;
        display: flex;
        justify-content: center;
    }
    .start-button, .reset-button{
        @include icon-button(100px);
        @include card(2, $primary);
        &:hover, &:focus{
            transform: scale(1);
            @include card(4, $primary);
        }
    }
    .stop-button{
        @include icon-button(100px);
        @include card(2, $accent);
        &:hover, &:focus{
            transform: scale(1);
            @include card(4, $accent);
        }
    }
    .reset-button{
        margin-left: $gutter*5;   
    }
</style>
