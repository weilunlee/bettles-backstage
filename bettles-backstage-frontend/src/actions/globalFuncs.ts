class TimeHandler{
    timeObj: Date;
    now:Date;
    full_time:string;
    year:number
    month:number
    date:number
    hr:number
    min:number
    sec:number
    constructor(datetime?:string|number){
        this.timeObj = datetime?new Date(datetime):new Date()
        this.now = new Date()
        this.full_time = ""
        this.year=this.timeObj.getFullYear()
        this.month=this.timeObj.getMonth()+1
        this.date=this.timeObj.getDate()
        this.hr=this.timeObj.getHours()
        this.min=this.timeObj.getMinutes()
        this.sec=this.timeObj.getSeconds()
    }
    
    /**
     * @param {String} _ts 時間格式，ex : "2023-09-12T01:52:30"
     */
    DB2Time =(_ts:string):string => _ts.trim().split("T").join(" ")

    getFullDate=(_t=this.timeObj):string => _t.getFullYear()+"-"+this.proccessZero(_t.getMonth()+1)+"-"+this.proccessZero(_t.getDate())

    getFullTime=(_t=this.timeObj):string => _t.getHours()+":"+this.proccessZero(_t.getMinutes())+":"+this.proccessZero(_t.getSeconds())

    getPartialTime=(_t=this.timeObj):string => _t.getHours()+":"+this.proccessZero(_t.getMinutes())

    getDateZHTW=(_t=this.timeObj):string => `${_t.getMonth()+1}`+"月"+_t.getDate()+"日"


    getAutoDate(_ts=this.timeObj.getTime(), _nts = this.now.getTime()):string{
        let _timeInterval = this.proccessInterval(_ts, _nts)
        if(_timeInterval < 60) return _timeInterval.toString()+"秒前"
        else if(_timeInterval < 3600) return Math.round(_timeInterval/60).toString()+"分前"
        else if(_timeInterval < 86400) return (this.proccessMidday())?"上午":"下午" + this.getPartialTime()
        else return this.getDateZHTW()
    }

    proccessMidday = (_h=this.hr):boolean => _h<12
    proccessZero = (_n:number):string => (_n<10)? "0"+_n.toString():_n.toString()
    proccessInterval = (_t1:number, _t2:number):number => Math.abs(Math.round((_t1 - _t2)/1000))
}


export {
   TimeHandler
}