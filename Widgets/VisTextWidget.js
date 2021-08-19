
// Text widget for rendering text
class VisTextWidget{
    constructor(text,x,y,w,h){
        this.text = text;
        this.x = x;
        this.y = y;
        this.h = h; // TODO: This is not really used.
    }

    SetPos(x,y){
        this.x = x;
        this.y = y;
    }

    GetText(){
        return this.text;
    }

    SetText(text){
        this.text = text;
    }

    GetHeight(){
        return this.h;
    }

    Update(){
        
    }

    Render(){
        textSize(18);
        textFont("monospace", 18);

        fill(255,255,255,255);
        text(this.text, this.x+2, this.y+textSize());
    }
}