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
    
    let pMouseState = false
    let loaded = false
    let orb  = {}
    let clickCount = 0
    p.setup = function(){
        p.ellipseMode(p.RADIUS)
        const cnv = p.createCanvas(640, 480)
    }
    p.draw = function(){
        if(loaded){
            if(!pMouseState && p.mouseIsPressed){
                if(p.dist(p.mouseX, p.mouseY, orb.x, orb.y) < orb.r){
                    orb.isDragging = true
                }
                clickCount += 1
            } else if(pMouseState && p.mouseIsPressed){
                if(orb.isDragging && clickCount > 20){
                    orb.updateLocation(p.mouseX, p.mouseY)
                }
                clickCount += 1
            } else  if(pMouseState && !p.mouseIsPressed){
                //check if it's quick enough for a single press
                if(clickCount < 20){
                    orb.isShowing = !orb.isShowing
                    console.log(orb.isShowing)
                }
                clickCount = 0
            } else {
                orb.isDragging = false
            }
            console.log(clickCount)
            pMouseState = p.mouseIsPressed
            p.background('#ffffff')
            orb.draw()
        } else {
            p.initOrb()
            p.background(255)
            p.noStroke()
            p.fill(0, 0, 0, 221)
            p.textSize(64)
            p.textFont('Open Sans')
            p.text('loading...', 20, p.height - 32)
        }
    }
    p.initOrb = function(){
        console.log('hello from initOrb!\n-----')
        orb = new p.Orb(p.width/2, p.height/2, 50)
        console.log(JSON.stringify(orb, null, 3))
        loaded = true
    }
   
    p.Orb = function(_x, _y, _r){
        this.x = _x
        this.y = _y
        this.r = _r
        this.isDragging = false
        this.isShowing = false
    }

    p.Orb.prototype.updateLocation = function(_x, _y){
        this.x = p.constrain(_x, 0, p.width)
        this.y = p.constrain(_y, 0, p.height)
    }

    p.Orb.prototype.draw = function(){
        p.push()
        p.noStroke()
        if(this.isDragging){
            p.stroke('#1875d1')
            p.fill('#1875d177')
        } else {
            p.noStroke()
            p.fill('#63a3ff77')
        }
        p.ellipse(this.x, this.y, this.r)
        if(this.isShowing){
            p.textSize(64)
            p.noStroke()
            p.fill('#ff0092')
            p.text('hello', this.x, this.y)
        }
        p.pop()
    }   
}

export {sketch}