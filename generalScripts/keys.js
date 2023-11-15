class keyHandler {
    constructor(s=window){
        this.keys = [];
        $(s).keydown( e => {
            if( this.keys.indexOf( e.code ) === -1 ) {
                this.keys.push( e.code )
            }
        });
        $(s).keyup( e => {
            if( this.keys.indexOf( e.code ) > -1 ) {
                this.keys.splice( this.keys.indexOf( e.code ), 1)
            }
        });
    }
    pressed(code=""){
        let r=false;
        if(this.keys.indexOf(code)>-1){r=true}else{r=false};
        return r;
    }
}
