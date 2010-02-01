/**
 * MM.event - DOM Ready
 * - Add DOM Ready Event Listener.
 * @author Miller Medeiros <http://www.millermedeiros.com/>
 * @version 0.2 (2010/01/15)
 * Released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
(function(){
	
	this.MM = this.MM || {};
	MM.event = MM.event || {};
	
	var _isDOMReady = false, //if DOM finished loading/parsing.
		_isReadyBound = false, //if ready events are attached.
		_onReadyFns = []; //registered functions.
	
	/**
	 * Adds an Event Listener that should be triggered after the DOM has finished loading.
	 * @param {Function} fn	Function that should be called after the DOM is ready.
	 */
	MM.event.addDOMReady = function(fn){
		if(!_isDOMReady){
			_bindReady();
			_onReadyFns.push(fn);
		}else{
			fn();
		}
	};
	
	/**
	 * Calls all the functions that were registered to the DOM Ready Event (not a real Event Dispatcher)
	 * @private
	 */
	function _dispatchDOMReady(){
		if(_isDOMReady){
			return;
		}
		_isDOMReady = true;
		_isReadyBound = null;
		//TODO: change the way it works to a real event dispatcher instead of a callback system.
		for(var i=0, n=_onReadyFns.length; i<n; i++){
			_onReadyFns[i]();
		}
		_onReadyFns = null;
	}
	
	/**
	 * @private
	 */
	function _onDOMContentLoaded(){
		document.removeEventListener('DOMContentLoaded', arguments.callee, false);
		_dispatchDOMReady();
	}
	
	/**
	 * @private
	 */
	function _onReadyStateChange(){
		if(document.readyState === 'complete'){
			document.detachEvent('onreadystatechange', arguments.callee);
			_dispatchDOMReady();
		}
	}
	
	/**
	 * @private
	 */
	function _onLoad(){
		window.detachEvent('onload', arguments.callee);
		_dispatchDOMReady();
	}
	
	/**
	 * Adds Event Listeners to check if document is ready.
	 * - based on jQuery 1.4 (http://jquery.com/) `ready` method.
	 * @private
	 */
	function _bindReady(){
		if(_isReadyBound){
			return;
		}
		_isReadyBound = true;
		
		//ensure that DOMReady is going to be dispatched even if called after document finished loading
		if(document.readyState === 'complete'){
			_dispatchDOMReady();
		}
		
		if(document.addEventListener){ //Mozilla, Opera and WebKit
			document.addEventListener('DOMContentLoaded', _onDOMContentLoaded, false);
		}else if(document.attachEvent){ //IE
			
			document.attachEvent('onreadystatechange', _onReadyStateChange); //ensure firing before onload. (also works for iframes)
			window.attachEvent('onload', _onLoad); //fallback to make sure DOMReadyEvent is always dispatched.
			
			//continually check to see if the document is an iframe.
			var toplevel = false;
			try{
				toplevel = (window.frameElement == null);
			}catch(e){}
			
			//If IE and not an iframe continually check if it's ready.
			if(document.documentElement.doScroll && topLevel){
				//hack based on Diego Perini solution: http://javascript.nwbox.com/IEContentLoaded/
				try{
					document.documentElement.doScroll('left');
				}catch(error){
					setTimeout(arguments.callee, 1);
					return;
				}
				_dispatchDOMReady();
			}
			
		}
		
	}
	
})();