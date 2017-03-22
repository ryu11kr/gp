# gp

인스톨 순서

1. sublime text3
	> https://www.sublimetext.com/3

2. git
	> https://git-scm.com/downloads  
		Select> Use Git form the Windows Command Prompt 
		Select> Checkout Windows-style, commit Unix-style line endings 
		Select> Use Windows' default console window
		
3. node js
	> https://nodejs.org/ko/

4. ruby
	> https://rubyinstaller.org/
		- check : Add Ruby executable to your PATH 

5. chrome browser
	> https://www.google.co.kr/chrome/browser/desktop/index.html


셋팅 순서

1. https://github.com/login
	> 로그인
2. https://github.com/ryu11kr/gp
	> 이동
3. 원하는 곳에 폴더 생성
4. 생성한 폴더에서 마우스 오른쪽 클릭후 git bash 실행
5. $ git clone https://github.com/ryu11kr/gp.git
6. $ npm install
7. $ gem install compass
8. $ gulp (웹서버가 구동되며 크롬브라우저에서 index.html 이 열린다.)


기능 소개

1. $ gulp 실행시 자동으로 미리 설정한 경로의 index.html 이 크롬 브라우저에서 열린다.
2. html 파일 수정후 저장시 브라우저가 자동으로 새로고침 된다.
3. css 수정후 저장시 브라우저가 자동으로 새로고침 된다.
4. scss 수정후 저장시 css 문법으로 고쳐져서 css 파일에 저장된다.
5. scss 수정후 저장시 브라우저가 자동으로 새로고침 된다.
6. $ gulp cssmin
	> css 파일의 코드를 압축하여 새 css 파일을 생성한다. (sample.css > sample.min.css)
7. $ gulp jsmin
	> js 파일의 코드를 압축하여 새 js 파일을 생성한다. (sample.js > sample.min.js)
8. $ gulp compresscss
	> 여러 css 파일의 코드를 압축하여 새 css 파일 하나를 생성한다.
		(reset.css + main.css + sub.css = compress.css)
9. $ gulp sprite
	> 스프라이트된 이미지와 백그라운드 이미지 좌표가 내장된 css 파일을 생성한다.
		(config.js 에서 스프라이트시킬 이미지 경로와 각종 셋팅을 하면 된다.)
10. $gulp bower:copy
	> bower 패키지 파일을 프로젝트에서 사용하기 위해 카피가 필요할때 사용한다.
		(config.js 에서 셋팅 가능하고, 기타 단순히 디렉토리 카피용도로도 사용 가능하다.)
11. $gulp fileinclude
	> html 파일에서 include 사용을 돕는다. include 용 html코드를 파일로 분리한다.
		(test.html 에서 인클루드 코드를 작성하면 /result/test.html 에서 완성된다.)