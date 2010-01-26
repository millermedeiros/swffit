/*!
*	swffit v3.0 alpha (2010/01/26) <http://swffit.millermedeiros.com/>
*	Copyright (c) 2010 Miller Medeiros <http://www.millermedeiros.com/>
*	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
(function(){
	
	//--- Local ---//
	
	var win = window,
		doc = document,
		html = doc.getElementsByTagName('html')[0],
		UNDEF = "undefined",
		_flashTarget,
		_targetID,
		_minWid,
		_minHei,
		_maxWid,
		_maxHei,
		_hCenter,
		_vCenter;
		
	//- CSS2 standards compliant browsers -//
	
	
	//- Old browsers -//
	
	//- All browsers -//
	
	/**
	 * Set initial parameters (only called once)
	 */
	function setupPage(){
		if(!html.style.overflowX){ html.style.overflowX = 'auto'; }
		if(!html.style.overflowY){ html.style.overflowY = 'auto'; }
		html.style.height = doc.body.style.height = '100%';
		doc.body.style.margin = doc.body.style.padding = 0;
	}
	
	//--- Public API ---//
	
	this.swffit = {
		//TODO: implement
		fit : null,
		//TODO: implement
		configure : null,
		//TODO: implement
		startFit : null,
		//TODO: implement
		stopFit : null,
		
		/**
		* Return the value of the desired property
		* @param {String} p Desired Property
		* @return {Mixed} Desired Property Value
		*/
		getValueOf : function(propertyName){
			var p;
			//way more verbose than previous version but avoid creating a new Object every time you need to access 1 property.
			switch(propertyName){
				case 'target':
					p = _targetID;
					break;
				case 'minWid':
					p = _minWid;
					break;
				case 'minHei':
					p = _minHei;
					break;
				case 'maxWid':
					p = _maxWid;
					break;
				case 'maxHei':
					p = _maxHei;
					break;
				case 'hCenter':
					p = _hCenter;
					break;
				case 'vCenter':
					p = _vCenter;
					break;
			}
			return p;
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
		* @param {Function} fn Handler.
		*/
		addEventListener : function(elm, e, fn){
			MM.event.addListener(elm, e, fn);
		},
		
		/**
		* Removes Event Listener
		* @param {Element} elm Element.
		* @param {String} e Event type.
		* @param {Function} fn Handler.
		*/
		removeEventListener: function(elm, e, fn){
			MM.event.removeListener(elm, e, fn);
		},
		
		/**
		 * Adds scroll Event listener
		 * @param {Function} fn	Handler
		 */
		addScrollEvent : function(fn){
			MM.event.addListener('window', 'scroll', fn);
		},
		
		/**
		 * Removes scroll Event listener
		 * @param {Function} fn	Handler
		 */
		removeScrollEvent : function(fn){
			MM.event.removeListener('window', 'scroll', fn);
		}
		
	};
	
})();