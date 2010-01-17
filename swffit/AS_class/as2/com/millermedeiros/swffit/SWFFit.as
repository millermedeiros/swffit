/**
 * SWFFit AS2 Class v1.2 (06/15/2008) <http://swffit.millermedeiros.com/>
 * requires swffit v2.1 javascript file to work
 * 
 * Copyright (c) 2008 Miller Medeiros <http://www.millermedeiros.com/>
 * Based on "SWFFit External Interface" class by Iwan Negro <http://www.hinderlingvolkart.com/>
 * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 * 
 * SWFFIT is distributed as a top level class. Projects that utilize 
 * code packages should use it with the com.millermedeiros.swffit package.
 */
 
import flash.external.ExternalInterface;
import mx.events.EventDispatcher;
import com.millermedeiros.swffit.SWFFitEvent;

/**
 * SWFFit - class to easily call the swffit javascript API
 * @author Miller Medeiros ( http://www.millermedeiros.com/ )
 */
class com.millermedeiros.swffit.SWFFit {
	
	private static var _dispatcher:EventDispatcher = new EventDispatcher();
	
	/**
	* Set the object that will be resized and configure the desired size
	* @param	t	Flash ID
	* @param	mw	Minimum Width (after v2.3 -> default = size used in swfobject)
	* @param	mh	Minimum Height (after v2.3 -> default = size used in swfobject)
	* @param	xw	Maximum Width (default = null)
	* @param	xh	Maximum Height (default = null)
	* @param	hc	Horizontal Centered (default = true)
	* @param	vc	Vertical Centered (default = true)
	*/
	static public function fit(t:String, mw:Number, mh:Number, xw:Number, xh:Number, hc:Boolean, vc:Boolean):Void {
		ExternalInterface.call("swffit.fit", t, mw, mh , xw, xh, hc, vc);
		dispatch(SWFFitEvent.CHANGE);
	}
	
	/**
	* Configure the desired properties values (you can change as many properties as you want at the same time)
	* 
	* @param	o	Object containing the desired properties that needs to be changed { target, minWid, minHei, maxWid, maxHei, hCenter, vCenter }
	*	
	* Properties:
	* 	target	Flash ID : String
	*	minWid	Minimum Width : Number
	*	minHei	Minimum Height : Number
	*	maxWid	Maximum Width : Number
	*	maxHei	Maximum Height : Number
	*	hCenter	Horizontal Centered : Boolean
	*	vCenter	Vertical Centered : Boolean
	* 
	* @example configure({target: 'my_flash', minWid: 800, minHei:400, maxWid: 1200, maxHei: 600, hCenter: true, vCenter: true});
	*/
	static public function configure(o:Object):Void {
		ExternalInterface.call("swffit.configure", o);
		dispatch(SWFFitEvent.CHANGE);
	}
	
	/**
	* Stop fitting the flash movie
	* @param	w	Width (Number or % or null - Default value is '100%')
	* @param	h	Height (Number or % or null - Default value is '100%')
	*/
	static public function stopFit(w, h):Void {
		ExternalInterface.call("swffit.stopFit", w, h);
		dispatch(SWFFitEvent.STOP_FIT);
	}

	/**
	* Start fitting the flash movie
	*/
	static public function startFit():Void {
		ExternalInterface.call("swffit.startFit");
		dispatch(SWFFitEvent.START_FIT);
	}
	
	/**
	* Add a javascript onresize event
	* @param	fn	Javascript function that will be fired every time the window is resized (name of the function or the function as string)
	* @example	addResizeEvent('myFunction');
	* @example	addResizeEvent('function(){alert("foo");}');
	*/
	static public function addResizeEvent(fn:String):Void {
		ExternalInterface.call("swffit.addResizeEvent(" + fn + ")");
	}
	
	/**
	* Remove javascript onresize event (Only works for registered functions)
	* @param	fn	Name of the javascript function that will be removed from the onresize event queue
	*/
	static public function removeResizeEvent(fn:String):Void {
		ExternalInterface.call("swffit.removeResizeEvent(" + fn + ")");
	}
	
	/**
	* Return the value of the desired property
	* @param	p	Desired Property
	* @return	Desired Property Value : String / Number / Boolean
	* @private
	*/
	static private function getValueOf(p:String){
		return ExternalInterface.call("swffit.getValueOf", p);
	}
	
	//================ Events ====================//
	
	/**
	 * Registers an event listener
	 * @param	type	Event type
	 * @param	listener	Event listener
	 */
	public static function addEventListener(type:String, listener:Function):Void {
		_dispatcher.addEventListener(type, listener);
	}
	
	/**
	 * Removes an event listener
	 * @param	type	Event type
	 * @param	listener	Event listener
	 */
	public static function removeEventListener(type:String, listener:Function):Void {
		_dispatcher.removeEventListener(type, listener);
	}
	
	/**
	 * Dispatches an event to all the registered listeners.
	 * @param	event	Event object
	 */
	public static function dispatchEvent(event:Object):Void {
		_dispatcher.dispatchEvent(event);
	}
	
	/**
	 * Checks the existance of any listeners registered for a specific type of event
	 * @param	type	Event type
	 */
	public static function hasEventListener(type:String):Boolean {
		return (typeof _dispatcher['__q_' + type] != 'undefined');
	}
	
	/**
	 * Dispatch the event if there is an registered event listener for that event type
	 * @param	type	Event type
	 * @private
	 */
	private static function dispatch(type:String):Void {
		if (hasEventListener(type)) {
			dispatchEvent(new SWFFitEvent(type));
		}
	}
	
	//================ SET and GET Methods ====================//
	
	/**
	 * Target flash movie ID
	 */
	static public function set target(t:String):Void {
		configure({ target: t });
	}
	static public function get target():String {
		return getValueOf("target");
	}
	
	/**
	 * Flash movie minimum width
	 */
	static public function set minWid(w:Number):Void {
		configure({ minWid: w });
	}
	static public function get minWid():Number {
		return getValueOf("minWid");
	}
	
	/**
	 * Flash movie minimum height
	 */
	static public function set minHei(h:Number):Void {
		configure({ minHei: h });
	}
	static public function get minHei():Number {
		return getValueOf("minHei");
	}
	
	/**
	 * Flash movie maximum width
	 */
	static public function set maxWid(w:Number):Void {
		configure({ maxWid: w });
	}
	static public function get maxWid():Number {
		return getValueOf("maxWid");
	}
	
	/**
	 * Flash movie maximum height
	 */
	static public function set maxHei(h:Number):Void {
		configure({ maxHei: h });
	}
	static public function get maxHei():Number {
		return getValueOf("maxHei");
	}
	
	/**
	 * Horizontal center flash movie after reach the maximum size
	 */
	static public function set hCenter(c:Boolean):Void {
		configure({ hCenter: c });
	}
	static public function get hCenter():Boolean {
		return getValueOf("hCenter");
	}
	
	/**
	 * Vertical center flash movie after reach the maximum size
	 */
	static public function set vCenter(c:Boolean):Void {
		configure({ vCenter: c });
	}
	static public function get vCenter():Boolean {
		return getValueOf("vCenter");
	}
	
}