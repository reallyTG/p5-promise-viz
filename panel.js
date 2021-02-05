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
        // Render the text of the panel

        fill(0,0,128,125);
        rect(this.x, this.y-textSize(), this.w, textSize());
        stroke(0,0,0,255);
        text(this.text, this.x+2, this.y-this.g_padding/2);
        fill(0,125);


        // Toggle opening and closing
        if(mouseY > this.y-textSize() && mouseY < this.y){
            if(mouseX>this.x && mouseX < this.x+this.w){
                if(mouseIsPressed && mouseButton === LEFT && this.isOpen){ 
                    this.isOpen = false;
                }
                else if(mouseIsPressed && mouseButton === LEFT && !this.isOpen){ 
                    this.isOpen = true;
                }
            }
        }

        // If the panel is not open, then immediately return.
        if(!this.isOpen){
            return;
        }

        // Draw background of the panel
        fill(0,164);
        rect(this.x, this.y, this.w, this.h);

        for(var i=0; i < this.widgets;i++){
            this.widgets[i].render();
        }

    }
}

// Text widget for rendering text
class TextWidget{
    constructor(text,x,y){
        this.text = text;
        this.x = x;
        this.y = y;
    }

    Render(){
        stroke(255,255,255,255);
        text(this.text, this.x+2, this.y-this.g_padding/2);
    }
}