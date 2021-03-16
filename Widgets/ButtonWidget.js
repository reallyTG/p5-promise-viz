// Button Click
// Global variable that is used to confirm we are clicking
// with a button somewhere in our program.
// This is temporary hack to ensure that when we click
// on a button we do not interact with the other parts
// of the visualization.
let g_buttonClickEvent = true;

// Button Widget
class ButtonWidget{
    constructor(text,x,y,w,h,callback) {
        this.text = text;    
        this.x    = x;
        this.y    = y;
        this.w    = w;
        this.h    = h;
        this.callback = callback;
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

    // Render a button
    Render(){
        fill(192,0,0,222);
        stroke(0,0,0,255);
        rect(this.x,this.y,this.w,this.h);
        stroke(0);
        fill(0);
        text(this.text, this.x+1, this.y+textSize());
    
        // Buttons
        if(mouseX > this.x && mouseX < this.x+this.w){
            if(mouseY > this.y && mouseY < this.y+this.h){
                if(g_bar.MouseInMiniDisplay()){
                    return;
                }
                fill(255);
                stroke(255);
                rect(this.x,this.y,this.w,this.h);
                stroke(0);
                fill(0);
                text(this.text, this.x+2, this.y+textSize());
                if(mouseIsPressed && mouseButton===LEFT){
                    g_buttonClickEvent = true;
                    fill(64,192);
                    stroke(64,192);
                    rect(this.x,this.y,this.w,this.h);
                    stroke(255);
                    fill(255);
                    text(this.text, this.x+2, this.y+textSize());
                    // TODO: Fix this callback
                    this.callback(1);
                }
            }
        }



    }
}