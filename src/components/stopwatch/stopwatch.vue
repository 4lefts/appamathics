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
                    <h3>Stopwatch Speed... ?</h3>
                    <p>Some kind of range slider will be here. Elastic time anyone?</p>
                </div>
            </transition>
            <transition name="slide">
                <div v-if="showAbout" class="about-info">
                    <h3>A Stopwatch</h3>
                    <p>Press to go and pause.</p>
                </div>
            </transition>
        </div>
        <div 
            id="countdown"
            v-if="isPaused"
            v-bind:class="{running: isRunning}">{{pausedState | parseTime}}
        </div>
        <div 
            id="countdown"
            v-else
            v-bind:class="{running: isRunning}">{{state | parseTime}}
        </div>
        <div class="control-buttons">
            <button 
            v-on:click="go"
            v-if="!isRunning" 
            class="start-button">Go</button>
            <button 
            v-on:click="resume"
            v-else-if="isPaused" 
            class="start-button">Resume</button>
            <button 
            v-on:click="pause"
            v-else 
            class="pause-button">Pause</button>
            <button 
            v-on:click="reset"
            class="reset-button">Stop</button>
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
            title: 'Stopwatch',
            showSettings: false,
            showAbout: false,
            isRunning: false,
            isPaused: false,
            state: 0,
            pausedState: 0,
            start: 0,
        }
    },
    methods: {
        go: function(){
            this.start = Date.now()
            this.isRunning = true
            const i = setInterval(() => {
                if(this.isRunning){
                    this.state = Date.now() - this.start
                } else {
                    clearInterval(i)
                }
            } , 10)
        },
        pause: function(){
            this.pausedState = this.state
            this.isPaused = true
        },
        resume: function(){
            this.isPaused = false
        },
        reset: function(){
            this.isRunning = false
            this.isPaused = false
            this.state = 0
        }
    },
    filters: {
        //convert number into mm:ss:ms string
        parseTime: function(t){
            const m = Math.floor(t/60000) % 99
            const mStr = m > 9 ? m.toString() : '0' + m.toString()
            const s = Math.floor(t/1000) % 60
            const sStr = `${s.toString().padStart(2, '0')}`
            const ms = t % 1000
            const msStr = `${ms.toString().slice(0, 2).padStart(2, '0')}`
            return `${mStr}:${sStr}:${msStr}`
        }
    },
    computed: {
        initialSeconds: function(){
            return (this.minutesInput * 60) + this.secondsInput
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '../../base.scss';
    #countdown{
        font-size: 20vmin;
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
    .pause-button{
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
        .pause-button{
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
