// Text widget for rendering text
class SearchBoxWidget{
    constructor(text,x,y,w,h,callback){
        this.text = text;
        this.x = x;
        this.y = y;
        this.h = h;
        this.callback = callback;

        // Create some widgets
        this.searchInput = createInput(); // Located in UI.js
        this.searchButton = createButton(this.text);
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

    Render(){
        // Retreive the value for search box
        this.searchInput.value();
        this.searchInput.position(this.x,this.y);
        this.searchButton.position(this.x + 210, this.y);
        this.searchButton.mousePressed(this.callback);
    }
}