
// Button Widget
class HoverButtonWidget{
    constructor(text,x,y,w,h,r,g,b,callback) {
        this.text = text;    
        this.x    = x;
        this.y    = y;
        this.w    = w;
        this.h    = h;

        this.r = r;
        this.g = g;
        this.b = b;

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

    // Update a Button
    // Typically this just updates the buttons 'state'
    Update(){
        if(mouseX > this.x && mouseX < this.x+this.w){
            if(mouseY > this.y && mouseY < this.y+this.h){
                // Toggle flag to indicate we are hovering over some widget
                g_hoveringOverWidget = true;

                if(g_bar.MouseInMiniDisplay()){
                    return;
                }
                
            }
        }
    }

    // Render a button
    Render(){
        textSize(this.h-4);
        fill(this.r,this.g,this.b,255);
        stroke(204,255);
        rect(this.x,this.y,this.w,this.h);
   
        // Buttons
        if(mouseX > this.x && mouseX < this.x+this.w){
            if(mouseY > this.y && mouseY < this.y+this.h){
                if(g_bar.MouseInMiniDisplay()){
                    return;
                }

                fill(255);
                stroke(255);
                rect(this.x+this.w,this.y,this.text.length*textSize(),this.h);
                stroke(64);
                fill(0);
                text(this.text, this.x+2+this.w, this.y+textSize());
                if(mouseIsPressed && mouseButton===LEFT){
                    // Toggle flag to indicate a button click took place
                    g_buttonClickEvent = true;
                    // Change visual display of button
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