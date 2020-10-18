// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let offsetX = 0;
let offsetY = 0;

let padding = 8;  

// Details string
let g_details = '';

// Query String
// Keeps track of what happened in latest action.
let g_querySummary = '';


// Used in range selection
let mouseIsCurrentlyDown = 0;
let mouseBeforeDownX=0;
let mouseBeforeDownY=0;


function setUIOffset(x, y){
    offsetX = x;
    offsetY = y;
}

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

function queriesPanel(x,y,panelWidth,panelHeight){
    // Queries Panel
    fill(0,0,128,125);
    rect(x, y-textSize(), panelWidth, textSize());
    fill(255,255,255,255);
    text("Queries:", x+2, y-padding/2);
    fill(0,125);
    rect(x, y, panelWidth, panelHeight);
    /*
    // Buttons
    fill(0);
    rect(x,y,panelWidth,textSize());
    fill(255); 
    text("Save Selection", x+2, y+textSize());
    // Buttons
    fill(0);
    rect(x,y+textSize(),panelWidth,textSize());
    fill(255);
    text("Hide Selected", x+2, y+textSize()*2);
    // Buttons
    fill(0);
    rect(x,y+textSize()*2,panelWidth,textSize());
    fill(255);
    text("Hide Non-Selected", x+2, y+textSize()*3);  
    */
   var callSelectAll = function (){g_bar.selectState(1)};
   var selectState = new Button("Select All",x,y+textSize()*2,panelWidth,textSize(),callSelectAll);
   selectState.render();

    // Buttons
    var callSelectIO = function (){g_bar.selectIO(1)};
    var selectIO = new Button("Select All IO",x,y+textSize()*3,panelWidth,textSize(),callSelectIO);
    selectIO.render();

    var callSelectUserCode = function (){g_bar.selectUserCode(1)};
    var selectUserCode = new Button("Select All UserCode",x,y+textSize()*4,panelWidth,textSize(),callSelectUserCode);
    selectUserCode.render();

    /*
    // Buttons
    fill(0);
    rect(x,y+textSize()*4,panelWidth,textSize());
    fill(255);
    text("Select all userCode", x+2, y+textSize()*5);  
    // Buttons
    fill(0);
    rect(x,y+textSize()*5,panelWidth,textSize());
    fill(255);
    text("Invert Selection vs Select Range vs Unselect Range", x+2, y+textSize()*6);       
    */
}

///////////////////////////////////////////////
// User interface
// User interface will stay locked to screen
///////////////////////////////////////////////
function UI() {
    // Configuration of UI
    textSize(28);

    // Render the menubar
    menubar();

    // Render the details pane
    var detailsHeight = 320; // Set height of details panel
    detailsPanel(0,height - detailsHeight,width/2,detailsHeight);

    // Render the queries pane
    var queriesHeight = 320; // Set height of details panel
    queriesPanel(width/2,height - queriesHeight,width/2,queriesHeight);

    stroke(0);
    fill(0);
    text("last action:"+g_querySummary,width/2+2,height-4);
}

///////////////////////////////////////////////
// Controls
///////////////////////////////////////////////
function Controls() {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }

    // Handle Panning
    if (mouseIsPressed && mouseButton === CENTER) {
        offsetY -= pmouseY - mouseY;
        offsetX -= pmouseX - mouseX;
    }

   // Draw a selection region
   if(mouseIsCurrentlyDown){
    stroke(0);
    fill(128,128,128,128);
    rect(mouseBeforeDownX,mouseBeforeDownY,mouseX-mouseBeforeDownX,mouseY-mouseBeforeDownY);
}

    // Handle ranged selection
    if(mouseIsPressed && mouseButton === LEFT){ 
        mouseIsCurrentlyDown = 1
    }else  {
        mouseIsCurrentlyDown = 0;
        mouseBeforeDownX=mouseX;
        mouseBeforeDownY=mouseY;
   }
}

function mouseReleased(){
    if(mouseIsCurrentlyDown){
        startY = min(mouseBeforeDownY,mouseY);
        endY = max(mouseBeforeDownY,mouseY);

        g_bar.inverteSelectedRange(startY,endY);
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
