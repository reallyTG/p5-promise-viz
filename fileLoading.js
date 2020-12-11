
/*  Old method for loading sources. Leaving it here as we might want it
 *  when we want to include a full project hierarchy in the tool.
 */
function getFile(fileName,element,preElement){
    var output = document.getElementById(element);
    var pre = document.getElementById(preElement);

    let line = '';
    console.log(fileName);
    //g_txt = loadStrings(fileName);
    //g_txt = loadStrings(fileName);
    if(g_txt){
        for(var i=0; i < g_txt.length; i++){
            line += g_txt[i]+'\n';
        }
        output.innerHTML = line;
        pre.setAttribute("data-line","25-25");
        Prism.highlightAll();
    }else{
        console.log("Could not find file: "+fileName)
    }
}

/*  Function to display provided <content> onto the <element>
 *  and <preElement> HTML object. <preElement> must be a prism element.
 *
 *  TODO: Get highlighting working (pass from caller).
 */
function writeTo( element, preElement, content) {
    let output = document.getElementById( element);
    let pre = document.getElementById( preElement);

    output.innerHTML = content;
    pre.setAttribute('data-line', '25-25');
    Prism.highlightAll();
}

// Start reading a file from the a file box specified by
// 'elementID'
function startRead( fileElementID, outputElementID, progressElementID){
    // obtain input element through DOM 
    var file = document.getElementById(fileElementID).files[0];
    // If we successfully find the file element in the DOM
    // Then move to the next step and attempt to read the
    // text from the file.
    if(file){
        var reader;

        try{
            reader = new FileReader();
        }catch(e){
            document.getElementById(outputElementID).innerHTML = "Error: seems File API is not supported on your browser";
            return;
        }

        // Read file into memory as UTF-8      
        reader.readAsText(readFile, "UTF-8");
        // Handle progress, success, and errors
        reader.onprogress = updateProgress(progressElementID);
        reader.onload = loaded(outputElementID,progressElementID);
        reader.onerror = errorHandler(outputElementID);
    }
}



// Update progress bar element when loading file.
function updateProgress(evt,elementID){
    if (evt.lengthComputable){
        // evt.loaded and evt.total are ProgressEvent properties
        var loaded = (evt.loaded / evt.total);
        if (loaded < 1){
            // Increase the prog bar length
            // style.width = (loaded * 200) + "px";
            document.getElementById(elementID).style.width = (loaded*100) + "%";
        }
    }
}

function loaded(evt,elementID,progressElementID){
    // Obtain the read file data    
    var fileString = evt.target.result;
    document.getElementById(elementID).innerHTML = fileString;
    document.getElementById(progressElementID).style.width = 100 + "%";
    // Calling this function will force a highlight of
    // the file.
    Prism.highlightAll();
}

function errorHandler(evt,elementID){
    if(evt.target.error.code == evt.target.error.NOT_READABLE_ERR){
        // The file could not be read
        document.getElementById(elementID).innerHTML = "Error reading file..."
    }
}
