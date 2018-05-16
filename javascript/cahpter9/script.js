//변수선언
var wrap = document.querySelector('.wrap'),
    page = document.querySelector('.page'),
    indicator = document.getElementsByTagName('li');

var pageWidth;
var pageAngle = 0;
var pageDeg = 0;

function initPage(){
    pageWidth = page[0].offsetWidth;

    for(var i=0; i<page.length; i++){
        page[i].style.transform = 'rotateY('+pageAngle+'deg), translateZ('+(pageWidth/2)+'px)';
        pageAngle +=90;
    }

    wrap.style.transform = 'translateZ('+(-pageWidth/2)+'px) rotateY('+pageDeg+'deg)'
}

initPage();
