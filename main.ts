function getCanvas() : any {
    return document.getElementById('canvas')
}
const ctx = getCanvas().getContext('2d');
getCanvas().width = window.innerWidth;
getCanvas().height = window.innerHeight;

function collision(a, b){return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y}
function innerCollision(a, b){
    
    a.x+=a.x/4;
    a.y+=a.y/4;
    a.w+=a.w/2;
    a.h+=a.h/2;
    return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y
}
const screenOffset = {x: 5, y:20}

const keys = new keyHandler;
let scale = 20
const audioSource = new Audio;
audioSource.src = "/music/mainLevels/Dune Boi.mp3";
audioSource.currentTime = 0 //offset

class obj{
    x=0;
    y=0;
    w=0;
    h=0;

    vx=0;
    vy=0;
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.vx = 0;
        this.vy = 0;
    }
    update(){
        this.x+=this.vx;
        this.y+=this.vy;
    }
    draw(ox, oy){
        ctx.fillRect(this.x*scale+ox*scale-player.x*scale, this.y*scale+oy*scale, this.w*scale, this.h*scale)
    }
}

class Player {
    ox = 0;
    oy = 0;
    x = -1;
    y = 0;
    w = 1;
    h = 1;
    xv = 0;
    yv = 0;
    jforce = 0.025
    gravity = 0.025;
    isOnFloor = false;
    orbPress = false;

    top = this.y;
    bottom = this.y + this.h;
    left = this.x;
    right = this.x + this.w;
    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
        this.xv = 0.25
    }
    update(){
        this.ox=this.x;
        this.oy=this.y;

        this.x+=this.xv;
        this.y+=this.yv;
        if(!this.isOnFloor){
            this.yv+=this.gravity;
        } else {
            this.yv=0
            if(keys.pressed("KeyW")){
                this.yv = -.35;
            }
        }
        
    }
    draw(ox, oy){
        ctx.beginPath()
        ctx.rect(ox*scale, this.y*scale+oy*scale, this.w*scale, this.h*scale)
        ctx.stroke();
    }
}

const player = new Player(-1, 0);
const objects = [
    new obj(-100, 0, 9999, 20), //ground
]

function loop() {
    ctx.clearRect(0, 0, 1920, 1080)
    player.update();
    player.isOnFloor = false;
    objects.forEach((obj) => {
        obj.update();
        obj.draw(screenOffset.x, screenOffset.y);
        if(collision(player, obj)){
            player.isOnFloor = true;
            if(player.y+player.h > obj.y){
                player.y = obj.y - player.h
            }
        }
    })
    player.draw(screenOffset.x, screenOffset.y);
    requestAnimationFrame(loop);
}

loop();