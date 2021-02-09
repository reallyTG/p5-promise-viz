/////////////////////////////////////////////////
//                Entity class                 //
// A general entity that we  want to render    //
/////////////////////////////////////////////////
// Static Variables for the entity class
// Prefix of 's_' indicates static
let g_uniqueid = 0;
let g_sourceHovered = '';

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
        this.highlighted = false; // temporarily highlight a node

        // Color of box
        this.stroke = 255;
        this.fill = 0;
    }

    display(scale) {
        this.render();
    }

    hover() {

        if(mouseX < 0 || mouseX > width) {
          return;
        }
      /*
        //if (mouseX >= g_offsetX + (this.x*g_scale ) && mouseX <= g_offsetX + ((this.x + this.w)*g_scale )) {
              if (mouseY >= g_offsetY + (this.y*g_scale ) && mouseY <= g_offsetY + ((this.y + this.h)*g_scale )) {
                    // Invert fill and stroke
                    fill(this.stroke);
                    stroke(this.fill);
                    rect((this.x), this.y, this.w, this.h);
                    // Set UI details to currently hovered node
                    //g_details = this.datum.printAll();    // Uncomment to print all details
                    g_details = this.datum.printNumbericData();

                    // Currently hovered id
                    g_hoveredID = this.entityid;
                    // Toggle selection of entity
                    if (mouseIsPressed && mouseButton === LEFT && this.selected == false) {
                        this.selected = true;
                        this.loadContents();
                    }else if(mouseIsPressed && mouseButton === LEFT && this.selected == true){
                        this.selected = false;
                    }
                    this.highlightPromises();
         */           

        //if (mouseX >= offsetX + (this.x*g_scale ) && mouseX <= offsetX + ((this.x + this.w)*g_scale )) {
        if (mouseY >= g_offsetY + (this.y*g_scale ) && mouseY <= g_offsetY + ((this.y + this.h)*g_scale )) {
              // Invert fill and stroke
              fill(this.stroke);
              stroke(this.fill);
              rect((this.x), this.y, this.w, this.h);
              // Set UI details to currently hovered node
              //g_details = this.datum.printAll();    // Uncomment to print all details
              g_detailTextWidget.SetText(this.datum.printNumbericData());

              // Currently hovered id
              g_hoveredID = this.entityid;

              // Currently hovered source. Used in render() to
              // fill matching promises.
              g_sourceHovered = this.datum.source; 

              // Ensure that mouse is not hovering over the minidisplay
              if(g_bar.MouseInMiniDisplay()){
                return;
              }
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
        // writeTo( 'output', 'promisePre', g_txt, this.datum.startLine, this.datum.endLine);
        addFileToView(this.datum.file, g_txt, this.datum.startLine, this.datum.endLine);
      } else {
        writeTo( 'output', 'promisePre', 'No file associated with the selected promise.', 1, 1)
      }
      

      // Spit out related promises onto console?
      let asyncIDs = [this.datum.asyncId];
      let displayAsyncIDs = [this.datum.asyncId];
      let triggerAsyncIDs = [this.datum.triggerAsyncId];
      let promisesTriggered = [this.datum];

      for (let i = this.datum.id; i < Object.keys(g_rawPromiseData.promises).length; i++) {
        let cProm = g_rawPromiseData.promises[i];

        // If cProm is triggered by one of the asyncIDs we care about...
        if (asyncIDs.indexOf(cProm.triggerAsyncId) != -1) {
          // Collect it to display it later.
          promisesTriggered.push(cProm);
          // Add it's asyncID to the list we care about.
          asyncIDs.push(cProm.asyncId);
          displayAsyncIDs.push(cProm.asyncId);
        }
      }

      // TODO Go backwards and get the reverse.
      for (let i = this.datum.id; i >= 0; i--) {
        let cProm = g_rawPromiseData.promises[i];

        // If cProm triggers one of the asyncIDs we care about...
        if (triggerAsyncIDs.indexOf(cProm.asyncId) != -1) {
          // Collect it to display it later.
          promisesTriggered.push(cProm);
          // Add it's asyncID to the list we care about.
          triggerAsyncIDs.push(cProm.triggerAsyncId);
          displayAsyncIDs.push(cProm.asyncId);
        }
      }

      console.log(promisesTriggered);

      for (let i = 0; i < g_bar.entities.length; i++) {
        if (displayAsyncIDs.indexOf(g_bar.entities[i].datum.asyncId) == -1) {
          g_bar.entities[i].show = false;
        } else {
          g_bar.entities[i].show = true;
        }
      }

      // [11/12/2020] Old version:
      // g_txt = g_sourceFilesMap[this.datum.source];
      // console.log(this.datum.source);
      // getFile(parseStringAsFileName(this.datum.source),'output','promisePre');
    }

    highlightPromises(){
        if(this.datum.asyncId >= 0){
            // Spit out related promises onto console?
            let asyncIDs        = [this.datum.asyncId];
            let displayAsyncIDs = [this.datum.asyncId];
            let triggerAsyncIDs = [this.datum.triggerAsyncId];
            let promisesTriggered = [this.datum];

            for (let i = this.datum.id; i < Object.keys(g_rawPromiseData.promises).length; i++) {
              let cProm = g_rawPromiseData.promises[i];

              // If cProm is triggered by one of the asyncIDs we care about...
              if (asyncIDs.indexOf(cProm.triggerAsyncId) != -1) {
                // Collect it to display it later.
                promisesTriggered.push(cProm);
                // Add it's asyncID to the list we care about.
                asyncIDs.push(cProm.asyncId);
                displayAsyncIDs.push(cProm.asyncId);
              }
            }

            // TODO Go backwards and get the reverse.
            for (let i = this.datum.id; i >= 0; i--) {
              let cProm = g_rawPromiseData.promises[i];

              // If cProm triggers one of the asyncIDs we care about...
              if (triggerAsyncIDs.indexOf(cProm.asyncId) != -1) {
                // Collect it to display it later.
                promisesTriggered.push(cProm);
                // Add it's asyncID to the list we care about.
                triggerAsyncIDs.push(cProm.triggerAsyncId);
                displayAsyncIDs.push(cProm.asyncId);
              }
            }

            //console.log(promisesTriggered); // Uncomment to debug

            for (let i = 0; i < g_bar.entities.length; i++) {
              if (displayAsyncIDs.indexOf(g_bar.entities[i].datum.asyncId) == -1) {
                g_bar.entities[i].highlighted = false;
              } else {
                g_bar.entities[i].highlighted = true;
              }
            }
      }
    }

  // How to render the entity
    render() {
      let thisDatumSource = this.datum.source;
        if (this.selected) {
          strokeWeight(2);
          // Invert fill and stroke
          fill(this.stroke);
          stroke(this.fill);
          rect((this.x), this.y, this.w, this.h);
        } else if (thisDatumSource == g_sourceHovered) {
          fill('red');
          stroke(255); 
        } else {
          fill(this.fill);
          stroke(this.stroke);
          noStroke();
        }

        // If the entity is highlighted
        // then color it in purple
        if(this.highlighted){
          fill(75,0,130,255);
          stroke(255,255,0,255);
        }

      // Render the rectangle
      rect(this.x, this.y, this.w, this.h);

      // Immediately set the highlight to false
      this.highlighted = false;
    }
}

