module.exports = function() {

	var 
		htmlsrc       = 'root', // html 이 있는 디렉토리 경로 변수선언
		csssrc       = 'root', // css 가 있는 디렉토리 경로 변수선언
		scsssrc       = 'root', // scss 가 있는 디렉토리 경로 변수선언
		jssrc       = 'root', // js 가 있는 디렉토리 경로 변수선언
		spritesrc = 'root', // 스프라이트 이미지가 생성될 디렉토리 경로 변수선언

		// html 셋팅
		html = {
			src  : htmlsrc + '/**/*.html' //html 경로 및 대상 파일
		},
		// css 셋팅
		css = {
			src  : csssrc + '/static/css/*.css', //css 경로 및 대상 파일
		},
		// scss 셋팅
		scss = {
			src  : scsssrc + '/static/scss/*.scss', //scss 경로 및 대상 파일
			compasssrc  : scsssrc + '/static/scss/', //compass 가 동작할 scss 경로
			target  : csssrc + '/static/css', //css 로 변환할 위치
			style: 'expanded', // css 아웃풋 설정, nested, expanded, compact, compressed
			comments : false //true = css 의 코드가 어떤 scss 파일의 몇번째 줄에 위치해 있는지 보여줌.
		},
		// js 셋팅
		js = {
			src  : jssrc + '/static/js/*.js', //js 경로 및 대상 파일
			minsrc  : jssrc + '/static/js/min/', //min.js 경로 설정
			concat : true,
			uglify : true,
			rename : true,
		},
		// 웹 서버 설정
		server = {
			root: [htmlsrc], // http://localhost 로 정할 경로
			port: 90, //포트번호/ url = http://localhost:90
			livereload: true, //저장시 자동으로 브라우저 새로고침 할지 설정
			open: {
				browser: 'chrome' //서버 구동시 자동으로 띄울 브라우저 선택 chrome, firefox, iexplore, opera, safari
			}
		},
		// 스프라이트 이미지 셋팅
		sprite = {
			src  : spritesrc + '/static/img/sprite/ico/*.png',
			imgName: 'sp_all.png',	// 완성된 스프라이트 이미지의 파일명
	        padding: 4,	// 이미지들간의 간격 설정
	        cssName: 'sp_all.css', // 클래스파일명
	        save_img: spritesrc + '/static/img/sprite/', // 이미지 저장 위치
	        save_css: spritesrc + '/static/img/sprite/', // css 저장 위치
	        algorithm: 'top-down' // top-down	left-right	diagonal	alt-diagonal	binary-tree
		},
		// min.css 셋팅
		cssmin = {
			src  : csssrc + '/static/css/*.css', //css 경로 및 대상 파일
			cssmin_src  : csssrc + '/static/css/min/', //min.css 경로 설정
			concat : true,
			uglify : true,
			rename : true,
		},
		// min.js 셋팅
		jsmin = {
			src  : jssrc + '/static/js/*.js', //js 경로 및 대상 파일
			jsmin_src  : jssrc + '/static/js/min/', //min.js 경로 설정
			concat : true,
			uglify : true,
			rename : true,
		},
		// 여러 css 파일들을 하나의 css 파일로 셋팅
		compress_css = {
			src  : csssrc + '/static/css/{style.css,etc.css}', // 하나의 css파일로 만들 css 경로 및 파일 설정 (파일명으로 우선 저장순위 결정)
			//src  : csssrc + '/static/css/*.css', // css 파일명 알파벳 순으로 저장됨
			compress_min_src  : csssrc + '/static/css/min/', //compress.css 가 저장될 경로 설정
			compress_file : "compress.css", //파일명 설정
			concat : true,
			uglify : true,
			rename : true,
		};

	return {
		html_set : html,
		css_set : css,
		scss_set : scss,
		js_set : js,
		server_set : server,
		sprite_set : sprite,
		cssmin_set : cssmin,
		jsmin_set : jsmin,
		compress_css_set : compress_css
	};
};