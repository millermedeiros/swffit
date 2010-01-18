/**
*	swffit v2.4 beta (2010/01/18) <http://swffit.millermedeiros.com/>
*	Copyright (c) 2010 Miller Medeiros <http://www.millermedeiros.com/>
*	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*
*	@requires swfobject 2.1 or higher <http://code.google.com/p/swfobject>
*/
var swffit = function(){
	var win = window,
		doc = document,
		html = doc.getElementsByTagName('html')[0],
		AGENT = navigator.userAgent.toLowerCase(),
		WK = /webkit/.test(AGENT),
		IE = /msie/.test(AGENT) && !win.opera,
		FF = /firefox/.test(AGENT) && !win.opera,
		UNDEF = 'undefined',
		_ft, //{Element} object element (flash movie)
		_re, //{Boolean} has resize event listener
		_t, //{String} object id
		_mw, //{int} min width
		_mh, //{int} min height
		_xw, //{int} max width
		_xh, //{int} max height
		_hc, //{Boolean} horizontal centered
		_vc, //{Boolean} vertical centered
		_ow, //{int} object width
		_oh; //{int} object height
	swfobject.createCSS('object', 'position:absolute; outline:none'); //outline none fixes bug #4 (FF3.6b)
	/**
	* Set the object that will be resized and configure the desired size
	* @param {String} t Flash ID
	* @param {Number} [mw] Minimum Width (Optional - Default value is the flash object width)
	* @param {Number} [mh] Minimum Height (Optional - Default value is the flash object height)
	* @param {Number} [xw] Maximum Width (Optional - Default value is null)
	* @param {Number} [xh] Maximum Height (Optional - Default value is null)
	* @param {Boolean} [hc] Horizontal Centered (Optional - Default value is true)
	* @param {Boolean} [vc] Vertical Centered (Optional - Default value is true)
	*/
	function fit(t, mw, mh, xw, xh, hc, vc){
		mw = mw || _ow;
		mh = mh || _oh;
		xw = xw || null;
		xh = xh || null;
		hc = (hc || hc == null);
		vc = (vc || vc == null);
		configure({target: t, minWid: mw, minHei: mh, maxWid: xw, maxHei: xh, hCenter: hc, vCenter: vc});
	}
	/**
	* Configure the desired properties values (you can change as many properties as you want at the same time)
	* @param {Object} o	Object containing the desired properties that needs to be changed { target, minWid, minHei, maxWid, maxHei, hCenter, vCenter }
	*	Properties:
	*		[target] {String} Flash ID
	*		[minWid] {Number} Minimum Width
	*		[minHei] {Number} Minimum Height
	*		[maxWid] {Number} Maximum Width
	*		[maxHei] {Number} Maximum Height
	*		[hCenter] {Boolean} Horizontal Centered
	*		[vCenter] {Boolean} Vertical Centered
	* @example configure({target: 'my_flash', minWid: 800, minHei:400, maxWid: 1000, maxHei: 550, hCenter: true, vCenter: false});
	*/
	function configure(o){
		//checks if value changed and return correct value
		var evalNum = function(v, p){
				return (typeof o[p] != UNDEF)? o[p] : v;
			},
			evalBool = function(v, p){
				return (o[p] || (v && typeof o[p] == UNDEF));
			};
		_mw = evalNum(_mw, 'minWid');
		_mh = evalNum(_mh, 'minHei');
		_xw = evalNum(_xw, 'maxWid');
		_xh = evalNum(_xh, 'maxHei');
		_hc = evalBool(_hc, 'hCenter');
		_vc = evalBool(_vc, 'vCenter');
		if (o.target && (o.target != _t)){
			_t = o.target;
			swfobject.addDomLoadEvent(initFit);
			if(IE){ swfobject.addLoadEvent(initFit); } //fix conflict with swfaddress 2.3 and IE8 (in some browser modes)
		} else {
			startFit();
		}
	}
	/** 
	* Set the initial parameters 
	* @private
	*/
	function initFit(){
		if(!html.style.overflowX){ controlScroll(0,0); }
		if(!html.style.overflowY){ controlScroll(0,1); }
		html.style.height = doc.body.style.height = '100%';
		doc.body.style.margin = doc.body.style.padding = 0;
		var st = 'width:100%; height:100%';
		st += (IE)? '; overflow:hidden' : ''; //fix IE8
		swfobject.createCSS('#'+_t, st);
		_ft = doc.getElementById(_t);
		_ft = (_ft != UNDEF && FF && /object/.test(_ft.innerHTML))? doc.getElementById(_t).getElementsByTagName('object')[0] : _ft; //required for static publishing on Firefox
		_ow = _ft.width;
		_oh = _ft.height;
		_mw = _mw || _ow;
		_mh = _mh || _oh;
		startFit();
	}
	/**
	* Start fitting the flash movie
	*/
	function startFit(){
		setSize();
		if(!_re){
			swffit.addResizeEvent(setSize);
			_re = 1;
		}
	}
	/**
	* Stop fitting the flash movie
	* @param {Number|String|null} [w] Width (Default value is '100%')
	* @param {Number|String|null} [h] Height (Default value is '100%')
	*/
	function stopFit(w,h){
		if(_re){
			swffit.removeResizeEvent(setSize);
			_re = 0;
			setStyle('top', 'auto');
			setStyle('left', 'auto');
			setStyle('marginTop', 0);
			setStyle('marginLeft', 0);
			w = w || '100%';
			h = h || '100%';
			setWidth(w);
			setHeight(h);
			forceRedraw();
		}
	}
	/**
	 * Force browser redraw
	 * @private
	 */
	function forceRedraw(){
		if(WK){
			_ft.style.paddingBottom = '1px'; //fixes issue #5
			_ft.style.paddingBottom = '0';
		}
	}
	/**
	 * Add/Remove resize event listeners (Based on Peter-Paul Koch solution: http://www.quirksmode.org/js/eventSimple.html)
	 * @param {Boolean} a Is Add
	 * @param {Function} fn Function that will be added/removed from the onresize event queue
	 * @private
	 */
	function controlResizeEvent(a,fn){
		var p = (a)? ['addEventListener', 'attachEvent'] : ['removeEventListener', 'detachEvent'];
		if(win[p[0]]){
			win[p[0]]('resize',fn,false);
		}else if(win[p[1]]){
			win[p[1]]('onresize',fn);
		}
	}
	/**
	* Sets the width of the swf
	* @param {Number|String} w Width
	* @private
	*/
	function setWidth(w){
		var v = (isNaN(w))? w : w+'px';
		setStyle('width', v);
	}
	/**
	* Sets the height of the swf
	* @param {Number|String} h Height
	* @private
	*/
	function setHeight(h){
		var v = (isNaN(h))? h : h+'px';
		setStyle('height', v);
	}
	/**
	 * Set style of the object
	 * @param {String} p Property
	 * @param {String|Number} v Value
	 * @private
	 */
	function setStyle(p,v){
		_ft.style[p] = v;
	}
	/**
	* Update the flash movie size
	* @private
	*/
	function setSize(){
		var iw = (win.innerWidth)? win.innerWidth : ((doc.documentElement.clientWidth)? doc.documentElement.clientWidth : doc.body.clientWidth),
			ih = (win.innerHeight)? win.innerHeight : ((doc.documentElement.clientHeight)? doc.documentElement.clientHeight : doc.body.clientHeight);
		//fix window innerSize difference when scrollbar is visible
		iw -= (!IE && ih <= _mh)? 18 : 0;
		ih -= (!IE && iw <= _mw)? 18 : 0;
		//sets width
		if (_xw && iw >= _xw){
			setWidth(_xw);
			setPosition(0,1);
		} else {
			if (iw > _mw && (iw < _xw || !_xw)) {
				setWidth('100%');
			} else {
				setWidth(_mw);
			}
			setPosition(0,0);
		}
		// sets height
		if (_xh && ih >= _xh){
			setHeight(_xh);
			setPosition(1,1);
		}else{
			if (ih > _mh && (ih < _xh || !_xh)){
				setHeight('100%');
			} else {
				setHeight(_mh);
			}
			setPosition(1,0);
		}
		forceRedraw();
	}
	/**
	* Update the flash movie position
	* @param {Boolean} t Is Top
	* @param {Boolean} x Is Max Size
	* @private
	*/
	function setPosition(t, x){
		var p,
			m;
		if(t){
			p = (x && _vc)? '50%' : 'auto';
			m = (x && _vc)? -(_xh*0.5)+'px' : 0;
			setStyle('top', p);
			setStyle('marginTop', m);
		}else{
			p = (x && _hc)? '50%' : 'auto';
			m = (x && _hc)? -(_xw*0.5)+'px' : 0;
			setStyle('left', p);
			setStyle('marginLeft', m);
		}
	}
	/**
	 * Show/Hide scrollbar 
	 * ALERT: it will make flash file reload!!
	 * @param {Boolean} s Show
	 * @param {Boolean} v Is Vertical
	 * @private
	 */
	function controlScroll(s,v){
		var p = (v)? 'overflowY' : 'overflowX';
		html.style[p] = (s)? 'scroll' : 'auto';
	}
	/**
	* Return the value of the desired property
	* @param {String} p Desired Property
	* @return {String|Number|Boolean} Desired Property Value
	*/
	function getValueOf(p){
		var o = {target:_t, minWid:_mw, minHei:_mh, maxWid:_xw, maxHei:_xh, hCenter:_hc, vCenter:_vc};
		return o[p];
	}
	/**
	* PUBLIC API
	*/
	return{
		fit: fit,
		configure: configure,
		startFit: startFit,
		stopFit: stopFit,
		getValueOf: getValueOf,
		addResizeEvent: function(fn){
			controlResizeEvent(1,fn);
		},
		removeResizeEvent: function(fn){
			controlResizeEvent(0,fn);
		},
		showScrollH: function(){
			controlScroll(1,0);
		},
		showScrollV: function(){
			controlScroll(1,1);
		},
		/**
		* @returns {int} Document Scroll Top
		*/
		getScrollTop: function(){
			return doc.body.scrollTop ? doc.body.scrollTop : (win.pageYOffset ? win.pageYOffset : (doc.body.parentElement ? doc.body.parentElement.scrollTop : 0));
		},
		/**
		* @returns {int} Document Scroll Left
		*/
		getScrollLeft: function(){
			return doc.body.scrollLeft ? doc.body.scrollLeft : (win.pageXOffset ? win.pageXOffset : (doc.body.parentElement ? doc.body.parentElement.scrollLeft : 0));
		}
	};
}();