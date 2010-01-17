/**
 * SWFFit AS3 Custom Event Class v1.0 (01/17/2008) <http://swffit.millermedeiros.com/>
 * 
 * Copyright (c) 2008 Miller Medeiros <http://www.millermedeiros.com/>
 * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 * 
 * SWFFIT is distributed as a top level class. Projects that utilize
 * code packages should use it with the com.millermedeiros.swffit package
 */
package com.millermedeiros.swffit {
	
	import flash.events.Event;
	
	/**
	 * SWFFit AS3 Custom Events
	 * @author Miller Medeiros (http://www.millermedeiros.com)
	 */
	public class SWFFitEvent extends Event {
		
		//Change event (dispatched every time a property changes)
		public static const CHANGE:String = "change";
		
		//Start Fit event (dispatched every time the SWFFit.startFit method is called)
		public static const START_FIT:String = "startFit";
		
		//Stop Fit event (dispatched every time the SWFFit.stopFit method is called)
		public static const STOP_FIT:String = "stopFit";
		
		/**
		 * Create a new SWFFitEvent object to pass as a parameter to event listeners
		 * @param	type		The type of the event
		 * @param	bubbles		Determines whether the Event object participates in the bubbling stage of the event flow. The default value is false
		 * @param	cancelable	Determines whether the Event object can be canceled. The default values is false
		 */
		public function SWFFitEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false) {
			super(type, bubbles, cancelable);
		}
		
		/**
		 * Duplicates SWFFitEvent instance
		 * @return	Identical SWFFitEvent object
		 */
		public override function clone():Event {
			return new SWFFitEvent(type, bubbles, cancelable);
		}
		
		/**
		 * Returns all the properties of the SWFFitEvent object
		 * @return	All properties
		 */
		public override function toString():String {
			return formatToString("SWFFitEvent", "type", "bubbles", "cancelable");
		}
		
	}
	
}