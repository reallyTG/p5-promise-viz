// Global array for our promises
let promises = [];

// Data set
let dataset = [];

// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let offsetX = 0;
let offsetY = 0;

// UI Widgets
// let zoomSlider, gSlider, bSlider;

// Details string
let details = '';

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
  text("Details:" + details, 300, height - 45);
}

///////////////////////////////////////////////
// Controls
///////////////////////////////////////////////
function Controls() {
  if (mouseIsPressed) {
    offsetY -= pmouseY - mouseY;
    offsetX -= pmouseX - mouseX;
  } else {}
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

///////////////////////////////////////////////
//
///////////////////////////////////////////////
class BarChart {
  constructor(x, y, w, h, data) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.data = data;

    this.entities = [];
    var entityHeight = 2;
    // Set the height of the bar chart
    this.h = this.data.length * entityHeight;

    // Create the entities from the data
    for (var i = 0; i < this.data.length; i++) {
      this.w = max(this.w, this.data[i][0]);


      var temp = new entity(this.x + this.data[i][0],
        this.h + this.y - (i * entityHeight),
        this.data[i][1] - this.data[i][0],
        entityHeight);
      this.entities.push(temp);
    }
    // Extend the width of the bar chart to our last data point
    this.w *= 2;
  }

  // startRange and endRange are
  // the values along the x-axis for which we want to show data
  display(startRange, endRange) {
    // Background
    fill(192, 128);
    stroke(192);
    rect(this.x, this.y, this.w/2, this.h);
    // x-axis
    this.xaxis(1);
    // y-axis
    this.yaxis(1);
    // Render the data
    for (var i = 0; i < this.entities.length; i++) {
      this.entities[i].display();
      this.entities[i].hover();
    }
  }

  xaxis(border, maxheight) {
    fill(255, 0, 0, 128);
    stroke(255, 0, 0);
    rect(this.x, this.y + this.h, this.w, border);
  }

  yaxis(border, maxlength) {
    fill(255, 0, 0, 128);
    stroke(255, 0, 0);
    rect(this.x, this.y, border, this.h);
  }

  addData(_entity) {}

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
        details = this.id;


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



//////////////////////////////////////////////
//       Processing setup function          //
//////////////////////////////////////////////
function setup() {
  // Canvas size
    // 
  createCanvas(1200, 700);

  // Load data
  var gridSize = 280;
  for (var x = 0; x < gridSize; x++) {
    for (var y = 0; y < gridSize; y++) {
      newPromise = new entity(x * 8, y * 8, 6, 6, "Some collection of data");
      promises.push(newPromise);
    }
  }

  // Another dataset
  var start = 0;
  var end = start + random(100);
  var length = end - start;
  for (var z = 0; z < 500; z++) {
    // Simulate a start and end time
    dataset.push([start, end]);
    start = start+(random(length)); // TODO: Generate airplane pattern by default
    end = start + random(100);
    length = end - start;
  }

  // Create a bar chart
  bar = new BarChart(50, 100, 200, 100, dataset);

  // Performance Tuning
  // TODO: Disable p5.disableFriendlyErrors = true; // disables FES

  // setup UI Widgets
  zoomSlider = createSlider(1, 100, 1);
}


function mouseWheel(event) {
  print(event.delta);
  print(g_scale);
  //move the square according to the vertical scroll amount
  g_scale -= (event.delta*.001);
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

  //
  for (var i = 0; i < promises.length; i++) {
    //promises[i].display(scale);
    //promises[i].hover(scale);
  }

  bar.display(0, 500);


  // Handle user interaction
  // Resetting the matrix removes any further panning and
  // zooming transformations
  Controls();
  resetMatrix();
  UI();
}

