// The data that we want to hold
class Panel{
    constructor(text,x,y,w,h) {
        this.text = text;    
        this.x    = x;
        this.y    = y;
        this.w    = w;
        this.h    = h;
        this.padding = 8;
        this.widgets = [];
        this.isOpen = true;
    }

    // Adds a new widget to the panel
    addWidget(obj){
        this.widgets.push(obj);
    }

    // Function to print data about a 
    // promise in a string
    render(){
        // Render the text of the panel
/*
        fill(0,0,128,125);
        rect(this.x, this.y-textSize(), this.w, textSize());
        stroke(0,0,0,255);
        text(this.text, this.x+2, this.y-this.padding/2);
        fill(0,125);

        // If the panel is not open, then immediately return.
        if(!this.isOpen){
            return;
        }


        for(var i=0; i < this.widgets;i++){
        //    this.widgets[i].render();
        }
*/

    }
}