

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
let g_sourceFilesMap = new Map();
let g_totalKeys = 0;
let g_sourceCounts = new Map();

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
function preload() {
    
    // For Feb 4 Meeting:
    // this one is slow.
    // filename = "./results/collected-results-profiling-feb-3/appcenter-cli/processed-results-1612378731829.json";

    filename = "./results/collected-results-profiling-feb-3/Concierge/processed-results-1612378786407.json";
    
    // Injection vulnerability?
    // Send this one to Frank.
    // filename = "./results/collected-results-profiling-feb-3/Concierge/processed-results-1612378786407.json";

    // Good example to highlight (as a positive example!)
    // filename = "./results/collected-results-profiling-feb-3/babel-plugin-transform-define/processed-results-1612378743089.json";

    // Load the resulting file
    // loadDataSet(filename); 
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
    var sourceCounts = new Map();
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

        let thisSource = elements[key].source;
        if (!sourceCounts.has(thisSource)) {
          sourceCounts.set(thisSource, 1);
        } else {
          sourceCounts.set(thisSource, sourceCounts.get(thisSource) + 1);
        }
    }

    // Update global variable so as to give other parts of the Vis access to it.
    g_sourceCounts = sourceCounts;

    createSummary();

    // Create a bar chart
    g_bar = new BarChartWidget(50, 100, 200, 100, dataset);

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

// Function to build the summary statistics pane.
// Currently, write out to promises into the readme.
function createSummary() {
  let readmeElement = document.getElementById('readme');

  // Build string.
  let summaryStatisticsString = '';

  // Get top promises.
  let mapDes = new Map([...g_sourceCounts.entries()].sort((a, b) => {
    return b[1] - a[1];
  }));

  for (k of mapDes.keys()) {
    summaryStatisticsString += k + ': ' + mapDes.get(k) + '\n';
  }

  // TODO: Style the table.

  // New thing! Try to make it not a text list, but something better.
  let summaryHTMLElement = document.createElement('table');
  let tableBody = document.createElement('tbody');
  let tableHeaderRow = document.createElement('tr');

  let tableHeader_file = document.createElement('th');
  tableHeader_file.innerHTML = 'Promise Location';
  let tableHeader_count = document.createElement('th');
  tableHeader_count.innerHTML = 'Count';
  let tableHeader_go = document.createElement('th');
  tableHeader_go.innerHTML = 'Go';

  tableHeaderRow.appendChild(tableHeader_file);
  tableHeaderRow.appendChild(tableHeader_count);
  tableHeaderRow.appendChild(tableHeader_go);

  tableBody.appendChild(tableHeaderRow);

  for (k of mapDes.keys()) {
    let tr = document.createElement('tr');

    let td_file = document.createElement('td');
    td_file.innerHTML = k;
    tr.appendChild(td_file);

    let td_count = document.createElement('td');
    td_count.innerHTML = mapDes.get(k);
    tr.appendChild(td_count);

    let td_go = document.createElement('td');
    /* Add a button which opens the file. */
    let go_button = document.createElement('button');
    let splitName = k.split(':');

    let fname, fcontents, startLine, endLine;
    fname = splitName[0];
    fcontents = g_rawPromiseData.files[fname];
    startLine = splitName[1];
    endLine = splitName[3];
    go_button.setAttribute('onclick', `addFileToView('${fname}', g_rawPromiseData.files['${fname}'], ${startLine}, ${endLine}); g_sourceHovered = '${k}'; draw(true)`);
    /* TODO: We also want to highlight them in the vis. */
    go_button.innerHTML = 'Go';
    td_go.appendChild(go_button);
    tr.appendChild(td_go);

    tableBody.appendChild(tr);
  }

  summaryHTMLElement.appendChild(tableBody);

  readmeElement.removeChild(readmeElement.children[0]);
  readmeElement.appendChild(summaryHTMLElement); 
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
function draw(force) {
    // Avoid updating sketch if mouse is out of bounds
    if (!force && (mouseX > width || mouseX < 0 || mouseY > height)) {
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
