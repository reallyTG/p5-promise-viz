let g_padding = 8;  

// Panels
let g_SettingsPanel;
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

// y position of the miniDisplay
var g_miniMapY = 300

// input
let g_searchLineWidget;


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
    fill(204);
    rect(x, y , width, textSize()+g_padding);
    fill(0);
    // Text
    stroke(255);
    text("Pan Offset: (" + round(g_offsetX,1) + "," + round(g_offsetY,3) + ")", x+160, y+textSize());
    // Render framerate
    var rate = frameRate();
    text("FPS:" + int(rate), x+2, y+textSize());
    // Zoom
    text("zoom scale: "+round(g_scale,3), x+640, y+textSize());
    // Last action
    stroke(255);
    fill(0);
    text("last action:"+g_querySummary,width-250,24);
}

// Selects all promises with a particular matching string in their data.
function searchLine(){
  console.log("searchLine");
  for (var i = 0; i < g_bar.entities.length; i++) {
      if(g_bar.entities[i].datum.line.includes(g_searchLineWidget.GetText())>=0){
          g_bar.entities[i].show=true;
      }else{
          g_bar.entities[i].show=false;
      }
  }
}

// Finds a 'text' in a promise highlights it, and selects it
// if 'mode' is true, then we just find the first selected promise
// if 'mode' is false, then we select the 'last' promise only.
function searchAndGoToSelectedText(mode){
    console.log("searchSelectedText("+g_SelectedTextInTextBox+")");

    g_scale = 4;
    enterOnce = false;
    let lastIndex = -1;

    for (var i = 0; i < g_bar.entities.length; i++) {
        g_bar.entities[i].show=false;
        g_bar.entities[i].selected=false;
        if(g_bar.entities[i].datum.line.includes(g_SelectedTextInTextBox.toString()) >=0 ){
            if(mode == false){
                // Record the 'last index' where we found this promise.
                lastIndex = i;
            }else if(mode == true && enterOnce == false){
                g_offsetX =  -g_bar.entities[i].x*g_scale+(width/2);
                g_offsetY =  -g_bar.entities[i].y*g_scale+(height/2);
                enterOnce = true;
                g_bar.entities[i].show=true;
                g_bar.entities[i].selected=true;
                lastIndex = i; // By default, this should be the first promise found
            }
        }
    }

    // If our mode is false, and we are looking for the last promise,
    // then simply wait until the end
    if(mode == false && lastIndex != -1){
        g_bar.entities[lastIndex].show=true;
        g_bar.entities[lastIndex].selected=true;
        g_offsetX =  -g_bar.entities[lastIndex].x*g_scale+(width/2);
        g_offsetY =  -g_bar.entities[lastIndex].y*g_scale+(height/2);
    }

    // Report to user if no promises were found based on the 'lastIndex' value
    if(lastIndex==-1){
        alert("No source found for:"+g_SelectedTextInTextBox);
    }

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




// Setup UI panels
function setupPanels(){
    // Setup the Settings Panel
    var settingsPanelXPosition = 0;
    var settingsPanelYPosition = 50;
    var settingsPanelButtonWidth = 250;
    var settingsPanelButtonHeight = 25;

    g_SettingsPanel = new Panel("Settings",settingsPanelXPosition,settingsPanelYPosition,settingsPanelButtonWidth*2,50);

    var resetViewButton = new ButtonWidget("Reset View",settingsPanelButtonWidth*0,settingsPanelButtonHeight*0,settingsPanelButtonWidth,settingsPanelButtonHeight,resetView);
    g_SettingsPanel.addWidget(resetViewButton);

    var zoomFitButton = new ButtonWidget("Fit to Window",settingsPanelButtonWidth*1,settingsPanelButtonHeight*0,settingsPanelButtonWidth,settingsPanelButtonHeight,ZoomToFit);
    g_SettingsPanel.addWidget(zoomFitButton);

    var showMiniDisplayOnFunc = function (){g_bar.ShowMiniDisplay(1)};
    var showMiniDisplayButtonOn = new ButtonWidget("Show MiniDisplay",settingsPanelButtonWidth*0,settingsPanelButtonHeight*1,settingsPanelButtonWidth,settingsPanelButtonHeight,showMiniDisplayOnFunc);
    g_SettingsPanel.addWidget(showMiniDisplayButtonOn);

    var showMiniDisplayOffFunc = function (){g_bar.ShowMiniDisplay(0)};
    var showMiniDisplayButtonOff = new ButtonWidget("Hide MiniDisplay",settingsPanelButtonWidth*1,settingsPanelButtonHeight*1,settingsPanelButtonWidth,settingsPanelButtonHeight,showMiniDisplayOffFunc);
    g_SettingsPanel.addWidget(showMiniDisplayButtonOff);

    // Queries panel Widgets Properties
    var queryButtonWidth = 250;
    var queryButtonHeight = 25;
    // Setup the queries panel
    var g_QueriesPanelXPosition = 0;
    var g_QueriesPanelYPosition = 120;
    g_QueriesPanel = new Panel("Queries",g_QueriesPanelXPosition,g_QueriesPanelYPosition,queryButtonWidth*2,180);
    
    var callFilterShow = function (){g_bar.filterShow(1)};
    var showAllButton = new ButtonWidget("Show All",0,0+queryButtonHeight*0,queryButtonWidth,queryButtonHeight,callFilterShow);
    g_QueriesPanel.addWidget(showAllButton);

    var callFilterShowNone = function (){g_bar.filterShow(0)};
    var showNoneButton = new ButtonWidget("Show None",0+queryButtonWidth,0+queryButtonHeight*0,queryButtonWidth,queryButtonHeight,callFilterShowNone);
    g_QueriesPanel.addWidget(showNoneButton);

    var callFilterShowSelected = function (){g_bar.filterShowSelected(1)};
    var showSelectedButton = new ButtonWidget("Show Selected",0,0+queryButtonHeight*1,queryButtonWidth,queryButtonHeight,callFilterShowSelected);
    g_QueriesPanel.addWidget(showSelectedButton);

    var callFilterShowUnSelected = function (){g_bar.filterShowSelected(0)};
    var showSelectedButton = new ButtonWidget("Show Unselected",0+queryButtonWidth,0+queryButtonHeight*1,queryButtonWidth,queryButtonHeight,callFilterShowUnSelected);
    g_QueriesPanel.addWidget(showSelectedButton);

    var callSelectAll = function (){g_bar.selectState(1)};
    var selectStateButton = new ButtonWidget("Select All",0,0+queryButtonHeight*2,queryButtonWidth,queryButtonHeight,callSelectAll);
    g_QueriesPanel.addWidget(selectStateButton);

    var callSelectAllNone = function (){g_bar.selectState(0)};
    var selectStateButton = new ButtonWidget("Select None",0+queryButtonWidth,0+queryButtonHeight*2,queryButtonWidth,queryButtonHeight,callSelectAllNone);
    g_QueriesPanel.addWidget(selectStateButton);

    var callSelectIO = function (){g_bar.selectIO(1)};
    var selectIOButton = new ButtonWidget("Select All IO ("+g_bar.totalFunctionswithIO+")",0,0+queryButtonHeight*3,queryButtonWidth,queryButtonHeight,callSelectIO);
    g_QueriesPanel.addWidget(selectIOButton);

    var callSelectUserCode = function (){g_bar.selectUserCode(1)};
    var selectUserCodeButton = new ButtonWidget("Select All User Code ("+g_bar.totalFunctionswithUserCode+")",0,0+queryButtonHeight*4,queryButtonWidth+100,queryButtonHeight,callSelectUserCode);
    g_QueriesPanel.addWidget(selectUserCodeButton);

    g_searchLineWidget = new SearchBoxWidget("Search line (case-sensitive)",0,0+queryButtonHeight*6,queryButtonWidth,queryButtonHeight,searchLine);
    g_QueriesPanel.addWidget(g_searchLineWidget);


    // Setup the details Panel
    var detailsPanelXPosition = 500;
    var detailsPanelYPosition = 50;
    g_DetailsPanel = new Panel("Details",detailsPanelXPosition,detailsPanelYPosition,600,250);
    // Details panel widgets
    g_detailTextWidget = new VisTextWidget("VisTextWidget",0,0);
    g_DetailsPanel.addWidget(g_detailTextWidget);

    // Setup the Metrics Panel
    g_MetricsPanel = new Panel("Metrics",1100,50,500,80);
    // Details panel widgets
    g_metricsTextWidget = new VisTextWidget("VisTextWidget",0,0);
    g_MetricsPanel.addWidget(g_metricsTextWidget);
}


///////////////////////////////////////////////
// User interface
// User interface will stay locked to screen
///////////////////////////////////////////////
function UI(y) {
    // Configuration of UI
    textSize(26);
    textFont("monospace", 24);

    // Render the menubar
    menubar(0,0);

    // Render the Settings panel
    g_SettingsPanel.Render();
    // Render the details panel
    g_DetailsPanel.Render();
    // Render the queries panel
    g_QueriesPanel.Render();
    // Render the metrics panel
    g_MetricsPanel.Render();
}

