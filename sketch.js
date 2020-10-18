// TODO:
// - Zoom to cursor
// - Show information in Dialog
// - Show source code
// Data set
let dataset = [];

// Global Array for data promises
// This is the raw data loaded
// from a JSON file
let g_rawPromiseData = {};



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
    loadDataSet("./results/ava-results-norm.json"); 
    //loadDataSet("./results/ava-results-big.json");
    //loadDataSet("./results/apex-charts-results-1602517085490.json"); 
    print("Finished loading data")
}

//////////////////////////////////////////////
//       Processing setup function          //
//////////////////////////////////////////////
function setup() {
    // Canvas size
    // The size of the canvas that will 
    createCanvas(1600, 900);

    // Populate our data structure for the barchart
    // with JSON Data
    var elements = g_rawPromiseData.promises;
    for(var key in elements){
        // Push the actual element into the data set
        var temp = new promiseData(
                                    elements[key].source,
                                    elements[key].startTime,
                                    elements[key].endTime,
                                    elements[key].elapsedTime,
                                    elements[key].asyncId,
                                    elements[key].triggerAsyncId,
                                    elements[key].io,
                                    elements[key].userCode
                                  );
        dataset.push(temp);
    }

    // Create a bar chart
    g_bar = new BarChart(50, 100, 200, 100, dataset);

    // Performance Tuning
    // TODO: Disable p5.disableFriendlyErrors = true; // disables FES
    //
    
    setUIOffset(offsetX, offsetY);

    // setup UI Widgets
    zoomSlider = createSlider(1, 100, 1);
}


//////////////////////////////////////////////
//            Main draw function            //
//////////////////////////////////////////////
function draw() {
    background(220);

    mx = mouseX;
    my = mouseY;
    translate(offsetX, offsetY);
    //popMatrix();
    // Allow pan and zoom of visual components
    translate(-mx*g_scale,-my*g_scale);
    scale(g_scale);
    translate(mx,my);
   
    g_bar.display(0, 500);
    // Handle user interaction
    // Resetting the matrix removes any further panning and
    // zooming transformations
    resetMatrix();
    Controls();
    // Note: The UI should be drawn only
    //       after we reset the matrix
    //       otherwise the scale will be
    //       thrown off.
    UI();
}
