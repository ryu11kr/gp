var i = ('test');
console.log(i);
var i = ('ok');
console.log(i);
/* h1 태그 컨트롤 */
function h1test(){
	$('h1').css({'font-size' : 50, 'text-align' : 'center'});
}
/* menu control */
function gnbMenu(depth1,depth2){
	var menuWrap =  $("nav > ul");
	var countDepth1 =  $("nav > ul > li");
	var countDepth2 =  $("nav > ul > li > ul > li");
	var hoverDepth1 =  $("nav > ul > li > a");
	var hoverDepth2 =  $("nav > ul > li > ul > li > a");
	var reset;
	var holdTime = 3000;
	$(hoverDepth1).bind('focusin mouseenter',function() {
			clearTimeout(reset);
			$(countDepth1).find("ul").addClass("show");
			$(this).parent().siblings().find("a").removeClass('on');
			$(this).addClass('on');
	});
	$(hoverDepth2).bind('focusin mouseenter',function() {
			clearTimeout(reset);
			$(hoverDepth2).removeClass('on');
			$(hoverDepth1).removeClass('on');
			$(this).addClass('on');
			$(this).parents().eq(2).find("> a").addClass('on');
	});
	$(hoverDepth2).bind('mouseleave',function() {
		$(this).removeClass('on');
		$(hoverDepth1).removeClass('on');
		$(countDepth1).eq(depth1).find("> a").addClass("on");
		$(countDepth1).eq(depth1).find('> ul > li').eq(depth2).find("> a").addClass("on");
	});
	$(menuWrap).bind('mouseleave',function() {
		var self = this;
		reset = setTimeout(function(){
			$(self).children('li').find('ul').removeClass("show");
			$(self).children('li').find("a").removeClass('on');
			$(countDepth1).eq(depth1).find("> a").addClass("on");
			$(countDepth1).eq(depth1).find('> ul > li').eq(depth2).find("> a").addClass("on");
		}, holdTime);
	});
	if ($(countDepth1).size() > depth1){
		$(countDepth1).eq(depth1).find("> a").addClass("on");
		$(countDepth1).eq(depth1).find('> ul > li').eq(depth2).find("> a").addClass("on");
	}
	$('html').click(function(e) {
		if($(e.target).closest(menuWrap).length === 0) {
			clearTimeout(reset);
			$(menuWrap).children('li').find('ul').removeClass("show");
			$(menuWrap).children('li').find("a").removeClass('on');
			$(countDepth1).eq(depth1).find("> a").addClass("on");
			$(countDepth1).eq(depth1).find('> ul > li').eq(depth2).find("> a").addClass("on");
		}
	});
}


// xml data 로드
function xmlAjax(){
	$("#xml-btn-load").click(function(){
		xmlStartLoadFile();
		var offset = $("#xml-btn-load").offset();
		$('html, body').animate({scrollTop : offset.top}, 400);
	});
	function xmlStartLoadFile(){
		$.get("/static/ajax/images.xml",null,xmlCreate,"xml");
		//jQuery.get( url [, data] [, success(data, textStatus, jqXHR)] [, dataType] )
		//.get : 서버로부터 데이터를 가져온다
		//url : 데이터 경로 url
		//data : 서버로 보낼 데이터, 없으면 null
		//success(data, textStatus, jqXHR) : 성공시 콜백함수
		//dataType : 서버에서 반환되는 데이터 타입 (xml, json, script, html)

	}
	function xmlCreate(xmlInfo){
		var $images = $(xmlInfo).find("image");
		var strDom = "";
		for(var i=0;i<$images.length;i++){
			var $image = $images.eq(i);
			strDom += '<div class="image_panel">'
			strDom += '   <img src="'+$image.find("url").text()+'">';
			strDom += '   <p class="title">'+$image.find("title").text()+'</p>';
			strDom += '</div>';
		}
		var $imageContainer = $("#xml-image-container");
		if($($imageContainer).is(':empty')){
			$imageContainer.append(strDom);
		}
		else {
			alert("한번만 실행됨");
		}
	}
}

// json data 로드
function jsonAjax(){
	$("#json_btn_load").click(function(){
		jsonStartLoadFile();
		var offset = $("#json_btn_load").offset();
		$('html, body').animate({scrollTop : offset.top}, 400);
	});
	function jsonStartLoadFile(){
		$.getJSON("/static/ajax/images.json",null,jsonCreate,"json");
	}
	function jsonCreate(jsonInfo){
		var $images = jsonInfo.rows;
		var strDom = "";
		for(var i=0;i<$images.length;i++){
			var $image = $images[i];
			strDom += '<div class="image_panel">'
			strDom += '   <img src="'+$image.url+'">';
			strDom += '   <p class="title">'+$image.title+'</p>';
			strDom += '</div>';
		}
		var $imageContainer = $("#json_image_container");
		if($($imageContainer).is(':empty')){
			$imageContainer.append(strDom);
		}
		else {
			alert("한번만 실행됨");
		}
	}
}

// html data 로드
function htmlAjax() {
	initEventListener();
	function initEventListener(){
		$("#html_btn_load").click(function(e){
			//alert('test');
			loadPage();

			var offset = $("#html_btn_load").offset();
			$('html, body').animate({scrollTop : offset.top}, 400);
		})
	}
	function loadPage(){
		$.get("/static/ajax/images.html",null,htmlCreate,"html");
	}
	function htmlCreate(htmlInfo){
		var $newPage = $(htmlInfo); //html data 를 $newPage 에 넣준다.
		var strID = $("#html_image_container");
		if($(strID).is(':empty')){
			$(strID).append($newPage);
		}
		else {
			alert("한번만 실행됨");
		}
	}

}

// 롤링배너
function bannerSlider() {
	var BANNER_WIDTH = 128; //배너 한개의 가로길이
	var $banner_total; //모든 배너의 가로길이
	var nBannerLength = 0; //배너의 갯수
	var nCurrentBannerIndex = 0; //현재 보이는 배너의 인덱스
	var SHOW_DURATION = 500; //이전, 다음 배너가 정위치에 도달하는데까지 걸리는 시간
	var $banner_dots; //메뉴
	var AUTO_PLAY_TIME = 2000; //2초에 한번씩 슬라이드 된다.
	var autoTimerID; // 자동실행
	/* 문서로드후 자동 실행이 필요한 경우 */
	initMenu(); //배너 관련 설정 불러오기
	initEventListener(); //마우스 컨트롤 관련
	startAutoPlay(); //자동 슬라이딩
	function initMenu(){
		$banner_total = $('#banner_content'); //배너들의 총 가로길이를 관리하는 아이디명 연결
		nBannerLength = $banner_total.children('img').length; //배너의 갯수를 대입
		$banner_total.width(BANNER_WIDTH*nBannerLength); //배너한개의 가로길이 * 배너 갯수
		$banner_dots = $('#banner_nav li a'); //매뉴 위치 연결
		showBannerAt(0); // 메뉴의 위치를 0 으로 초기화
		autoTimerID = 0; //0으로 초기화
	}
	function initEventListener(){
		$("#btn_prev_banner").bind("click", function(){
			prevBanner();
		});
		$("#btn_next_banner").bind("click", function(){
			nextBanner();
		});
		$($banner_dots).bind("click", function(){
			var nIndex = $banner_dots.index(this); // 클릭한 메뉴의 인덱스 값을
			showBannerAt(nIndex); // 인자로 전달
		});
		var $banner_slider = $("div.banner_slider");
		$banner_slider.bind("mouseenter",function(){
			stopAutoPlay();
		})
		$banner_slider.bind("mouseleave",function(){
			startAutoPlay();
		})
		$($banner_dots).each(function(i) {
			$(this).addClass("item-" + (i+1));
		});

	}
	function prevBanner (){
		var nIndex = nCurrentBannerIndex-1; //이전배너는 현재 배너의 인덱스 값에 - 1 한다.
		if(nIndex<0) {//이전 배너가 없는 경우
			nIndex = nBannerLength-1; //마지막 배너의 인덱스 값으로 설정한다. (배너의 갯수 -1 = 인덱스 값)
		}
		showBannerAt(nIndex); //함수 인덱스 값 연결

	}
	function nextBanner (){
		var nIndex = nCurrentBannerIndex+1;//현재 배너의 인덱스 값에 + 1 한다.
		if(nIndex>=nBannerLength) {// 마지막 배너 인경우
			nIndex = 0; // 첫번째 배너의 인덱스값으로 초기화 한다.
		}
		showBannerAt(nIndex);
	}
	function showBannerAt (nIndex){
		if(nIndex != this.nCurrentBannerIndex){
			var nPosition = -BANNER_WIDTH*nIndex;//css left 값은 마이너스(배너의 가로길이 * 3)
			showBannerDotAt(nIndex); //함수 인덱스값 연결
			$banner_total.stop(); // 다른 액션(next 버튼)이 있을경우 즉시 멈춘다.
			$banner_total.animate({
				left:nPosition
			},
				SHOW_DURATION,
				"easeOutQuint"
			);
			nCurrentBannerIndex = nIndex; //현재 보이는 배너의 인덱스값 업데이트
		}
	}
	function showBannerDotAt(nIndex){
		$banner_dots.eq(nCurrentBannerIndex).removeClass("select"); //현재의 메뉴 번호에서 클래스 삭제
		$banner_dots.eq(nIndex).addClass("select"); //다음에 보여질 메뉴 번호에 클래스 추가
	}
	function startAutoPlay(){
		if(autoTimerID!=0){
			clearInterval(autoTimerID);
		}
		autoTimerID = setInterval(function(){ //setInterval 지정한 시간 간격으로 호출
			nextBanner(); //다음배너로 이동
			},AUTO_PLAY_TIME //변수 참조, 선언한 시간 간격으로 동작
		)
	}
	function stopAutoPlay(){
		if(autoTimerID!=0){
			clearInterval(autoTimerID); //clearInterval : setInterval 동작을 멈춘다
		}
		autoTimerID = 0;
	}
}
//아코디언 메뉴
function accordionMenu() {
	var menu = $('.accordion_menu a');
	var target = $('.accordion_menu img');
	$(menu).bind('click',function() {
		if($(this).hasClass("on")) {
			//alert('test');
			$(this).next().removeClass('show');
			$(this).removeClass('on');
		}
		else {
			$(this).parent().siblings().find('> img').removeClass('show');
			$(this).next().addClass('show');
			$(this).parent().siblings().find('> a').removeClass('on');
			$(this).addClass('on');
		}
		return false;
	});
}
function accordionMenuW() {
	var blockView = $('.accordion_menu_w > div');
	var minWidth = 70;
	var maxWidth = 200;
	$(blockView).bind('click',function() {
		if($(this).hasClass("on")) {

		}
		else {

			$(blockView).animate({width: minWidth+"px"}, { queue:false, duration:400 });
			$(this).animate({width: maxWidth+"px"}, { queue:false, duration:400});
		}
		return false;
	});
}
// 파일첨부 꾸미기
function fileAttach() {
	$(document).on('change', '.file-upload .file', function() {
		var i = $(this).val();
		$(this).next().find('.text').val(i);
	});
	$('.file-upload .add').bind('click', function () {
	    var uploadBoxCount = $('#uploadBox').find('.file-upload').length;
	    if (uploadBoxCount >= 5) {
	        alert("업로드는 최대 5개만 지원합니다");
	        return;
	    }
	    var i=$("<div class='file-upload'><input class='file' title='찾아보기' type='file'><div class='upload-btn'><input class='text' title='피일 첨부하기' readonly='readonly' type='text'> <button type='button' class='search' title='찾아보기'><em>찾아보기</em></button> <button type='button' class='del-attach'><em>+ 삭제</em></button></div></div>");
	    $('#uploadBox:last').append(i);
    });
	$(document).on("click",".del-attach",function(){
		$(this).closest('.file-upload').remove();
    });
}
// 라디오버튼 & 체크박스
function styleForm() {
	var $input = $('input.style-form[type=radio], input.style-form[type=checkbox]');
	$input.each(function(){
		var $target = $("label[for="+$(this).attr("id")+"]");
		if($(this).prop("checked")) {
			$target.removeClass("off").addClass("on");
		} else {
			$target.removeClass("on").addClass("off");
		}
	});
	$(document).on('click', 'input.style-form[type=radio]', function(e){
		$(this).parents('form:first').find("input[name='"+$(this).prop("name")+"']").each(function(){
			var $target = $("label[for="+$(this).attr("id")+"]");
			if($(this).prop("checked")) {
				$target.removeClass("off").addClass("on");
			} else {
				$target.removeClass("on").addClass("off");
			}
		});
	});
	$(document).on('click', 'input.style-form[type=checkbox]', function(e){
		var $target = $("label[for="+$(this).attr("id")+"]");
		if($(this).prop("checked")) {
			$target.removeClass("off").addClass("on");
		} else {
			$target.removeClass("on").addClass("off");
		}
	});
};
//센터 레이어
function centerLayer(){
	var $layerOpen = $(".layer-open");
	var layerContainer = $(".layer-container");
	var layerBox = $(".layer-box");
	var body = $("body");
	var dim = $(".dim");
	$($layerOpen).each(function() {
		var currentTab = $(this).attr('href');
		var top = ($(window).height() - $(currentTab).find('.layer-box').outerHeight()) / 2;
		var left = ($(window).width() - $(currentTab).find('.layer-box').outerWidth()) / 2;
		if ($(currentTab).hasClass("show")) {
			$(currentTab).find('.layer-box').css({
				position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'
			});
		}
	});
	$('html').click(function(e) {
		$($layerOpen).each(function() {
			var currentTab = $(this).attr('href');
			if($(e.target).closest('.layer-box').length === 0) {
				if ($(currentTab).hasClass("show")) {
					layerContainer.removeClass("show");
					body.removeClass("lock-scroll");
					dim.removeClass("show");
					$(currentTab).find('.layer-box').css({
						left:'-9999px'
					});
				}
			}
		});
	});
	$(document).on('click', '.layer-open', function(){
		var currentTab = $(this).attr('href');
		$(currentTab).addClass("show");
		body.addClass("lock-scroll");
		dim.addClass("show");
		var top = ($(window).height() - $(currentTab).find('.layer-box').outerHeight()) / 2;
		var left = ($(window).width() - $(currentTab).find('.layer-box').outerWidth()) / 2;
		$(currentTab).find('.layer-box').css({
			position:'absolute', margin:0, top: (top > 0 ? top : 0)+'px', left: (left > 0 ? left : 0)+'px'
		});
		return false;
	});
	$(document).on('click', '.layer-close', function(){
		$(this).closest('.layer-box').css({
			left:'-9999px'
		});
		layerContainer.removeClass("show");
		body.removeClass("lock-scroll");
		dim.removeClass("show");
	});
}
//인풋박스 placeholder
function placeholder(){
	$('body').on('focus','input.text',function(){
		$('label[for='+$(this).attr('id')+']').addClass('hide');
	});
	$('body').on('blur','input.text',function(){
		var $this = $(this);
		if($this.val() === '') {
			$('label[for='+$this.attr('id')+']').removeClass('hide');
		} else {
			$('label[for='+$this.attr('id')+']').addClass('hide');
		}
	});
	$('input.text').trigger('blur');
}
//스코롤 탑 버튼
function scrollWheelTop(){
	var containerOffset = $( '.content' ).offset();
	var footerOffset = $( 'footer' );
	var btnScrollTop = $( '.scroll-top' )
	var moveScrollTop = $( '.scroll-top a' )
	function set(){
		if ($(window).scrollTop() > containerOffset.top ) {
	        $(btnScrollTop).fadeIn();
	    } else {
	        $(btnScrollTop).fadeOut();
	    }
		if($(window).scrollTop() + $(window).height() < $(document).height() - $(footerOffset).height()) {
		        $(btnScrollTop).css({bottom: '7px', position: 'fixed'});
		}
		if($(window).scrollTop() + $(window).height() > $(document).height() - $(footerOffset).height()) {
		        $(btnScrollTop).css({bottom: '80px', position: 'relative'});
		}
		$(moveScrollTop).on('click', function(){
	    	$('html, body').stop().animate({scrollTop: $('body').offset().top}, 1000);
	    	return false;
	    });
	}
	$(window).scroll(function() {
		set();
	});
}
//고정식 메뉴
function moveTopMenu(){
		var menuOffset = $( 'header > nav > ul' ).offset();
		var target = $( 'header' );
	function set(){
		if ($(window).scrollTop() > menuOffset.top ) {
		    $(target).addClass('move');
		} else {
			$(target).removeClass('move');
		}
	}
	$(window).scroll(function() {
		set();
	});
}
//progressbar
function progressbar(){
	$(window).scroll(function () {
		var s = $(window).scrollTop(),
		d = $(document).height(),
		c = $(window).height(),
		scrollPercent = (s / (d-c)) * 100,
		position = scrollPercent,
		number = parseInt (position) + '%';
		$(".progressbar").css({width: number});

	});
}
$(document).ready(function() {
	h1test(); /* h1 함수 실행 */
	bannerSlider();
	accordionMenu();
	accordionMenuW();
	fileAttach();
	styleForm();
	centerLayer();
	placeholder();
	htmlAjax();
	xmlAjax();
	jsonAjax();
	scrollWheelTop();
	moveTopMenu();
	progressbar();
});
$(window).resize(function() {
	centerLayer();
});



$(window).load(function(){
});