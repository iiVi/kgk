/*   
 * Template: Amity - Responsive Bootstrap Template
 * Version: 1.0
 * Author: Nathaniel Deal LLC
 * Website: http://nathanieldeal.com
*/

$( document ).ready(function() {
	
	// Stick Header Top Top
	var sticky = new Waypoint.Sticky({ //jshint ignore:line 
	  element: $('.navbar-wrapper')[0]
	}); 
		
	// Shrink Header
	$('header').waypoint(function(direction) {
		$(this.element).toggleClass('shrink-header', direction === 'down');
	}, { 
		offset: -55
	});		
		
	// Initialize Main Carousel
	$('.carousel').carousel({
		interval: 15000
	});
	
 	
 	// Parallax Background Effect
 	$.stellar({
		horizontalScrolling: false
	});
	
	
	// Toggle Animation
	$('.toggle label').on('click', function(){
    var answer = $(this).next('.answer');
    
    if(!$(answer).is(":visible")) {
      $(this).parent().addClass('active');
    } else {
      $(this).parent().removeClass('active');
    }
    $(answer).slideToggle(300);
	});
	  
						
	// Initialize PrettyPhoto for gallery
	$("a[rel^='prettyPhoto']").prettyPhoto({
		slideshow:5000, 
		autoplay_slideshow:false,
		show_title: false,
		theme: 'light_square',
		social_tools: false,
		overlay_gallery: false 
	});
	
	
	// Expand Portfolio Button
	$('.toggle-portfolio').click(function(e) {
		e.preventDefault();
		$("a[rel^='prettyPhoto']:first").click();
	});
	
	
	// Animate Progress Bars
	$('.line-graph').waypoint(function() {
		$('.graph-item .animated-bar').each(function(){
			var setWidth = $(this).attr('aria-valuenow');
			$(this).width(setWidth + '%');
		});
	}, { 
		offset: 400 
	});
	
	
	// Animation Page
	$(".animated.repeat").on('click', function() {
		$(this).addClass("clicked");
	});
	
	
	// Scroll To Top
	$('footer').waypoint(function() {
		$('.scroll-to-top').toggleClass('visible');
	}, { 
		offset: 500
	});
	
	$('.scroll-to-top').on('click', function () {
    $("html, body").animate({
        scrollTop: 0
    }, 500);
    return false;
  });
    
    
  // Theme Style Switcher	
  $('a.style-toggle').on('click', function(e){
		$('#style-switcher').toggleClass('open');  
		e.preventDefault();
  });
    
	$("#style-switcher li a").click(function(e) { 
		$('link.switch-style').attr('href',$(this).attr('rel'));
		e.preventDefault();
	});
	
	$('#style-switcher .options li a').on('click', function(e){
		e.preventDefault();
		$(this).parent().siblings().find('a').removeClass('active');
		$(this).addClass('active');  
		
		var bgStyle = $(this).data('background-color');
		
		if (bgStyle === 'navbar-dark') {
			$('.navbar-wrapper').addClass('dark');
		} 
		else if (bgStyle === 'navbar-light') {
			$('.navbar-wrapper').removeClass('dark');	
		}
		else if (bgStyle === 'footer-light') {
			$('.footer-top').addClass('light');
		} 
		else {
			$('.footer-top').removeClass('light');	
		}			
			

    });    
    
  // Intialize Mix It Up			
	$('#portfolio-container').mixItUp();
	
	$('.portfolio .controls a').on('click', function(e){
		e.preventDefault();
	});

});