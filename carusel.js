/**
* carusel JavaScript plugin
 * 
 *
 * developed by Ivan Bugaev
 * mailto: ivan-753s@mail.ru
 *
 * discription  https://github.com/Ivan753/carusel
*/

/*
 * There is using tho global variables: 'carusels' AND 'carusels_timersID'
*/

(function(){

try{

var docs = document.getElementsByClassName("CARUSEL_AUTO");

carusels = [];	

if(docs){

for(let j = 0; j < docs.length; j++){


doc = docs[j];

var number = doc.children.length;
var members = [];
var k_off = 0.5;

// doc.style.position = 'relative';

var style_doc = window.getComputedStyle ? getComputedStyle(doc, "") : doc.currentStyle;

carusels[j] = {
	width: style_doc.width.replace('px', '')*1,
	height: style_doc.height.replace('px', '')*1,
	num: number,
	radiusX: style_doc.width.replace('px', '')*1 / 2,
	radiusY: style_doc.height.replace('px', '')*1 / 3,
	step: 2*Math.PI / number,
	angl: Math.PI / 2,
	angl_road: 0,
	members: [],

	drow: (function(){
		var opcity_hepl;

		for(let i = 0; i < number; i++){
			
			if(Math.sin(this.members[i].angl + this.angl_road) >= 0){  //if angl [0, pi]
				this.members[i].scale = 1 - Math.abs(Math.cos(this.members[i].angl + this.angl_road))*k_off;
				opcity_hepl = (0.2 - 0.5*Math.abs(Math.sin(this.members[i].angl + this.angl_road)));
			}else{
				opcity_hepl = 0.2
			}
			
			let zindex_hepl = (Math.sin(this.members[i].angl + this.angl_road) < 0)?Math.round((i)*10):0;

			
			if(Math.sin(this.members[i].angl + this.angl_road)<-1){
				zindex_hepl = -1;
			}

			this.members[i].style.position = 'absolute';
			this.members[i].style.left = Math.cos(this.angl + (2*Math.PI / number)*i + this.angl_road) * this.radiusX /2 + carusels[j].width/2 - this.members[i].widthh/2;
			this.members[i].style.top = Math.sin(this.angl + (2*Math.PI / number)*i + this.angl_road) * this.radiusY/2  + carusels[j].height/4;
			this.members[i].style.width = this.members[i].widthh*1*this.members[i].scale + 'px';
			this.members[i].style.height = this.members[i].heightt*1*this.members[i].scale + 'px';
			this.members[i].style.zIndex = Math.round(100*this.members[i].scale) - zindex_hepl;
			this.members[i].style.boxShadow = '0 0 '+this.members[i].scale*15+'px #555';
			this.members[i].style.opacity = this.members[i].scale - opcity_hepl;

			if((this.counter_start < this.counter_end) && (this.change == true)){
				this.angl_road += this.change_step;
				this.counter_start+= 2*Math.PI / 1000;
			}else{
				this.counter_start = 0;
				this.change = false;
			}
			if(this.nonstop == true){
				this.angl_road += this.change_step;
			}
			
		}

	}),
	
	change: false,
	counter_start: 0,
	counter_end: 0,
	change_step: 0,
	nonstop: false,

	carusels_right: (function(){
		this.change = true;
		this.counter_end = 2*Math.PI / number;
		this.change_step = - 2*Math.PI / 1000;
	}),

	carusels_left: (function(){
		this.change = true;
		this.counter_end = 2*Math.PI / number;
		this.change_step = 2*Math.PI / 1000;
	}),
	
	carusels_nonstop: (function(way){
		
		this.nonstop = true;
		
		switch(way){
			
			case 'right':
				this.change_step = - 2*Math.PI / 5000;
			break;
			
			case 'left':
				this.change_step = 2*Math.PI / 5000;
			break;
			
			default: this.nonstop = false; throw 'Error: uncorrect way in "carusels_nonstor" .'; break;
		}
		
	}),
	
	carusels_stop: (function(){
		this.nonstop = false;
	}),
	
	timerID: null,
	

	
	
	
}


//Initialisation---------------------



var scale = 1;
var angl = carusels[j].angl;

for(let i = 0; i < number; i++){
	members[i] = doc.children[i];
	
    let elem = window.getComputedStyle ? getComputedStyle(members[i], "") : members[i].currentStyle;

	
	if(Math.sin(angl) > 0){  //if angl [0, pi]
		scale = 1 - Math.abs(Math.cos(angl))*k_off;
	}
	
	let zindex_hepl = (Math.sin(angl) < 0)?1:0;
	
	members[i].style.position = 'absolute';
	members[i].style.left = Math.cos(angl) * carusels[j].radiusX/2 + carusels[j].width/2 - elem.width.replace('px', '') / 2;
	members[i].style.top = Math.sin(angl) * carusels[j].radiusY/2  + carusels[j].height/4;
	members[i].widthh = elem.width.replace('px', '')*1;
	members[i].style.width = (elem.width.replace('px', ''))*scale + 'px';
	members[i].heightt = elem.height.replace('px', '')*1;
	members[i].style.height = (elem.height.replace('px', ''))*scale + 'px';
	members[i].style.zIndex = Math.round(100*scale) - zindex_hepl;
	members[i].style.boxShadow = '0 0 '+scale*15+'px #555';
	members[i].style.opacity = scale;
	members[i].angl = angl;
	angl += 2*Math.PI / number;
	
}

carusels[j].members = members;

delete scale;
delete angl;
delete members;



}	

carusels_timersID = []; //---------------------------

for(let j = 0; j < docs.length; j++){
	carusels_timersID[j] = setInterval('carusels['+j+'].drow()', 30);
}



}

}catch(ex){
	console.log(ex);
}

})();
