/////////////////////////////////////////////////
//                   Promise                   //
//            Holds data for a promise         //
/////////////////////////////////////////////////

// The data that we want to hold
class promiseData{
    constructor(uniqueid,source,startTime,endTime,elapsedTime,asyncId,triggerAsyncId,io,network,userCode,line,
                startLine, startCol, endLine, endCol, file) {
        this.id             = uniqueid;
        this.source         = source;
        this.startTime      = startTime;
        this.endTime        = endTime;
        this.elapsedTime    = elapsedTime;
        this.asyncId        = asyncId;
        this.triggerAsyncId = triggerAsyncId;
        this.io             = io;
        this.network        = network;
        this.userCode       = userCode;
        this.line           = line;
        this.startLine      = startLine;
        this.startCol       = startCol;
        this.endLine        = endLine;
        this.endCol         = endCol;
        this.file           = file;
        this.antiPatterns   = [];       // Empty array for anti-pattern that this promise may convey
    }

    // Function to print data about a promise in a string
    printAll(){
        return  "uniqueid :"        + this.id               + "\n" +
                "source   :"        + this.source           + "\n" +
                "startTime:"        + this.startTime        + "\n" +
                "endTime  :"        + this.endTime          + "\n" +
                "elapsedTime:"      + this.elapsedTime      + "\n" +
                "asyncId:"          + this.asyncId          + "\n" +
                "triggerAsyncId:"   + this.triggerAsyncId   + "\n"+
                "io:"               + this.io               + "\n" +
                "network:"          + this.network          + "\n" +
                "userCode:"         + this.userCode         + "\n" +
                "line:"             + this.line             + "\n" +
                "startLine:"        + this.startLine        + "\n" +
                "startCol:"         + this.startCol         + "\n" +
                "endLine:"          + this.endLine          + "\n" +
                "endCol:"           + this.endCol           + "\n" +
                "file:"             + this.file             + "\n" +
                "file:"             + this.antiPatterns;

    }

    printStringData(){
        return  "uniqueid :"        + this.id               + "\n" +
                "source   :"        + this.source           + "\n" +
                "line:"             + this.line             + "\n" +
                "asyncId:"          + this.asyncId          + "\n" +
                "triggerAsyncId:"   + this.triggerAsyncId   + "\n";
    }

    printNumbericData(){
        return  "uniqueid  : "        + this.id               + "\n" +
                "source    : "        + this.source           + "\n" +
                "Start Time: "        + this.startTime        + "\n" +
                "End Time  : "        + this.endTime          + "\n" +
                "Elapsed Time: "      + this.elapsedTime      + "\n" +
                "AsyncId    : "       + this.asyncId          + "\n" +
                "TriggerAsyncId:"     + this.triggerAsyncId   + "\n"+
                "I/O Event: "         + this.io               + "\n" +
                "Network  : "         + this.network          + "\n" +
                "User Code: "         + this.userCode         + "\n" +
                "Anti-patterns:"      + this.antiPatterns     + "\n";
    }

    printNumbericDataColorfied(){
        var gray = (192,192,192);
        var white = (255,255,255);

        return  [
                    ["uniqueid  : ",gray],      [this.id,           white],           
                    ["source    : ",gray],      [this.source,       white],       
                    ["Start Time    : ",gray],      [this.startTime,    white],    
                    ["End Time      : ",gray],      [this.endTime,      white],      
                    ["Elapsed Time  : ",gray],  [this.elapsedTime,  white],  
                    ["AsyncId       : ",gray],      [this.asyncId,      white],      
                    ["TriggerAsyncId: ",gray],  [this.triggerAsyncId,white],
                    ["I/O Event     : ",gray],      [this.io,           white],           
                    ["Network       : ",gray],      [this.network,      white],      
                    ["User Code     : ",gray],      [this.userCode,     white],     
                    ["Anti-patterns : ",gray],  [this.antiPatterns, white],
                ];

    }

}
