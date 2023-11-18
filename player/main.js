const scx = window.innerWidth / 2
const scy = window.innerHeight / 2

class playerSpeed {
    // Credit:
    // https://github.com/Rekkonnect/GDAPI/blob/master/GDAPI/GDAPI/Information/GeometryDash/Speeds.cs
    constructor(){
        this.slow = 251.16;
        this.normal = 311.58;
        this.fast = 387.42;
        this.faster = 468;
        this.veryFast = 576;
    }
    getSpeed(speed) {
        switch(speed){
            case "slow":
                return this.slow;
            case "normal":
                return this.normal;
            case "fast":
                return this.fast;
            case "faster":
                return this.faster;
            case "veryFast":
                return this.veryFast;
            default:
                return this.normal;
        }
        throw("Invalid speed, bad call.");
    }
}

let blockdata = {
    blocks: [
        {id: 1, x:15, y:1}, // block
        {id: 1, x:16, y:1},
        {id: 2, x:30, y:2, pressed: false} // orb
    ],
}

const Player = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    icon: null,
    speed: "slow"
}

let zoom = 1

class perFrame {
    constructor(callback){
        return setInterval(callback, 1000/60)
    }
}

let deltaDate = new Date;
function delta() {
    let frameTime = new Date - deltaDate;
    deltaDate = new Date;
    return frameTime / 1000;
}

let offset = {
    x: scx/1.5,
    y: scy*2.5
}
let cameraOffset = {
    x: 5,
    y: 0
}


let rotate = 0
let isOnFloor = false
let jumping = true
let gravity = 3.5
let maxFall = 2
let isOnBlock = false

let orbpress = false

$(document).mousedown(()=>{
    jumping = true
}).mouseup(()=>{
    jumping = false
})


let floorHeightA = 0;

const currentAudio = audioSource;

const keys = new keyHandler;

const perframe = new perFrame(()=>{
    audioSource.play()

    Player.vx = new playerSpeed().getSpeed(Player.speed) / 10

    if((jumping || keys.pressed("Space") || keys.pressed("KeyW") || keys.pressed("ArrowUp")) && isOnFloor ){
        Player.vy -= 40
        isOnFloor = false
    }

    

    offset.x -= new playerSpeed().getSpeed(Player.speed) / 10 

    if(Player.y+Player.vy/2>floorHeightA){
        isOnFloor = true
    }

    if(isOnFloor){
        Player.vy=0;
        if (rotate%25>25/2) {
            rotate-=1
        }
        if(rotate%25<25/2) {
            rotate+=1
        }
    } else {
        Player.vy+=gravity;
        rotate+=1*(Math.abs(gravity)/gravity);
    }
    
    Player.y += Player.vy;
    Player.x += Player.vx;

    Player.y = Player.y > maxFall ? maxFall : Player.y

    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    ctx.save();
    ctx.scale(.5, .5)
    ctx.translate(offset.x+Player.x + cameraOffset.x*100, offset.y+Player.y + cameraOffset.y*100)
    ctx.rotate(rotate * Math.PI /25)
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
    blockdata.blocks.forEach(block => {
        switch(block.id){
            case 1:
                ctx.save()
                ctx.beginPath()
                ctx.scale(.5, .5)
                ctx.translate(offset.x+block.x*100 + cameraOffset.x*100, offset.y-block.y*100 + cameraOffset.y*100)
                ctx.rect(-50, -50, 100, 100)
                ctx.stroke()
                ctx.restore()
                
                if (block.x -1 < Player.x / 100 && block.x +1 > Player.x / 100 &&
                    block.y < Player.y / -100 && block.y +1 > Player.y / -100) {
                    isOnFloor=true
                    Player.vy = 0
                    Player.y-=2;
                }
                if(block.x -1 > Player.x / 100 && block.x +1 < Player.x / 100){
                    isOnFloor = false
                }
                return;
            case 2:
                ctx.save()
                ctx.beginPath();
                ctx.scale(.5, .5);
                ctx.translate(offset.x+block.x*100 + cameraOffset.x*100, offset.y-block.y*100 + cameraOffset.y*100)
                ctx.arc(0, 0, 25, 0, 360*Math.PI / 180);
                ctx.stroke();
                ctx.fill()
                ctx.restore();
                if (block.x -1 < Player.x / 100 && block.x +1 > Player.x / 100 &&
                block.y < Player.y / -100 && block.y +1 > Player.y / -100){
                    if(jumping){
                        block.pressed = true
                        Player.vy = - 40
                    }
                }

            default:
                return 0;

        }
    });
});