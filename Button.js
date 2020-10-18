// The data that we want to hold
class Button{
    constructor(text,x,y,w,h,callback) {
        this.text = text;    
        this.x    = x;
        this.y    = y;
        this.w    = w;
        this.h    = h;
        this.callback = callback;
    }

    // Function to print data about a promise in a string
    render(){
        fill(255);
        stroke(255);
        rect(this.x,this.y,this.w,textSize());
        stroke(0);
        fill(0);
        text(this.text, this.x+2, this.y+textSize());
    
        // Buttons
        if(    mouseX > this.x && mouseX < this.x+this.w){
            if(mouseY > this.y && mouseY < this.y+this.h){
                fill(0);
                stroke(0);
                rect(this.x,this.y,this.w,textSize());
                stroke(255);
                fill(255);
                text(this.text, this.x+2, this.y+textSize());
                if(mouseIsPressed){
                    fill(64);
                    stroke(64);
                    rect(this.x,this.y,this.w,textSize());
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