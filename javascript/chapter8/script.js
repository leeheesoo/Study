var today = new Date();//오늘 날짜
var btnPrev = document.getElementById('btn-prev');
var btnNext = document.getElementById('btn-next');

function buildCalendar(){
  var firstDate = new Date(today.getFullYear(),today.getMonth(),1);// 0~11 이번달의 첫번째날
  var lastDate = new Date(today.getFullYear(),today.getMonth()+1,0 );//이번달의 마지막날
  var calendar = document.getElementById("calendar");    //테이블 달력을 만드는 테이블
  var calendarTitle = document.getElementById("calendar-title"); ///테이블 caption
  //console.log(lastDate)


  calendarTitle.innerHTML = today.getFullYear()+"년 "+ (today.getMonth()+1)+"월";

  //기존에 테이블에 잇던 달력 내용 삭제
  while(calendar.rows.length -1){ //요일은 고정
    calendar.deleteRow(calendar.rows.length -1);
  }
  var row;
  row = calendar.insertRow();
  var cnt = 0;

  // 1일이 시작되는 칸을 맞춤
  for ( var i=0; i <firstDate.getDay(); i++) {
    cell = row.insertCell(); //추가되는 td
    cnt = cnt + 1;
    //console.log(firstDate.getDay())

}
  //달력 출력
  for(var i=1; i<=lastDate.getDate(); i++){
    cell =row.insertCell();
    cell.innerHTML = i;
    cnt = cnt+1 ;
    //console.log(cnt)
    if (cnt%7 == 0)    //1주=7일
     row = calendar.insertRow();

  }
}

function prevClaendar(){ //이전 월
  today = new Date(today.getFullYear(), today.getMonth()-1,today.getDate());
  buildCalendar();
}

function nextCalendar(){ //다음 월
  today = new Date(today.getFullYear(), today.getMonth()+1,today.getDate());
  buildCalendar();
}

btnPrev.addEventListener('click',prevClaendar);
btnNext.addEventListener('click',nextCalendar);

buildCalendar();
