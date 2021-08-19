// Data set
// This is what gets loaded into the g_barChart data structure
let g_dataset = [];

// Global Array for data promises
// This is the raw data loaded
// from a JSON file
// This data consists of several components including:
//  - Antipatterns
//  - files
//  - promises
let g_rawPromiseData = {};

// Used to track total antipatterns
let g_totalAntiPatterns = 0;
let g_AntiPatternData = [];
let g_AntiPatternCount = new Map(); // Counts how many of each anti-pattern were found.
                                    // The key is the pattern ID, the value is the count.

// Retrieve the url parameters
// This is to be useful for passing around projects
let g_URLParams;

// Improves the performance of the visualization
// When set to 'true' performance will be improved.
let g_disableFriendlyErrors = true;

let g_txt ='';
let g_sourceFilesMap = new Map();
let g_totalKeys = 0;
let g_sourceCounts = new Map();

// The filename to load for the project
let g_filename = "";

// Scale of how zoomed in we are in our visualization
let g_scale = 1.0;
// Offset
let g_offsetX = 0;
let g_offsetY = 0;

// Used in range selection
let g_mouseIsCurrentlyDown = 0;
let g_mouseBeforeDownX=0;
let g_mouseBeforeDownY=0;

let g_scrollX=0;
let g_scrollY=0;

// Variables to hold mouse position
// for when we zoom
let g_zoomMouseX = 0;
let g_zoomMouseY =0;


// Button Widgets
let g_shareURLButtonWidget;
let g_loadProjectButtonWidget;
