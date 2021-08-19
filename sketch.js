// Helper function for loading data
function loadDataSet(path){
    print("Loading data from: "+path);
    // Load a JSON Data file
    g_rawPromiseData = loadJSON(path);
}

// Helper function to load project and setup properties
// from the URL.
function loadProjectFromURL(){
      // Retrieve the http response
      g_URLParams = getURLParams();

      // Initial x position
      if(g_URLParams.hasOwnProperty("x")){
        g_offsetX = parseFloat(g_URLParams.x);
      }
      // Initial y position
      if(g_URLParams.hasOwnProperty("y")){
        g_offsetY = parseFloat(g_URLParams.y);
      }
      // Zoom
      if(g_URLParams.hasOwnProperty("z")){
        g_scale = parseFloat(g_URLParams.z);
      }
      // Filename
      if(g_URLParams.hasOwnProperty("f")){
        g_filename = g_URLParams.f;
      }else{
        alert("no file found--check your path carefully");
      }
}

// Helper function to get the base URL
function getBaseURL(){
  let url = getURL();
  let spliter = split(url, '/');
  // Rebuild url string
  let newURL = spliter[0]+"//"+spliter[2]+"/";

  return newURL;
}

// Helper function to share projects and create
// a query string based off of the current URL
function shareProjectURL(){
  // Get the base URL
  baseURL = getBaseURL();

  // Initial x position
  baseURL += "?x="+g_offsetX;
  // Initial y position
  baseURL += "&y="+g_offsetY;
  // Zoom
  baseURL += "&z="+g_scale;
  // filename
  baseURL += "&f="+g_filename;

  console.log(baseURL);
  prompt("Copy to clipboard: Ctrl+C, Enter", baseURL);
}

// Function to load project
function loadProject(){
  relativePath = prompt("Enter relative filepath to project");
  baseURL = getBaseURL();
  let newURL =baseURL+"?f="+relativePath;
  console.log(newURL);
  //window.location.assign();
}


//////////////////////////////////////////////
//      Processing preload function         //
//////////////////////////////////////////////

// Because loading of data happens asynchronously
// We have to structure our project to load
// all of the data first before populating the visualization.
function preload() {
  // Attempt to load the project based on the URL parameters
  loadProjectFromURL();

  // For Feb 4 Meeting:
  // this one is slow.
  // g_filename = "./results/collected-results-profiling-feb-3/appcenter-cli/processed-results-1612378731829.json";

  // g_filename = "./results/collected-results-profiling-feb-3/Concierge/processed-results-1612378786407.json";
  // g_filename = "./results/collected-results-profiling-feb-3/dugite/processed-results-1612378862546.json";
  // g_filename = "./results/collected-results-profiling-feb-3/dugite/processed-results-1612378874922.json";
  // g_filename = "./results/collected-results-profiling-feb-3/forbid.only/processed-results-1612378960908.json";
  // From before Feb 15 meeting
  // g_filename = "./results/collected-results-profiling-feb-3/joi-router/processed-results-1612379101636.json";

  // Looking for dummy promises:
  // g_filename = "./results/collected-results-profiling-feb-3/CodeceptJS/processed-results-1611858164940.json";
  // g_filename = "./results/me/processed-results-CodeceptJS-changed-again.json"

  // Feb 17 ones.
  // g_filename = "./results/collected-results-profiling-feb-3/node-libcurl/processed-results-1612379194331.json"
  // g_filename = "./results/collected-results-profiling-feb-3/node-promise-retry/processed-results-1612370799168.json"
  // g_filename = "./results/collected-results-profiling-feb-3/node-promise-retry/processed-results-1612379172686.json"
  // g_filename = "./results/collected-results-profiling-feb-3/node-pushnotifications/processed-results-1612379181814.json"
  // g_filename = "./results/collected-results-profiling-feb-3/node-sonos/processed-results-1612379183949.json"
  // g_filename = "./results/collected-results-profiling-feb-3/readdirp/processed-results-1612379264567.json"
  
  // Mar 1
  // g_filename = "./results/FixedResultsMar2021/processed-results-readdirp-correct.json";
  // g_filename = "./results/processed-results-1612378731829.json";
  // g_filename = "./results/FixedResultsMar2021/processed-results-readdirp-with-change.json";
  // g_filename = "./results/processed-results-readdirp-promiseall.json";
  /*
      Map an operation over slice. It doesn't look like the loop needs to be sequential.
      Will explore this further for Monday.
  */
  /*
      Create a small toy program with Promise.all vs for await, show all promises, see
      if more/less created.
  */
  
  // Mar 4
  // Not actually fixed, TypeScript is still a problem.
  // g_filename = "./results/FixedResultsMar2021/processed-results-dugite-fixed.json";
  // This one seems fine.
  // g_filename = "./results/collected-results-profiling-feb-3/node-sonos/processed-results-1612379183949.json";
  // Something is weird.
  // g_filename = "./results/collected-results-profiling-feb-3/node-pushnotifications/processed-results-1612379181814.json";
  // Nothing wrong with this one.
  // g_filename = "./results/collected-results-profiling-feb-3/joi-router/processed-results-1612379101636.json";
  // For some reason this one doesn't work on the server anymore.
  // g_filename = "results/collected-results-profiling-feb-3/forbid.only/processed-results-1612378960908.json";

  // Constructed example.
  // I was expecting this to be worse, given the Promise.all with the await inside.
  // g_filename = "results/processed-results-imagemin-example.json";

  // Injection vulnerability?
  // Send this one to Frank.
  // g_filename = "./results/collected-results-profiling-feb-3/Concierge/processed-results-1612378786407.json";

  // Good example to highlight (as a positive example!)
  // g_filename = "./results/collected-results-profiling-feb-3/babel-plugin-transform-define/processed-results-1612378743089.json";

  // g_filename = "./results/processed-results-c8.json";

  // g_filename = "./results/imagemin/processed-results-imagemin-example.json";
  // g_filename = "./results/highlight.js-0.json";

  // 6/30/21 Anti-patterns .json file
  //g_filename = "./results/processed-results-1625068862120.json"

  // Network information
  // g_filename = "./results/processed-results-1625235491375.json"
    
  // Load the resulting file
  // loadDataSet(filename); 

  // let g_filename = "./results/EvaluationCandidates/Boostnote-0.json";

  if(g_filename.length>0){
    g_rawPromiseData = loadJSON(g_filename);
  }else{
    alert("Cannot find file to load");
  }

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

var number = 9;

/* Takes a patternID and translates it to match what it should be in the paper.
 * analysis  | paper
 * pattern1  | p2
 * pattern2  | p5
 * pattern3  | pV                             * currently ignored TODO:FIXP3
 * pattern4  | p6
 * pattern5  | pP
 */
function paperParityPattern(patternID) {
  switch (patternID) {
    case 'pattern1':
      return 'p2';
    case 'pattern2':
      return 'p5';
    case 'pattern3':
      return 'pV';
    case 'pattern4':
      return 'p6';
    case 'pattern5':
      return 'pP';
    case 'pattern6':
      return 'TBD1'; // TODO: Identify these patterns and name them
    case 'pattern7':
      return 'TBD2';
    case 'pattern8':
      return 'TBD3';
    case 'pattern9':
      return 'TBD4';
    case 'pattern10':
      return 'TBD5';
  }
}

//////////////////////////////////////////////
//       Processing setup function          //
//////////////////////////////////////////////
function setup() {
    // Canvas size
    // The size of the canvas that will 
    createCanvas(1600, 1400);


    // Populate an anti-patterns data structure
    var antiPatternElements = g_rawPromiseData.antipatterns;
    for(var key in antiPatternElements){

      // TODO:FIXP3 Currently, we ignore pattern3, because it's way too broad.
      // 
      //if (antiPatternElements[key].patternID === 'pattern3')
      //  continue;

      //console.log("I am the key:"+key);
      //console.log("I have pattern ID:"+antiPatternElements[key].patternID);

      // Construct a 'string' for the anti-pattern so that we
      // can match it against a promise
      // Thus if we identify a 'anti-pattern' with this string against
      // a promise 'source' string that actually occurs, we can highlight this pattern.

      // TODO: BUG FIX
      // It looks like the start line and end line infromation in g_rawPromiseData.promises is always the same, whereas
      // the data for the antipatterns is much more specific. 
//      stringID = antiPatternElements[key].file+":"+antiPatternElements[key].startLine+":"+antiPatternElements[key].startCol+":"+antiPatternElements[key].endLine+":"+antiPatternElements[key].endCol;  
      stringID = antiPatternElements[key].file+":"+antiPatternElements[key].startLine+":"+antiPatternElements[key].startCol+":"+antiPatternElements[key].startLine+":"+antiPatternElements[key].startCol;  
      // For now, I'll just do a partial match to see if we can find antipatterns that match the starting line
      // of any of the potential anti-patterns.
      var partialID = antiPatternElements[key].file+":"+antiPatternElements[key].startLine;


      // Update the counts of the antipatterns found 
      if(g_AntiPatternCount.has(antiPatternElements[key].patternID)){
        // Update the anti-pattern count
        let value = g_AntiPatternCount.get(antiPatternElements[key].patternID);
        g_AntiPatternCount.set(antiPatternElements[key].patternID,value+1);
        g_totalAntiPatterns++;
      }else{
        // Count the first instance
        g_AntiPatternCount.set(antiPatternElements[key].patternID,1);
        g_totalAntiPatterns++;
      }
       
      //console.log(stringID);

      // Build our antipattern
      var temp = new AntiPattern(
        stringID,
        antiPatternElements[key].endCol,
        antiPatternElements[key].endLine,
        antiPatternElements[key].file,
        paperParityPattern(antiPatternElements[key].patternID),
        antiPatternElements[key].startCol,
        antiPatternElements[key].startLine
      );
      
      g_AntiPatternData.push(temp);
    }

    console.log("g_totalAntiPatterns: "+g_totalAntiPatterns);

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
                                    elements[key].network,
                                    elements[key].userCode,
                                    elements[key].line,
                                    elements[key].startLine,
                                    elements[key].startCol,
                                    elements[key].endLine,
                                    elements[key].endCol,
                                    elements[key].file
                                  );
        // For each promise that we create--iterate through the anti-patterns and
        // check to see if any of those anti-patterns match the promises that 
        // actually occurred during run-time.
        let patternsArray = [];
        // Check all of the anti-patterns(found at compile-time) against the promises that were created
        // at run-time to see which ones actually show up.
        for(anti in g_AntiPatternData){
          let partialID ="";
          for(var key in antiPatternElements){
            partialID = antiPatternElements[key].file+":"+antiPatternElements[key].startLine;
          
            //if (anti.stringID == temp.source){
            //  patternsArray.push(anti.patternID);
            //  console.log("Found one!!!!!!!!!!!!!!!!!!");
            //}

            // TODO: Need to fix this and see if there are exact matches?
            //       For now just using the partial match
            if (temp.source.indexOf(partialID)>=0){
              patternsArray.push(anti.patternID);
              console.log("Found one!!!!!!!!!!!!!!!!!!");
            }
          }
        }
        // Update the array of our 'promise' that we push the to barchart with any anti-pattern information.
        temp.antiPatterns = patternsArray;

        // Push the promise into our data set finally
        g_dataset.push(temp);

        let thisSource = temp.source;
        if (!sourceCounts.has(thisSource)) {
          sourceCounts.set(thisSource, 1);
        } else {
          sourceCounts.set(thisSource, sourceCounts.get(thisSource) + 1);
        }

    }

    // Update global variable so as to give other parts of the Vis access to it.
    g_sourceCounts = sourceCounts;

   


    // Create
    createPromiseBrowserSummary();
    createAntiPatternBrowserSummary();

    // Create a bar chart
    g_bar = new BarChartWidget(50, 100, width, height, g_dataset);

    // Create the share widget button
    g_shareURLButtonWidget = new ButtonWidget(" Share Project URL",width-180,1,180,20,shareProjectURL);
    // Create the load widget button
    g_loadProjectButtonWidget = new ButtonWidget(" Load Project",width-360,1,180,20,loadProject);


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

    // Create UI
    // Call setup Panels
    setupPanels();

    button = createButton('Toggle Debug Mode: '+(!g_disableFriendlyErrors));
    button.mousePressed(changeDebugMode);

    setUIOffset(g_offsetX, g_offsetY);
}

// Function to build the summary statistics pane.
// Currently, write out to promises into the PromiseBrowser.
function createPromiseBrowserSummary() {
  let promiseBrowserElement = document.getElementById('PromiseBrowser');

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
  summaryHTMLElement.classList.add("promiseTable");

  let tableBody = document.createElement('tbody');
  let tableHeaderRow = document.createElement('tr');

  let tableHeader_file = document.createElement('th');
  tableHeader_file.innerHTML = 'Promise Location';
  let tableHeader_count = document.createElement('th');
  tableHeader_count.innerHTML = 'Count';
  let tableHeader_go = document.createElement('th');
  tableHeader_go.innerHTML = 'Jump to Source';

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
    go_button.setAttribute('onclick', `addFileToView('${fname}', g_rawPromiseData.files['${fname}'], ${startLine}, ${endLine}); g_sourceHovered = '${k}'; cry(true)`);
    /* TODO: We also want to highlight them in the vis. */
    go_button.innerHTML = 'Jump to Source';
    td_go.appendChild(go_button);
    tr.appendChild(td_go);

    tableBody.appendChild(tr);
  }

  summaryHTMLElement.appendChild(tableBody);

  promiseBrowserElement.removeChild(promiseBrowserElement.children[0]);
  promiseBrowserElement.appendChild(summaryHTMLElement); 
}

// Function to build the summary statistics pane.
// Currently, write out to promises into the AntiPatternBrowser.
function createAntiPatternBrowserSummary() {
  let antiPatternBrowserElement = document.getElementById('AntiPatternBrowser');

  // Build string.
  let summaryStatisticsString = '';

  // TODO: Style the table.
  // New thing! Try to make it not a text list, but something better.
  let summaryHTMLElement = document.createElement('table');
  summaryHTMLElement.classList.add("antiPatternTable");

  let tableBody = document.createElement('tbody');
  let tableHeaderRow = document.createElement('tr');

  let tableHeader_file = document.createElement('th');
  tableHeader_file.innerHTML = 'Anti-Pattern Location';
  let tableHeader_count = document.createElement('th');
  tableHeader_count.innerHTML = 'Pattern';
  let tableHeader_go = document.createElement('th');
  tableHeader_go.innerHTML = 'Jump to Source';

  tableHeaderRow.appendChild(tableHeader_file);
  tableHeaderRow.appendChild(tableHeader_count);
  tableHeaderRow.appendChild(tableHeader_go);

  tableHeaderRow.style.border = "solid";
  tableHeaderRow.style.borderColor = "#999";
  tableHeader_count.style.border = "solid";
  tableHeader_count.style.borderColor = "#999";
  tableHeader_go.style.border = "solid";
  tableHeader_go.style.borderColor = "#999";

  tableBody.appendChild(tableHeaderRow);

  // Loop through each of the anti-patterns found
  for(var i =0; i < g_AntiPatternData.length; i++){
    let tr = document.createElement('tr');

    let td_file = document.createElement('td');
    td_file.innerHTML = g_AntiPatternData[i].file;
    tr.appendChild(td_file);

    let td_pattern = document.createElement('td');
    td_pattern.innerHTML = g_AntiPatternData[i].patternID;
    tr.appendChild(td_pattern);

    let td_go = document.createElement('td');
    /* Add a button which opens the file. */
    let go_button = document.createElement('button');
    //let splitName = k.split(':');

    let fname, fcontents, startLine, endLine;
    fname = g_AntiPatternData[i].file;
    fcontents = g_rawPromiseData.files[fname];
    startLine = g_AntiPatternData[i].startLine;
    endLine = g_AntiPatternData[i].endLine;
    go_button.setAttribute('onclick', `addFileToView('${fname}', g_rawPromiseData.files['${fname}'], ${startLine}, ${endLine}); g_sourceHovered = '${k}'; cry(true)`);
    /* TODO: We also want to highlight them in the vis. */
    go_button.innerHTML = 'Jump to Source';
    td_go.appendChild(go_button);
    tr.appendChild(td_go);

    td_file.style.border = "solid";
    td_file.style.borderColor = "#999";
    td_pattern.style.border = "solid";
    td_pattern.style.borderColor = "#999";
    td_go.style.border = "solid";
    td_go.style.borderColor = "#999";

    tableBody.appendChild(tr);
  }

  /*
  for (k of mapDes.keys()) {
    let tr = document.createElement('tr');

    let td_file = document.createElement('td');
    td_file.innerHTML = k;
    tr.appendChild(td_file);

    let td_count = document.createElement('td');
    td_count.innerHTML = mapDes.get(k);
    tr.appendChild(td_count);

    let td_go = document.createElement('td');
    // Add a button which opens the file.
    let go_button = document.createElement('button');
    let splitName = k.split(':');

    let fname, fcontents, startLine, endLine;
    fname = splitName[0];
    fcontents = g_rawPromiseData.files[fname];
    startLine = splitName[1];
    endLine = splitName[3];
    go_button.setAttribute('onclick', `addFileToView('${fname}', g_rawPromiseData.files['${fname}'], ${startLine}, ${endLine}); g_sourceHovered = '${k}'; cry(true)`);
    // TODO: We also want to highlight them in the vis.
    go_button.innerHTML = 'Go';
    td_go.appendChild(go_button);
    tr.appendChild(td_go);

    tableBody.appendChild(tr);
  }
  */

  summaryHTMLElement.appendChild(tableBody);

  antiPatternBrowserElement.removeChild(antiPatternBrowserElement.children[0]);
  antiPatternBrowserElement.appendChild(summaryHTMLElement); 
}


function cry() {
  g_bar.entities.forEach(e => e.render());
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

// Clear UI events related to
// if a mouse has been clicked or is otherwise
// hovering over some component.
function ClearUIEvents(){
  g_buttonClickEvent = false;
  g_hoveringOverWidget = false;
}

//////////////////////////////////////////////
//            Main draw function            //
//////////////////////////////////////////////
function draw(force) {
    // Clear the state of any UI events
    ClearUIEvents();
    // Avoid updating sketch if mouse is out of bounds
    if (!force && (mouseX > width || mouseX < 0 || mouseY > height)) {
      return;
    }
    // Draw the default background color
    background(220);
    // Render a grid over the visualization
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

    // Handle UI Update events
    UIUpdate();

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
    UIRender(height - 120);

    // Draw the minidisplay
    g_bar.minidisplay(0,height-g_miniMapHeight,g_miniMapHeight);
}
