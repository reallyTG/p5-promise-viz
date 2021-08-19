
// Text widget for rendering text
class VisTextWidget{
    constructor(text,x,y,w,h){
        this.text = text;
        this.x = x;
        this.y = y;
        this.h = h; // TODO: This is not really used.

        // NOTE: This feature is a bit experimental, and the API
        //       should probably change to enable such features.
        //       For now, users can manually toggle this on and off.
        //       The main danger of this feature is that once it is set to true,
        //       We are expecting text to be an 'array of arrays' with each entry
        //       having text as part of the array, and color information as well.
        this.colored = false; // Set to 'true' if the text should instead be rendered
                              // using a special draw function, if the input 'text' is an array.
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

    GetHeight(){
        return this.h;
    }

    Update(){
        
    }




    Render(){
        textSize(18);
        textFont("monospace", 18);
        noStroke();
        fill(255,255,255,255);
        if(this.colored==true){
            Drawtext( this.x+2, this.y+textSize(), this.text ) 
        }else{
            text(this.text, this.x+2, this.y+textSize());
        }
    }

}

function Drawtext( x, y, text_array ) {
    var pos_x = x;

    let alternate = 0;
    let h = y;
    for ( var i = 0; i < text_array.length; i++ ) {
        var part     = text_array[i];
        var thetext  = part[0];
        var thecolor = part[1];
        var w = textWidth( thetext );
        fill( thecolor );
        text( thetext, pos_x, h);
        pos_x += w;
        alternate++;
        if(alternate==2){
            h+= textSize()+2;
            pos_x=x;
            alternate=0;
        }
    }
}