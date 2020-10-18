// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let offsetX = 0;
let offsetY = 0;

let padding = 8;  

// Details string
let g_details = '';

function setUIOffset(x, y){
    offsetX = x;
    offsetY = y;
}


let mouseIsCurrentlyDown = 0;
let mouseBeforeDownX=0;
let mouseBeforeDownY=0;


function menubar(){
    // Menubar
    // X,Y position -- Offset
    fill(0);
    rect(0, 0 , width, textSize()+padding);
    fill(255);
    stroke(192);
    text("Pan Offset: (" + offsetX + "," + offsetY + ")", 160, textSize());
    // Render framerate
    var rate = frameRate();
    text("FPS:" + int(rate), 2, textSize());
    // Zoom
    text("zoom scale: "+g_scale, 500, textSize());
}

function detailsPanel(x,y,detailPanelWidth,detailPanelHeight){
        // Details Panel
        fill(0,0,128,125);
        rect(x, y-textSize(), detailPanelWidth, textSize());
        fill(255,255,255,255);
        text("Details:", x+2, y-padding/2);
        fill(0,125);
        rect(x, y, detailPanelWidth, detailPanelHeight);
        fill(255);
        text(g_details, x+2, y+textSize());
}

function queriesPanel(x,y,detailPanelWidth,detailPanelHeight){
    // Queries Panel
    fill(0,0,128,125);
    rect(x, y-textSize(), detailPanelWidth, textSize());
    fill(255,255,255,255);
    text("Queries:", x+2, y-padding/2);
    fill(0,125);
    rect(x, y, detailPanelWidth, detailPanelHeight);
    // Buttons
    fill(0);
    rect(x,y,detailPanelWidth,textSize());
    fill(255); 
    text("Save Selection", x+2, y+textSize());
    // Buttons
    fill(0);
    rect(x,y+textSize(),detailPanelWidth,textSize());
    fill(255);
    text("Hide Selected", x+2, y+textSize()*2);
    // Buttons
    fill(0);
    rect(x,y+textSize()*2,detailPanelWidth,textSize());
    fill(255);
    text("Hide Non-Selected", x+2, y+textSize()*3);         
    // Buttons
    fill(0);
    rect(x,y+textSize()*3,detailPanelWidth,textSize());
    fill(255);
    text("Select all io", x+2, y+textSize()*4);
    // Buttons
    fill(0);
    rect(x,y+textSize()*4,detailPanelWidth,textSize());
    fill(255);
    text("Select all userCode", x+2, y+textSize()*5);    
}

///////////////////////////////////////////////
// User interface
// User interface will stay locked to screen
///////////////////////////////////////////////
function UI() {
    // Configuration of UI
    textSize(28);


    menubar();

    var detailsHeight = 320; // Set height of details panel
    detailsPanel(0,height - detailsHeight,width/2,detailsHeight);

    var queriesHeight = 320; // Set height of details panel
    queriesPanel(width/2,height - detailsHeight,width/2,detailsHeight);
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
