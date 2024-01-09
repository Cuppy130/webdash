function getCanvas() : any {
    return document.getElementById('canvas')
}
const ctx = getCanvas().getContext('2d');
getCanvas().width = window.innerWidth;
getCanvas().height = window.innerHeight;

const keys = new keyHandler;

const audioSource = new Audio;
audioSource.src = "/music/mainLevels/Dune Boi.mp3";
audioSource.currentTime = 0 //offset

class obj{
    x=-1;
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
}

class Player {
    x = -1;
    y = 0;
    xv = .5 + 1/3;
    yv = 0;
    update(){

    }
}

const player = new Player;
const objects = [
    new obj(2, 0, 1, 1),
    new obj(4, 0, 1, 1)
]

const loop = () => {
    player.update();
    objects.forEach((obj) => {obj.update();obj.update()})
    requestAnimationFrame(loop)
}
