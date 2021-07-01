// Text widget for rendering text
class SearchBoxWidget{
    constructor(text,x,y,w,h,callback){
        this.text = text;
        this.x = x;
        this.y = y;

        this.callback = callback;

        // Create some widgets
        this.searchInput = createInput(); // Located in UI.js
        this.searchButton = createButton(this.text);

        this.w = this.searchInput.width+this.searchButton.width;
        this.h = this.searchButton.height;
    }

    SetPos(x,y){
        this.x = x;
        this.y = y;
    }

    // Returns the value from the widget
    GetText(){
        return this.searchInput.value();
    }

    SetText(text){
        this.text = text;
    }

    GetHeight(){
        return this.h;
    }

    Update(){
        if(mouseX > this.x && mouseX < this.x+this.w){
            if(mouseY > this.y && mouseY < this.y+this.h){
                // Toggle flag to indicate we are hovering over some widget
                g_hoveringOverWidget = true;
                console.log(this.text+":"+g_hoveringOverWidget);
            }
        }
    }

    Render(){
        // Retreive the value for search box
        this.searchInput.value();
        this.searchInput.position(this.x,this.y);
        this.searchButton.position(this.x + 210, this.y);
        this.searchButton.mousePressed(this.callback);
    }
}