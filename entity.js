/////////////////////////////////////////////////
//                Entity class                 //
// A general entity that we  want to render    //
/////////////////////////////////////////////////
// Static Variables for the entity class
// Prefix of 's_' indicates static
let g_uniqueid = 0;


class entity {

    // 'x' and 'y' values should be relative to 
    // whichever view the entity falls in
    constructor(x, y, w, h, datum) {
        this.entityid = g_uniqueid;
        // Increment the static variable after each
        // call to the constructor to ensure we keep
        // a count of unique values
        g_uniqueid+=1;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.datum = datum; // PromiseData object
        // Attributes for interation
        this.selected = false;  // Nothing selected by default
        this.show = true;       // Show all entities by default

        // Color of box
        this.stroke = 255;
        this.fill = 0;
    }

    display(scale) {
        this.render();
    }

    hover() {
        if(mouseX < 0 || mouseX > width){
          return;
        }
        //if (mouseX >= offsetX + (this.x*g_scale ) && mouseX <= offsetX + ((this.x + this.w)*g_scale )) {
              if (mouseY >= offsetY + (this.y*g_scale ) && mouseY <= offsetY + ((this.y + this.h)*g_scale )) {
                    // Invert fill and stroke
                    fill(this.stroke);
                    stroke(this.fill);
                    rect((this.x), this.y, this.w, this.h);
                    // Set UI details to currently hovered node
                    g_details = this.datum.print();
                    // Currently hovered id
                    g_hoveredID = this.entityid;
                    // Toggle selection of entity
                    if (mouseIsPressed && mouseButton === LEFT && this.selected == false) {
                        this.selected = true;
                        this.loadContents();
                    }else if(mouseIsPressed && mouseButton === LEFT && this.selected == true){
                        this.selected = false;
                    }
              }
       //   }
    }
    
    /*  Function fired when a box is clicked on. This will load the sources for the promise,
     *  and display it in the promisePre HTML object.
     */
    loadContents() {
      g_txt = g_rawPromiseData.files[this.datum.file];
      if (g_txt) {
        writeTo( 'output', 'promisePre', g_txt, this.datum.startLine, this.datum.endLine);
      } else {
        writeTo( 'output', 'promisePre', 'No file associated with the selected promise.', 1, 1)
      }

      // [11/12/2020] Old version:
      // g_txt = g_sourceFilesMap[this.datum.source];
      // console.log(this.datum.source);
      // getFile(parseStringAsFileName(this.datum.source),'output','promisePre');
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

