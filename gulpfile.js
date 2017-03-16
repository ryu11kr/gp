'use strict';

// 각종 플러그인 로드
var 

	gulp     = require('gulp'), //걸프 호출
	watch    = require('gulp-watch'), //걸프 관찰 호출
	concat = require('gulp-concat'), //다수의 js 파일을 하나의 파일로 결합
	uglify = require('gulp-uglify'), // js 파일의 코드를 압축
	concatcss = require('gulp-concat-css'), //다수의 css 파일을 하나의 파일로 결합
	uglifycss = require('gulp-uglifycss'), // css 파일의 코드를 압축
	rename = require('gulp-rename'), //파일명을 새롭게 정의하는 플러그인 구동
	gulpif = require('gulp-if'), //조건이 true 나 false인 경우 동작
	sass     = require('gulp-sass'), //걸프 사스 호출
	compass  = require('gulp-compass'), //걸프 사스 프레임워크 컴파스 호출
	plumber  = require('gulp-plumber'), //오류있어도 무시하고 진행
	spritesmith = require('gulp.spritesmith'),
	connect  = require('gulp-connect-multi')(), //서버 구동
	
	config   = require('./config')(); // 환경설정 ./config.js 로드

// 모두 실행
gulp.task('default', [ 'connect',  'watch']);

// 관찰
gulp.task('watch', function(){
	watch(config.html_set.src, function() { //HTML 템플릿 업무 관찰
		gulp.start('html'); //html task 호출
	});
	watch(config.scss_set.src, function() { //scss 업무 관찰
		gulp.start('scss'); //scss task 호출
	});
	watch(config.css_set.src, function() { //css 업무 관찰
		gulp.start('css'); //css task 호출
	});
	watch(config.compress_css_set.src, function() { //compresscss 업무 관찰
		gulp.start('compresscss'); //compresscss task 호출
	});
	watch(config.js_set.src, function() { //css 업무 관찰
		gulp.start('js'); //css task 호출
	});
});

// 웹 서버
gulp.task('connect', connect.server( config.server_set )); // config.js 의 server 설정 호출

// HTML 변경 내용, 자동 갱신(업데이트)
gulp.task('html', function() {
	gulp
		.src(config.html_set.src) // html 타겟 설정
		.pipe(connect.reload()) // 타겟 html 자동 리로드
});
// CSS 변경 내용, 자동 갱신(업데이트)
gulp.task('css', function() {
	gulp
		.src(config.css_set.src) // css 타겟 설정
		.pipe(connect.reload()) // 타겟 css 자동 리로드
		//min.css 만들경우
		.pipe(gulpif(config.css_set.uglify, uglifycss())) //css 코드 압축
		.pipe(gulpif(config.css_set.rename, rename({suffix:'.min'}))) //압축된 css 파일명에 .min 붙임
		.pipe(gulp.dest(config.css_set.minsrc)); //압축된 css 파일이 생성될 위치 지정
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
// js 변경 내용, 자동 갱신(업데이트)
gulp.task('js', function() {
	gulp
		.src(config.js_set.src) // js 타겟 설정
		.pipe(connect.reload()) // 타겟 js 자동 리로드
		//min.js 만들경우
		.pipe(gulpif(config.js_set.uglify, uglify()))
		.pipe(gulpif(config.js_set.rename, rename({suffix:'.min'})))
		.pipe(gulp.dest(config.js_set.minsrc));
});
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
		style: 'expanded' // css 아웃풋 설정, nested, expanded, compact, compressed
	}))
	.pipe( gulp.dest(config.scss_set.target) ); //css로 변환된 코드를 보낼 css 디렉토리 지정
});

// 이미지 스프라이트
gulp.task('sprite', function(){
    var spritedata = gulp.src(config.spriteset.src)	// 스프라이트 시킬 타겟 이미지 설정
    .pipe(spritesmith({
        imgName: config.spriteset.imgName,	// 완성된 스프라이트 이미지의 파일명
        padding: config.spriteset.padding,	// 이미지들간의 간격 설정
        cssName: config.spriteset.cssName, // 클래스파일명
        algorithm: config.spriteset.algorithm // 이미지 배치 모양
    }))
    spritedata.img.pipe(gulp.dest(config.spriteset.save_img)); // 이미지 저장 위치
    spritedata.css.pipe(gulp.dest(config.spriteset.save_css)); // 클래스 저장 위치
});

