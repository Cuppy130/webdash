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

const Player = {
    x: 0,
    y: 0,
    vy: 0,
    icon: null,
    speed: "normal"
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
    x: window.innerWidth/4,
    y: window.innerHeight-window.innerHeight/3
}


let rotate = 0
let isOnFloor = false
let jumping = false
let gravity = 2.5

$(document).mousedown(()=>{
    jumping = true
})
$(document).mouseup(()=>{
    jumping = false
})

let floorHeightA = 0;

const currentAudio = audioSource;

const keys = new keyHandler;

const perframe = new perFrame(()=>{
    audioSource.play()
    Player.x =+ audioSource.currentTime * new playerSpeed().getSpeed("normal")

    if((jumping || keys.pressed("Space") || keys.pressed("KeyW") || keys.pressed("ArrowUp")) && isOnFloor){
        Player.vy -= 30
        isOnFloor = false
    }

    if(Player.y+Player.vy>floorHeightA){
        isOnFloor = true
    }

    if(isOnFloor){
        Player.vy=0;
        console.log(rotate)
        if (rotate%25>25/2) {
            rotate-=.5
        } if(rotate%25<25/2) {
            rotate+=.5
        }
    } else {
        Player.vy+=gravity

        rotate+=1*(Math.abs(gravity)/gravity)
    }

    Player.y += Player.vy


    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
    
    ctx.save();
    ctx.translate(offset.x-50*zoom/2-zoom/2, offset.y-50*zoom/2-zoom/2)
    ctx.beginPath();
    ctx.rotate(rotate*Math.PI/25)
    ctx.lineWidth = 3
    ctx.rect(-50*zoom/2,-50*zoom/2, 50*zoom, 50*zoom);
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.rect(-25*zoom/2,-25*zoom/2, 25*zoom, 25*zoom);
    ctx.stroke();
    ctx.restore();
    ctx.fillRect(0, offset.y-Player.y, window.innerWidth, 10)
});