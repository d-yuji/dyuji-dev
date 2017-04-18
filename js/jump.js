$(function(){
	//back -to topを消す
	$('#back-to-top').hide();

	//スクロールが十分されたら表示
	$(window).scroll(function() {
		// $('#pos').text(
		// 	 $(this).scrollTop()
		// );
		if( $(this).scrollTop() > 640){
			$('#back-to-top').fadeIn();
		}else{
			$('#back-to-top').fadeOut();
		}
	});

	$('#back-to-top a').click(function() {
		$('body').animate({
			scrollTop:0
		}, 500);
		return false;
	});
});