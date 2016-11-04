trace = function(str) {
	if (console.log) {
		console.log(str);
	}
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame
			|| window.mozRequestAnimationFrame || window.oRequestAnimationFrame
			|| window.msRequestAnimationFrame || function(callback) {
				return window.setTimeout(callback, 1000 / 60);
			};
})();

window.cancelRequestAnimFrame = (function() {
	return window.cancelAnimationFrame
			|| window.webkitCancelRequestAnimationFrame
			|| window.mozCancelRequestAnimationFrame
			|| window.oCancelRequestAnimationFrame
			|| window.msCancelRequestAnimationFrame || function(val) {
				window.clearTimeout(val);
			}
})();

var lb = {
	module : function() {
		var modules = {};
		return function(name) {
			if (modules[name]) {
				return modules[name];
			}
			return modules[name] = {
				Views : {}
			};
		};
	}()
};

paper.Item.inject({ 
    absRotate: function(angle) { 
    	var totalRotation = angle - this.abs_rotation;
		while ( totalRotation < -180 ) totalRotation += 360 ;
		while ( totalRotation >  180 ) totalRotation -= 360 ;
		
        this.abs_rotation += totalRotation; 
        this.abs_rotation = this.abs_rotation % 360;
        this.rotate(totalRotation); 
    }, 
    getAbsRotation : function() {
    	return this.abs_rotation;
    },
    abs_rotation: 0 
}); 

var dataComplete = false;
var addressComplete = false;
var groups;
var slider;

function allComplete() {
	
	if (!(dataComplete && addressComplete)) return;
	
	var lbSlider = lb.module('lbSlider');

	slider = new lbSlider.SliderView({
		el : '#lbSlider',
		groups : groups
	});	
	
	var mMenu = new lbSlider.MainMenuView({
		el : '#main-menu',
		groups : groups,
		slider : slider
	});

	
	slider.on(slider.Event.SWAP, mMenu.swapHandler,mMenu);

	
	mMenu.on(mMenu.Event.CLICK, slider.menuClickHandler, slider);
	
	slider.curSec = groups.getSectionByIds(startGroupName, startSecName);

	slider.start();
	mMenu.render();
	
		
}

$(document).ready(function() {

	var init = true;
	var stateSupport = window.history.pushState !== undefined;

	var lbSlider = lb.module('lbSlider');

	groups = new lbSlider.Groups();

	groups.fetch({
		success : function() {
			dataComplete = true;
			allComplete();
		}
	});
	
	$.address.state(state);
	
	$.address.init(function(event) {
		//trace('$.address ------ init');
		addressComplete = true;
		allComplete();
	});

	$.address.change(function(event) {
		//trace('$.address ------ change');
		if (init) {
			init = false;
			return;
		}
		if (slider) slider.onAddressChange(event);
	});

});
