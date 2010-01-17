/**
 * SWFFit AS2 Custom Event Class v1.0 (01/18/2008) <http://swffit.millermedeiros.com/>
 * 
 * Copyright (c) 2008 Miller Medeiros <http://www.millermedeiros.com/>
 * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 * 
 * SWFFIT is distributed as a top level class. Projects that utilize
 * code packages should use it with the com.millermedeiros.swffit package
 */

/**
 * SWFFit AS2 Custom Events
 * @author Miller Medeiros (http://www.millermedeiros.com)
 */
class com.millermedeiros.swffit.SWFFitEvent {
	
	//Change event (dispatched every time a property changes)
	public static var CHANGE:String = "change";
	//Start Fit event (dispatched every time the SWFFit.startFit method is called)
	public static var START_FIT:String = "startFit";
	//Stop Fit event (dispatched every time the SWFFit.stopFit method is called)
	public static var STOP_FIT:String = "stopFit";
	
	//Event Type
	private var _type:String;
	
	/**
	 * Create a new SWFFitEvent object
	 * @param	type	Event Type
	 */
	public function SWFFitEvent(type:String) {
        _type = type;
    }
	
	/**
	 * Return a String with the class name
	 * @return Class Name
	 */
    public function toString():String {
        return '[class SWFFitEvent]';
    }
    
	/**
	 * Return Event Type
	 */
    public function get type():String {
        return _type;
    }
	
}