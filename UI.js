// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let g_offsetX = 0;
let g_offsetY = 0;

let g_padding = 8;  

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

var g_scrollX=0;
var g_scrollY=0;

// y position of the miniDisplay
var g_miniMapY = 150

// Essentially create a bounding sphere, and then
// push the camera outwards to the radius so we can
// view the entire plane (i.e. the bar chart).
function ZoomToFit(state){
    console.log("Zoom To Fit");

    var fov = 60; // TODO: Figure out actual field of view
    // Compute aspect ratio of the scene
    var aspectRatio = width/height;
    half_fov_radians = 0.5*(fov*3.1415926/180);
    if(aspectRatio < 1.0){
        half_fov_radians = atan(aspect*tan(half_fov_radians));
    }

    // Radius of our visualization is half of the width
    var radius = g_bar.w / 2.0;
    // Distance to the center
    var distance_to_center = radius / sin(half_fov_radians);
    console.log(distance_to_center);


    g_offsetX = g_bar.w / 2.0;
    g_offsetY = g_bar.h / 2.0;
    g_scale = 1/distance_to_center;
    g_scale = 0.001;

    if(aspectRatio > 1){
        // Get the width of our bar chart
        var originShapeWidth = g_bar.w;
    }else{

    }
}


// Helper function to draw a grid to help improve visualization
function drawGrid() {
    fill(0, 0, 0, 192);
    stroke(0, 0, 0,192);

    var segments = 8;
    var horizontalSpace = (height/g_scale) / segments;
    var verticalSpace = (width/g_scale) / segments;


    // Draw some horizontal segments
    for(var horizontal =0; horizontal < segments*g_scale; horizontal++){
        line(0, horizontal*horizontalSpace, width, horizontal*horizontalSpace);
    }
    // Draw some vertical segments
    for(var vertical =0; vertical < segments*g_scale; vertical++){
        line(vertical*verticalSpace, 0, vertical*verticalSpace, height);

        //line(xhorizontal, this.h + horizontal*horizontalSpace, this.w, this.h + horizontal*horizontalSpace);
    }

}

function setUIOffset(x, y){
    g_offsetX = x;
    g_offsetY = y;
}

function menubar(x,y){
    // Menubar
    // X,Y position -- Offset
    fill(0);
    rect(x, y , width, textSize()+g_padding);
    fill(255);
    stroke(192);
    text("Pan Offset: (" + round(g_offsetX,1) + "," + round(g_offsetY,3) + ")", x+160, y+textSize());
    // Render framerate
    var rate = frameRate();
    text("FPS:" + int(rate), x+2, y+textSize());
    // Zoom
    text("zoom scale: "+round(g_scale,3), x+600, y+textSize());
}

function ZoomPanel(x,y){
    fill(0,0,128,164);
    var ZoomFit = new Button("Fit to Window",x,y+textSize()*1,220,textSize(),ZoomToFit);
    ZoomFit.render();
}

function detailsPanel(x,y,detailPanelWidth,detailPanelHeight){   
    // Details Panel
    fill(0,0,128,164);
    rect(x, y-textSize(), detailPanelWidth, textSize());
    fill(255,255,255,255);
    text("Details:", x+2, y-g_padding/2);
    fill(0,164);
    rect(x, y, detailPanelWidth, detailPanelHeight);
    fill(255);
    text(g_details, x+2, y+textSize(),detailPanelWidth,detailPanelHeight);
}

function queriesPanel(x,y,panelWidth,panelHeight){
    // Queries Panel
    fill(0,0,128,164);
    rect(x, y-textSize(), panelWidth, textSize());
    fill(255,255,255,255);
    text("Queries:", x+2, y-g_padding/2);
    fill(0,164);
    rect(x, y, panelWidth, panelHeight);


    // Buttons
    var buttonWidth = 350;

    var callFilterShow = function (){g_bar.filterShow(1)};
    var showAll = new Button("Show All",x,y+textSize()*1,buttonWidth,textSize(),callFilterShow);
    showAll.render();    

    var callFilterShowNone = function (){g_bar.filterShow(0)};
    var showNone = new Button("Show None",x+buttonWidth,y+textSize()*1,buttonWidth,textSize(),callFilterShowNone);
    showNone.render();

    var callFilterShowSelected = function (){g_bar.filterShowSelected(1)};
    var showSelected = new Button("Show Selected",x,y+textSize()*2,buttonWidth,textSize(),callFilterShowSelected);
    showSelected.render();

    var callFilterShowUnSelected = function (){g_bar.filterShowSelected(0)};
    var showSelected = new Button("Show Unselected",x+buttonWidth,y+textSize()*2,buttonWidth,textSize(),callFilterShowUnSelected);
    showSelected.render();

    var callSelectAll = function (){g_bar.selectState(1)};
    var selectState = new Button("Select All",x,y+textSize()*3,buttonWidth,textSize(),callSelectAll);
    selectState.render();

    var callSelectAllNone = function (){g_bar.selectState(0)};
    var selectState = new Button("Select None",x+buttonWidth,y+textSize()*3,buttonWidth,textSize(),callSelectAllNone);
    selectState.render();


    var callSelectIO = function (){g_bar.selectIO(1)};
    var selectIO = new Button("Select All IO",x,y+textSize()*7,buttonWidth,textSize(),callSelectIO);
    selectIO.render();

    var callSelectUserCode = function (){g_bar.selectUserCode(1)};
    var selectUserCode = new Button("Select All UserCode",x,y+textSize()*8,buttonWidth,textSize(),callSelectUserCode);
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
    menubar(0,0);

    // Render the Zoom controls
    ZoomPanel(0,10);

    // Render the details pane
    var detailsHeight = 320; // Set height of details panel
    detailsPanel(0,height - detailsHeight-g_miniMapY,width/2,detailsHeight);

    // Render the queries pane
    var queriesHeight = 320; // Set height of details panel
    queriesPanel(width/2,height - queriesHeight-g_miniMapY,width/2,queriesHeight);

    

    // Render the panel
    //g_Panel.render();

    stroke(255);
    fill(255);
    text("last action:"+g_querySummary,width-250,24);
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
        g_offsetY -= pmouseY - mouseY;
        g_offsetX -= pmouseX - mouseX;
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
      translate(g_offsetX,g_offsetY);
      // Scale the camera
     // translate(g_scrollX,g_scrollY);
      scale(g_scale);
      //translate(-g_scrollX/g_scale,-g_scrollY/g_scale);
}

function mouseReleased(){
    if(g_mouseIsCurrentlyDown){
        startY = min(g_mouseBeforeDownY,mouseY);
        endY = max(g_mouseBeforeDownY,mouseY);

        g_bar.inverteSelectedRange(startY,endY);
    }
}


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
        
        g_scrollX = mouseX/g_scale;
        g_scrollY = mouseY/g_scale;
    }else{
        g_scrollX = pMouseX;
        g_scrollY = pMouseY;
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
