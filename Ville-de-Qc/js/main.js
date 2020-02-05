$(document).ready(function() {
	var stickyNavTop = $('#navbar').offset().top;

	var stickyNav = function(){
		var scrollTop = $(window).scrollTop();

		if(scrollTop >= stickyNavTop && $(window).width() >= 792) {
			$('#navbar').addClass('sticky');
			$('#showcase').css('margin-top', '131.55px');
		} else {
			$('#navbar-contact').css('display', 'block');
			$('#navbar').removeClass('sticky');
			$('#showcase').css('margin-top', '0px');
		}
	};

	stickyNav();

	$(window).scroll(function() {
		stickyNav();
	});
});

$(window).on('scroll', function() {
	if ($(window).scrollTop() > 50) {
		$('.menu-wrap').addClass('fading');
	} else {
		$('.menu-wrap').removeClass('fading');
	}
});

/* To fix bug I should start the function only if the width of window is above 808px */

/* see 
https://stackoverflow.com/questions/7715124/do-something-if-screen-width-is-less-than-960-px
*/