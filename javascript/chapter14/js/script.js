$(function(){

	// 메모장
	var stickyHtml = 
		'<div class="sticky">' +
			'<nav class="top-nav">' +
				'<a href="#" class="add"><i class="fa fa-plus"></i></a>' +
				'<a href="#" class="save"><i class="fa fa-floppy-o"></i></a>' +
				'<div class="right">' +
					'<a href="#" class="get"><i class="fa fa-list"></i></a>' +
					'<a href="#" class="del"><i class="fa fa-times"></i></a>' +
				'</div>' +
			'</nav>' +
			'<textarea name="txt" class="txt"></textarea>' +
			'<nav class="side-nav"><ul></ul></nav>' +
		'</div>';

		
	// 메모 객체
	var Sticky ={
		// 메모 추가
		add : function(){
				// 창 크기를 구함
				var winWidth = $('#sticky-wrap').width() - 250,
					winHeight = $('#sticky-wrap').height() - 300,
					x = Math.random() * winWidth,		
					y = Math.random() * winHeight; 
				
				$('#sticky-wrap').append(stickyHtml);	
				var $newSticky = $('.sticky').last();	

				$newSticky.css({
					left: x,
					top: y
				});	
				$('.sticky').css('z-index', '0');	
				$newSticky.css('z-index', '99');	
		},

		// 메모 저장
		save : function(currentMemo){
				var idx = localStorage.length;	// 저장된 글 수
				var txt = currentMemo.val();	// 작성중인 글

				
				if(txt !== ''){ 
					var key = prompt('파일제목은?', '');
					localStorage.setItem(key, txt); // 사용자 현재 도메인의 로컬storage객체에 접근 데이터 추가
		  		}
		},

		// 메모 목록 및 읽기
		get : function listStorage(currentMemo){
				var key;
				var l = localStorage.length; // 총 저장소 길이
				var delIcon = '<i class="fa fa-trash"></i>'; //쓰레기통ICON
				
				currentMemo.find('ul').empty(); // 열때마다 ul 초기화
				currentMemo.toggleClass('active');	

				//사이드 바에 파일 목록 
				for(var i = 0; i < l; i++){
					key = localStorage.key(i);
					currentMemo.find('ul')
								.append('<li>' + key + delIcon + '</li>');
				}

				// 목록 메모 읽어오기
				currentMemo.find('li').click(function(){
					var getData = $(this).text();	// 목록의 글 제목을 읽음
					var txt = localStorage.getItem(getData);
					currentMemo.toggleClass('active');	
					currentMemo.prev('.txt').val(txt);	
				});

				// 목록 삭제
				currentMemo.find('li > i').click(function(){
					var key = $(this).parent().text();	// 목록의 key
					var ok = confirm('해당 메모를 삭제할까요?');
					if(ok){
						localStorage.removeItem(key);
					}
				});
			} 

	};	

	//---------------------------------
	// 추가
	$('#sticky-wrap').on('click', '.add', function(){
		Sticky.add();
	});

	// 저장 
	$('#sticky-wrap').on('click', '.save', function(){
		var currentMemo = $(this).parent().siblings('.txt'); // 글 영역 선택
		Sticky.save(currentMemo);
	});

	// 읽기 
	$('#sticky-wrap').on('click', '.get', function(){	
		var currentMemo = $(this).parents('.top-nav').siblings('.side-nav');
		Sticky.get(currentMemo);	
	});		

	// 창닫기 
	$('#sticky-wrap').on('click', '.del', function(){
		var currentMemo = $(this).parents('.sticky').remove();	// 메모장 제거
	});


	//---------------------------------
	// 드래그 활성화
	$('#sticky-wrap').on('mouseover', '.top-nav', function(){
		$(this).parent().draggable();
	});

	//---------------------------------
	// 터치했을때 z-index
	$('#sticky-wrap').on('touchstart mousedown', '.sticky', function(){ 
		$('.sticky').css('z-index', '0');
		$(this).css('z-index', '99');
	});


	//---------------------------------
	// 첫화면 메모생성
	$('#sticky-wrap').append(stickyHtml);

});