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
let blockdata = {
    blocks: [
    ],
}
{
    for (let i = -5; i < 6; i++) {
        blockdata.blocks.push({x: i, y:0, id:1})
        blockdata.blocks.push({x: i, y:-10, id:1})
        blockdata.blocks.push({x: -5, y:i-5, id:1})
    }
    for(let i=0; i<3; i++){
        blockdata.blocks.push({id: 1, x: -1+i, y: -6})
        blockdata.blocks.push({id: 1, x: -1+i, y: -5})
        blockdata.blocks.push({id: 1, x: -1+i, y: -4})
    
        blockdata.blocks.push({id: 1, x: 5, y: -3+i})
        blockdata.blocks.push({id: 1, x: 5, y: -9+i})
    }
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
    x: scx*1,
    y: scy*1
}
let cameraOffset = {
    x: 0,
    y: 0
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

const currentAudio = audioSource;

const keys = new keyHandler;
Player.y = 5*-100

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
    
    if(keys.pressed("KeyW")){
        Player.vy -= new playerSpeed().getSpeed(Player.speed) / 100 * deltat * maxSpeed
    }
    if(keys.pressed("KeyS")){
        Player.vy += new playerSpeed().getSpeed(Player.speed) / 100 * deltat * maxSpeed
    }
    
    if(keys.pressed("KeyW") && keys.pressed("KeyS")){
        Player.vy /= 1.5
    }
    if(!keys.pressed("KeyW") && !keys.pressed("KeyS")){
        Player.vy /= 1.5
    }
    requestAnimationFrame(controls)
}

controls()
const perframe = new perFrame(()=>{
    //audioSource.play()


    

    let playerXY = [Player.x / 100, Player.y / 100]

    cameraOffset.x = playerXY[0];
    cameraOffset.y = playerXY[1]*-1;


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
                if(playerXY[0] >= block.x-1 && playerXY[0] <= block.x+1
                    && playerXY[1] >= block.y-1 && playerXY[1] <= block.y + 1){
                        let distancex = (playerXY[0] - block.x) * -1
                        let distancey = (playerXY[1] - block.y) * -1
                        
                        Player.vx = distancex * -2
                        Player.vy = distancey * -2
                        Player.x -= distancex * 3;
                        Player.y -= distancey * 3;

                }
                
                


                
                return;
            case 2:
            default:
                return 0;

        }
    });
});
