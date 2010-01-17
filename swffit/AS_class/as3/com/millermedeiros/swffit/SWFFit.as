/**
 * SWFFit AS3 Class v1.2 (06/15/2008) <http://swffit.millermedeiros.com/>
 * requires swffit v2.1 or greater to work
 * 
 * Copyright (c) 2008 Miller Medeiros <http://www.millermedeiros.com/>
 * Based on "SWFFit External Interface" class by Iwan Negro <http://www.hinderlingvolkart.com/>
 * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 * 
 * SWFFIT is distributed as a top level class. Projects that utilize 
 * code packages should use it with the com.millermedeiros.swffit package.
 */
package com.millermedeiros.swffit {
	
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.external.ExternalInterface;
	import com.millermedeiros.swffit.SWFFitEvent;
	
	/**
	 * SWFFit - class to easily call the swffit javascript API
	 * @author Miller Medeiros ( http://www.millermedeiros.com/ )
	 */
	public class SWFFit {
		
		private static var _dispatcher:EventDispatcher = new EventDispatcher();
		
		/**
		 * Constructor (Static class)
		 */
		public function SWFFit() {
			throw Error('this is a static class and should not be instantiated.');
		}
		
		/**
		* Set the object that will be resized and configure the desired size
		* @param	t	Flash ID
		* @param	mw	Minimum Width (after version 2.3 default value is the same value used by the swfobject)
		* @param	mh	Minimum Height (after version 2.3 default value is the same value used by the swfobject)
		* @param	xw	Maximum Width
		* @param	xh	Maximum Height
		* @param	hc	Horizontal Centered
		* @param	vc	Vertical Centered
		*/
		public static function fit(t:String, mw:int = undefined, mh:int = undefined, xw:int = undefined, xh:int = undefined, hc:Boolean = true, vc:Boolean = true):void {
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
		*	minWid	Minimum Width : int
		*	minHei	Minimum Height : int
		*	maxWid	Maximum Width : int
		*	maxHei	Maximum Height : int
		*	hCenter	Horizontal Centered : Boolean
		*	vCenter	Vertical Centered : Boolean
		* 
		* @example configure({target: 'my_flash', minWid: 800, minHei:400, maxWid: 1200, maxHei: 600, hCenter: true, vCenter: true});
		*/
		public static function configure(o:Object):void {
			ExternalInterface.call("swffit.configure", o);
			dispatch(SWFFitEvent.CHANGE);
		}
		
		/**
		* Stop fitting the flash movie
		* @param	w	Width (Number or % or null).
		* @param	h	Height (Number or % or null).
		*/
		public static function stopFit(w:* = '100%', h:* = '100%'):void {
			ExternalInterface.call("swffit.stopFit", w, h);
			dispatch(SWFFitEvent.STOP_FIT);
		}

		/**
		* Start fitting the flash movie
		*/
		public static function startFit():void {
			ExternalInterface.call("swffit.startFit");
			dispatch(SWFFitEvent.START_FIT);
		}
		
		/**
		* Add a javascript onresize event
		* @param	fn	Javascript function that will be fired every time the window is resized (name of the function or the function as string)
		* @example	addResizeEvent('myFunction');
		* @example	addResizeEvent('function(){alert("foo");}');
		*/
		public static function addResizeEvent(fn:String):void {
			ExternalInterface.call("swffit.addResizeEvent(" + fn + ")");
		}
		
		/**
		* Remove javascript onresize event (Only works for registered functions)
		* @param	fn	Name of the javascript function that will be removed from the onresize event queue
		*/
		public static function removeResizeEvent(fn:String):void {
			ExternalInterface.call("swffit.removeResizeEvent(" + fn + ")");
		}
		
		/**
		* Return the value of the desired property
		* @param	p	Desired Property
		* @return	Desired Property Value : String / Number / Boolean
		* @private
		*/
		private static function getValueOf(p:String):* {
			return ExternalInterface.call("swffit.getValueOf", p);
		}
		
		//================ Events ====================//
		
		/**
         * Registers an event listener
         * @param	type	Event type
         * @param	listener	Event listener
         * @param	useCapture	Determines whether the listener works in the capture phase or the target and bubbling phases
         * @param	priority	The priority level of the event listener
         * @param	useWeakReference	Determines whether the reference to the listener is strong or weak
         */
        public static function addEventListener(type:String, listener:Function, useCapture:Boolean = false, priority:int = 0, useWeakReference:Boolean = false):void {
			_dispatcher.addEventListener(type, listener, useCapture, priority, useWeakReference);
        }

        /**
         * Removes an event listener
         * @param	type	Event type
         * @param	listener	Event listener
         */
        public static function removeEventListener(type:String, listener:Function):void {
            _dispatcher.removeEventListener(type, listener, false);
        }

        /**
         * Dispatches an event to all the registered listeners.
         * @param	event	Event object
         */
        public static function dispatchEvent(event:Event):Boolean {
            return _dispatcher.dispatchEvent(event);
        }

        /**
         * Checks the existance of any listeners registered for a specific type of event
         * @param	type	Event type
         */
        public static function hasEventListener(type:String):Boolean {
            return _dispatcher.hasEventListener(type);
        }
		
		/**
		 * Dispatch the event if there is an registered event listener for that event type
		 * @param	type	Event type
		 * @private
		 */
		private static function dispatch(type:String):void {
			if (hasEventListener(type)) {
				dispatchEvent(new SWFFitEvent(type));
			}
		}
		
		//================ SET and GET Methods ====================//
		
		/**
		 * Target flash movie ID
		 */
		public static function set target(t:String):void {
			configure({ target: t });
		}
		public static function get target():String {
			return getValueOf("target");
		}
		
		/**
		 * Flash movie minimum width
		 */
		public static function set minWid(w:int):void {
			configure({ minWid: w });
		}
		public static function get minWid():int {			
			return getValueOf("minWid");
		}
		
		/**
		 * Flash movie minimum height
		 */
		public static function set minHei(h:int):void {
			configure({ minHei: h });
		}
		public static function get minHei():int {
			return getValueOf("minHei");
		}
		
		/**
		 * Flash movie maximum width
		 */
		public static function set maxWid(w:int):void {
			configure({ maxWid: w });
		}
		public static function get maxWid():int {
			return getValueOf("maxWid");
		}
		
		/**
		 * Flash movie maximum height
		 */
		public static function set maxHei(h:int):void {
			configure({ maxHei: h });
		}
		public static function get maxHei():int {
			return getValueOf("maxHei");
		}
		
		/**
		 * Horizontal center flash movie after reach the maximum size
		 */
		public static function set hCenter(c:Boolean):void {
			configure({ hCenter: c });
		}
		public static function get hCenter():Boolean {
			return getValueOf("hCenter");
		}
		
		/**
		 * Vertical center flash movie after reach the maximum size
		 */
		public static function set vCenter(c:Boolean):void {
			configure({ vCenter: c });
		}
		public static function get vCenter():Boolean {
			return getValueOf("vCenter");
		}
		
	}
	
}