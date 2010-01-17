---------------------------------------------------------------------
//      README SWFFIT (http://swffit.millermedeiros.com)           //
//   swffit is (c) 2008 Miller Medeiros (www.millermedeiros.com)   //
---------------------------------------------------------------------


swffit is a smart script that resizes your flash automatically if 
your browser window size is smaller or greater than your flash minimum
desired size keeping it accessible independent of screen resolution.



//---- WHAT IT DOES? ----//

swffit automatically resizes your flash to 100% width and 100% height
when your browser window is greater than the minimum desired size and 
resizes flash to the minimum desired size when the browser window is 
smaller...



//---- HOW DO I USE IT? ----//

Include the swffit.js Javascript file, then just call one simple 
javascript function.



//---- EXAMPLE ----//

<script type="text/javascript" src="swffit.js" />

<script type="text/javascript">
<!--
swffit.fit("my_flash", 1000, 590);
//-->
</script>



//---- PUBLIC API ----//


/*** swffit.fit ***/
Set the object that will be resized and configure the desired size and parameters.
--
swffit.fit ("flashID", minWidth, minHeight, maxWidth:optional, maxHeight:optional, horizontalCentered:optional, verticalCentered:optional);
--
flashID:String - The ID of the flash object/embed tag.
minWidth:Number - Minimum desired width (px) for your flash.
minHeight:Number - Minimum desired height (px) for your flash.
maxWidth:Number (optional) - Maximum desired width (px) or 'null'.
maxHeight:Number (optional) - Maximum desired height (px) or 'null'.
horizontalCentered:Boolean (optional) - sets if the flash is centered horizontally after reach max size, default value is true (boolean: true or false).
verticalCentered:Boolean (optional) - sets if the flash is centered vertically after reach max size, default value is true (boolean: true or false).



/*** swffit.stopFit ***/

Stop resizing the flash movie. You can pass a specific size if you want. The default values are '100%' for width and height.
--
swffit.stopFit(width:optional, height:optional);
--
width:Number (optional) - Desired width (px) for your flash. Default value is '100%'.
height:Number (optional) - Desired height (px) for your flash. Default value is '100%'.



/*** swffit.addResizeEvent ***/

Add onresize event.
--
swffit.addResizeEvent(function);
--
function:Function - Function that will be fired every time the window is resized.



/*** swffit.removeResizeEvent ***/

Remove onresize event.
--
swffit.removeResizeEvent(function);
--
function:Function - Function that will be removed from the onresize event queue.



//---- TROUBLESHOOTING ----//

If you're having trouble using swffit try to edit the example files that come inside the 'swffit.zip' file.



----------------------------------------------------------------------
// visit http://swffit.millermedeiros.com for more information..  //
----------------------------------------------------------------------