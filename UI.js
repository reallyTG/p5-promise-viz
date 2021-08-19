let g_padding = 8; 

// Panels
let g_SettingsPanel;
let g_DetailsPanel;
let g_QueriesPanel;
let g_MetricsPanel;
let g_AntiPatternsPanel;
let g_LegendPanel;

// Text Widgets
let g_detailTextWidget;
let g_metricsTextWidget;
let g_antiPatternsTextWidget;

// Stores the indices of all matching
// promixes of the text. Useful for
// navigation of promises.
let g_PromiseTextSearchResults = [];
let g_SearchIndex = -1;

// Global Details string
// Currently hovered element
let g_hoveredID = -1;

// Query String
// Keeps track of what happened in latest action.
let g_querySummary = '';

// y position of the miniDisplay
var g_miniMapHeight = 300

// input
let g_searchLineWidget;


// Helper function to draw a grid to help improve visualization
function drawGrid() {
    fill(0, 0, 0, 64);
    stroke(0, 0, 255,64);

    //var segments = 8;
    //var horizontalSpace = (height/g_scale) / segments;
    //var verticalSpace = (width/g_scale) / segments;

    var segments = 40;
    var horizontalSpace = (height * g_scale) / segments;
    var verticalSpace = (width * g_scale) / segments;

   // drawingContext.setLineDash([9, 10]);

    // Draw some horizontal segments
    for(var horizontal =0; horizontal < segments/g_scale; horizontal++){
        line(0, horizontal*horizontalSpace, width, horizontal*horizontalSpace);
    }
    // Draw some vertical segments
    for(var vertical =0; vertical < segments/g_scale; vertical++){
        line(vertical*verticalSpace, 0, vertical*verticalSpace, height);

        //line(xhorizontal, this.h + horizontal*horizontalSpace, this.w, this.h + horizontal*horizontalSpace);
    }
  //  drawingContext.setLineDash([]);

}

function setUIOffset(x, y){
    g_offsetX = x;
    g_offsetY = y;
}

function menubar(x,y){
    // Menubar
    textSize(16);
    // X,Y position -- Offset
    fill(164);
    rect(x, y , width, textSize()+g_padding);
    fill(0);
    // Text
    stroke(0);
    noStroke();
    text("Pan Offset: (" + round(g_offsetX,1) + "," + round(g_offsetY,3) + ")", x+160, y+textSize());
    // Render framerate
    var rate = frameRate();
    text("FPS:" + int(rate), x+2, y+textSize());
    // Zoom
    text("zoom scale: "+round(g_scale,3), x+640, y+textSize());
    // Last action
    text("last action:"+g_querySummary,width-350,y+textSize());

    g_shareURLButtonWidget.Render();
    g_loadProjectButtonWidget.Render();

}

// Selects all promises with a particular matching string in their data.
function searchLine(){
  console.log("searchLine");
  for (var i = 0; i < g_bar.entities.length; i++) {
      if(g_bar.entities[i].datum.line.includes(g_searchLineWidget.GetText())==true){
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
    // Handle case where nothing is selected and just return
    if(g_SelectedTextInTextBox.length <=0){
        return;
    }

    // Clear previous search results
    g_PromiseTextSearchResults = [];

    g_scale = 4;
    enterOnce = false;
    let lastIndex = -1;
    g_SearchIndex = -1;

    for (var i = 0; i < g_bar.entities.length; i++) {
        g_bar.entities[i].show=false;
        g_bar.entities[i].selected=false;

        if(g_bar.entities[i].datum.line.includes(g_SelectedTextInTextBox) == true ){
            g_PromiseTextSearchResults.push(i);
            if(mode == false){
                // Record the 'last index' where we found this promise.
                lastIndex = i;
                g_SearchIndex++; // Increment the index
            }else if(mode == true && enterOnce == false){
                g_offsetX =  -g_bar.entities[i].x*g_scale+(width/2);
                g_offsetY =  -g_bar.entities[i].y*g_scale+(height/2);
                enterOnce = true;
                g_bar.entities[i].show=true;
                g_bar.entities[i].selected=true;
                lastIndex = i; // By default, this should be the first promise found
                g_SearchIndex=0; // Always set to '0' by default
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

function NextSelected(){
    // Handle case where no text has been searched
    if(g_PromiseTextSearchResults.length<=0){
        return;
    }
    // Ensure at least one result has been found    
    if(g_SearchIndex != -1){
        // Search for next item
        g_SearchIndex++;
        // Handle wrap around
        if(g_SearchIndex > g_PromiseTextSearchResults.length-1){
            g_SearchIndex = 0;
        }
        // Target the selected item
        var index= g_PromiseTextSearchResults[g_SearchIndex];
        g_bar.entities[index].show=true;
        g_bar.entities[index].selected=true;
        g_offsetX =  -g_bar.entities[index].x*g_scale+(width/2);
        g_offsetY =  -g_bar.entities[index].y*g_scale+(height/2);
    }
}

function PreviousSelected(){
    // Handle case where no text has been searched
    if(g_PromiseTextSearchResults.length<=0){
        return;
    }
    // Ensure at least one result has been found    
    if(g_SearchIndex!=-1){
        // Search for next item
        g_SearchIndex--;
        // Handle wrap around
        if(g_SearchIndex < 0 ){
            g_SearchIndex = g_PromiseTextSearchResults.length-1;
        }
        // Target the selected item
        var index= g_PromiseTextSearchResults[g_SearchIndex];
        g_bar.entities[index].show=true;
        g_bar.entities[index].selected=true;
        g_offsetX =  -g_bar.entities[index].x*g_scale+(width/2);
        g_offsetY =  -g_bar.entities[index].y*g_scale+(height/2);
    }
}

// Iterate through and select all instances of a particular promise
function FindAllInstancesOfSelectedText(){
    // Handle case where no text has been searched
    if(g_PromiseTextSearchResults.length<=0){
        return;
    }
    // Ensure at least one result has been found    
    if(g_SearchIndex!=-1){
        g_SearchIndex=0;

        for(let i =0; i < g_PromiseTextSearchResults.length;i++){
            // Target the selected item
            var index= g_PromiseTextSearchResults[i];
            g_bar.entities[index].show=true;
            g_bar.entities[index].selected=true;
            g_offsetX =  -g_bar.entities[index].x*g_scale+(width/2);
            g_offsetY =  -g_bar.entities[index].y*g_scale+(height/2);
        }
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

    g_SettingsPanel = new Panel("Visualization Settings",settingsPanelXPosition,settingsPanelYPosition,settingsPanelButtonWidth*2,50);

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
    g_QueriesPanel = new Panel("Queries/Filters",g_QueriesPanelXPosition,g_QueriesPanelYPosition,queryButtonWidth*2,180);
    
    var callSelectAll = function (){g_bar.selectState(1)};
    var selectStateButton = new ButtonWidget("Select All",0,0+queryButtonHeight*0,queryButtonWidth,queryButtonHeight,callSelectAll);
    g_QueriesPanel.addWidget(selectStateButton);

    var callSelectAllNone = function (){g_bar.selectState(0)};
    var selectStateButton = new ButtonWidget("Select None",0+queryButtonWidth,0+queryButtonHeight*0,queryButtonWidth,queryButtonHeight,callSelectAllNone);
    g_QueriesPanel.addWidget(selectStateButton);

    var callFilterShowSelected = function (){g_bar.filterShowSelected(1)};
    var showSelectedButton = new ButtonWidget("Show Selected",0,0+queryButtonHeight*1,queryButtonWidth,queryButtonHeight,callFilterShowSelected);
    g_QueriesPanel.addWidget(showSelectedButton);

    var callFilterShowUnSelected = function (){g_bar.filterShowSelected(0)};
    var showSelectedButton = new ButtonWidget("Show Unselected",0+queryButtonWidth,0+queryButtonHeight*1,queryButtonWidth,queryButtonHeight,callFilterShowUnSelected);
    g_QueriesPanel.addWidget(showSelectedButton);

    var callFilterShow = function (){g_bar.filterShow(1)};
    var showAllButton = new ButtonWidget("Show All ("+g_bar.totalPromises+")",0,0+queryButtonHeight*2,queryButtonWidth,queryButtonHeight,callFilterShow);
    g_QueriesPanel.addWidget(showAllButton);

    var callFilterShowNone = function (){g_bar.filterShow(0)};
    var showNoneButton = new ButtonWidget("Show None",0+queryButtonWidth,0+queryButtonHeight*2,queryButtonWidth,queryButtonHeight,callFilterShowNone);
    g_QueriesPanel.addWidget(showNoneButton);

    var callSelectIO = function (){g_bar.selectIO(1)};
    var selectIOButton = new ButtonWidget("Select All IO ("+g_bar.totalFunctionswithIO+")",0,0+queryButtonHeight*3,queryButtonWidth,queryButtonHeight,callSelectIO);
    g_QueriesPanel.addWidget(selectIOButton);

    var callSelectNetwork = function (){g_bar.selectNetwork(1)};
    var selectNetworkButton = new ButtonWidget("Select Network ("+g_bar.totalFunctionswithNetwork+")",queryButtonWidth,0+queryButtonHeight*3,queryButtonWidth,queryButtonHeight,callSelectNetwork);
    g_QueriesPanel.addWidget(selectNetworkButton);

    var callSelectUserCode = function (){g_bar.selectUserCode(1)};
    var selectUserCodeButton = new ButtonWidget("Select User Code ("+g_bar.totalFunctionswithUserCode+")",0,0+queryButtonHeight*4,queryButtonWidth,queryButtonHeight,callSelectUserCode);
    g_QueriesPanel.addWidget(selectUserCodeButton);

    g_searchLineWidget = new SearchBoxWidget("Filter by text in source (case-sensitive)",10,0+queryButtonHeight*6,queryButtonWidth,queryButtonHeight,searchLine);
    g_QueriesPanel.addWidget(g_searchLineWidget);

    // Setup the details Panel
    var detailsPanelXPosition = 500;
    var detailsPanelYPosition = 50;
    g_DetailsPanel = new Panel("Numeric Details on Demand",detailsPanelXPosition,detailsPanelYPosition,600,250);
    // Details panel widgets
    g_detailTextWidget = new VisTextWidget("Details Panel",0,0);
    g_DetailsPanel.addWidget(g_detailTextWidget);

    // Setup the Metrics Panel
    g_MetricsPanel = new Panel("Metrics",1100,50,500,80);
    // Details panel widgets
    g_metricsTextWidget = new VisTextWidget("VisTextWidget",0,0);
    g_MetricsPanel.addWidget(g_metricsTextWidget);

    g_AntiPatternsPanel = new Panel("AntiPatterns",1100,150,500,90);
    g_antiPatternsTextWidget = new VisTextWidget("VisTextWidget",0,0);
    // Update our antipatterns panel text
    // First Scan anti-patterns total
    let patternsTotalString = "    ";
    let tempCounter =0;
    // Sort our keys first
    //var mapAsc = new Map(g_AntiPatternCount.keys().sort());
    // console.log("mapASC:"+mapAsc);
    // console.log(mapAsc);
    var mapAscendingSorted = Array.from(g_AntiPatternCount.keys()).sort();

    // One corner case since we have more than 9 patterns.
    // https://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
    const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
    mapAscendingSorted.sort(sortAlphaNum);

    for (var i=0; i < mapAscendingSorted.length; i++){
        patternsTotalString += mapAscendingSorted[i]+": "+g_AntiPatternCount.get(mapAscendingSorted[i])+" ";
        tempCounter++;
        if (tempCounter==3){
            patternsTotalString+="\n    ";
            tempCounter=0;
        }
    }

    g_antiPatternsTextWidget.SetText("Antipatterns found: "+g_totalAntiPatterns+"\n"+patternsTotalString);
    g_AntiPatternsPanel.addWidget(g_antiPatternsTextWidget);

    // Setup the Legend Panel
    g_LegendPanel = new Panel("Visualiation Legend",1100,260,500,40);

    // Callback function for Javascript to be passed in
    // Javascript is a silly language
    var HoverFunc = function() {doSomething("TODO")};
    var HoverFuncPattern1 = function() {doSomething("pattern1")};
    var HoverFuncPattern2 = function() {doSomething("pattern2")};
    var HoverFuncPattern3 = function() {doSomething("pattern3")};
    var HoverFuncPattern4 = function() {doSomething("pattern4")};
    var HoverFuncPattern5 = function() {doSomething("pattern5")};
    var HoverFuncPattern6 = function() {doSomething("pattern6")};
    var HoverFuncPattern7 = function() {doSomething("pattern7")};
    var HoverFuncPattern8 = function() {doSomething("pattern8")};
    var HoverFuncPattern9 = function() {doSomething("pattern9")};
    var HoverFuncPattern10 = function() {doSomething("pattern10")};

    
    var LegendHoverButton1 = new HoverButtonWidget("Unselected"      ,0,  0 , 16,16,  0  ,0  ,0,   HoverFunc);
    var LegendHoverButton2 = new HoverButtonWidget("Selected"        ,0,  20, 16,16,  255,255,255, HoverFunc);
    var LegendHoverButton3 = new HoverButtonWidget("I/O"             ,20,  0, 16,16,  75 ,0  ,130, HoverFunc);
    var LegendHoverButton4 = new HoverButtonWidget("Network"         ,20,  20,  16,16,  265,155,0,  HoverFunc);
    var LegendHoverButton5 = new HoverButtonWidget("Pattern 1 - Await-Return-In-Async"      ,40, 0, 16,16,   255,0  ,0,         HoverFuncPattern1);
    var LegendHoverButton6 = new HoverButtonWidget("Pattern 2 - Promise-Resolve-Then"       ,40, 20, 16,16,  192,128  ,0,       HoverFuncPattern2);
    var LegendHoverButton7 = new HoverButtonWidget("Pattern 3 - Awaited Value"              ,60, 0, 16,16,  255,128  ,255,      HoverFuncPattern3);
    var LegendHoverButton8 = new HoverButtonWidget("Pattern 4 - In-House Promisification"   ,60, 20, 16,16,  255,255  ,0,       HoverFuncPattern4);
    var LegendHoverButton9 = new HoverButtonWidget("Pattern 5 - Function Returns a Promise" ,80, 0, 16,16,  255,0  ,255,        HoverFuncPattern5);
    var LegendHoverButton10 = new HoverButtonWidget("Pattern 6 - Async Executor"             ,80, 20, 16,16,  0,0  ,255,        HoverFuncPattern6);
    var LegendHoverButton11 = new HoverButtonWidget("Pattern 7 - Await-in-a-Loop"            ,100, 0, 16,16,  0,128  ,255,      HoverFuncPattern7);
    var LegendHoverButton12 = new HoverButtonWidget("Pattern 8 - Synchronous Resolve/Reject" ,100, 20, 16,16,  128,255  ,0,     HoverFuncPattern8);
    var LegendHoverButton13 = new HoverButtonWidget("Pattern 9 - Explicit Constructor"       ,120, 0, 16,16,  128,255  ,128,    HoverFuncPattern9);
    var LegendHoverButton14 = new HoverButtonWidget("Pattern 10 - Async Function w/o Await" ,120, 20, 16,16,  92,64  ,55,       HoverFuncPattern10);

    // For now add the widgets in reverse order so they do not overlap
    g_LegendPanel.addWidget(LegendHoverButton14);
    g_LegendPanel.addWidget(LegendHoverButton13);
    g_LegendPanel.addWidget(LegendHoverButton12);
    g_LegendPanel.addWidget(LegendHoverButton11);
    g_LegendPanel.addWidget(LegendHoverButton10);
    g_LegendPanel.addWidget(LegendHoverButton9);
    g_LegendPanel.addWidget(LegendHoverButton8);
    g_LegendPanel.addWidget(LegendHoverButton7);
    g_LegendPanel.addWidget(LegendHoverButton6);
    g_LegendPanel.addWidget(LegendHoverButton5);
    g_LegendPanel.addWidget(LegendHoverButton4);
    g_LegendPanel.addWidget(LegendHoverButton3);
    g_LegendPanel.addWidget(LegendHoverButton2);
    g_LegendPanel.addWidget(LegendHoverButton1);
}

// Pattern string should be something like 'pattern1','pattern2', etc.
function doSomething(pattern){
    g_bar.selectAntiPattern(pattern);
}


function UIUpdate() {
    // Update the buttons
    g_shareURLButtonWidget.Update();
    g_loadProjectButtonWidget.Update();


    // Render the Settings panel
    g_SettingsPanel.Update();
    // Render the details panel
    g_DetailsPanel.Update();
    // Render the queries panel
    g_QueriesPanel.Update();
    // Render the metrics panel
    g_MetricsPanel.Update();
    // Render the Antipatterns panel
    g_AntiPatternsPanel.Update();
    // Render the Legend panel
    g_LegendPanel.Update();
}
///////////////////////////////////////////////
// User interface
// User interface will stay locked to screen
///////////////////////////////////////////////
function UIRender(y) {
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
    // Render the Antipatterns panel
    g_AntiPatternsPanel.Render();
    // Render the Antipatterns panel
    g_LegendPanel.Render();
}

