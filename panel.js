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
        this.lastClickTime = 0;
        this.centerMouseWasPressed = false;
    }

    // Adds a new widget to the panel
    addWidget(obj){
        this.widgets.push(obj);
    }

    // Perform all of the update functions of the widgets
    Update(){
        if(mouseY > this.y-textSize() && mouseY < this.y){
            if(mouseX>this.x && mouseX < this.x+this.w){
                g_hoveringOverWidget = true;
            }
        }
        // Render all of the weidgets that belong to this panel one after the other.
        for(var i=0; i < this.widgets.length;i++){
            var oldX = this.widgets[i].x;
            var oldY = this.widgets[i].y;
            this.widgets[i].SetPos(this.x+this.widgets[i].x,this.y+this.widgets[i].y);
            this.widgets[i].Update();
            this.widgets[i].SetPos(oldX,oldY);
        }
    }

    // Function to print data about a 
    // promise in a string
    Render(){
        var lastX = pmouseX;
        var lastY = pmouseY;

        // Toggle opening and closing
        if(mouseY > this.y-textSize() && mouseY < this.y){
            if(mouseX>this.x && mouseX < this.x+this.w){
                // Render the text of the panel in a lighter shade
                // this also indicates that the menu is highlighted and
                // interactable.
                fill(255,255);
                stroke(192,255);
                rect(this.x, this.y-textSize(), this.w, textSize());

                // Keep track of the last time since we clicked on
                // our panel to avoid it from opening and closing too fast.
                let clickTime = millis() - this.lastClickTime;
                
                // Fold panel
                if(mouseIsPressed && mouseButton === LEFT && this.isOpen && clickTime > 250 ){ 
                    this.isOpen = false;
                    this.lastClickTime = millis();
                }
                else if(mouseIsPressed && mouseButton === LEFT && !this.isOpen && clickTime > 250){ 
                    this.isOpen = true;
                    this.lastClickTime = millis();
                }
                
                // Handle the event that a middle click was made
                // and then the panel can be dragged
                if(mouseIsPressed && mouseButton === CENTER){
                    this.centerMouseWasPressed = true;
                }
            }
        }else{
            // Render the text of the panel
            fill(204,255);
            stroke(192,255);
            rect(this.x, this.y-textSize(), this.w, textSize());
        }

        

        // If the middle mouse is not being pressed, stop the dragging event
        // otherwise, continue dragging the panel as long as the middle mouse
        // (or any other mouse button) is being pressed.
        if(!mouseIsPressed){
            this.centerMouseWasPressed = false;
        }
        else if(this.centerMouseWasPressed == true){
            g_hoveringOverWidget = true; // Avoid panning
            this.x -= (lastX - mouseX);
            this.y -= (lastY - mouseY);
        } 

        // Text/Titlebar of panel
        fill(0,0,0,255);
        stroke(192,255);
        text(this.text, this.x+2, this.y-this.g_padding/2);

        // If the panel is not open, then immediately return.
        if(!this.isOpen){
            return;
        }

        // Draw background of the panel
        fill(0,200);
        rect(this.x, this.y, this.w, this.h);
        

        // Render all of the weidgets that belong to this panel one after the other.
        for(var i=0; i < this.widgets.length;i++){
            var oldX = this.widgets[i].x;
            var oldY = this.widgets[i].y;
            this.widgets[i].SetPos(this.x+this.widgets[i].x,this.y+this.widgets[i].y);
            this.widgets[i].Render();
            this.widgets[i].SetPos(oldX,oldY);
        }

    }
}

