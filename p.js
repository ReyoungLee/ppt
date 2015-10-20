
(function (d) {
	window.ppt = {
		pages: d.querySelectorAll('#page>div'),
		l: 0,
		nav: d.querySelector('#nav>div'),
		currentPage: 0,
		events: [],
		go: function (index) {
			var _t = this;
			if(index >= _t.l || index < 0){
				return;
			}

			var dn = {transform: 'perspective(999px) rotateX(-90deg) rotateY(62deg)'},
				up = {transform: 'perspective(999px) rotate(0)', opacity: 1};

			if( index > _t.currentPage){
				_t.pages.slice(_t.currentPage, index).css(dn).css({opacity: 0},300);
			}else{
				_t.pages.slice(index, _t.currentPage).css(up);
			}

			_t.nav.css({ width: (index + 1)/_t.l * 100 + '%' });
			_t.currentPage = location.hash = index;
			_t.events[index] && _t.events[index]();
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
		getNav: function () {
			var i = location.hash.slice(-1) * 1;
			typeof i == 'number' || (i = 0);
			return i;
		},
		init: function (_t) {

			_t.initFuns();
			_t.initPage(_t);
			_t.initChart(_t);		

			var go = function () {
				_t.go(_t.getNav());
			}
			setTimeout(go,0);
			document.onkeydown = _t.keyEvent;
			window.onhashchange = go;
		},

		initPage: function (_t) {
			_t.pages.slice = Array.prototype.slice;

			_t.l = _t.pages.length;
			var i;

			for(i = _t.l; i--;){
				_t.pages[i].css({background: _t.color()});
				_t.pages[i].css({zIndex: _t.l - i});
				i && _t.pages[i].append('span', i);
			}
		},
		initChart: function (_t) {
			var sector = d.querySelectorAll('#chart>div'),
				secInner = d.querySelectorAll('#chart>div>div');
			var colors = ['#007ac6', '#328ed5', '#63b9fb', '#88cafc', '#bbdffa'];
			var deg = [1,2,3,4],sum = 0,i;
			var l = deg.length;

			for(i = l;i--;){
				sum += deg[i];
				sector[i].children[0].css({background: colors[i]});
			}
			for(i = l;i--;){
				deg[i] = Math.ceil(deg[i]/sum * 360);
			}
			var rotateChart = function () {
				var dv = 0;
				var initStyle = {transition: '',transform: ''},
					endStyle = {transition: 'transform .6s ease-out'};
				sector.css(initStyle);
				secInner.css(initStyle);
				setTimeout(function () {
					sector.css(endStyle);
					secInner.css(endStyle);
					for(i = l;i--;){
						sector[i].children[0].css({transform: 'rotate('+ deg[i] +'deg)'});
						sector[i].css({transform: 'rotate('+ dv +'deg)'});
						dv += deg[i];
					}
				},0);
			}
			_t.events[2] = rotateChart;
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
})(document);