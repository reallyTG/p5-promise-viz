/////////////////////////////////////////////////
//                   AntiPattern               //
//            Holds data for a AntiPattern     //
/////////////////////////////////////////////////

// The data that we want to hold
class AntiPattern{
    constructor(endCol,endLine,file,patternID,startCol,startLine) {
        this.endCol = endCol;
        this.endLine = endLine;
        this.file = file;
        this.patternID = patternID;
        this.startCol = startCol;
        this.startLine = startLine;
    }

    // Function to print data about a promise in a string
    printAll(){
        return  "uniqueid :"        + this.endCol        + "\n" +
                "source   :"        + this.endLine       + "\n" +
                "startTime:"        + this.file          + "\n" +
                "endTime  :"        + this.patternID     + "\n" +
                "elapsedTime:"      + this.startCol      + "\n" +
                "asyncId:"          + this.startLine     + "\n";
    }
}
