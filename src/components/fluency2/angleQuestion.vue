<template>
    <div class="geo-question">7. What are the angles 'a' and 'b'?
        <div id="shape-container"></div>
    </div>
</template>

<script>
import p5 from 'p5'
const shape = function(s){
    
    let angle_a
    let rotation

    s.init = function(){
        angle_a = s.random(0.2, s.PI - 0.2)
        rotation = s.random(s.TWO_PI)
    }

    s.drawLabels = function(theta){
        s.push()
            s.noStroke()
            s.fill(0)
            s.textSize(18)
            s.push()
                s.rotate(theta/2)
                s.translate(40, 0)
                s.rotate((-theta/2) - rotation) //undo rotation
                s.translate(0, 6)
                s.text('b', 0, 0)
            s.pop()
            s.push()
                s.rotate(theta + ((s.PI - theta) / 2))
                s.translate(40, 0)
                s.rotate((-(theta + ((s.PI - theta) / 2))) - rotation) //undo
                s.translate(0, 6)
                s.text('a', 0, 0)
            s.pop()
        s.pop()
    }

    s.setup = function(){
        const cnv = s.createCanvas(300, 300)
        s.init()
    }

    s.draw = function(){
        s.background(255)
        
        s.push()
            s.translate(s.width/2, s.height/2)
            s.rotate(rotation)
            s.stroke(64)
            s.fill(180, 100)
            s.arc(0, 0, 100, 100, 0, s.PI)
            s.stroke(0)
            s.strokeCap(s.PROJECT)
            s.strokeWeight(2)
            s.line(-s.width/2, 0, s.width/2, 0)
            s.line(0, 0, Math.cos(angle_a) * s.width/2, Math.sin(angle_a) * s.height/2)
            s.drawLabels(angle_a)
        s.pop()
    }
}
export default {
    data: function(){
        return{
            p5
        }
    },
    mounted: function(){
        this.p5 = new p5(shape, 'shape-container')
    }
}
</script>

<style lang="scss" scoped>
    .geo-question{
        font-size: 1.6em;
    }
</style>
