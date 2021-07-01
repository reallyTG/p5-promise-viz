///////////////////////////////////////////////
//
///////////////////////////////////////////////
class BarChartWidget {
    constructor(x, y, w, h, promiseData) {
        print("Constructing BarChartWidget");
        this.x = x;                 // x position of barchart
        this.y = y;                 // y position of barchart
        this.w = w;                 // Width of the barchart
        this.h = h;                 // height of the barchart
        this.data = promiseData;           // Raw promise data stored in the bar chart

        // Store positions of the minidisplay
        // This is done so that mouse clicks are ignored from the minidisplay
        this.MiniDisplayX = 0;
        this.MiniDisplayY = 0;
        this.MiniDisplayH = 0;
        // Toggle visibility of minidisplay
        // Hiding the mini display avoids rendering, so
        // overall performance of program will be faster.
        this.showMiniDisplay = true;
        // Keep track of some maximum values for the width and height
        // These two values are later used to map a 'rectangular region
        // of where the cursor is in the mini-display
        this.maxXPosition = 0;
        this.maxYPosition =0;

        this.entities = [];         // Stores all of the entities in the bar chart, these are the 'rectangles' that are hovered on
        var entityHeight = 5;       // The actual height of the rectangle which is rendered
        var xScaleOfeachEntity = 1; 

        // Various metrics stored about the data
        this.totalPromises = this.data.length;
        this.totalElapsedTime = 0;
        this.averageDuration = 0;
        this.totalFunctionswithIO = 0;
        this.totalFunctionswithUserCode =0;

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
            // Add to the total elapsed time
            this.totalElapsedTime += parseInt(this.data[i].elapsedTime);
            // Increment number of pieces of data
            // that contain user code.
            if(this.data[i].userCode){
              this.totalFunctionswithUserCode++;
            }
            // Increment number of pieces of data
            // that contain io
            if(this.data[i].io){
              this.totalFunctionswithIO++;
            }
        }
        // Compute average duration of promises
        this.averageDuration = this.totalElapsedTime / this.totalPromises;

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
        // These are each of the individual 'bars' that
        // are going to be rendered on the bar chart.
        for (var i = 0; i < this.data.length; i++) {
            // Extra information out of our data
            // The data that we are extracting from is a promiseData object.
            var entityX = this.x + map(this.data[i].startTime,firstEntry,lastEntry,0,range);
            var entityY = this.y - (i*entityHeight) + this.data.length*entityHeight-entityHeight;
            var entityW = map(this.data[i].elapsedTime,minElapsedTime,maxElapsedTime,0,range);
            var entityH = entityHeight;

            // Create a new entity from our data for our BarChartWidget
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
        // This is primarily used for the 'background rendering'
        this.h = this.data.length * entityHeight;
    }

  GetMetrics(){
    let result = "Total Promises:  \t\t\t"+ this.totalPromises
                +"\nTotal Elapsed Time:  \t"+this.totalElapsedTime
                +"\nAvg. Promise Duration: "+this.averageDuration;

    return result;
  }

  // startRange and endRange are
  // the values along the x-axis for which we want to show data
  // startRange and endRange are for the 'time'
  display(startRange, endRange) {
    // Background/Boundary of the bar chart
    fill(128, 128);
    stroke(192);
    rect(this.x, this.y, this.w, this.h);
    // x-axis
    this.xaxis(1);
    // y-axis
    this.yaxis(1);
    // Render all of the entities in our collection
    for (var i = 0; i < this.entities.length; i++) {
        // Display all of the entities
        if(this.entities[i].show==true){
            this.entities[i].display();
            this.entities[i].hover();
        }
    }
    // Update our metrics panel text
    g_metricsTextWidget.SetText(this.GetMetrics());
  }


  // Returns a 1 if the mouse is over the minidisplay
  MouseInMiniDisplay(){
    if(mouseY > this.MiniDisplayY && mouseY < this.MiniDisplayY+this.MiniDisplayH){
      // console.log("In minidisplay"); // Uncomment to debug
      return true;
    }
    //console.log("Not in minidisplay"); // Uncomment to debug
    return false;
  }


  // Displays a smaller version of the graph so you can quickly 
  // scrub (i.e. search) for interesting data
  //
  // Parameters: x and y indicate the position
  //             h is the height of the minidisplay
  minidisplay(x,y,h){
    if(1==this.showMiniDisplay){
      // Quickly tally how many promises are suppose to be shown
      var totalPromisesShown =0;
      for (var i = 0; i < this.entities.length; i++) {
        if(this.entities[i].show){
          // Draw a green box
          totalPromisesShown++;
        }
      }

      // Update inteneral Minidiplay position
      this.MiniDisplayX = x;
      this.MiniDisplayY = y;
      this.MiniDisplayH = h;

      // Reset the positions
      this.maxXPosition = 0;
      this.maxYPosition = 0;

      // Background
      stroke(0,255);
      fill(255,0,0,192);
      rect(x,y,width,h);
      fill(0,0,0,255);
      rect(x,y,width,h);
      // Draw a green rectangle representing where a promise would be
      for (var i = 0; i < this.entities.length; i++) {
        // Map to the minimap
        var xRelative = map(this.entities[i].x,0,this.w, 0,width);
        var yRelative = map(this.entities[i].y,0,y, 0,h);

        // Compute boundaries of the maximum position of an entities x and y position
        this.maxXPosition = max(this.maxXPosition,this.entities[i].x);
        this.maxYPosition = max(this.maxYPosition,this.entities[i].y);

        // figure out the relative width as well
        // Note: It should be at least 1 pixel wide if there is a promise that exists
        var widthRelative  = map(this.entities[i].w,0,this.w, 0,width);
        var heightRelative = map(this.entities[i].h,0,y, 0,h);
        
        // Draw in the mini-map what is currently visible
        if(this.entities[i].show==true){
          // Draw a green box
          fill(0,255,0,255);
          stroke(0,255,0,255);
          // If the entity has IO then color it a different color
          if(this.entities[i].datum.io){
            fill(75,0,130,255);
            stroke(75,0,130,255);
          }
        }else{
          // Draw a green box with a much lower opacity if it is not
          // currently visible.
          fill(255,255,255,4);
          stroke(255,255,255,4);
        }

        // TODO: Get rid of the '130' hard coded number
        //       For some reason, the offset is not quite working, maybe a rounding error?
        //       when working at the sub-pixel level?
        
        // TODO: Need to higlight promises in a more effective way
        //       Here's a hack that will make the promises slightly bigger relative
        //       to how many total promises have been selected.
        //if(totalPromisesShown < this.entities.length){
        //  rect(x+xRelative,yRelative+y+g_miniMapHeight-h,widthRelative*5,heightRelative*5);
        //}else{
        //  rect(x+xRelative,yRelative+y+g_miniMapHeight-h,widthRelative,heightRelative);
       // }
        rect(x+xRelative,yRelative+y,widthRelative,heightRelative);
      }

      // Slider
      if(this.MouseInMiniDisplay()){
        fill(255,255,255,255);
        stroke(255,255,255,255);
        ellipse(mouseX, y, 2, 2);
        ellipse(mouseX, y+h, 2, 2);

        line(mouseX,y,mouseX,y+h);
        if (mouseIsPressed && mouseButton === LEFT && g_buttonClickEvent==false && g_hoveringOverWidget==false) {
            g_offsetX = -map(mouseX,width,-width,this.w,-this.w)*g_scale;
            g_offsetY = map(mouseY,y,y+h,0,-this.h)*g_scale +g_miniMapHeight; // Centered the mini map a bit more by adding to offset at
                                                                        // a minimum the hieght of the minimap display.
        }
      }

      // Draw an indicator of where we are in the project
      let currentXStart = -map(g_offsetX,0,this.w,0,width)/g_scale;
      let currentXEnd =   -map(g_offsetX-width,0,this.w,0,width)/g_scale;
      fill(255,0,0,255);
      stroke(255,0,0,255);
      line(currentXStart,y,currentXStart,y+h);
      line(currentXEnd,y,currentXEnd,y+h);
      // Only draw the line if we are over the minidisplay
      if(mouseY > y && mouseY < y+h){
        line(currentXStart,mouseY,currentXEnd,mouseY);
      }
      // Draw a slightly transparent rectangle over the minidisplay
      // These are the edges of the minidisplay.
      fill(255,255,255,32);
      rect(0,y,currentXStart,h);
      rect(currentXEnd,y,width,h);

      // Uncomment to debug the range of the start and end
      // text(currentXStart,200,200);
      // text(currentXEnd,200,240);

      // Draw a rectangular region over where we are currently mousing around.
      if(!this.MouseInMiniDisplay()){
        let whereX = -map(g_offsetX-mouseX,0,this.w,0,width)/g_scale;
        var whereY = -map(g_offsetY-mouseY,0,y,0,h)/g_scale;

        //console.log(whereX+":"+whereY);
        fill(255,255,255,128);
        stroke(0,0,0,255);
        // cap the 'whereY' value
        whereY=max(whereY,0);
        //console.log("whereY"+whereY);
        //console.log("h="+h);
        rect(whereX-25,whereY+(height-h)-25,50,50);
        rect(whereX-5,whereY+(height-h)-5,5,5);
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
            stroke(255,255,0,100);
            fill(255,255,0,100);
            line(this.entities[nodeID].x,
                  this.entities[nodeID].y,
                  this.entities[triggerIndex].x+this.entities[triggerIndex].w/2,
                  this.entities[triggerIndex].y);
            itemsSelected++;
        }
        

        g_querySummary = itemsSelected;
    }

    highlightPromiseChain(startingNode){
        if(this.entities[startingNode].datum.triggerAsyncId>=0 && this.entities[startingNode].datum.triggerAsyncId <= this.entities.length){
          // Start highlighting the node pointed to)
          this.entities[startingNode].highlighted = true;

          // Recursively highlight all the other async ids in the promise chain
          var trigger = this.entities[startingNode].datum.asyncId;
          if(trigger >= 0 && trigger < this.entities.length && trigger !=startingNode){
            this.highlightPromiseChain(trigger);
          }
        }
    }


    // Only show selected nodes
    // This changes the internal state in each of the
    // enties objects.
    filterShow(state){
      var itemsSelected=0;

      for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].show=state;
            itemsSelected++;
      }

      g_querySummary = itemsSelected;
    }

    // Only show selected nodes
      // This changes the internal state in each of the
    // enties objects.
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


  // Helper function which toggles the mini-display on or off.
  ShowMiniDisplay(selectedState){
      this.showMiniDisplay = selectedState;
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
