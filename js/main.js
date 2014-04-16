$(document).ready(function(){
	var hgt = $(window).height();
	$('.side-nav').css( 'height', hgt+'px' );

	/* FLOAT-INFO ANIMATION*/

	$('ul.item-list li').hover(function(){
		$(this).find('.float-info').stop(true,true).animate({ height: 50 }, 300, 'easeOutExpo');
		$(this).find('a.right').stop(true,true).animate({ top: 0 }, 300, 'easeOutExpo');
	}, function(){
		$(this).find('.float-info').stop(true,true).animate({ height: 0 }, 300, 'easeOutExpo');
		$(this).find('a.right').stop(true,true).animate({ top: -35 }, 300, 'easeOutExpo');
	});




	var winWidth = $(window).width();
	// if( winWidth < )

	// $('#pf-area, #wk-area, #ct-area').css( 'opacity', 0 );
	$('#pf-area, #wk-area, #ct-area').hide();

	/* TOP-AREA ANIMATION */
	var ani = $('#tp-area')
		.animate({ opacity: 1 }, 1000 )
		.addClass('animated bounceInDown');
	$.queue( ani[0], "fx", function(){
		$(this).find('#myhead').addClass('animated flipInY');
		$.dequeue( this );
	});

	/* PF-AREA ANIMATION */
	var pfAni = function(){
		$('#pf-area').show().addClass('animated bounceInRight');
	},	wkAni = function(){
		$('#wk-area').show().addClass('animated bounceInRight');
	}, ctAni = function(){
		$('#ct-area').show().addClass('animated bounceInRight');
	}


	/*  SHOW AREA BY SCROLL */

	$(window).scroll(function(){
		var sc = $(window).scrollTop();

		if( sc > 300 ) 		pfAni();
		if( sc > 1200 ){
			if( $('#wk-area').css('display') == 'none'){
				wkAni();
				 setSlider();
			}
		}
		if( sc > 2000 ) 	ctAni();

		/* BTN ACTIVE CLASS CHANGE */
		if( sc < 300 )  $('#btn1').addClass('active').siblings().removeClass('active');
		if( sc > 299 && sc < 1500){
			$('#btn2').addClass('active').siblings().removeClass('active');
		}
		if( sc > 1499 && sc < 2400){
			$('#btn3').addClass('active').siblings().removeClass('active');
		}
		if( sc > 2399 ){
			$('#btn4').addClass('active').siblings().removeClass('active');
		}
	});


	/* CLICK NAV TO SCROLL TO GIVEN AREA */

	$('nav li').click(function(e){
		e.preventDefault();
		var id = $(this).attr('id'), num = '';

		if( id == 'btn1' ) num = 0;
		if( id == 'btn2' ){
			pfAni(); num = 675;
		}
		if( id == 'btn3' ){
 			pfAni(); wkAni(); num = 2255;
 			setSlider();
		}
		if( id == 'btn4' ){
			pfAni(); wkAni(); ctAni(); num = 2540;
		}

		moveScroll(num);
		$(this).addClass('active').siblings().removeClass('active');
	});


	function moveScroll(num){
		$('html,body').animate({ scrollTop: num }, 'easeOutExpo');
	}
	function setSlider(){
		$('.slider').kerosEasySlider({ direction : 'h', speed: 800  });
	}

});