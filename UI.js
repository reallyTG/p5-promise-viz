// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let offsetX = 0;
let offsetY = 0;

// UI Widgets
// let zoomSlider, gSlider, bSlider;

// Details string
let g_details = '';

///////////////////////////////////////////////
// User interface
// User interface will stay locked to screen
///////////////////////////////////////////////
function UI() {
  // UI Box
  fill(0);
  rect(0, height - 60, 200, 60);

  // Render framerate
  textSize(14);
  fill(255);
  stroke(192);
  var rate = frameRate();
  text("FPS:" + int(rate), 2, height - 45);

  // Zoom
  text("zoom scale: "+g_scale, 2, height - 20);

  // Offset
  fill(255);
  stroke(0);
  text("Pan Offset: (" + offsetX + "," + offsetY + ")", 60, height - 40);

  // Details Panel
  fill(0);
  rect(300, height - 60, 200, 60);
  textSize(12);
  fill(255);

  // Details Panel
  text("Details:" + g_details, 300, height - 45);
}

///////////////////////////////////////////////
// Controls
///////////////////////////////////////////////
function Controls() {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }
    if (mouseIsPressed) {
        offsetY -= pmouseY - mouseY;
        offsetX -= pmouseX - mouseX;
    } else {
        //
    }
}

function mouseWheel(event) {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }

    //move the square according to the vertical scroll amount
    // TODO:    This scale is completely arbitrary as of now
    //          Ideally you could have an infinite zoom in either 
    //          direction.
    if(g_scale >= 0.01){
        g_scale -= (event.delta*.0005);
    }
    else{
        g_scale = 0.01;
    }
    //uncomment to block page scrolling
    //return false;
}


///////////////////////////////////////////////
//
///////////////////////////////////////////////
class View {
  constructor(x, y, w, h, data) {

  }

  display() {

  }
}
