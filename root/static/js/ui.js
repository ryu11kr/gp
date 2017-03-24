var i = ('test');
console.log(i);
var i = ('ok');
console.log(i);
/* h1 태그 컨트롤 */
function h1test(){
	$('h1').css({'font-size' : 50});
}
$(document).ready(function() {
	h1test(); /* h1 함수 실행 */
});