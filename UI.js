// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let offsetX = 0;
let offsetY = 0;

// UI Widgets
// let zoomSlider, gSlider, bSlider;

// Details string
let g_details = '';

function setUIOffset(x, y){
    offsetX = x;
    offsetY = y;
}


let mouseIsCurrentlyDown = 0;
let mouseBeforeDownX=0;
let mouseBeforeDownY=0;

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

    if (mouseIsPressed && mouseButton === CENTER) {
        offsetY -= pmouseY - mouseY;
        offsetX -= pmouseX - mouseX;
    }

    if(mouseIsPressed && mouseButton === LEFT){ 
        mouseIsCurrentlyDown = 1
    }else {
        mouseIsCurrentlyDown = 0;
        mouseBeforeDownX=mouseX;
        mouseBeforeDownY=mouseY;
   }

   // Draw a selection region
   if(mouseIsCurrentlyDown){
        stroke(0);
        fill(128,128,128,128);
        rect(mouseBeforeDownX,mouseBeforeDownY,mouseX-mouseBeforeDownX,mouseY-mouseBeforeDownY);
   }
}

function mouseWheel(event) {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }
/*
    if (event.deltaY > 0)
        g_scale *= .95;
    else
        g_scale *= 1.05;
*/
}

window.addEventListener("wheel", function(e) {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }

    if (!mouseIsPressed) {
        if (e.deltaY > 0){
            g_scale *= .95;
        }
        else{
            g_scale *= 1.1;
        }
    }

  });

///////////////////////////////////////////////
//
///////////////////////////////////////////////
class View {
  constructor(x, y, w, h, data) {

  }

  display() {

  }
}
