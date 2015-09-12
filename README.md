JQuery Chronometer
==========

This a chronometer based on jquery



+ Adding js files

```html
    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="js/timer.js"></script>
```

+ Using in html
```html

  <body>
    <div id='timer'></div>
    <script type="text/javascript">
      $(document).ready(function() {
        TIMER.init($('#timer'),function(){console.log('onEndCallback');}).start(3600);
      });
    </script>
  </body>
```
--------------------

Methods:

+ init -- 
  Set timer element
+ start -- 
  Start the chronometer with seconds by parameters
+ stop -- 
  Stop the chronometer
+ pause -- 
  Pause the chronometer
+ reset -- 
  Reset chronometer elements
