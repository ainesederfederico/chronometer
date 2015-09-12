var TIMER ={
     init : function(timerElement,onEndCallback){
       this.timerElement = timerElement;
       this.timerElementId = timerElement.attr('id');
       this.onEndCallback = onEndCallback;


       this.spans = '\
         <span id="'+this.timerElementId+'_h">00</span>:\
         <span id="'+this.timerElementId+'_m">00</span>:\
         <span id="'+this.timerElementId+'_s">00</span>:\
         <span id="'+this.timerElementId+'_ms">00</span>';
       timerElement.append(this.spans);       
       return this;
     }
     ,
     start : function(seconds) {

         this.currentDate = new Date();

         switch(this.state) {

             case 'pause' :
                 this.currentTimeStamp = this.currentDate.getTime() - this.pausedTime;
             break;
             default :
                 this.currentTimeStamp = this.currentDate.getTime();
                 this.currentTimeStamp += parseInt(seconds)*1000;
             break;
         }
         this.state = 'start';
         this.loop();

     },
     pause : function() {
         this.pausedTime = new Date().getTime() - this.currentTimeStamp;
         this.state = 'pause';
     },
     stop : function() {
         this.state = 'stop';
         this.timerElement.css("visibility","visible");
     },
     reset : function() {

         $('#' + this.timerElementId + '_ms,#' + this.timerElementId + '_s,#' + this.timerElementId + '_m,#' + this.timerElementId + '_h').html('00');
     },
     end : function() {

         this.state = 'end';
         this.reset();

         if (typeof this.onEndCallback === 'function') {
             this.onEndCallback();
         }
     },
     loop : function() {

         var loopDate;
         var miliSeconds = 0;
         var seconds  = 0;
         var minutes  = 0;
         var hours  = 0;

         if (TIMER.state === 'start') {
             loopDate = TIMER.currentTimeStamp - new Date().getTime();
             if (loopDate <= 0) {
                 TIMER.end();
             }
             //Miliseconds
             miliSeconds = loopDate%1000;
             if (miliSeconds < 1) {
                 miliSeconds = 0;
             } else {
                 //Seconds
                 seconds = (loopDate-miliSeconds)/1000;
                 if (seconds < 1) {
                     seconds = 0;
                 } else {
                     //Minutes
                     var minutes = (seconds-(seconds%60))/60;
                     if (minutes < 1) {
                         minutes = 0;
                     } else {
                         //Hours
                         var hours = (minutes-(minutes%60))/60;
                         if (hours < 1) {
                             hours = 0;
                         }
                     }
                 }
             }

             miliSeconds = Math.round(miliSeconds/100);
             seconds  = seconds-(minutes*60);
             minutes  = minutes-(hours*60);

             $('#' + TIMER.timerElementId + '_ms').html(TIMER.format(miliSeconds));
             $('#' + TIMER.timerElementId + '_s').html(TIMER.format(seconds));
             $('#' + TIMER.timerElementId + '_m').html(TIMER.format(minutes));
             $('#' + TIMER.timerElementId + '_h').html(TIMER.format(hours));

             TIMER.timeout = setTimeout(TIMER.loop,1);

         } else {
             clearTimeout(TIMER.timeout);
             return true;
         }

     },
     format : function(timeNumber) {
         if (timeNumber < 10) {
             timeNumber = '0' + timeNumber;
         }
         return timeNumber;
     }

 };
