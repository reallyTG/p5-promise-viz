/////////////////////////////////////////////////
//                   Promise                   //
//            Holds data for a promise         //
/////////////////////////////////////////////////

// The data that we want to hold
class promiseData{
    constructor(uniqueid,source,startTime,endTime,elapsedTime,asyncId,triggerAsyncId,io,userCode,line,
                startLine, startCol, endLine, endCol, file) {
        this.id             = uniqueid;
        this.source         = source;
        this.startTime      = startTime;
        this.endTime        = endTime;
        this.elapsedTime    = elapsedTime;
        this.asyncId        = asyncId;
        this.triggerAsyncId = triggerAsyncId;
        this.io             = io;
        this.userCode       = userCode;
        this.line           = line;
        this.startLine      = startLine;
        this.startCol       = startCol;
        this.endLine        = endLine;
        this.endCol         = endCol;
        this.file           = file;
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
                "userCode:"         + this.userCode         + "\n" +
                "line:"             + this.line             + "\n" +
                "startLine:"        + this.startLine        + "\n" +
                "startCol:"         + this.startCol         + "\n" +
                "endLine:"          + this.endLine          + "\n" +
                "endCol:"           + this.endCol           + "\n" +
                "file:"             + this.file;

    }

    printStringData(){
        return  "uniqueid :"        + this.id               + "\n" +
                "source   :"        + this.source           + "\n" +
                "line:"             + this.line             + "\n" +
                "startLine:"        + this.startLine        + "\n" +
                "startCol:"         + this.startCol         + "\n" +
                "endLine:"          + this.endLine          + "\n" +
                "endCol:"           + this.endCol           + "\n" +
                "file:"             + this.file;
    }

    printNumbericData(){
        return  "uniqueid :"        + this.id               + "\n" +
                "source   :"        + this.source           + "\n" +
                "startTime:"        + this.startTime        + "\n" +
                "endTime  :"        + this.endTime          + "\n" +
                "elapsedTime:"      + this.elapsedTime      + "\n" +
                "asyncId:"          + this.asyncId          + "\n" +
                "triggerAsyncId:"   + this.triggerAsyncId   + "\n"+
                "io:"               + this.io               + "\n" +
                "userCode:"         + this.userCode         + "\n";
    }
}
