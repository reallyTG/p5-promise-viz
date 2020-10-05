// Data set
let dataset = [];

// Global Array for data promises
// This is the raw data loaded
// from a JSON file
let g_rawPromiseData = {};

// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let offsetX = 0;
let offsetY = 0;

// UI Widgets
// let zoomSlider, gSlider, bSlider;

// Details string
let g_details = '';

///////////////////////////////////////////////
// User interface
// User interface will stay locked to screen
///////////////////////////////////////////////
function UI() {
  // UI Box
  fill(0);
  rect(0, height - 60, 200, 60);

  // Render framerate
  textSize(14);
  fill(255);
  stroke(192);
  var rate = frameRate();
  text("FPS:" + int(rate), 2, height - 45);

  // Zoom
  text("zoom scale: "+g_scale, 2, height - 20);

  // Offset
  fill(255);
  stroke(0);
  text("Pan Offset: (" + offsetX + "," + offsetY + ")", 60, height - 40);

  // Details Panel
  fill(0);
  rect(300, height - 60, 200, 60);
  textSize(12);
  fill(255);

  // Details Panel
  text("Details:" + g_details, 300, height - 45);
}

///////////////////////////////////////////////
// Controls
///////////////////////////////////////////////
function Controls() {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }
    if (mouseIsPressed) {
        offsetY -= pmouseY - mouseY;
        offsetX -= pmouseX - mouseX;
    } else {
        //
    }
}


///////////////////////////////////////////////
//
///////////////////////////////////////////////
class View {
  constructor(x, y, w, h, data) {

  }

  display() {

  }
}

/////////////////////////////////////////////////
//                   Promise                   //
//            Holds data for a promise         //
/////////////////////////////////////////////////

// The data that we want to hold
class promiseData{
    constructor(source,startTime,endTime,elapsedTime,asyncID,triggerAsyncID,io,userCode) {
        this.source = entity.s_uniqueid;
        this.startTime = startTime;
        this.endTime = endTime;
        this.elapsedTime = elapsedTime;
        this.asyncID = asyncID;
        this.triggerAsyncID = triggerAsyncID;
        this.io = io;
        this.userCode = userCode;
    }
}


/////////////////////////////////////////////////
//                Entity class                 //
// A general entity that we  want to render    //
/////////////////////////////////////////////////
class entity {

    // 'x' and 'y' values should be relative to 
    // whichever view the entity falls in
    constructor(x, y, w, h, datum) {
        this.id = entity.s_uniqueid;
        // Increment the static variable after each
        // call to the constructor to ensure we keep
        // a count of unique values
        entity.s_uniqueid += 1;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        // Attributes for interation
        this.selected = false;

        // Color of box
        this.stroke = 255;
        this.fill = 0;
    }

    display(scale) {
        this.render();
    }

    hover() {
        if (mouseX >= offsetX + (this.x * g_scale) && mouseX <= offsetX + ((this.x + this.w) * g_scale)) {
              if (mouseY >= offsetY + (this.y * g_scale) && mouseY <= offsetY + ((this.y + this.h) * g_scale)) {
                    // Toggle selection of entity
                    if (mouseIsPressed) {
                        this.selected = !this.selected;
                    }
                    // Invert fill and stroke
                    fill(this.stroke);
                    stroke(this.fill);
                    rect((this.x), this.y, this.w, this.h);
                    g_details = this.id;
          }
    }

}

  // How to render the entity
  render() {
    if (this.selected) {
      strokeWeight(2);
      // Invert fill and stroke
      fill(this.stroke);
      stroke(this.fill);
      rect((this.x), this.y, this.w, this.h);
    } else {
      fill(this.fill);
      stroke(this.stroke);
      noStroke();
    }
    
    rect((this.x), this.y, this.w, this.h);
  }
}
// Static Variables for the entity class
// Prefix of 's_' indicates static
entity.s_uniqueid = 0;


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
    print("Finished loading data")
}

//////////////////////////////////////////////
//       Processing setup function          //
//////////////////////////////////////////////
function setup() {
    // Canvas size
    // The size of the canvas that will 
    createCanvas(1200, 700);

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
                                    elements[key].asyncID,
                                    elements[key].triggerAsyncID,
                                    elements[key].io,
                                    elements[key].userCode
                                  );
        dataset.push(temp);
    }

    // Create a bar chart
    g_bar = new BarChart(50, 100, 200, 100, dataset);

    // Performance Tuning
    // TODO: Disable p5.disableFriendlyErrors = true; // disables FES

    // setup UI Widgets
    zoomSlider = createSlider(1, 100, 1);
}


function mouseWheel(event) {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }

    //move the square according to the vertical scroll amount
    // TODO:    This scale is completely arbitrary as of now
    //          Ideally you could have an infinite zoom in either 
    //          direction.
    if(g_scale >= 0.01){
        g_scale -= (event.delta*.0005);
    }
    else{
        g_scale = 0.01;
    }
    //uncomment to block page scrolling
    //return false;
}

//////////////////////////////////////////////
//            Main draw function            //
//////////////////////////////////////////////
function draw() {
  background(220);

  // Allow pan and zoom of visual components
  translate(offsetX, offsetY);
  scale(g_scale);
   
    g_bar.display(0, 500);

  // Handle user interaction
  // Resetting the matrix removes any further panning and
  // zooming transformations
  Controls();
  resetMatrix();
  UI();
}

