jQuery(document).ready(function($) {
	
  goToTop();
  addClassOnScroll();
  cssAnimations();
  mobileMenu();
  slickSlidersOptions();
  showContactForm();

  $('html').removeClass('no-js');

  function goToTop() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  }

	function setHeight() {
    windowHeight = $(window).innerHeight();
    $('.home-banner, .slide-wrapper').css('min-height', windowHeight);
  };

  setHeight();

  $(window).resize(function() {
    setHeight();
  });

  function addClassOnScroll() {
    if($('body').hasClass('home')) {
      $('.site-header').addClass('navbar-fixed-top');
    } else {

    }
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();

        if(window.innerWidth > 320) {

          if (scroll >= 100) {
            $(".site-header").addClass("on-scroll-hide");
          } else {
            $(".site-header").removeClass("on-scroll-hide");
          }

          if(scroll >= 700) {
            $(".site-header").addClass("on-scroll-show");
          } else {
            $(".site-header").removeClass("on-scroll-show");
          }

        }

    });
  };

  function cssAnimations() {
    jQuery('.slidefadeInDown').addClass("visible-1").viewportChecker({
      classToAdd: 'visible animated fadeInDown',
      offset: 200
    });

    jQuery('.slidefadeInUp').addClass("visible-1").viewportChecker({
      classToAdd: 'visible animated slideInUp',
      offset: 200
    });

    jQuery('.slidebounceIn').addClass('visible-0').viewportChecker({
      classToAdd: 'visible animation bounceInDown',
      offset: 100
    });

    jQuery('.slidesFadeIn').addClass("visible-0").viewportChecker({
      classToAdd: 'visible animated fadeIn',
      offset: 100
    });
  }

  function mobileMenu() {
    $('#hide-menu').click( function() {
      $('#mobile-menu').removeClass('open');
      $('#mobile-menu nav ul').removeClass('visible animated fadeInDown');
    });

    $('#open-menu').click( function() {
      $('#mobile-menu').addClass('open');
      $('#mobile-menu nav ul').addClass('visible animated fadeInDown');
    });

  }

  function slickSlidersOptions() {

    $(".slide-wrapper").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
      fade: true,
    });

  }

  function showContactForm() {
    $('#show-form').click( function() {
      $('.onlinecrew-form').removeClass('hidden-xs-up');
    });


    // $('.form-control').focus( function() {
    //   $(this).prev('label').addClass('hide-label');
    //   console.log('test');
    // });


    $('.form-control').on('focus', function() {
      $(this).prev('label').addClass('hide-label');
      $(this).addClass('focused');

    }).on('focusout', function() {
      if( this.value=='') {
        $(this).prev('label').removeClass('hide-label');
        $(this).removeClass('focused');
      }
    });




  }


});