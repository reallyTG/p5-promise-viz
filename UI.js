// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let offsetX = 0;
let offsetY = 0;

let padding = 8;  

// Details string
let g_details = '';
// Currently hovered element
let g_hoveredID = -1;

// Query String
// Keeps track of what happened in latest action.
let g_querySummary = '';

// Used in range selection
let g_mouseIsCurrentlyDown = 0;
let g_mouseBeforeDownX=0;
let g_mouseBeforeDownY=0;


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
    text("zoom scale: "+g_scale, 600, textSize());
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
    text(g_details, x+2, y+textSize(),detailPanelWidth,detailPanelHeight);
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
   
   var callFilterShowNone = function (){g_bar.filterShow(0)};
   var showNone = new Button("Show None",x,y+textSize()*1,panelWidth,textSize(),callFilterShowNone);
   showNone.render();

   var callFilterShow = function (){g_bar.filterShow(1)};
   var showAll = new Button("Show All",x,y+textSize()*2,panelWidth,textSize(),callFilterShow);
   showAll.render();

   var callFilterShowSelected = function (){g_bar.filterShowSelected(1)};
   var showSelected = new Button("Show Selected",x,y+textSize()*3,panelWidth,textSize(),callFilterShowSelected);
   showSelected.render();

   var callSelectAllNone = function (){g_bar.selectState(0)};
   var selectState = new Button("Select None",x,y+textSize()*4,panelWidth,textSize(),callSelectAllNone);
   selectState.render();

   var callSelectAll = function (){g_bar.selectState(1)};
   var selectState = new Button("Select All",x,y+textSize()*5,panelWidth,textSize(),callSelectAll);
   selectState.render();

    // Buttons
    var callSelectIO = function (){g_bar.selectIO(1)};
    var selectIO = new Button("Select All IO",x,y+textSize()*6,panelWidth,textSize(),callSelectIO);
    selectIO.render();

    var callSelectUserCode = function (){g_bar.selectUserCode(1)};
    var selectUserCode = new Button("Select All UserCode",x,y+textSize()*7,panelWidth,textSize(),callSelectUserCode);
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
    textSize(26);
    textFont("monospace", 26);

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
   if(g_mouseIsCurrentlyDown){
    stroke(0);
    fill(128,128,128,128);
    rect(g_mouseBeforeDownX,g_mouseBeforeDownY,mouseX-g_mouseBeforeDownX,mouseY-g_mouseBeforeDownY);
}

    // Handle ranged selection
    if(mouseIsPressed && mouseButton === LEFT){ 
        g_mouseIsCurrentlyDown = 1
    }else  {
        g_mouseIsCurrentlyDown = 0;
        g_mouseBeforeDownX=mouseX;
        g_mouseBeforeDownY=mouseY;
   }

    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }
      // Translate the camera
      translate(offsetX,offsetY);
      // Scale the camera
     // translate(scrollX,scrollY);
      scale(g_scale);
     // translate(-scrollX,-scrollY/g_scale);

}

function mouseReleased(){
    if(g_mouseIsCurrentlyDown){
        startY = min(g_mouseBeforeDownY,mouseY);
        endY = max(g_mouseBeforeDownY,mouseY);

        g_bar.inverteSelectedRange(startY,endY);
    }
}

let scrollX=0;
let scrollY=0;


function mouseWheel(event) {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }

    // Scroll the mouse
    if (!mouseIsPressed) {
        if (event.deltaY > 0){
            g_scale *= .95;
        }
        else{
            g_scale *= 1.05;
        }
        
        scrollX = mouseX/g_scale;
        scrollY = mouseY/g_scale;
    }else{
        scrollX = pMouseX;
        scrollY = pMouseY;
    }    

}

/*
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
        mx = mouseX;
        my = mouseY;
        translate(-mx, -my);

    }    


  });
*/
///////////////////////////////////////////////
//
///////////////////////////////////////////////
class View {
  constructor(x, y, w, h, data) {

  }

  display() {

  }
}
