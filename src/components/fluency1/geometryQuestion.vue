<template>
    <div class="geo-question">8. What's the area of this shape?
        <div id="shape-container"></div>
    </div>
</template>

<script>
import p5 from 'p5'
const shape = function(s){
    
    let maxSize
    let padding = 40
    let points = []
    let labels = {}
    let minX = 0
    let theta// = s.randomiseAngle()

    s.init = function(){
        points = s.makePoints(maxSize, padding)
        labels = s.makeLabels(points, padding)
        theta = s.randomiseAngle()
        console.log(theta * (180/s.PI))
    }

    s.makePoints = function(maxSz, offset){
    return [
            {
                x: s.random(offset, 70),
                y: offset
            },
            {
                x: s.random(s.width - 70, s.width - offset),
                y: offset
            },
            {
                x: s.random(offset, maxSz),
                y: s.height - offset
            }
        ]
    }

    s.makeLabels = function(pts, offset){
        const mX = points.reduce((currentMin, point) => point.x < currentMin ? point.x : currentMin, Infinity)
        let ret = {
            base: {
                x1: pts[0].x,
                y1: offset / 2,
                x2: pts[1].x,
                y2: offset / 2,
                label: ''
            },
            height: {
                x1: mX - (offset  / 2),
                y1: offset,
                x2: mX - (offset / 2),
                y2: pts[2].y,
                label: ''
            }
        }
        ret.base.tx = ((ret.base.x2 - ret.base.x1) / 2) + ret.base.x1
        ret.height.ty = ((ret.height.y2 - ret.height.y1) / 2) + ret.height.y1
        const baseCM = Math.floor(s.random(11, 30))
        ret.base.label = `${baseCM} cm`
        ret.height.label = `${Math.round(baseCM * ((ret.height.y2 - ret.height.y1) / (ret.base.x2 - ret.base.x1)))}cm`
        return ret
    }

    s.randomiseAngle = function(){
        return Math.floor(s.random(4)) * (s.PI/2)
    }

    s.drawPoints = function(offset, pts){
        s.push()
            s.fill(220)
            s.stroke(0, 127)
            s.strokeWeight(2)
            s.beginShape()
            pts.forEach(pt => s.vertex(pt.x, pt.y))
            s.endShape(s.CLOSE)
        s.pop()
    }

    s.drawLabels = function(ls){
        s.push()
            s.noFill()
            s.stroke(0, 127)
            s.strokeWeight(2)
            s.line(ls.base.x1, ls.base.y1, ls.base.x2, ls.base.y2)
            s.line(ls.height.x1, ls.height.y1, ls.height.x2, ls.height.y2)
        s.pop()
        s.push()
            s.textSize(12)
            s.textAlign(s.CENTER, s.CENTER)
            s.rectMode(s.CENTER)
            const basetw = s.textWidth(ls.base.label) + 8
            const heighttw = s.textWidth(ls.height.label)
            //draw base label
            s.push()
                s.translate(ls.base.tx, ls.base.y1)
                s.rotate(-theta)
                s.fill(255)
                s.noStroke()
                s.rect(0, 0, basetw, 20)
                s.noStroke()
                s.fill(0)
                s.text(ls.base.label, 0, 0)
            s.pop()
            //draw height label
            s.push()
                s.translate(ls.height.x1, ls.height.ty)
                s.rotate(-theta)
                s.fill(255)
                s.noStroke()
                s.rect(0, 0, heighttw + 6, 20)
                // s.rect(ls.height.x1 - (heighttw / 2), ls.height.ty - 2, heighttw, 20)
                s.noStroke()
                s.fill(0)
                s.text(ls.height.label, 0, 0)
            s.pop()
        s.pop()
    }

    s.setup = function(){
        const cnv = s.createCanvas(300, 300)
        maxSize = s.width - (padding * 2)
        s.init()
    }

    s.draw = function(){
        s.push()
        s.background(255)
        s.translate(s.width/2, s.height/2)
        s.rotate(theta)
        s.translate(-s.width/2, -s.height/2)
        s.drawLabels(labels)
        s.drawPoints(padding, points)
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
        // height: 300px;
    }
</style>
