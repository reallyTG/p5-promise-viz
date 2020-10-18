/////////////////////////////////////////////////
//                   Promise                   //
//            Holds data for a promise         //
/////////////////////////////////////////////////

// The data that we want to hold
class promiseData{
    constructor(source,startTime,endTime,elapsedTime,asyncId,triggerAsyncId,io,userCode) {
        this.s_uniqueid     = 0;    // TODO: Make some key
        this.source         = source;
        this.startTime      = startTime;
        this.endTime        = endTime;
        this.elapsedTime    = elapsedTime;
        this.asyncId        = asyncId;
        this.triggerAsyncId = triggerAsyncId;
        this.io             = io;
        this.userCode       = userCode;
    }

    // Function to print data about a promise in a string
    print(){
        return  "uniqueid:" + this.s_uniqueid + "\n" +
                "source:"+ this.source + "\n"+
                "startTime:"+ this.startTime + "\n"+
                "endTime:"+ this.endTime + "\n"+
                "elapsedTime:"+ this.elapsedTime + "\n"+
                "asyncId:"+ this.asyncId + "\n"+
                "triggerAsyncId:"+ this.triggerAsyncId + "\n"+
                "io:" + this.io + "\n"+
                "userCode:" + this.userCode + "\n";
    }
}
