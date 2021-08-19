/////////////////////////////////////////////////
//                   AntiPattern               //
//            Holds data for a AntiPattern     //
/////////////////////////////////////////////////

// The data that we want to hold
class AntiPattern{
    constructor(stringID,endCol,endLine,file,patternID,startCol,startLine) {
        this.stringID = stringID;
        this.endCol = endCol;
        this.endLine = endLine;
        this.file = file;
        this.patternID = patternID;
        this.startCol = startCol;
        this.startLine = startLine;
    }

    // Function to print antipattern in a string
    printAll(){
        return  "stringID :"        + this.stringID     + "\n" +
                "endCol   :"        + this.endCol       + "\n" +
                "endLine:"          + this.endLine      + "\n" +
                "file  :"           + this.file         + "\n" +
                "patternID:"        + this.patternID    + "\n" +
                "startCol:"         + this.startCol     + "\n" +
                "startLine:"        + this.startLine    + "\n";
    }
}
