<template>
    <div>
        <p>points: {{points}}</p>
        <p>we'll put some + and - buttons here</p>
        <div id="sketch-container"></div>
        <button v-on:click="init">reset</button>
    </div>
</template>

<script>
import p5 from 'p5'
import {sketch} from './p5test.js'
export default {
    name: 'p5Test',
    data: function(){
        return {
            points: 3,
            p5,
        }
    },
    methods: {
        init: function(){
            this.p5.initPolygon(this.points)
        }
    },
    mounted: function(){
        this.p5 = new p5(sketch, 'sketch-container')
        setTimeout(() => this.p5.initPolygon(this.points), 1000)
    },
}
</script>

<style lang="scss">
@import '../../base.scss';
#sketch-container{
    @include container;
    @include card(2);
    margin-top: $gutter;
    margin-bottom: $gutter * 4;
}
</style>