<template>
    <div class="geo-question">8. What's the area of this shape?
        <div id="shape-container"></div>
    </div>
</template>

<script>
import p5 from 'p5'
const shape = function(s){
    // let numPoints = 3
    let points = []
    let rectBounds = {}
    s.setup = function(){
        const cnv = s.createCanvas(360, 240)
        s.initPoints()
    }
    s.draw = function(){
        s.background(255)
        s.renderBounds(rectBounds)
        s.renderShape(points)
    }
    s.initPoints = function(n){
        points = []
        rectBounds = {}
        const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT']
        const dir = dirs[Math.floor(Math.random() * 4)]
        switch(dir){
            case 'UP':
                points.push({
                    x: s.random(0, s.width),
                    y: 10
                })
                points.push({
                    x: s.random(10, 40),
                    y: s.height - 10
                })
                points.push({
                    x: s.width - s.random(10, 70),
                    y: s.height - 10
                })
                break
            case 'DOWN':
                points.push({
                    x: s.random(0, s.width),
                    y: s.height - 10
                })
                points.push({
                    x: s.random(10, 70),
                    y: 10
                })
                points.push({
                    x: s.width - s.random(10, 40),
                    y: 10
                })
                break
            case 'LEFT':
                points.push({
                    x: 10,
                    y: s.random(0, s.height)
                })
                points.push({
                    x: s.width - 10,
                    y: s.random(10, 70),
                })
                points.push({
                    x: s.width - 10,
                    y: s.height - s.random(10, 70)
                })
                break
            case 'RIGHT':
                points.push({
                    x: s.width - 10,
                    y: s.random(0, s.height)
                })
                points.push({
                    x: 10,
                    y: s.random(10, 70),
                })
                points.push({
                    x: 10,
                    y: s.height - s.random(10, 70)
                })
                break
        }
        rectBounds = points.reduce((bounds, pt) => {
            return {
                dir,
                minX: pt.x < bounds.minX ? pt.x : bounds.minX,
                minY: pt.y < bounds.minY ? pt.y : bounds.minY,
                maxX: pt.x > bounds.maxX ? pt.x : bounds.maxX,
                maxY: pt.y > bounds.maxY ? pt.y : bounds.maxY,
            }
        }, {
            dir,
            minX: Infinity,
            minY: Infinity,
            maxX: 0,
            maxY: 0,
        })
        rectBounds.xSize = rectBounds.maxX - rectBounds.minX
        rectBounds.ySize = rectBounds.maxY - rectBounds.minY
        rectBounds.xLabel = Math.floor(s.random(20, 30)) * 10
        rectBounds.yLabel = rectBounds.xLabel * (rectBounds.ySize / rectBounds.xSize)
        console.log(dir)
        console.log(points)
        console.log(rectBounds)
    }
    s.renderBounds = function(bounds){
        s.push()
        s.fill(0)
        s.textSize(18)
        let xl = `${bounds.xLabel}cm`
        let xw = s.textWidth(xl)
        switch(bounds.dir){
            case 'UP':
                s.text(xl, ((bounds.xSize / 2) + bounds.minX) - (xw / 2), bounds.maxY - 2)
                break
            case 'DOWN':
                break
            case 'LEFT':
                break
            case 'RIGHT':
                break
        }
    }
    s.renderShape = function(pts){
        s.push()
        s.noFill()
        s.stroke(127)
        s.beginShape()
        pts.forEach(pt => {
            s.vertex(pt.x, pt.y)
        })
        s.endShape(s.CLOSE)
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
        height: 300px;
    }
</style>
