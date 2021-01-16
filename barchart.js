///////////////////////////////////////////////
//
///////////////////////////////////////////////
class BarChart {
    constructor(x, y, w, h, data) {
        print("Constructing BarChart");
        this.x = x;                 // x position of barchart
        this.y = y;                 // y position of barchart
        this.w = w;                 // Width of the barchart
        this.h = h;                 // height of the barchart
        this.data = data;

        this.entities = [];         // Stores all of the entities in the bar chart, these are the 'rectangles' that are hovered on
        var entityHeight = 5;       // The actual height of the rectangle which is rendered
        var xScaleOfeachEntity = 1; 

        // Iterate through data and find the min and max
        // values of start time.
        // I iterate through each value since there is no
        // gaureentee that data is recorded in order.
        var minRange = 9999999999999999999;
        var maxRange = -minRange;
        var minElapsedTime =0;
        var maxElapsedTime =0;
        for (var i = 0; i < this.data.length; i++) {
            // Update minRange
             minRange = min(this.data[i].startTime,minRange)
            // Update maxRange
             maxRange = max(this.data[i].endTime,maxRange)
            // Update minElapsedTime
            minElapsedTime = min(this.data[i].elapsedTime,minElapsedTime);
            // Update maxElapsedTime
            maxElapsedTime = max(this.data[i].elapsedTime,maxElapsedTime);
        }

        // Convert to seconds from nanoseconds
        var nanosecondsToSeconds = 1000000000;
        var microsecondsToSeconds = 1000000;
        var units = microsecondsToSeconds;        
        var firstEntry = minRange;
        var lastEntry = maxRange;

        minRange = minRange / units;
        maxRange = maxRange / units;

        maxRange -= minRange;
        minRange = 0;
        // total duration of program
        var range = maxRange - minRange;       
 
        // Default width 
        this.w = 0;

        print("minRange: "+minRange);
        print("maxRange: "+maxRange);
        print("range: "+range);

        // Create the entities from the data
        for (var i = 0; i < this.data.length; i++) {
            // Extra information out of our data
            // The data that we are extracting from is a promiseData object.
            var entityX = this.x + map(this.data[i].startTime,firstEntry,lastEntry,0,range);
            var entityY = this.y - (i*entityHeight) + this.data.length*entityHeight-entityHeight;
            var entityW = map(this.data[i].elapsedTime,minElapsedTime,maxElapsedTime,0,range);
            var entityH = entityHeight;

            // Create a new barchart entity from our data
            var temp = new entity(entityX,entityY,entityW,entityH,this.data[i]);
            if(i<2){
                print("entityX:"+entityX)
                print("entityW:"+entityW)
            }
               
            this.entities.push(temp);
            // Extend the width of the bar chart to our last data point
            // Set the width of our barchart visualization
            this.w = max(this.w, entityX+entityW);
        }

        // Set the height of the bar chart
        this.h = this.data.length * entityHeight;

    }

  // startRange and endRange are
  // the values along the x-axis for which we want to show data
  display(startRange, endRange) {
    // Background
    fill(192, 128);
    stroke(192);
    rect(this.x, this.y, this.w, this.h);
    // x-axis
    this.xaxis(1);
    // y-axis
    this.yaxis(1);
    // Render all of the entities in our collection
    for (var i = 0; i < this.entities.length; i++) {
        if(this.entities[i].show==true){
            this.entities[i].display();
            this.entities[i].hover();
        }
    }
  }

  // Displays a smaller version of the graph so you can quickly 
  // scrub (i.e. search) for interesting data
  //
  // Parameters: x and y indicate the position
  //             h is the height of the minidisplay
  minidisplay(x,y,h){
    // Background
    fill(255,0,0,192);
    rect(x,y,width,h);
    fill(0,0,0,255);
    rect(x-2,y-2,width-2,h-2);
    // Draw a green dot representing where a promise would be
    for (var i = 0; i < this.entities.length; i++) {
      // Map to the minimap
      var xRelative = map(this.entities[i].x,0,this.w, 0,width);
      var yRelative = map(this.entities[i].y,0,this.h, 0,h);
      // figure out the relative width as well
      // Note: It should be at least 1 pixel wide if there is a promise that exists
      var widthRelative = map(this.entities[i].w,0,this.w, 0,width);
      var heightRelative = map(this.entities[i].h,0,this.h, 0,h);

      // Draw a green box
      fill(0,255,0,255);
      stroke(0,255,0,255);
      // TODO: Get rid of the '130' hard coded number
      //       For some erason, the offset is not quite working, maybe a rounding error?
      //       when working at the sub-pixel level?
      rect(x+xRelative,yRelative+y-(h-130),widthRelative,heightRelative);
    }

    // Slider
    if(mouseY > y && mouseY < y+h){
      fill(255,255,255,255);
      stroke(255,255,255,255);
      ellipse(mouseX, y, 2, 2);
      ellipse(mouseX, y+h, 2, 2);

      line(mouseX,y,mouseX,y+h);
      if (mouseIsPressed) {
        if (mouseButton === LEFT) {
          g_offsetX = -map(mouseX,width,-width,this.w,-this.w)*g_scale;
        }
      }
    }

  }


    // Points any selected node to its trigger id.
    pointToAllTriggers(node){
      var itemsSelected=0;

        for (var i = 0; i < this.entities.length; i++) {
          pointToTrigger(i);
        }

        g_querySummary = itemsSelected;
    }

    // Points any selected node to its trigger id.
    pointToTrigger(nodeID){
      var itemsSelected=0;
        if(nodeID<0 || nodeID > this.entities.length){
          return;
        }
        
        // trigger ID
        if(this.entities[nodeID].datum.triggerAsyncId>0 && this.entities[nodeID].datum.triggerAsyncId < this.entities.length){
            var triggerIndex = this.entities[nodeID].datum.triggerAsyncId;
            stroke(255,0,0,100);
            fill(255,0,0,100);
            line(this.entities[nodeID].x,
                  this.entities[nodeID].y,
                  this.entities[triggerIndex].x+this.entities[triggerIndex].w/2,
                  this.entities[triggerIndex].y);
            itemsSelected++;
        }
        

        g_querySummary = itemsSelected;
    }

    // Only show selected nodes
    filterShow(state){
      var itemsSelected=0;

      for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].show=state;
            itemsSelected++;
      }

      g_querySummary = itemsSelected;
    }

    // Only show selected nodes
    filterShowSelected(state){
      var itemsSelected=0;

      for (var i = 0; i < this.entities.length; i++) {
        if(this.entities[i].selected==true){
            this.entities[i].show=state;
            itemsSelected++;

        }else{
          this.entities[i].show=!state;
        }
      }

      g_querySummary = itemsSelected;

    }

  // Helper function which allows the selection or deselection
  // of a series of nodes.
  // Note, only the y-axis is used
  inverteSelectedRange(startY, endY){
      var itemsSelected=0;

      for (var i = 0; i < this.entities.length; i++) {
          if(startY < g_offsetY +(this.entities[i].y*g_scale) && 
            endY > g_offsetY + (this.entities[i].y*g_scale+this.entities[i].h*g_scale)){
            // Currently inverts the selected range
            // TODO: Will likely want more controls over this.
              this.entities[i].selected = !this.entities[i].selected;
              itemsSelected++;
          }
      }

      g_querySummary = itemsSelected;
  }


  // Helper function which allows the selection or deselection
  // of a series of nodes.
  // Selects all IO nodes
  selectState(selectedState){
    var itemsSelected=0;

    for (var i = 0; i < this.entities.length; i++) {
          this.entities[i].selected = selectedState;
          itemsSelected++;
    }

    g_querySummary = itemsSelected;
  }

  // Helper function which allows the selection or deselection
  // of a series of nodes.
  // Selects all IO nodes
  selectIO(selectedState){
    var itemsSelected=0;
    for (var i = 0; i < this.entities.length; i++) {
        if(this.entities[i].datum.io){
            this.entities[i].selected = selectedState;
            itemsSelected++;
        }else{
          this.entities[i].selected = !selectedState;
        }
    }
        
    g_querySummary = itemsSelected;
  }

  // Helper function which allows the selection or deselection
  // of a series of nodes.
  // Selects all IO nodes
  selectUserCode(selectedState){
    var itemsSelected=0;

    for (var i = 0; i < this.entities.length; i++) {
        if(this.entities[i].datum.userCode){
            this.entities[i].selected = selectedState;
            itemsSelected++;
        }else{
          this.entities[i].selected = !selectedState;
        }
    }
        
    g_querySummary = itemsSelected;
  }

  // Helper function to draw the x-axis
  xaxis(border, maxheight) {
    fill(255, 0, 0, 128);
    stroke(255, 0, 0);
    rect(this.x, this.y + this.h, this.w, border);
  }

  // Helper function to draw the y-axis
  yaxis(border, maxlength) {
    fill(255, 0, 0, 128);
    stroke(255, 0, 0);
    rect(this.x, this.y, border, this.h);
  }
  

  // Popup the currently hovered item
    // Helpful popup window identifying the promise
    popup(){
      if(g_hoveredID>=0 && g_hoveredID<this.entities.length){
        fill(255,192);
        stroke(255);
        rect(mouseX, mouseY-textSize(), width/2, 400);
        fill(0);
        stroke(0);
        //text(this.entities[g_hoveredID].datum.print(),mouseX,mouseY);
        text(this.entities[g_hoveredID].datum.printStringData(),mouseX,mouseY);
      }
    }


  getOriginYOffsetInPixels(){
    return this.entities.length*4; // TODO Replace entity height
  }  

  addData(_entity) {}

}
