///////////////////////////////////////////////
//
///////////////////////////////////////////////
class BarChart {
    constructor(x, y, w, h, data) {
        print("Constructing BarChart");
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.data = data;

        this.entities = [];
        var entityHeight = 1;
        var xScaleOfeachEntity = 1;


        // Create the entities from the data
        for (var i = 0; i < this.data.length; i++) {
            // Set the width of our barchart visualization
            this.w = max(this.w, this.data[i].startTime);

            // Extra information out of our data
            // The data that we are extracting from is a promiseData object.
            var entityX = this.x+2//norm(this.x + data[i].startTime,0,100);

            var entityY = this.h + this.y - (i*entityHeight);
            var entityW = norm(this.data[i].endTime - this.data[i].startTime,0,20);
            var entityH = entityHeight;

            // Create a new barchart entity from our data
            var temp = new entity(entityX,entityY,entityW,entityH,data[i]);
                                    
            this.entities.push(temp);
        }

        // Set the height of the bar chart
        this.h = this.data.length * entityHeight;
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

  // Draw the x-axis
  xaxis(border, maxheight) {
    fill(255, 0, 0, 128);
    stroke(255, 0, 0);
    rect(this.x, this.y + this.h, this.w, border);
  }

  // Draw the y-axis
  yaxis(border, maxlength) {
    fill(255, 0, 0, 128);
    stroke(255, 0, 0);
    rect(this.x, this.y, border, this.h);
  }

  addData(_entity) {}

}
