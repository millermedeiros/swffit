----------------------------------------------------------------------
//  README SWFFIT AS Class v1.2 (http://swffit.millermedeiros.com)  //
//   swffit is (c) 2008 Miller Medeiros (www.millermedeiros.com)    //
----------------------------------------------------------------------


swffit is a smart script that resizes your flash automatically if 
your browser window size is smaller or greater than your flash minimum
desired size keeping it accessible independent of screen resolution.



//---- ACTIONSCRIPT PUBLIC METHODS ----//


/*** SWFFit.fit ***/

Set the object that will be resized and configure the desired size and parameters.
--
SWFFIT.fit ("flashID", minWidth, minHeight, maxWidth:optional, maxHeight:optional, horizontalCentered:optional, verticalCentered:optional);
--
flashID:String - The ID of the flash movie.
minWidth:Number (optional) - Minimum desired width (px) for your flash. (default value = value used in swfobject)
minHeight:Number (optional) - Minimum desired height (px) for your flash. (default value = value used in swfobject)
maxWidth:Number (optional) - Maximum desired width (px) or 'null'.
maxHeight:Number (optional) - Maximum desired height (px) or 'null'.
horizontalCentered:Boolean (optional) - sets if the flash is centered horizontally after reach max size, default value is true (boolean: true or false).
verticalCentered:Boolean (optional) - sets if the flash is centered vertically after reach max size, default value is true (boolean: true or false).



/*** SWFFit.configure ***/

Configure the desired properties values (you can change as many properties as you want at the same time)
---
configure({target: 'my_flash', minWid: 800, minHei:400, maxWid: 1200, maxHei: 600, hCenter: true, vCenter: true});
---
o:Object - Object containing the desired properties that needs to be changed { target, minWid, minHei, maxWid, maxHei, hCenter, vCenter }
	Properties:
		target:String - Flash Movie ID
		minWid:Number - Minimum Width
		minHei:Number - Minimum Height
		maxWid:Number - Maximum Width
		maxHei:Number - Maximum Height
		hCenter:Boolean	- Horizontal Centered
		vCenter:Boolean	- Vertical Centered



/*** SWFFit.startFit ***/

Start fitting the flash movie
---
SWFFIT.startFit();
---



/*** SWFFit.stopFit ***/

Stop resizing the flash movie. You can pass a specific size if you want. The default values are '100%' for width and height.
--
SWFFIT.stopFit(width:optional, height:optional);
--
width:Number (optional) - Desired width (px) for your flash. Default value is '100%'.
height:Number (optional) - Desired height (px) for your flash. Default value is '100%'.



/*** SWFFit.addResizeEvent ***/

Add onresize event.
--
SWFFIT.addResizeEvent(function);
--
function:Function - Javascript function that will be fired every time the window is resized.



/*** SWFFit.removeResizeEvent ***/

Remove onresize event.
--
SWFFIT.removeResizeEvent(function);
--
function:Function - Javascript function that will be removed from the onresize event queue.



/*** SWFFIT.addEventListener ***/

Add an Event Listener.
---
SWFFIT.addEventListener(type, listener);
---
type:String - Event type.
listener:Function - Function that will be fired after the event dispatch.



/*** SWFFIT.removeEventListener ***/

Remove the Event Listener.
---
SWFFIT.removeEventListener(type, listener);
---
type:String - Event type.
listener:Function - Function that will be removed from the event queue.



/*** SWFFIT.removeEventListener ***/

Dispatch an Event.
---
SWFFIT.dispatchEvent(event);
---
event:Event(as3)/Object(as2) - Event.



/*** SWFFIT.hasEventListener ***/

Checks the existance of any listeners registered for a specific type of event.
---
SWFFIT.hasEventListener(type);
---
event:String - Event type.




//---- ACTIONSCRIPT PUBLIC PROPERTIES ----//

SWFFit.target - Flash Movie ID
SWFFit.minWid - Minimum Width
SWFFit.minHei - Minimum Height
SWFFit.maxWid - Maximum Width
SWFFit.maxHei - Maximum Height
SWFFit.hCenter - Horizontal Centered
SWFFit.vCenter - Vertical Centered

IMPORTANT: I recommend using the 'SWFFit.configure' when you need to change more than 1 property at once.




//---- ACTIONSCRIPT EVENTS ----//

SWFFitEvent.CHANGE = "change"; //Change event (dispatched every time a property changes)
SWFFitEvent.START_FIT = "startFit"; //Start Fit event (dispatched every time the SWFFit.startFit method is called)
SWFFitEvent.STOP_FIT = "stopFit"; //Stop Fit event (dispatched every time the SWFFit.stopFit method is called)




//---- TROUBLESHOOTING ----//

If you're having trouble using swffit try to edit the example files that come inside the 'swffit.zip' file.



----------------------------------------------------------------------
// visit http://swffit.millermedeiros.com for more information..  //
----------------------------------------------------------------------