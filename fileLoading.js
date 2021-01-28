
/* Code for dealing with file tabs */
function viewFile(evt, fileName) {
  console.log("I've been called with " +  fileName);
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(fileName).style.display = "block";
  evt.currentTarget.className += " active";

  // Get Prism to highlight things in case it didn't already.
  Prism.highlightAll();
}

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
 *  Called from: bar objects in entity.js
 */
function writeTo( element, preElement, content, highlightFrom, highlightTo) {
    let output = document.getElementById( element);
    let pre = document.getElementById( preElement);

    output.innerHTML = content;
    if (highlightFrom === highlightTo)
        pre.setAttribute('data-line', highlightFrom);
    else
        pre.setAttribute('data-line', highlightFrom + '-' + highlightTo);
    Prism.highlightAll();
}

let g_filesOpenInViewer = [];

function addFileToView(fileName, fileContents, highlightFrom, highlightTo) {

    // Skip if we've already opened the file.
    // TODO: Instead change the line highlight, if a new promise is selected.
    if (g_filesOpenInViewer.indexOf(fileName) == -1) {
        g_filesOpenInViewer.push(fileName);
    } else {
        return;
    }

    /* Add Content... */
    let outerDiv = document.createElement('div');
    let thePre = document.createElement('pre');
    let theCode = document.createElement('code');

    outerDiv.className = 'tabcontent';
    outerDiv.id = fileName;

    thePre.id = 'promisePre';
    thePre.className = 'line-numbers'
    if (highlightFrom === highlightTo)
        thePre.setAttribute('data-line', highlightFrom);
    else
        thePre.setAttribute('data-line', highlightFrom + '-' + highlightTo);
    Prism.highlightAll();

    theCode.className = 'language-javascript';
    theCode.innerHTML = fileContents;

    thePre.appendChild(theCode);
    outerDiv.appendChild(thePre);

    var tabController = document.getElementById('listOfOpenFiles');
    tabController.appendChild(outerDiv);

    /* Add tab Button */
    let tabButton = document.createElement('button');
    tabButton.className = 'tablinks';
    tabButton.setAttribute('onclick', `viewFile(event, '${fileName}')`);
    tabButton.innerHTML = fileName;

    var tabList = document.getElementById('tabController');
    tabList.appendChild(tabButton);

    tabButton.click();
}

/* Create this:


                      <div class="tab">
                      <button class="tablinks" onclick="viewFile(event, 'readme')" id="defaultOpen">readme</button>
                    </div>
*/

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
