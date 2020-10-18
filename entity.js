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
        this.datum = datum;
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
        if (mouseX >= offsetX + (this.x*g_scale ) && mouseX <= offsetX + ((this.x + this.w)*g_scale )) {
              if (mouseY >= offsetY + (this.y*g_scale ) && mouseY <= offsetY + ((this.y + this.h)*g_scale )) {
                    // Invert fill and stroke
                    fill(this.stroke);
                    stroke(this.fill);
                    rect((this.x), this.y, this.w, this.h);
                    g_details = this.datum.print();

                    // Toggle selection of entity
                    if (mouseIsPressed && this.selected == false) {
                        this.selected = true;
                    }else if(mouseIsPressed && this.selected == true){
                        this.selected = false;
                    }
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
      // Render the rectangle
      rect((this.x), this.y, this.w, this.h);
    }
}
// Static Variables for the entity class
// Prefix of 's_' indicates static
entity.s_uniqueid = 0;
