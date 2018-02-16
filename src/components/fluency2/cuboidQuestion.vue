<template>
    <div class="geo-question">8. What is the volume of this shape?
        <div id="cuboid-container"></div>
    </div>
</template>

<script>
import p5 from 'p5'
const shape = function(s){
    
    let cuboidImg

    s.init = function(){
        return false
    }

    s.drawLabels = function(theta){
        s.push()
           
        s.pop()
    }

    s.preload = function(){
        cuboidImg = s.loadImage('cuboid.png')
    }

    s.setup = function(){
        const cnv = s.createCanvas(400, 300)
        s.init()
    }

    s.draw = function(){
        s.background(255)
        s.image(cuboidImg, 0, 0)
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
