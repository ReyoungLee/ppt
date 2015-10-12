var ppt = {
	pages: document.querySelectorAll('#con>div'),
	l: 0,
	nav: document.querySelector('#nav>div'),
	currentPage: 0,
	go: function (index) {
		if(index >= this.l || index < 0){
			return;
		}

		var cp = this.pages[this.currentPage], np = this.pages[index];

		index > this.currentPage?
			(cp.style.transform = 'perspective(999px) rotateX(-90deg)'):
			(np.style.transform = 'perspective(999px) rotateX(0)');

		this.nav.style.width = (index+1)/this.l * 100 + '%';
		this.currentPage = index;
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
	init: function () {
		this.l = this.pages.length;
		var i;
		for(i = this.l; i--;){
			this.pages[i].style.background = this.color();
			this.pages[i].style.zIndex = this.l - i;
		}
		this.go(0);
		document.onkeydown = this.keyEvent;
	}
}

ppt.init();