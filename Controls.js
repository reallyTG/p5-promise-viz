// Scale of how zoomed in we are in our visualization
let g_scale = 1;
// Offset
let g_offsetX = 0;
let g_offsetY = 0;

// Used in range selection
let g_mouseIsCurrentlyDown = 0;
let g_mouseBeforeDownX=0;
let g_mouseBeforeDownY=0;

var g_scrollX=0;
var g_scrollY=0;

// Variables to hold mouse position
// for when we zoom
let g_zoomMouseX = 0;
let g_zoomMouseY =0;

// Reset global variables with respect to the
// current view of the visualization
function resetView(state){
    console.log("resetView");
    g_scale = 1;
    // Offset
    g_offsetX = 0;
    g_offsetY = 0;
}

// Essentially create a bounding sphere, and then
// push the camera outwards to the radius so we can
// view the entire plane (i.e. the bar chart).
function ZoomToFit(state){
    console.log("Zoom To Fit");

    var fov = 60; // TODO: Figure out actual field of view
    // Compute aspect ratio of the scene
    var aspectRatio = width/height;
    half_fov_radians = 0.5*(fov*3.1415926/180);
    if(aspectRatio < 1.0){
        half_fov_radians = atan(aspect*tan(half_fov_radians));
    }

    // Radius of our visualization is half of the width
    var radius = g_bar.w / 2.0;
    // Distance to the center
    var distance_to_center = radius / sin(half_fov_radians);
    console.log(distance_to_center);

    // TODO: Basic idea is to figure out aspect ratio, of screen
    //       and based off of the current number of pixels, figure out
    //       how much we need to zoom out to see everything
    g_offsetX = g_bar.w / 2.0;
    g_offsetY = g_bar.h / 2.0;
    g_scale = 1/distance_to_center;
    g_scale = 0.15;

    if(aspectRatio > 1){
        // Get the width of our bar chart
        var originShapeWidth = g_bar.w;
    }else{

    }
}


///////////////////////////////////////////////
// Controls
///////////////////////////////////////////////
function Controls() {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }
    
    // Handle Panning
    if (mouseIsPressed && mouseButton === CENTER) {
        g_offsetY -= pmouseY - mouseY;
        g_offsetX -= pmouseX - mouseX;
    }

    // Draw a selection region
    if(g_mouseIsCurrentlyDown){
        stroke(0);
        fill(128,128,128,128);
        rect(g_mouseBeforeDownX,g_mouseBeforeDownY,mouseX-g_mouseBeforeDownX,mouseY-g_mouseBeforeDownY);
    }

    // Handle ranged selection
    if(mouseIsPressed && mouseButton === LEFT){ 
        g_mouseIsCurrentlyDown = 1
    }else  {
        g_mouseIsCurrentlyDown = 0;
        g_mouseBeforeDownX=mouseX;
        g_mouseBeforeDownY=mouseY;
    }

    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }
    // Translate the camera
    translate(g_offsetX,g_offsetY);
    // Scale the camera
    // translate(g_scrollX,g_scrollY);
    // Always scale, or (better) find a way to not have to do this every frame.
    scale(g_scale);
    //translate(-g_scrollX/g_scale,-g_scrollY/g_scale);
}

function mouseReleased(){
    if(g_mouseIsCurrentlyDown){
        startY = min(g_mouseBeforeDownY,mouseY);
        endY = max(g_mouseBeforeDownY,mouseY);

        g_bar.inverteSelectedRange(startY,endY);
    }
}


function mouseWheel(event) {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }

    let direction =event.deltaY > 0 ? -1 : 1;   // Are we scrolling in or out
    let zoomFactor = 0.05;
    const zoom = 1 * direction * zoomFactor;

    // Scroll the mouse
    if (!mouseIsPressed) {
        if (event.deltaY > 0){
           // g_scale *= (1-zoomFactor);
            direction = -1;
            //g_scale -= 0.01;
        }
        else{
            //g_scale *= (1+zoomFactor);
            direction =1;
            //g_scale += 0.01;
        }
        
        const wx = (mouseX-g_offsetX)/(width*g_scale);
        const wy = (mouseY-g_offsetY)/(height*g_scale);

        g_offsetX-= wx*width*zoom;
        g_offsetY-= wy*height*zoom;
        g_scale += zoom;

       // g_scrollX = mouseX/g_scale;
       // g_scrollY = mouseY/g_scale;
    }else{
        g_scrollX = pMouseX;
        g_scrollY = pMouseY;
    }    
    
}

/*
window.addEventListener("wheel", function(e) {
    // Avoid updating sketch if mouse is out of bounds
    if (mouseX > width || mouseX < 0 || mouseY > height){
        return;
    }

    if (!mouseIsPressed) {
        if (e.deltaY > 0){
            g_scale *= .95;
        }
        else{
            g_scale *= 1.1;
        }
        mx = mouseX;
        my = mouseY;
        translate(-mx, -my);

    }    


  });
*/
