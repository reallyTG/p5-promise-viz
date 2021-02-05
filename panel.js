
// Text widget for rendering text
class TextWidget{
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
        stroke(255,255,255,255);
        text(this.text, this.x+2, this.y-this.g_padding/2);
    }
}

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
        this.isOpen = false;
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


                if(mouseIsPressed && mouseButton === LEFT && this.isOpen){ 
                    this.isOpen = false;
                }
                else if(mouseIsPressed && mouseButton === LEFT && !this.isOpen){ 
                    this.isOpen = true;
                }
            }
        }else{
            // Render the text of the panel
            fill(0,0,128,125);
            rect(this.x, this.y-textSize(), this.w, textSize());
        }
        stroke(0,0,0,255);
        text(this.text, this.x+2, this.y-this.g_padding/2);

        // If the panel is not open, then immediately return.
        if(!this.isOpen){
            return;
        }

        // Draw background of the panel
        fill(0,164);
        rect(this.x, this.y, this.w, this.h);

        for(var i=0; i < this.widgets;i++){
            this.widgets[i].Render();
        }

    }
}

