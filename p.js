
(function (d) {
	window.ppt = {
		pages:  d.querySelectorAll('#page>div'),
		l: 0,
		nav: d.querySelector('#nav>div'),
		tsn: ' cubic-bezier(0, 0, 0.7, 1.7)',
		ts: {transition: ''},
		tf: {transform: ''},
		currentPage: 0,
		events: [],
		q: function (c) {
			return d.querySelectorAll(c);
		},
		_go: function (index) {
			var _t = this;
			index >= _t.l && (index = _t.l - 1);
			index < 0 && (index = 0);

			var dn = {transform: 'perspective(999px) rotateX(-90deg) rotateY(62deg)', opacity: 0},
				up = {transform: 'perspective(999px) rotate(0)', opacity: 1};

			if( index > _t.currentPage){
				_t.pages.slice(_t.currentPage, index).css(dn);//.css({opacity: 0},300);
			}else{
				_t.pages.slice(index, _t.currentPage).css(up);
			}

			_t.nav.css({ width: (index + 1)/_t.l * 100 + '%' });
			_t.currentPage = location.hash = index;
			_t.events[index] && _t.events[index]();
		},
		changeHash: function (d) {
			var targetIndex = this.getNav() + d;
			if(targetIndex >= this.l || targetIndex < 0){
				return;
			}
			location.hash = targetIndex;
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
			([8,33,37,38].indexOf(e) > -1) && ppt.changeHash(-1);
			([32,34,39,40].indexOf(e) > -1) && ppt.changeHash(1);
		},
		getNav: function () {
			var i = location.hash.slice(1) * 1;
			if(typeof i != 'number' || i == NaN){
				i = 0;
				location.hash = 0;
			}
			return i;
		},
		init: function (_t) {

			_t.initFuns();
			_t.initPage(_t);
			_t.initLine(_t);
			_t.initPie(_t);
			_t.initBar(_t);
			_t.initSC(_t);

			var go = function () {
				_t._go(_t.getNav());
			}
			setTimeout(go,0);
			document.onkeydown = _t.keyEvent;
			window.onhashchange = go;
		},
		initPage: function (_t) {

			_t.q('#page').css({opacity: 1, transition: 'opacity .4s ease-out'},400);
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
				[spot, txt].css(_t.ts).css({left: 0});
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
				liCon = _t.q('#pie-li')[0],
				icon = _t.q('#pie-li>li>i');
			var colors = ['#007ac6', '#328ed5', '#63b9fb', '#88cafc', '#bbdffa'];
			var deg = [2.7,3,3.2,1.1],sum = 0,i;
			var l = deg.length;

			for(i = l;i--;){
				sum += deg[i];
				[sector[i].children[0],icon[i]].css({background: colors[i]});
			}
			for(i = l;i--;){
				deg[i] = Math.ceil(deg[i]/sum * 360);
			}
			var listOver = function (flag) {
				return function (e) {
					var target = e.target.tagName =='LI'? e.target : e.target.parentNode;
					var i = list.indexOf(target),
						styles = ['1.1','1'];
					i > -1 && sector[i].setTrans('scale', styles[flag]);
				}
			}
			liCon.onmouseover = listOver(0);
			liCon.onmouseout = listOver(1);

			_t.events[2] = function () {
				var dv = 0;
				var initStyle = {transition: '',transform: ''},
					endStyle = {transition: ' .7s' + _t.tsn};
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
						list[i].css({transform: 'rotateX(0)'}, 160 * i)
					}
				},99);
				setTimeout(function () {
					sector.css({transition: '.2s ease-out'});
				},800);
			}
		},
		initBar: function (_t) {
			var bars = _t.q('.bar .part'),
				prj = _t.q('#works .prj'),
				axis = _t.q('#works .axis'),
				start = _t.q('#works .start');
			var wk = [2,3,2,2,3.2,5],
				colors = ['#AAF6FF', '#65E2F1', '#3EBFCE', '#0A9AAB', '#027B8C', '#065C69'],
				i;
			var l = wk.length;

			for(i = l;i--;){
				bars[i].css({flex: wk[i], background: colors[i]});
			}

			_t.events[3] = function () {
				[bars, axis, start, prj].css(_t.ts);
				bars.css({height: 0});
				axis.css({width: 0});
				start.css({opacity: 0});
				prj.css({transform: '', opacity: 0});
				
				setTimeout(function () {
					axis.css({transition: '1.8s ease-out', width: '100%'});
					start.css({transition: '3s', opacity: 1}, 200);
					for(i = 0;i < l;i++){
						bars[i].css({transition: '.3s' + _t.tsn, height: '100%'}, 300 * i);
						prj[i].css({transition: '.3s ease-out', transform: 'rotate(40deg)', opacity: 1}, 300 * i);
					}
				},99);
			}
		},
		initSC: function (_t) {
			var imgs = _t.q('.pc img'),
				imgc = _t.q('.pc');
			for(var i = imgc.length;i--;){
				(function () {
					var idx = _t.pages.indexOf(imgc[i]);
					_t.events[idx] = function () {
						var picL = _t.pages[idx].querySelectorAll('.left'),
							picR = _t.pages[idx].querySelectorAll('.right'),
							pic = _t.pages[idx].querySelectorAll('img');

						pic.css(_t.ts).css({opacity: 0});
						picL.css({transform: 'translate(20vw) scale(0.5)'});
						picR.css({transform: 'translate(-30vw) scale(0.5)'});
						setTimeout(function () {
							pic.css({transition: '.4s ease-out', opacity: 1});
							picL.css(_t.tf);
							picR.css(_t.tf);
						},199);
					}
				})();
			}
		},
		initFuns: function () {

			NodeList.prototype.slice = Array.prototype.slice;
			NodeList.prototype.indexOf = Array.prototype.indexOf;

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
			HTMLElement.prototype.append = function (tag, context) {
				var dom = document.createElement(tag);
				dom.innerHTML = context;
				this.appendChild(dom);
			}
			HTMLElement.prototype.setTrans = function (prop, val) {
				var tr = this.style.transform;
				var idx_st = tr.indexOf(prop),
					lg = tr.length,
					lg_p = prop.length;
				var idx_ed;

				if(idx_st > -1){
					for(var i = idx_st + lg_p + 2; i < lg; i++){
						if(tr[i] == ')'){
							idx_ed = i + 1;
							break;
						}
					}
					tr = tr.slice(0, idx_st) + tr.slice(idx_ed);
				}

				var newTrans = ' ' + prop + '(' + val +')';
				this.style.transform = tr + newTrans;
			}
		}
	}

	ppt.init(ppt);
})(document);