
var ppt = {
	pages: document.querySelectorAll('#page>div'),
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
			this.pages.slice(this.currentPage, index).css(dn).css({opacity: 0},300);
		}else{
			this.pages.slice(index, this.currentPage).css(up);
		}

		this.nav.css({ width: (index + 1)/this.l * 100 + '%' });
		this.currentPage = location.hash = index;
	},
	goUp: function () {
		this.go(this.currentPage - 1);
	},
	goDn: function () {
		this.go(this.currentPage + 1);
	},
	color:  function (flag) {
		var ret,c = this.color;
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
		_t.initFuns();
		_t.pages.slice = Array.prototype.slice;

		_t.l = _t.pages.length;
		var i, pn;

		for(i = _t.l; i--;){
			_t.pages[i].css({background: _t.color()});
			_t.pages[i].css({zIndex: _t.l - i});
			i && _t.pages[i].append('span', i);
		}
		setTimeout(function () {
			_t.go(_t.getNav());
		},0);
		document.onkeydown = _t.keyEvent;
	},
	getNav: function () {
		var i = location.hash.slice(-1) * 1;
		typeof i == 'number' || (i = 0);
		return i;
	},
	initFuns: function () {
		Object.prototype.css = function (obj, delay) {
			var _t = this.length == undefined ? [this]:this,i,k;
			if(delay > 0){
				setTimeout(function () {
					_t.css(obj);
				}, delay);
				return;
			}
			for(i = _t.length;i--;){
				for(k in obj){
					_t[i].style[k] = obj[k];
				}
			}
			return _t;
		}
		Object.prototype.append = function (tag, context) {
			var dom = document.createElement(tag);
			dom.innerHTML = context;
			this.appendChild(dom);
		}
	}
}

ppt.init(ppt);