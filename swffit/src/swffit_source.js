/**
*	swffit v2.2 (05/12/2009) <http://swffit.millermedeiros.com/>
*	Copyright (c) 2009 Miller Medeiros <http://www.millermedeiros.com/>
*	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*
* 	swffit is used to resize flash to 100% wid/hei when the browser window is greater than the swf
*	minimum size and to resize swf to the minimum size when browser window is smaller than the minimum size.
*
*/
<!-- //2009 - MILLERMEDEIROS.COM
var swffit = function(){
	var win = window,
		doc = document,
		html = doc.getElementsByTagName('html')[0], 
		_agent = navigator.userAgent.toLowerCase(),
		NS = navigator.appName == 'Netscape',
		WK = /webkit/.test(_agent),
		IE = /msie/.test(_agent) && !win.opera,
		UNDEF = "undefined",
		_ft,
		_re,
		_t,
		_mw,
		_mh,
		_xw,
		_xh,
		_hc,
		_vc;
	swfobject.createCSS("object", "position:absolute");
	/**
	* Set the object that will be resized and configure the desired size
	* @param	t	Flash ID : String
	* @param	mw	Minimum Width : Number
	* @param	mh	Minimum Height : Number
	* @param	xw	Maximum Width : Number (Optional - Default value is null)
	* @param	xh	Maximum Height : Number (Optional - Default value is null)
	* @param	hc	Horizontal Centered : Boolean (Optional - Default value is true)
	* @param	vc	Vertical Centered : Boolean (Optional - Default value is true)
	*/
	function fit(t, mw, mh, xw, xh, hc, vc){
		var xw = (xw)? xw : null,
			xh = (xh)? xh : null,
			hc = (hc || hc == null)? true : false,
			vc = (vc || vc == null)? true : false;
		configure({target: t, minWid: mw, minHei: mh, maxWid: xw, maxHei: xh, hCenter: hc, vCenter: vc});
	}
	/**
	* Configure the desired properties values (you can change as many properties as you want at the same time)
	* @param	o	Object containing the desired properties that needs to be changed { target, minWid, minHei, maxWid, maxHei, hCenter, vCenter }
	*	Properties:
	*		target	Flash ID : String
	*		minWid	Minimum Width : Number
	*		minHei	Minimum Height : Number
	*		maxWid	Maximum Width : Number
	*		maxHei	Maximum Height : Number
	*		hCenter	Horizontal Centered : Boolean
	*		vCenter	Vertical Centered : Boolean
	* @example	configure({target: 'my_flash', minWid: 800, minHei:400, maxWid: 1200, maxHei: 600, hCenter: true, vCenter: true});
	*/
	function configure(o){
		_mw = (o.minWid)? o.minWid : _mw;
		_mh = (o.minHei)? o.minHei : _mh;
		_xw = (typeof o.maxWid != UNDEF)? o.maxWid : _xw;
		_xh = (typeof o.maxHei != UNDEF)? o.maxHei : _xh;
		_hc = (o.hCenter || (_hc == true && o.hCenter == null))? true : false;
		_vc = (o.vCenter || (_vc == true && o.vCenter == null))? true : false;
		if (o.target && (o.target != _t)){
			_t = o.target;
			swfobject.addDomLoadEvent(initFit);
		} else {
			startFit();
		}
	}
	/** 
	* Set the initial parameters 
	* @private
	*/
	function initFit(){
		html.style.height = doc.body.style.height = '100%';
		html.style.overflow = 'auto';
		doc.body.style.margin = doc.body.style.padding = '0';
		var st = 'width:100%; height:100%';
		st += (IE)? '; overflow:hidden' : ''; //fix IE8 and bugs FF mac
		swfobject.createCSS("#"+_t, st);
		if (swfobject.getObjectById(_t)){
			_ft = swfobject.getObjectById(_t);
		} else if(NS){
			_ft = doc.getElementById(_t).getElementsByTagName('object')[0]; //required for static publishing (FF mac)
		} else {
			_ft = doc.getElementById(_t);
		}
		startFit();
	}
	/**
	* Start fitting the flash movie
	*/
	function startFit(){
		setSize();
		if(!_re){
			addResizeEvent(setSize);
			_re = 1;
		}
	}
	/**
	* Stop fitting the flash movie
	* @param	w	Width (Number or % or null - Default value is '100%') : Optional
	* @param	h	Height (Number or % or null - Default value is '100%') : Optional
	*/
	function stopFit(w,h){
		if(_re){
			removeResizeEvent(setSize);
			_re = 0;
			_ft.style.top = _ft.style.left = 'auto';
			_ft.style.marginTop = _ft.style.marginLeft = '0';
			var w = (w == null)? '100%' : w,
				h = (h == null)? '100%' : h;
			setWidth(w);
			setHeight(h);
			//Force redraw (Safari, Google Chrome)
			if(WK){
				html.focus();
			}
		}
	}
	/**
	* Add onresize event  ( Based on Peter-Paul Koch solution: http://www.quirksmode.org/js/eventSimple.html )
	* @param	fn	Function that will be fired every time the window is resized
	*/
	function addResizeEvent(fn){
		if (win.addEventListener){
			win.addEventListener('resize',fn,false);
		} else if (win.attachEvent) {
			win.attachEvent('onresize',fn);
		}
	}
	/**
	* Remove onresize event ( Based on Peter-Paul Koch solution: http://www.quirksmode.org/js/eventSimple.html )
	* @param	fn	Function that will be removed from the onresize event queue
	*/
	function removeResizeEvent(fn){
		if (win.removeEventListener){
			win.removeEventListener('resize',fn,false);
		} else if (win.detachEvent) {
			win.detachEvent('onresize',fn);
		}
	}
	/**
	* Sets the width of the swf
	* @param	w	Width (Number or %)
	* @private
	*/
	function setWidth(w){
		_ft.style.width = (isNaN(w))? w : w+"px";
	}
	/**
	* Sets the height of the swf
	* @param	h	Height (Number or %)
	* @private
	*/
	function setHeight(h){
		_ft.style.height = (isNaN(h))? h : h+"px";
	}
	/**
	* Update the flash movie size
	* @private
	*/
	function setSize(){
		var iw = (NS)? win.innerWidth : doc.body.clientWidth, 
			ih = (NS)? win.innerHeight : doc.body.clientHeight;
		//fix conflict with swfaddress 2.3 and IE8
		if(IE){
			_ft = swfobject.getObjectById(_t);
		}
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
		//Force redraw (Safari, Google Chrome)
		if(WK){
			html.focus();
		}
	}
	/**
	* Update the flash movie position
	* @param	t	Top (boolean)
	* @param	m	Reached the Max Size (boolean)
	* @private
	*/
	function setPosition(t, m){
		if(t){
			if(m && _vc){
				_ft.style.top = '50%';
				_ft.style.marginTop = -(_xh*.5)+'px';
			}else{
				_ft.style.top = 'auto';
				_ft.style.marginTop = '0';
			}
		}else{
			if(m && _hc){
				_ft.style.left = '50%';
				_ft.style.marginLeft = -(_xw*.5)+'px';
			}else{
				_ft.style.left = 'auto';
				_ft.style.marginLeft = '0';
			}
		}
	}
	/**
	* Return the value of the desired property
	* @param	p	Desired Property : String
	* @return	Desired Property Value : String / Number / Boolean
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
		addResizeEvent: addResizeEvent,
		removeResizeEvent: removeResizeEvent,
		getValueOf: getValueOf
	};
}();
//-->