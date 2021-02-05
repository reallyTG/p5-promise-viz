
// Text widget for rendering text
class VisTextWidget{
    constructor(text,x,y){
        this.text = text;
        this.x = x;
        this.y = y;
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

    Render(){
        textSize(20);
        textFont("monospace", 20);


        console.log("render being called");
        fill(255,255,255,255);
        text(this.text, this.x+2, this.y+textSize());
    }
}