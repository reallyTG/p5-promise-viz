

// Data set
let dataset = [];

// Global Array for data promises
// This is the raw data loaded
// from a JSON file
let g_rawPromiseData = {};

// Improves the performance of the visualization
// When set to 'true' performance will be improved.
let g_disableFriendlyErrors = true;

let g_txt;
let g_sourceFilesMap=new Map();
let g_totalKeys = 0;

// Helper function for loading data
function loadDataSet(path){
    print("Loading data from: "+path);
    // Load a JSON Data file
    g_rawPromiseData = loadJSON(path);
}

//////////////////////////////////////////////
//      Processing preload function         //
//////////////////////////////////////////////

// Because loading of data happens asynchronously
// We have to structure our project to load
// all of the data first before populating the visualization.
function preload(){
    //filename = "./ava/results-1595602620959.json"
    //filename = "./results-chained-ex2.json"
    //filename = "./results/ava-results-big.json";
    //filename = "./results/apex-charts-results-1602517085490.json"; 

    // For Jan 14 2021 Meeting:
    // filename = "./results/processed-results-json2csv.json";
    // filename = "./results/processed-results-centra.json";
    // filename = "./results/processed-results-json2csv1.json";
    // filename = "./results/processed-results-c8.json"
    
    // For Feb 4 Meeting:
    // this one is slow.
    // filename = "./results/collected-results-profiling-feb-3/appcenter-cli/processed-results-1612378731829.json";

    filename = "./results/collected-results-profiling-feb-3/Concierge/processed-results-1612378786407.json";
    
    // Injection vulnerability?
    // Send this one to Frank.
    filename = "./results/collected-results-profiling-feb-3/Concierge/processed-results-1612378786407.json";

    // Good example to highlight (as a positive example!)
    // filename = "./results/collected-results-profiling-feb-3/babel-plugin-transform-define/processed-results-1612378743089.json";

    // Load the resulting file
    //loadDataSet(filename); 
    g_rawPromiseData = loadJSON(filename);

    print("Finished loading data")
}

// Takes a string in the form:
// (ava/node_modules/tsd/dist/cli.js:5:12:5:12)
// and parses it to
// ava/node_modules/tsd/dist/cli.js
function parseStringAsFileName(input){
  // Alexi: changed the first arg to 0, since we deal with
  // the leading ( in preprocessing.
  parsed = input.substr(0,input.lastIndexOf(".js")+3);
  return parsed;
}




//////////////////////////////////////////////
//       Processing setup function          //
//////////////////////////////////////////////
function setup() {
    // Canvas size
    // The size of the canvas that will 
    createCanvas(1600, 1200);

    // Create UI
    // Call setup Panels
    setupPanels();

    // Populate our data structure for the barchart
    // with JSON Data
    var elements = g_rawPromiseData.promises;
    for(var key in elements){
        // Push the actual element into the data set
        var temp = new promiseData(
                                    elements[key].uniqueid,
                                    elements[key].source,
                                    elements[key].startTime,
                                    elements[key].endTime,
                                    elements[key].elapsedTime,
                                    elements[key].asyncId,
                                    elements[key].triggerAsyncId,
                                    elements[key].io,
                                    elements[key].userCode,
                                    elements[key].line,
                                    elements[key].startLine,
                                    elements[key].startCol,
                                    elements[key].endLine,
                                    elements[key].endCol,
                                    elements[key].file
                                  );
        dataset.push(temp);
    }

    // Create a bar chart
    g_bar = new BarChart(50, 100, 200, 100, dataset);

    // Create some widgets
    g_searchInput = createInput(); // Located in UI.js
    g_searchButton = createButton('Search line (case-sensitive)');

    // Performance Tuning
    // Parse each of the file names from the data set
    for(var k in g_rawPromiseData["promises"]){
      g_totalKeys++;
    }

    // Alexi: Never used.
    // for(var i=0; i < g_totalKeys;i++){
    //   // g_sourceFilesMap[g_rawPromiseData["promises"][i]["source"]] = loadStrings(parseStringAsFileName(g_rawPromiseData["promises"][i]["source"]));
    //   let fileToLoad = parseStringAsFileName(g_rawPromiseData["promises"][i]["source"]);
    //   // console.log('loadStrings: ' + loadStrings);
    //   g_sourceFilesMap[g_rawPromiseData["promises"][i]["source"]] = loadStrings(fileToLoad);
    // }

    button = createButton('Toggle Debug Mode: '+(!g_disableFriendlyErrors));
    button.mousePressed(changeDebugMode);

    setUIOffset(g_offsetX, g_offsetY);

}

//
function changeDebugMode() {
  g_disableFriendlyErrors = !g_disableFriendlyErrors;
  p5.disableFriendlyErrors = g_disableFriendlyErrors;
  button.html('Toggle Debug Mode: '+(!g_disableFriendlyErrors))
}

/*
// Constants
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === Y_AXIS) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === X_AXIS) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }

let value = 0;
*/

//////////////////////////////////////////////
//            Main draw function            //
//////////////////////////////////////////////
function draw() {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
      return;
    }
    background(220);
    drawGrid();

    /*
    // Define colors
    b1 = color(255);
    b2 = color(0);
    c1 = color(value, 102, 0);
    c2 = color(0, 102, value);

    value++;
    if(value>255){
        value =0;
    }

    setGradient(0, 0, width / 2, height, b1, b2, X_AXIS);
    setGradient(width / 2, 0, width / 2, height, b2, b1, X_AXIS);
    // Foreground
    setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
    setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
    */

    //  push();
    //  translate(mx,my);
    // Retrieve user input
    Controls();
    
    //popMatrix();
    // Allow pan and zoom of visual components
    
    g_bar.display(0, 500);
    // Highlights all nodes in the promise chain
    if(g_hoveredID>0 && g_hoveredID < g_bar.entities.length){
    // TODO: Item for mike to fix highlighting the promise chain
    //  g_bar.highlightPromiseChain(g_hoveredID); 
    }
    // Points to the first promise triggered
    g_bar.pointToTrigger(g_hoveredID);

    // Handle user interaction
    // Resetting the matrix removes any further panning and
    // zooming transformations
    resetMatrix();

    // If the mouse is not currently down, give a preview
    // of the promise that is highlighted
    if(!g_mouseIsCurrentlyDown){
        g_bar.popup();
    }
    
    // Note: The UI should be drawn only
    //       after we reset the matrix
    //       otherwise the scale will be
    //       thrown off.
    // Takes as a parameter the height
    UI(height - 220);
    g_bar.minidisplay(0,height-g_miniMapY-250,g_miniMapY);

}
