/////////////////////////////////////////////////
//                   Promise                   //
//            Holds data for a promise         //
/////////////////////////////////////////////////

// The data that we want to hold
class promiseData{
    constructor(source,startTime,endTime,elapsedTime,asyncID,triggerAsyncID,io,userCode) {
        this.source = entity.s_uniqueid;
        this.startTime = startTime;
        this.endTime = endTime;
        this.elapsedTime = elapsedTime;
        this.asyncID = asyncID;
        this.triggerAsyncID = triggerAsyncID;
        this.io = io;
        this.userCode = userCode;
    }
}