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
const clamp = (v, n, m) => {return v > m ? m : (v < n ? n : v)}



const Player = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    icon: null,
    speed: "slow"
}

class perFrame {
    constructor(callback){
        return setInterval(callback, 1000/60)
    }
}



let rotate = 0
let isOnFloor = false
let jumping = true
let gravity = 3.5
let maxFall = 2

let orbpress = false

$(document).mousedown(()=>{
    jumping = true
}).mouseup(()=>{
    jumping = false
})

const ps = new playerSpeed;

const world = {
    colliding: (object) => {
        if(object.x, object.y, object.width, object.height){
            
        if(object.x<Player.x)
            console.log("collding")
        }
    }
}

const currentAudio = audioSource;

const keys = new keyHandler;

function controls(){
    let deltat = delta();
    let maxSpeed = ps.getSpeed(Player.speed) / 4;
    if(keys.pressed("KeyA")){
        Player.vx -= ps.getSpeed(Player.speed) / 100 * deltat * maxSpeed
    }
    if(keys.pressed("KeyD")){
        Player.vx += ps.getSpeed(Player.speed) / 100 * deltat * maxSpeed
    }
    
    if(keys.pressed("KeyA") && keys.pressed("KeyD")){
        Player.vx /= 1.5
    }
    if(!keys.pressed("KeyA") && !keys.pressed("KeyD")){
        Player.vx /= 1.5
    }
    //
    
    if((keys.pressed("KeyW") || keys.pressed("Space")) && isOnFloor){
        jumping = true
    } else {
        jumping = false
    }



    requestAnimationFrame(controls)
}
controls()

function devPanel(params) {
    
}

const colliding = (block1, block2) => {
    if(
        block1.x < block2.x + block2.w &&
        block1.x + block1.w > block2.x
        ){

    }
}

const perframe = new perFrame(()=>{
    //audioSource.play()
    Player.vy += gravity

    let playerXY = [Player.x / 100, Player.y / 100]


    blockdata.blocks.forEach(block => {
        switch(block.id){
            case 1:
                if(colliding(block, Player)){
                    console.log("hello")
                }
                
                return;
            case 2:
            default:
                return 0;

        }
    });

    Player.y += Player.vy;
    Player.x += Player.vx;

    Player.y = Player.y > maxFall ? maxFall : Player.y

    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    ctx.save();
    ctx.scale(zoom, zoom)
    ctx.translate(offset.x+Player.x + cameraOffset.x*100, offset.y+Player.y + cameraOffset.y*100)
    ctx.arc(0, 0, 50, 0, 200)
    ctx.fillStyle = 'red'
    ctx.fill();
    ctx.restore();
    
    Player.vx = clamp(Player.vx, -ps.getSpeed(Player.speed) / 15, ps.getSpeed(Player.speed) / 15);
    Player.vy = clamp(Player.vy, -ps.getSpeed(Player.speed) / 15, ps.getSpeed(Player.speed) / 15);

    blockdata.blocks.forEach(block => {
        switch(block.id){
            case 1:
                ctx.save()
                ctx.beginPath()
                ctx.scale(zoom, zoom)
                ctx.translate(offset.x+block.x*100 + cameraOffset.x*100, offset.y+block.y*100 + cameraOffset.y*100)
                ctx.fillRect(-50, -50, 101, 101)
                ctx.restore()
                
                return;
            case 2:
            default:
                return 0;

        }
    });
});
