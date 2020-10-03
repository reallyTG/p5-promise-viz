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
