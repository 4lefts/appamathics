<template>
    <div class="geo-question">8. What is the volume of this shape?
        <div id="cuboid-container"></div>
    </div>
</template>

<script>
import p5 from 'p5'
const shape = function(s){
    
    let w, h, x, y, label_w, label_h, label_d, offset_x, offset_y

    s.init = function(){
        //calc sizes for drawing cuboid
        w = (Math.random() * 100) + 100
        h = (Math.random() * 50) + 50
        const temp_offset = (Math.random() * 25) + 25
        offset_x = temp_offset
        offset_y = -temp_offset
        //calc size for labels (in cm, kind of)
        label_w = Math.floor(w / 15)
        label_h = Math.floor(h / 15)
        label_d = Math.floor(Math.sqrt(offset_x) / 1.5)
        x = 50
        y = s.height - h - 50
    }

    s.drawLabels = function(theta){
        s.push()
           s.translate(x, y)
           s.noStroke()
           s.fill(0)
           s.textSize(18)
           s.textAlign(s.CENTER)
           s.text(`${label_w}cm`, w / 2, h + 18)
           s.textAlign(s.RIGHT)
           s.text(`${label_h}cm`, -6, h / 2 + 5)
           s.text(`${label_d}cm`, offset_x / 2 - 12, offset_y / 2)
        s.pop()
    }

    s.setup = function(){
        const cnv = s.createCanvas(300, 200)
        s.init()
    }

    s.drawCuboid = function(){
        s.push()
            s.translate(x, y)
            s.stroke(0)
            s.fill(220)
            s.rect(0, 0, w, h)
            s.fill(255)
            s.quad(0, 0, w, 0, w + offset_x, offset_y, offset_x, offset_y)
            s.fill(170)
            s.quad(w, 0, w + offset_x, offset_y, w + offset_x, h + offset_y, w, h)
        s.pop()
    }

    s.draw = function(){
        s.background(255)
        s.drawCuboid()
        s.drawLabels()
    }
}
export default {
    data: function(){
        return{
            p5
        }
    },
    mounted: function(){
        this.p5 = new p5(shape, 'cuboid-container')
    }
}
</script>

<style lang="scss" scoped>
    .geo-question{
        font-size: 1.6em;
    }
</style>
