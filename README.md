# gp

인스톨 순서

1. sublime text3
	> https://www.sublimetext.com/3

2. git
	> https://git-scm.com/downloads  
		(설치시 아래를 확인하고 체크해준다.)  
		check > Use Git form the Windows Command Prompt   
		check > Checkout Windows-style, commit Unix-style line endings   
		
3. node js
	> https://nodejs.org/ko/

4. ruby
	> https://rubyinstaller.org/  
		(설치시 아래를 확인하고 체크해준다.)  
		- check : Add Ruby executable to your PATH 

5. chrome browser
	> https://www.google.co.kr/chrome/browser/desktop/index.html
  
  
셋팅 순서

1. https://github.com/login
	> 로그인
2. https://github.com/ryu11kr/gp
	> 이동
3. 내컴퓨터 원하는 곳에 폴더 생성
4. 생성한 폴더안에서 마우스 오른쪽 클릭후 git bash 실행
5. 아래 명령어를 입력해주면 gp 디렉토리가 설치된다.
	> $ git clone https://github.com/ryu11kr/gp.git  
6. 다운받은 gp 폴더 안에서 git bash 를 실행하고 아래 명령어를 입력한다.  
	> $npm install
7. 루비 사스 콤파스모듈을 설치한다. (scss 로 작성한 웹문서인관계로 scss를 css로 변환해주는 compass모듈을 설치해야 한다.)  
	> $ gem install compass  
8. jquery라이브러리등 프레임웍 패키지 설치 및 관리를 위한 bower 설치
	> $ npm install -g bower --save
9. bower 에서 지원하는 설치 가능한 패키지들중 jquery 설치해보기
	> $ bower install jquery#1.9.1
10. bower 로 설치한 jquery 패키지중 불필요한 파일 삭제를 위한 패키지 설치
	> $ npm i -d preen --save
11. 아래 명령어를 입력하면 웹서버를 구동하고 크롬브라우저에서 gp/root 디렉토리 안의 index.html 이 열린다.
	> $ gulp  
12. 실행 안될경우 gulp 를 글로벌 설치한다.
	> $ npm install -g --save gulp  
  
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
10. $ gulp fileinclude  
	> html 파일에서 include 사용을 돕는다. include 용 html코드를 파일로 분리한다.  
		(test.html 에서 인클루드 코드를 작성하면 /result/test.html 에서 완성된다.)  
11. $ gulp preen  
	> 설치한 jquery 패키지에서 jquery.min.js 를 제외한 파일 및 폴더들을 삭제하기  
		(환경설정은 bower.json 에서 관리한다.)  		
12. $ gulp bower:copy
	> bower 패키지 파일을 프로젝트에서 사용하기 위해 카피가 필요할때 사용한다.  
		(config.js 에서 셋팅 가능하고, 기타 단순히 디렉토리 카피용도로도 사용 가능하다.)


# 주의 사항
 다운받은 @gitignore 파일은 반드시 파일명을 .gitignore 로 바꾼다.  
 .gitignore 파일을 포함한 .gitignore 파일안에 작성된 디렉토리명이나 파일명은 github 에 업로드 되지 않는다.  