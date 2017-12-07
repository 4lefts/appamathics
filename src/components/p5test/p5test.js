function sketch(p){
    // palette
    // $background: #eff8fc;
    // $primary: #1875d1;
    // $light: #63a3ff;
    // $dark: #004a9f;
    // $accent: #ff0092;
    // $accent-light: #ff40ad;
    // $text: rgba(0, 0, 0, 0.875);
    // $text-secondary: rgba(0, 0, 0, 0.6);
    
    let points = []
    let pMouseState = false
    let loaded = false
    let polygon
    let clickCount = 0
    p.setup = function(){
        p.ellipseMode(p.RADIUS)
        const cnv = p.createCanvas(640, 480)
       
    }
    p.draw = function(){
        if(loaded){
            if(!pMouseState && p.mouseIsPressed){
                polygon.setDragging(p.mouseX, p.mouseY, true)
                clickCount += 1
            } else if(pMouseState && p.mouseIsPressed){
                if(clickCount > 20){
                    polygon.updatePoints(p.mouseX, p.mouseY)
                }
                clickCount += 1
            } else if(pMouseState && !p.mouseIsPressed){
                //check if it's a quick enough press, set showing state
                if(clickCount < 20){
                    polygon.setShowing(p.mouseX, p.mouseY)
                    console.log(polygon)
                }
                clickCount = 0
            } else {
                polygon.setDragging(p.mouseX, p.mouseY, false)
            }
            pMouseState = p.mouseIsPressed
            p.background('#ffffff')
            polygon.display()
          
        } else {
            p.background(255)
            p.noStroke()
            p.fill(0, 0, 0, 221)
            p.textSize(32)
            p.textFont('Open Sans')
            p.text('loading...', 32, p.height - 32)
        }
    }
    p.initPolygon = function(n){
        polygon = new p.Polygon(n)
        polygon.initPoints()
        loaded = true
    }

    p.Polygon = function(_p){
        this.numPoints = _p
        this.points = []
    }
    p.Polygon.prototype.initPoints = function(){
        const theta = p.TWO_PI/this.numPoints
        const r = p.height/3
        for(let i = this.numPoints; i > 0; i--){
            this.points.push(
                {
                    x: (r * Math.cos(theta * i)) + (p.width/2),
                    y: (r * Math.sin(theta * i)) + (p.height/2),
                    r: 30,
                    isDragging: false,
                    isShowing: false
                }
            )
        }
    }
    p.Polygon.prototype.updatePoints = function(_x, _y){
        this.points.forEach(val => {
            if(val.isDragging){
                val.x = p.constrain(_x, 0, p.width)
                val.y = p.constrain(_y, 0, p.height)
            }
        })
    }
    p.Polygon.prototype.setDragging = function(_x, _y, state){
        if(state){
            this.points.forEach(val => {
                if(p.dist(_x, _y, val.x, val.y) < val.r){
                    val.isDragging = true
                }
            })
        } else {
            this.points.forEach(val => {
                val.isDragging = false
            })
        }
    }
    p.Polygon.prototype.setShowing = function(_x, _y){
        this.points.forEach(val => {
            if(p.dist(_x, _y, val.x, val.y) < val.r){
                val.isShowing = !val.isShowing
            }
        })
    }
    p.Polygon.prototype.display = function(){
        p.push()
        p.beginShape()
        p.stroke(0, 0, 0, 221) //87.5% opacity
        p.fill(0, 0, 0, 30)
        this.points.forEach(val => p.vertex(val.x, val.y))
        p.endShape(p.CLOSE)
        this.points.forEach(val => {
            if(val.isDragging){
                p.stroke('#1875d1')
                p.fill('#1875d177')
            } else {
                p.noStroke()
                p.fill('#63a3ff77')
            }
            p.ellipse(val.x, val.y, val.r)
            if(val.isShowing){
                p.textSize(16)
                p.noStroke()
                p.fill('#ff0092')
                p.text(`x:${val.x.toFixed(1)}\ny:${val.y.toFixed(1)}`, val.x, val.y)
            }
        })
        p.pop()
    }
}


export {sketch}