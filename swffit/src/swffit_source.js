/**
*	swffit v2.0 (10/18/2008) <http://swffit.millermedeiros.com/>
*	Copyright (c) 2008 Miller Medeiros <http://www.millermedeiros.com/>
*	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*
* 	swffit is used to resize flash to 100% wid/hei when the browser window is greater than the swf
*	minimum size and to resize swf to the minimum size when browser window is smaller than the minimum size.
*
*/
<!-- //2008 - MILLERMEDEIROS.COM
var swffit = function(){
	var NS = (navigator.appName=='Netscape')? true : false,
		win = window,
		doc = document,
		html = doc.getElementsByTagName('html')[0],
		_ft,
		_mw,
		_mh,
		_xw,
		_xh,
		_hc,
		_vc;
	/**
	* Set the object that will be resized and configure the desired size
	* @param	t	Target (flash id)
	* @param	w	Minimum Width (Number)
	* @param	h	Minimum Height (Number)
	* @param	xw	Maximum Width (Number or null) : Optional
	* @param	xh	Maximum Height (Number or null) : Optional
	* @param	hc	Horizontal Centered (Boolean: true or false - Default value is true) : Optional
	* @param	vc	Vertical Centered (Boolean: true or false - Default value is true) : Optional
	*/
	function fit(t, w, h, xw, xh, hc, vc){
		_ft = t;
		_mw = w;
		_mh = h;
		_xw = xw;
		_xh = xh;
		_hc = (hc || hc == null)? true : false;
		_vc = (vc || vc == null)? true : false;
		swfobject.createCSS("#"+_ft, "position:absolute; width:100%; height:100%");
		swfobject.createCSS("#"+_ft+" object", "position:absolute");
		swfobject.addDomLoadEvent(startFit);
	}
	/** 
	* Set the initial parameters 
	*/
	function startFit(){
		html.style.height = doc.body.style.height = '100%';
		html.style.overflow = 'auto';
		doc.body.style.margin = doc.body.style.padding = '0';
		if (swfobject.getObjectById(_ft)){
			_ft = swfobject.getObjectById(_ft);
		} else if(NS){
			_ft = doc.getElementById(_ft).getElementsByTagName('object')[0];
		} else {
			_ft = doc.getElementById(_ft);
		}
		addResizeEvent(resize);
		swfobject.addDomLoadEvent(resize);
	}
	/**
	* Stop fitting the swf
	* @param	w	Width (Number or % or null - Default value is '100%') : Optional
	* @param	h	Height (Number or % or null - Default value is '100%') : Optional
	*/
	function stopFit(w,h){
		removeResizeEvent(resize);
		_ft.style.top = _ft.style.left = 'auto';
		_ft.style.marginTop = _ft.style.marginLeft = '0';
		var w = (w == null)? '100%' : w,
			h = (h == null)? '100%' : h;
		setWidth(w);
		setHeight(h);
	}
	/**
	* Sets the width of the swf
	* @param	w	Width (Number or %)
	*/
	function setWidth(w){
		_ft.style.width = (isNaN(w))? w : w+"px";
	}
	/**
	* Sets the height of the swf
	* @param	h	Height (Number or %)
	*/
	function setHeight(h){
		_ft.style.height = (isNaN(h))? h : h+"px";
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
	* Resizes and Reposition the flash movie
	*/
	function resize(){
		var iw = (NS)? win.innerWidth : doc.body.clientWidth, 
			ih = (NS)? win.innerHeight : doc.body.clientHeight;
		//sets width and center horizontally
		if (iw > _xw && _xw){
			setWidth(_xw);
			if(_hc){
				_ft.style.left = '50%';
				_ft.style.marginLeft = -(_xw*.5)+'px';
			}
		} else {
			if (iw > _mw && (iw < _xw || !_xw)) {
				setWidth('100%');
			} else {
				setWidth(_mw);
			}
			if(_hc){
				_ft.style.left = 'auto';
				_ft.style.marginLeft = '0';
			}
		}
		// sets height and center vertically
		if (ih > _xh && _xh){
			setHeight(_xh);
			if(_vc){
				_ft.style.top = '50%';
				_ft.style.marginTop = -(_xh*.5)+'px';
			}
		}else{
			if (ih > _mh && (ih < _xh || !_xh)){
				setHeight('100%');
			} else {
				setHeight(_mh);
			}
			if(_vc){
				_ft.style.top = 'auto';
				_ft.style.marginTop = '0';
			}
		}
	}
	/**
	* Public API
	*/
	return{
		addResizeEvent: addResizeEvent,
		removeResizeEvent: removeResizeEvent,
		stopFit: stopFit,
		fit: fit
	};
}();
//-->