
(function (d) {
	window.ppt = {
		pages:  d.querySelectorAll('#page>div'),
		l: 0,
		nav: d.querySelector('#nav>div'),
		tsn: ' cubic-bezier(0, 0, 0.7, 1.7)',
		currentPage: 0,
		events: [],
		q: function (c) {
			return d.querySelectorAll(c);
		},
		go: function (index) {
			var _t = this;
			if(index >= _t.l || index < 0){
				return;
			}

			var dn = {transform: 'perspective(999px) rotateX(-90deg) rotateY(62deg)', opacity: 0},
				up = {transform: 'perspective(999px) rotate(0)', opacity: 1};

			if( index > _t.currentPage){
				_t.pages.slice(_t.currentPage, index).css(dn);//css({opacity: 0},300);
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
			flag && (ret =  40 + Math.floor(Math.random() * 30 * flag));
			flag || (ret = 'rgb('+c(1)+','+c(2)+','+c(3)+')');
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
			_t.initLine(_t);
			_t.initPie(_t);
			_t.initBar(_t);

			var go = function () {
				_t.go(_t.getNav());
			}
			setTimeout(go,0);
			document.onkeydown = _t.keyEvent;
			window.onhashchange = go;
		},
		initPage: function (_t) {

			_t.l = _t.pages.length;
			var i;

			for(i = _t.l; i--;){
				_t.pages[i].css({background: _t.color()});
				_t.pages[i].css({zIndex: _t.l - i});
				i && _t.pages[i].append('span', i);
			}
		},
		initLine: function (_t) {
			var spot = _t.q('#tline .spot'),
				txt = _t.q('#tline .txt'),
				txte = _t.q('#tline .txt:nth-child(even)'),
				txto = _t.q('#tline .txt:nth-child(odd)');
			var l = spot.length,i;
			var dv = ['15', '40', '60', '75'];
			var bg = _t.pages[1].style.background;

			_t.events[1] = function () {
				[spot, txt].css({left: 0, transition: ''});
				txte.css({bottom: 0});
				txto.css({top: 0});
				setTimeout(function () {
					[spot, txt].css({transition: '.7s' + _t.tsn});
					txte.css({bottom: '4vh'});
					txto.css({top: '20vh'});
					for(i = l;i--;){
						[spot[i], txt[i]].css({left: dv[i] + '%'});
					}
				},99);
			}
		},
		initPie: function (_t) {
			var sector = _t.q('#pie>div'),
				secInner = _t.q('#pie>div>div'),
				list = _t.q('#pie-li>li'),
				icon = _t.q('#pie-li>li>i');
			var colors = ['#007ac6', '#328ed5', '#63b9fb', '#88cafc', '#bbdffa'];
			var deg = [3,3,3,1],sum = 0,i;
			var l = deg.length;

			for(i = l;i--;){
				sum += deg[i];
				[sector[i].children[0],icon[i]].css({background: colors[i]});
			}
			for(i = l;i--;){
				deg[i] = Math.ceil(deg[i]/sum * 360);
			}
			_t.events[2] = function () {
				var dv = 0;
				var initStyle = {transition: '',transform: ''},
					endStyle = {transition: '.7s' + _t.tsn};
				sector.css(initStyle);
				secInner.css(initStyle);
				list.css({transition: '',transform: 'rotateY(90deg)'});
				setTimeout(function () {
					sector.css(endStyle);
					secInner.css(endStyle);
					list.css(endStyle);
					for(i = l;i--;){
						sector[i].children[0].css({transform: 'rotate('+ deg[i] +'deg)'});
						sector[i].css({transform: 'rotate('+ dv +'deg)'});
						dv += deg[i];
						list[i].css({transform: 'rotateX(0)'}, 100 * i)
					}
				},99);
			}
		},
		initBar: function (_t) {
			var bars = _t.q('.bar .part'),
				prj = _t.q('#works .prj'),
				axis = _t.q('#works .axis'),
				start = _t.q('#works .start');
			var wk = [2,3,2,2,4],
				colors = ['#AAF6FF', '#65E2F1', '#3EBFCE', '#0A9AAB', '#027B8C'],
				i;
			var l = wk.length;

			for(i = l;i--;){
				bars[i].css({flex: wk[i], background: colors[i]});
			}

			_t.events[3] = function () {

				[bars, axis, start, prj].css({transition: ''});
				bars.css({height: 0});
				axis.css({width: 0});
				start.css({opacity: 0});
				prj.css({transform: '', opacity: 0});
				
				setTimeout(function () {
					axis.css({transition: '1.5s ease-out', width: '100%'});
					start.css({transition: '3s', opacity: 1}, 200);
					for(i = 0;i < l;i++){
						bars[i].css({transition: '.3s' + _t.tsn, height: '100%'}, 300 * i);
						prj[i].css({transition: '.3s ease-out', transform: 'rotate(40deg)', opacity: 1}, 300 * i)
					}
				},99);
			}
		},
		initFuns: function () {

			NodeList.prototype.slice = Array.prototype.slice;

			Object.prototype.css = function (obj, delay) {
				var _t = this.length == undefined ? [this]:this,i,k;
				if(delay > 0){
					setTimeout(function () {
						_t.css(obj);
					}, delay);
					return;
				}
				for(i = _t.length;i--;){
					if(_t[i].length != undefined){
						_t[i].css(obj);
					}else{
						for(k in obj){
							_t[i].style[k] = obj[k];
						}
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