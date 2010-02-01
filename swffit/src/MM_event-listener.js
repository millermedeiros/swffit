/*
 * MM.event - Listener
 * - Cross-browser Event listener attachment/detachment.
 * @author Miller Medeiros <http://www.millermedeiros.com/>
 * @version 0.2 (2010/01/26)
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
(function(){
	
	this.MM = this.MM || {};
	MM.event = MM.event || {};
	
	var mmevent = MM.event; //local storage for performance improvement
	
	/**
	* Adds Event Listener
	* @param {Element} elm Element.
	* @param {String} e Event type.
	* @param {Function} fn Listener function.
	*/
	mmevent.addListener = function(elm, e, fn){
		if(elm.addEventListener){
			elm.addEventListener(e, fn, false);
		}else if(elm.attachEvent){
			elm.attachEvent('on' + e, fn);
		}else{
			elm['on' + e] = fn;
		}
	}
	
	/**
	* Removes Event Listener
	* @param {Element} elm Element.
	* @param {String} e Event type.
	* @param {Function} fn Listener function.
	*/
	mmevent.removeListener = function(elm, e, fn){
		if (elm.removeEventListener) {
			elm.removeEventListener(e, fn, false);
		}else if(elm.detachEvent){
			elm.detachEvent('on' + e, fn);
		}else{
			elm['on' + e] = null;
		}
	}
	
})();