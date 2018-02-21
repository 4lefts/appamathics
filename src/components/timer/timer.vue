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
                    <h3>A Timer</h3>
                    <p><em>"If you can fill the unforgiving minute<br>With sixty seconds worth of distance run,<br>Yours is the Earth and everything that’s in it..."</em></p>
                </div>
            </transition>
        </div>
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
import top from '../top.vue'
export default {
    components: {
        top
    },
    data: function(){
       return {
            title: 'Timer',
            showSettings: false,
            showAbout: false,
            minutesInput: 1,
            secondsInput: 0,
            isRunning: false,
            countdown: 0,
            end: 0,
        }
    },
    methods: {
        go: function(){
            this.isRunning = true
            this.end = Date.now() + this.initialSeconds * 1000 //in ms
            const i = setInterval(() => {
                if(this.isRunning){
                    if(Date.now() < this.end){
                        this.countdown = Math.floor((this.end - Date.now()) / 1000)
                        console.log(this.countdown)
                    } else {
                        setTimeout(() => {
                            this.isRunning = false
                            this.countdown = this.initialSeconds
                        }, 1000)
                    }
                } else {
                    clearInterval(i)
                }
            }, 100)
        },
        stop: function(){
            this.isRunning = false
        },
        reset: function(){
            this.end = Date.now() + this.initialSeconds * 1000 //in ms
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
    }
}
</script>

<style lang="scss" scoped>
    @import '../../base.scss';
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
        @include icon-button(80px);
        @include card(2, $primary);
        &:hover, &:focus{
            transform: scale(1);
            @include card(4, $primary);
        }
    }
    .stop-button{
        @include icon-button(80px);
        @include card(2, $accent);
        &:hover, &:focus{
            transform: scale(1);
            @include card(4, $accent);
        }
    }
    .reset-button{
        margin-left: $gutter*5;   
    }
    @media screen and (min-width: 480px){
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
    }
</style>
