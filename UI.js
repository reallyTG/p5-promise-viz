// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let g_offsetX = 0;
let g_offsetY = 0;

let g_padding = 8;  

// Panels
let g_DetailsPanel;
let g_QueriesPanel;
let g_MetricsPanel;
// Text Widgets
let g_detailTextWidget;
let g_metricsTextWidget;

// Global Details string
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
var g_miniMapY = 180

// input
let g_searchInput;


// Reset global variables with respect to the
// current view of the visualization
function resetView(state){
    console.log("resetView");
    g_scale = 1;
    // Offset
    g_offsetX = 0;
    g_offsetY = 0;
}

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

    // TODO: Basic idea is to figure out aspect ratio, of screen
    //       and based off of the current number of pixels, figure out
    //       how much we need to zoom out to see everything
    g_offsetX = g_bar.w / 2.0;
    g_offsetY = g_bar.h / 2.0;
    g_scale = 1/distance_to_center;
    g_scale = 0.15;

    if(aspectRatio > 1){
        // Get the width of our bar chart
        var originShapeWidth = g_bar.w;
    }else{

    }
}


// Helper function to draw a grid to help improve visualization
function drawGrid() {
    fill(0, 0, 0, 64);
    stroke(0, 0, 0,64);


    //var segments = 8;
    //var horizontalSpace = (height/g_scale) / segments;
    //var verticalSpace = (width/g_scale) / segments;

    var segments = 40;
    var horizontalSpace = (height * g_scale) / segments;
    var verticalSpace = (width * g_scale) / segments;

    // Draw some horizontal segments
    for(var horizontal =0; horizontal < segments/g_scale; horizontal++){
        line(0, horizontal*horizontalSpace, width, horizontal*horizontalSpace);
    }
    // Draw some vertical segments
    for(var vertical =0; vertical < segments/g_scale; vertical++){
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
    var resetViewButton = new ButtonWidget("Reset View",x,y+textSize()*1,220,textSize(),resetView);
    resetViewButton.Render();

    var zoomFitButton = new ButtonWidget("Fit to Window",x,y+textSize()*2,220,textSize(),ZoomToFit);
    zoomFitButton.Render();
}

function queriesPanel(x,y,panelWidth,panelHeight){
    // Queries Panel
    fill(0,0,128,164);
    rect(x, y-textSize(), panelWidth, textSize());
    fill(255,255,255,255);
    text("Queries:", x+2, y-g_padding/2);
    fill(0,164);
    rect(x, y, panelWidth, panelHeight);

}

  // Selects all promises with a particular matching string in their data.
  function searchLine(){
    console.log("searchLine");
    for (var i = 0; i < g_bar.entities.length; i++) {
      if(g_bar.entities[i].datum.line.search(g_searchInput.value())>=0){
        g_bar.entities[i].show=true;
      }else{
        g_bar.entities[i].show=false;
      }
    }
  }


// Setup UI panels
function setupPanels(){
    // Setup the details Panel
    g_DetailsPanel = new Panel("Details",0,height - 220,width/2,240);
    // Details panel widgets
    g_detailTextWidget = new VisTextWidget("VisTextWidget",0,0);
    g_DetailsPanel.addWidget(g_detailTextWidget);

    // Setup the Metrics Panel
    g_MetricsPanel = new Panel("Metrics",width-width/3,60,width/3,240);
    // Details panel widgets
    g_metricsTextWidget = new VisTextWidget("VisTextWidget",0,0);
    g_MetricsPanel.addWidget(g_metricsTextWidget);

    // Setup the queries
    var g_QueriesPanelXPosition = width/2;
    var g_QueriesPanelYPosition = height - 220;
    g_QueriesPanel = new Panel("Queries",g_QueriesPanelXPosition,g_QueriesPanelYPosition,width/2,240);

    // Queries panel Widgets 
    var buttonWidth = 350;
    var buttonHeight = 25;

    var callFilterShow = function (){g_bar.filterShow(1)};
    var showAllButton = new ButtonWidget("Show All",0,0+buttonHeight*0,buttonWidth,buttonHeight,callFilterShow);
    g_QueriesPanel.addWidget(showAllButton);

    var callFilterShowNone = function (){g_bar.filterShow(0)};
    var showNoneButton = new ButtonWidget("Show None",0+buttonWidth,0+buttonHeight*0,buttonWidth,buttonHeight,callFilterShowNone);
    g_QueriesPanel.addWidget(showNoneButton);

    var callFilterShowSelected = function (){g_bar.filterShowSelected(1)};
    var showSelectedButton = new ButtonWidget("Show Selected",0,0+buttonHeight*1,buttonWidth,buttonHeight,callFilterShowSelected);
    g_QueriesPanel.addWidget(showSelectedButton);

    var callFilterShowUnSelected = function (){g_bar.filterShowSelected(0)};
    var showSelectedButton = new ButtonWidget("Show Unselected",0+buttonWidth,0+buttonHeight*1,buttonWidth,buttonHeight,callFilterShowUnSelected);
    g_QueriesPanel.addWidget(showSelectedButton);

    var callSelectAll = function (){g_bar.selectState(1)};
    var selectStateButton = new ButtonWidget("Select All",0,0+buttonHeight*2,buttonWidth,buttonHeight,callSelectAll);
    g_QueriesPanel.addWidget(selectStateButton);

    var callSelectAllNone = function (){g_bar.selectState(0)};
    var selectStateButton = new ButtonWidget("Select None",0+buttonWidth,0+buttonHeight*2,buttonWidth,buttonHeight,callSelectAllNone);
    g_QueriesPanel.addWidget(selectStateButton);

    var callSelectIO = function (){g_bar.selectIO(1)};
    var selectIOButton = new ButtonWidget("Select All IO",0,0+buttonHeight*3,buttonWidth,buttonHeight,callSelectIO);
    g_QueriesPanel.addWidget(selectIOButton);

    var callSelectUserCode = function (){g_bar.selectUserCode(1)};
    var selectUserCodeButton = new ButtonWidget("Select All UserCode",0,0+buttonHeight*3,buttonWidth,buttonHeight,callSelectUserCode);
    g_QueriesPanel.addWidget(selectUserCodeButton);
}


///////////////////////////////////////////////
// User interface
// User interface will stay locked to screen
///////////////////////////////////////////////
function UI(y) {
    // Configuration of UI
    textSize(26);
    textFont("monospace", 26);

    // Render the menubar
    menubar(0,0);

    // Render the Zoom controls
    ZoomPanel(0,10);

    // Render the details panel
    g_DetailsPanel.Render();
    // Render the queries panel
    g_QueriesPanel.Render();
    // Render the metrics panel
    g_MetricsPanel.Render();

    // TODO: Move this into the queries panel as a widget
        // Retreive the value for search box
        g_searchInput.value();
        g_searchInput.position(width/2,height-240+textSize()*6);
        g_searchButton.position(width/2 + g_searchInput.width, height-240+textSize()*6);
        g_searchButton.mousePressed(searchLine);


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
    // Always scale, or (better) find a way to not have to do this every frame.
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
            //g_scale -= 0.01;
        }
        else{
            g_scale *= 1.05;
            //g_scale += 0.01;
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
