
Object.prototype.css = function (obj) {
	var _t = this.length == undefined ? [this]:this,i,k;
	for(i = _t.length;i--;){
		for(k in obj){
			_t[i].style[k] = obj[k];
		}
	}
}

var ppt = {
	pages: document.querySelectorAll('#con>div'),
	l: 0,
	nav: document.querySelector('#nav>div'),
	currentPage: 0,
	go: function (index) {
		if(index >= this.l || index < 0){
			return;
		}

		var dn = {transform: 'perspective(999px) rotateX(-90deg) rotateY(62deg)'},
			up = {transform: 'perspective(999px) rotate(0)', opacity: 1};

		if( index > this.currentPage){
			var target = this.pages.slice(this.currentPage, index);
			target.css(dn);
			setTimeout(function(){
				target.css({opacity: 0});
			},300);
		}else{
			this.pages.slice(index, this.currentPage).css(up);
		}

		this.nav.style.width = (index+1)/this.l * 100 + '%';
		this.currentPage = index;
		location.hash = index;
	},
	goUp: function () {
		this.go(this.currentPage - 1);
	},
	goDn: function () {
		this.go(this.currentPage + 1);
	},
	color:  function (flag) {
		var ret,c = ppt.color;
		flag && (ret =  60 + Math.floor(Math.random() * 100));
		flag || (ret = 'rgb('+c(1)+','+c(1)+','+c(1)+')');
		return ret;
	},
	keyEvent: function (e) {
		e.which == 8 && e.preventDefault();
		var e = e.which;
		([8,33,37,38].indexOf(e) > -1) && ppt.goUp();
		([32,34,39,40].indexOf(e) > -1) && ppt.goDn();
	},
	init: function (_t) {
		_t.pages.slice = Array.prototype.slice;
		_t.l = _t.pages.length;
		var i, p = _t.getNav();
		for(i = _t.l; i--;){
			_t.pages[i].css({background: _t.color()});
			_t.pages[i].css({zIndex: _t.l - i});
		}
		_t.go(0);
		setTimeout(function () {
			_t.go(p);
		},0);
		document.onkeydown = _t.keyEvent;
	},
	getNav: function () {
		var i = location.hash.slice(-1) * 1;
		typeof i == 'number' || (i = 0);
		return i;
	}
}
ppt.init(ppt);