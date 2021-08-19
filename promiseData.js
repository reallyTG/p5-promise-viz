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
                "SsyncId    : "          + this.asyncId          + "\n" +
                "TriggerAsyncId:"   + this.triggerAsyncId   + "\n"+
                "I/O Event: "               + this.io               + "\n" +
                "Network  : "          + this.network          + "\n" +
                "User Code: "         + this.userCode         + "\n" +
                "anti-patterns:"    + this.antiPatterns     + "\n";
    }

    printNumbericDataColorfied(){
        return  [
                    ["uniqueid  : "        + this.id               + "\n"]
                    ["source    : "        + this.source           + "\n"]
                    ["Start Time: "        + this.startTime        + "\n"]
                    ["End Time  : "        + this.endTime          + "\n"]
                    ["Elapsed Time: "      + this.elapsedTime      + "\n"]
                    ["SsyncId    : "          + this.asyncId          + "\n"]
                    ["TriggerAsyncId:"   + this.triggerAsyncId   + "\n"]
                    ["I/O Event: "               + this.io               + "\n"]
                    ["Network  : "          + this.network          + "\n"]
                    ["User Code: "         + this.userCode         + "\n"]
                    ["anti-patterns:"    + this.antiPatterns     + "\n"]
                ];
    }

    drawtext( x, y, text_array ) {
  
        var pos_x = x;
        for ( var i = 0; i < text_array.length; ++ i ) {
            var part = text_array[i];
            var t = part[0];
            var c = part[1];
            var w = textWidth( t );
            fill( c );
            text( t, pos_x, y);
            pos_x += w;
        }
    }
}
