'use strict';

// 각종 플러그인 로드
var 
	gulp        = require('gulp'), //걸프 호출
	watch       = require('gulp-watch'), //걸프 관찰 호출
	concat      = require('gulp-concat'), //다수의 js 파일을 하나의 파일로 결합
	uglify      = require('gulp-uglify'), // js 파일의 코드를 압축
	concatcss   = require('gulp-concat-css'), //다수의 css 파일을 하나의 파일로 결합
	uglifycss   = require('gulp-uglifycss'), // css 파일의 코드를 압축
	rename      = require('gulp-rename'), //파일명을 새롭게 정의하는 플러그인 구동
	gulpif      = require('gulp-if'), //조건이 true 나 false인 경우 동작
	sass        = require('gulp-sass'), //걸프 사스 호출
	compass     = require('gulp-compass'), //걸프 사스 프레임워크 컴파스 호출
	plumber     = require('gulp-plumber'), //오류있어도 무시하고 진행
	spritesmith = require('gulp.spritesmith'), //이미지 스프라이트 자동생성
	fileinclude = require('gulp-file-include'), //html include
	connect     = require('gulp-connect-multi')(), //서버 구동
	
	config      = require('./config')(); // 환경설정 ./config.js 로드

// 모두 실행
gulp.task('default', ['watch',  'connect']);

// 관찰
gulp.task('watch', ['fileinclude'], function(){
	watch(config.scss_set.src, function() { //scss 업무 관찰
		gulp.start('scss'); //scss task 호출
	});
	watch(config.css_set.src, function() { //css 업무 관찰
		gulp.start('css'); //css task 호출
	});
	watch(config.html_set.src, function() { //HTML 템플릿 업무 관찰
		gulp.start('html'); //html task 호출
	});
	watch(config.js_set.src, function() { //js 업무 관찰
		gulp.start('js'); //js task 호출
	});
	watch(config.fileinclude_set.src, function() { //fileinclude 업무 관찰
		gulp.start('fileinclude'); //fileinclude task 호출
	});
});

// 웹 서버
gulp.task('connect', connect.server( config.server_set )); // config.js 의 server 설정 호출

// SCSS 변경 내용, 자동 갱신(업데이트)
gulp.task('scss', function() {
	gulp
	.src(config.scss_set.src) // scss 타겟  설정
	.pipe( plumber({ // 오류있을경우 로그 기록 
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(compass({ // 사스 프레임워크 컴파스 호출
		css: config.scss_set.target, // scss 에서 css 로 변환될 위치 지정
		sass: config.scss_set.compasssrc, //컴파스 동작할 scss 경로 지정
		style: config.scss_set.style, // css 아웃풋 설정
		comments: config.scss_set.comments // 주석 표시여부 설정
	}))
	.pipe( gulp.dest(config.scss_set.target) ) //css로 변환된 코드를 보낼 css 디렉토리 지정
	.pipe(connect.reload())
});
// CSS 변경 내용, 자동 갱신(업데이트)
gulp.task('css', function() {
	gulp
		.src(config.css_set.src) // css 타겟 설정
		.pipe(connect.reload()) // 타겟 css 자동 리로드
});
// HTML 변경 내용, 자동 갱신(업데이트)
gulp.task('html', function() {
	gulp
		.src(config.html_set.src) // html 타겟 설정
		.pipe(connect.reload()) // 타겟 html 자동 리로드
});
// js 변경 내용, 자동 갱신(업데이트)
gulp.task('js', function() {
	gulp
		.src(config.js_set.src) // js 타겟 설정
		.pipe(connect.reload()) // 타겟 js 자동 리로드
		
});
// 이미지 스프라이트
gulp.task('sprite', function(){
    var spritedata = gulp.src(config.sprite_set.src)	// 스프라이트 시킬 타겟 이미지 설정
    .pipe(spritesmith({
        imgName: config.sprite_set.imgName,	// 완성된 스프라이트 이미지의 파일명
        padding: config.sprite_set.padding,	// 이미지들간의 간격 설정
        cssName: config.sprite_set.cssName, // 클래스파일명
        algorithm: config.sprite_set.algorithm // 이미지 배치 모양
    }))
    spritedata.img.pipe(gulp.dest(config.sprite_set.save_img)); // 이미지 저장 위치
    spritedata.css.pipe(gulp.dest(config.sprite_set.save_css)); // 클래스 저장 위치
});
// min.css 생성
gulp.task('cssmin', function() {
	gulp
		.src(config.cssmin_set.src) // css 타겟 설정
		.pipe(connect.reload()) // 타겟 css 자동 리로드
		.pipe(gulpif(config.cssmin_set.rename, rename({suffix:'.min'}))) //압축된 css 파일명에 .min 붙임
		.pipe(gulp.dest(config.cssmin_set.cssmin_src)); //압축된 css 파일이 생성될 위치 지정
});
// min.js 생성
gulp.task('jsmin', function() {
	gulp
		.src(config.jsmin_set.src) // js 타겟 설정
		.pipe(gulpif(config.jsmin_set.uglify, uglify())) //js 코드 압축
		.pipe(gulpif(config.jsmin_set.rename, rename({suffix:'.min'}))) //압축된 js 파일명에 .min 붙임
		.pipe(gulp.dest(config.jsmin_set.jsmin_src)); //압축된 js 파일이 생성될 위치 지정
});
// 여러 css 파일들을 하나의 css 파일로 결합
gulp.task('compresscss', function() {
	gulp
		.src(config.compress_css_set.src)
		.pipe(connect.reload()) // 타겟 css 자동 리로드
		.pipe(gulpif(config.compress_css_set.concat, concatcss(config.compress_css_set.compress_file))) //config.js 에서 파일명 받기		
		.pipe(gulpif(config.compress_css_set.uglify, uglifycss())) // css 코드 압축
		.pipe(gulpif(config.rename, gulp.dest(config.compress_css_set.compress_min_src))) // //config.js 에서 하나로 합쳐진 파일이 저장될 위치 받기
		.pipe(gulp.dest(config.compress_css_set.compress_min_src)); // config.js 에서 셋팅한 폴더와 파일 생성
});
// bower 패키지 복사
gulp.task('bower:copy', function() {
	gulp
		.src(config.bower_set.jquery.src) // 복사할 디렉토리 위치
		.pipe(gulp.dest(config.bower_set.jquery.copy)); // 붙여넣기 할 디렉토리 위치
});
// html include
gulp.task('fileinclude', function() {
    gulp
    	.src(config.fileinclude_set.src) //include 코드가 들어간 html 위치 지정
		.pipe(connect.reload()) // 코드 변경시 실시간 반영
	    .pipe(fileinclude({
	        prefix: config.fileinclude_set.prefix, //include 코드 스타일 정의
	        basepath: config.fileinclude_set.basepath //절대경로를 위한 path 설정
	    }))
    	.pipe(gulp.dest(config.fileinclude_set.dest)); //include 한 코드가 html 로 변환되며 저장될 위치
});