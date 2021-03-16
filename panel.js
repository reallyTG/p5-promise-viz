// The data that we want to hold
class Panel{
    constructor(text,x,y,w,h) {
        this.text = text;    
        this.x    = x;
        this.y    = y;
        this.w    = w;
        this.h    = h;
        this.g_padding = 8;
        this.widgets = [];
        this.isOpen = true;
    }

    // Adds a new widget to the panel
    addWidget(obj){
        this.widgets.push(obj);
    }

    // Function to print data about a 
    // promise in a string
    Render(){
        // Toggle opening and closing
        if(mouseY > this.y-textSize() && mouseY < this.y){
            if(mouseX>this.x && mouseX < this.x+this.w){
                // Render the text of the panel in a lighter shade
                // this also indicates that the menu is highlighted and
                // interactable.
                fill(0,0,255,125);
                rect(this.x, this.y-textSize(), this.w, textSize());

                // Fold panel
                if(mouseIsPressed && mouseButton === LEFT && this.isOpen){ 
                    this.isOpen = false;
                }
                else if(mouseIsPressed && mouseButton === LEFT && !this.isOpen){ 
                    this.isOpen = true;
                }
                // Drag panel
                if(mouseIsPressed && mouseButton === CENTER){
                    this.x -= (pmouseX - mouseX);
                    this.y -= (pmouseY - mouseY);
                }
            }
        }else{
            // Render the text of the panel
            fill(0,0,128,255);
            rect(this.x, this.y-textSize(), this.w, textSize());
        }
        fill(255,255,255,255);
        stroke(0,0,0,255);
        text(this.text, this.x+2, this.y-this.g_padding/2);

        // If the panel is not open, then immediately return.
        if(!this.isOpen){
            return;
        }

        // Draw background of the panel
        fill(0,200);
        rect(this.x, this.y, this.w, this.h);

        for(var i=0; i < this.widgets.length;i++){
            var oldX = this.widgets[i].x;
            var oldY = this.widgets[i].y;
            this.widgets[i].SetPos(this.x+this.widgets[i].x,this.y+this.widgets[i].y);
            this.widgets[i].Render();
            this.widgets[i].SetPos(oldX,oldY);

        }

    }
}

