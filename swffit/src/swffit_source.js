/*!
*	swffit v3.0 alpha (2010/01/26) <http://swffit.millermedeiros.com/>
*	Copyright (c) 2010 Miller Medeiros <http://www.millermedeiros.com/>
*	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
(function(){
	
	//======= Local =======//
	
	var win = window,
		doc = document,
		html = doc.getElementsByTagName('html')[0],
		UNDEF = "undefined",
		_initialized = false, //{Boolean} if initial configs was completed
		_flashTarget, //{Element} object element (flash movie)
		_targetID, //{String} object id
		_minWid, //{int} minimum width
		_minHei, //{int} minimum height
		_maxWid, //{int} maximum width
		_maxHei, //{int} maximum height
		_hCenter = true, //{Boolean} horizontal centered
		_vCenter = true; //{Boolean} vertical centered
	
	/**
	 * Configure HTML page and default properties (only called once)
	 */
	function setupPage(){
		//ensure it doesn't overwrite `showScrollH`
		if(!html.style.overflowX){
			html.style.overflowX = 'auto';
		}
		//ensure it doesn't overwrite `showScrollV`
		if(!html.style.overflowY){
			html.style.overflowY = 'auto';
		}
		html.style.height = doc.body.style.height = '100%';
		doc.body.style.margin = doc.body.style.padding = 0;
		/*
		 * "display:block" Removes unnecessary margin around flash
		 * "ouline:none" Fix FF3.6 bug of showing scrollbar after giving focus to flash movie
		 * "overflow:hidden" Force IE8 to redraw flash after rescale
		 */
		createStyleSheet('object{display:block; outline:none; overflow:hidden}'); 
		_initialized = true;
	}
	
	/**
	 * Create stylesheet
	 * @param {String} cssText	CSS rules.
	 */
	function createStyleSheet(cssText){
		var st = doc.createElement('style'),
			head = doc.getElementsByTagName('head')[0];
		st.type = 'text/css';
		try{
			st.appendChild(doc.createTextNode(cssText));
		}catch(ex){
			st.styleSheet.cssText = cssText; //IE
		}
		head.appendChild(st);
	}
	
	
	//======= Public API =======//
	
	this.swffit = {
		
		//TODO: implement
		/**
		* Initialize swffit and set desired properties (alias for swffit.configure).
		* @param {String} [target] Flash ID (Optional - Default first flash object)
		* @param {Number} [minWid] Minimum Width (Optional - Default value is the flash object width)
		* @param {Number} [minHei] Minimum Height (Optional - Default value is the flash object height)
		* @param {Number} [maxWid] Maximum Width (Optional - Default value is null)
		* @param {Number} [maxHei] Maximum Height (Optional - Default value is null)
		* @param {Boolean} [hCenter] Horizontal Centered (Optional - Default value is true)
		* @param {Boolean} [vCenter] Vertical Centered (Optional - Default value is true)
		*/
		fit : function(target, minWid, minHei, maxWid, maxHei, hCenter, vCenter){
			
		},
		
		//TODO: implement
		configure : function(o){
			_targetID = ('target' in o)? o.target : _targetID;
			_minWid = ('minWid' in o)? o.minWid : _minWid;
			_minHei = ('minHei' in o)? o.minHei : _minHei;
			_maxWid = ('maxWid' in o)? o.maxWid : _maxWid;
			_maxHei = ('maxHei' in o)? o.maxHei : _maxHei;
			_hCenter = ('hCenter' in o)? o.hCenter : _hCenter;
			_vCenter = ('vCenter' in o)? o.vCenter : _vCenter;
			if(!_initialized){
				swffit.addDOMReady(setupPage);
			}
			swffit.addDOMReady(swffit.startFit);
		},
		
		//TODO: implement
		startFit : function(){
			if(_targetID === UNDEF){ //get first object if no target was specified
				_flashTarget = doc.getElementsByTagName('object')[0]; //TODO: check static publishing on FF
				_targetID = _flashTarget.id;
			}else{
				_flashTarget = doc.getElementById(_targetID); //TODO: check static publishing on FF
			}
			//TODO: add lazy binding and implement fallback if browser doesn't support min-width/min-height
			var st = _flashTarget.style; //local storage for better performance 
			//didn't used style.cssText because the user may set some property that we don't want to overwrite
			st.width = st.height = '100%';
			st.minWidth = (_minWid)? _minWid + 'px' : null;
			st.minHeight = (_minHei)? _minHei + 'px' : null;
			st.maxWidth = (_maxWid)? _maxWid + 'px' : null;
			st.maxHeight = (_maxHei)? _maxHei + 'px' : null;
			//TODO: centering
			if(_hCenter || _vCenter){
				
			}
		},
		
		//TODO: implement
		stopFit : function(){
			
		},
		
		/**
		* Return the value of the desired property
		* @param {String} p Desired Property
		* @return {Mixed} Desired Property Value
		*/
		getValueOf : function(propertyName){
			var v;
			//way more verbose than previous version but avoid creating a new Object every time you need to access 1 property.
			switch(propertyName){
				case 'target':
					v = _targetID;
					break;
				case 'minWid':
					v = _minWid;
					break;
				case 'minHei':
					v = _minHei;
					break;
				case 'maxWid':
					v = _maxWid;
					break;
				case 'maxHei':
					v = _maxHei;
					break;
				case 'hCenter':
					v = _hCenter;
					break;
				case 'vCenter':
					v = _vCenter;
					break;
			}
			return v;
		},
		
		/**
		 * Adds `resize` Event listener
		 * @param {Function} fn	Handler
		 */
		addResizeEvent : function(fn){
			MM.event.addListener('window', 'resize', fn);
		},
		
		/**
		 * Removes `resize` Event listener
		 * @param {Function} fn	Handler
		 */
		removeResizeEvent : function(fn){
			MM.event.removeListener('window', 'resize', fn);
		},
		
		/**
		 * Shows horizontal scroll bar
		 * - IMPORTANT: should always be called before `swfobject.embedSWF()` or it will make the flash to reload
		 */
		showScrollH : function(){
			html.style.overflowX = 'scroll';
		},
		
		/**
		 * Shows vertical scroll bar
		 * - IMPORTANT: should always be called before `swfobject.embedSWF()` or it will make the flash to reload
		 */
		showScrollV : function(){
			html.style.overflowY = 'scroll';
		},
		
		/**
		 * Gets window scrollTop
		 */
		getScrollTop : MM.window.getScrollTop,
		
		/**
		 * Gets window scrollLeft
		 */
		getScrollLeft : MM.window.getScrollLeft,
		
		/**
		 * Gets window inner height
		 */
		getInnerHeight : MM.window.getInnerHeight,
		
		/**
		 * Gets window inner width
		 */
		getInnerWidth : MM.window.getInnerWidth,
		
		/**
		* Adds Event Listener
		* @param {Element} elm Element.
		* @param {String} e Event type.
		* @param {Function} fn Event Handler.
		*/
		addEventListener : function(elm, e, fn){
			MM.event.addListener(elm, e, fn);
		},
		
		/**
		* Removes Event Listener
		* @param {Element} elm Element.
		* @param {String} e Event type.
		* @param {Function} fn Event Handler.
		*/
		removeEventListener: function(elm, e, fn){
			MM.event.removeListener(elm, e, fn);
		},
		
		/**
		 * Adds scroll Event listener
		 * @param {Function} fn	Event Handler
		 */
		addScrollEvent : function(fn){
			MM.event.addListener('window', 'scroll', fn);
		},
		
		/**
		 * Removes scroll Event listener
		 * @param {Function} fn	Event Handler
		 */
		removeScrollEvent : function(fn){
			MM.event.removeListener('window', 'scroll', fn);
		},
		
		/**
		 * Add DOM Ready Event Listener
		 * @param {Function} fn	Event Handler
		 */
		addDOMReady : function(fn){
			MM.event.addDOMReady(fn);
		}
		
	};
	
})();