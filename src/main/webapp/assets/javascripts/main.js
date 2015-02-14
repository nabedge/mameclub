var Splash = function () {
	this.$splash = $('#jsi-splash');

	this.init();
};
Splash.prototype = {
	init: function () {
		this.remove();
	},
	remove: function () {
		var _this = this;

		setTimeout(function () {
			_this.$splash.fadeOut(500);
		}, 2000);
	}
};

var Name = function () {
	this.$name = $('#jsi-name');
	this.$text = $('#jsi-name-text');
	this.$submit = this.$name.find('input[type=submit]');

	this.init();
};
Name.prototype = {
	init: function () {
		this.bindEvents();
	},
	bindEvents: function () {
		var _this = this;

		this.$submit.on('click', function () {
			new FaceToucher(_this.$text.val());
			_this.remove();
		});
	},
	remove: function () {
		var _this = this;

		_this.$name.fadeOut(500);
	}
};

var FaceToucher = function (name) {
	this.$face = $('#jsi-main-face');
	this.$mode = $('.jsc-mode').find('input');
	this.countMame = 0;
	this.countKiss = 0;
	this.$countMame = $('#jsi-count-mame').find('span');
	this.$countKiss = $('#jsi-count-kiss').find('span');
	this.name = name;
	this.$name = $('#jsi-name-view').find('span');

	this.init();
};
FaceToucher.prototype = {
	init: function () {
		this.$name.text(this.name);
		this.bindEvents();
	},
	bindEvents: function () {
		var _this = this;

		this.$face.on('touchend', function (e) {
			_this.touchFace(e);
		});
	},
	touchFace: function (e) {
		var
		  touchX = e.originalEvent.changedTouches[0].pageX,
		  touchY = e.originalEvent.changedTouches[0].pageY;

		this.sendToTouchStatus(touchX, touchY);

		e.preventDefault();
	},
	sendToTouchStatus: function (touchX, touchY) {
		var mode = this.$mode.filter(':checked').val();
        this.sendToSrv(this.name, touchX, touchY, mode);
		if (mode === 'mame') {
			new Mame(touchX, touchY);
			this.countUp();
		} else {
			new Kiss(touchX, touchY);
			this.countUp(true);
		}
	},
	countUp: function (flagKiss) {
		var
			count,
			$elementCount;

		if (flagKiss) {
			this.countKiss++;
			count = this.countKiss;
			$elementCount = this.$countKiss;
		} else {
			this.countMame++;
			count = this.countMame;
			$elementCount = this.$countMame;
		}

		$elementCount.text(count);
	},
	sendToSrv: function (name, x, y, vtype) {
	    console.log("x: "+x+", y:"+y);
        $.post('/mameclub/vote', {nominee: "2",  mf: "m", x: x, y: y, bk: "b"});
	}
};

var Mame = function (x, y) {
	this.$body = $(document.body);
	this.$image = $('<img src="/mameclub/assets/images/mame.png" />').addClass('mame');
	this.x = x;
	this.y = y;
	this.defaultX = x;
	this.defaultY = y;
	this.size = 30 + Math.random() * 10;
	this.rotate = Math.random() * 360;

	this.init();
};
Mame.prototype = {
	init: function () {
		this.positioningMame();
	},
	positioningMame: function () {
		this.$body.append(this.$image);
		this.$image.width(this.size);

		this.x = this.defaultX - (this.$image.width() / 2);
		this.y = this.defaultY - (this.$image.height() / 2);

		this.$image.css({
			top: this.y,
			left: this.x,
			transform: 'rotate(' + this.rotate + 'deg)'
		});

		this.$image.stop().animate({
			opacity: 0
		}, 300, function () {
			$(this).remove();
		});
	}
};

var Kiss = function (x, y) {
	this.$body = $(document.body);
	this.$image = $('<img src="/mameclub/assets/images/kiss.png" />').addClass('kiss');
	this.x = x;
	this.y = y;
	this.defaultX = x;
	this.defaultY = y;
	this.size = 30 + Math.random() * 10;
	this.rotate = Math.random() * 360;

	this.init();
};
Kiss.prototype = {
	init: function () {
		this.positioningKiss();
	},
	positioningKiss: function () {
		this.$body.append(this.$image);
		this.$image.width(this.size);

		this.x = this.defaultX - (this.$image.width() / 2);
		this.y = this.defaultY - (this.$image.height() / 2);

		this.$image.css({
			top: this.y,
			left: this.x,
			transform: 'rotate(' + this.rotate + 'deg)'
		});

		this.$image.stop().animate({
			opacity: 0
		}, 300, function () {
			$(this).remove();
		});
	}
};

$(function () {
	new Splash();
	new Name();
});
