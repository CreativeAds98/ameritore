(function ($) {
    "use strict";


    var windows = $(window);
    
    $(window).on('load', function () {
		dataBackgroundImage();
	});

    /*--------------------------------
    =         Wow Active            =
    ----------------------------------*/

    new WOW().init();


    /*================================
    =         Preloader active          =
    // ===============================*/

    jQuery(window).on('load', function(){
		setTimeout(function(){
        jQuery('.la-image-loading').addClass('loaded');
        }, 50);
	});


    /*----------------------------------------*/
	/*  Toolbar Button
    /*----------------------------------------*/
	var $overlay = $('.global-overlay');
	$('.toolbar-btn').on('click', function (e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		var target = $this.attr('href');
		var prevTarget = $this.parent().siblings().children('.toolbar-btn').attr('href');
		$(target).toggleClass('open');
		$(prevTarget).removeClass('open');
		$($overlay).addClass('overlay-open');
	});

    /*----------------------------------------*/
	/*  Close Button Actions
    /*----------------------------------------*/
	$('.btn-close, .btn-close-2').on('click', function (e) {
		var dom = $('.main-wrapper').children();
		e.preventDefault();
		var $this = $(this);
		$this.parents('.open').removeClass('open');
		dom.find('.global-overlay').removeClass('overlay-open');
	});

	/*----------------------------------------*/
	/*  Offcanvas
    /*----------------------------------------*/
	/*Variables*/
	var $offcanvasNav = $('.offcanvas-menu, .offcanvas-minicart_menu, .offcanvas-search_menu, .mobile-menu'),
		$offcanvasNavWrap = $(
			'.offcanvas-menu_wrapper, .offcanvas-minicart_wrapper, .offcanvas-search_wrapper, .mobile-menu_wrapper'
		),
		$offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu'),
		$menuToggle = $('.menu-btn'),
		$menuClose = $('.btn-close');

	/*Close Off Canvas Sub Menu*/
	$offcanvasNavSubMenu.slideUp();

	/*Category Sub Menu Toggle*/
	$offcanvasNav.on('click', 'li a, li .menu-expand', function (e) {
		var $this = $(this);
		if (
			$this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
			($this.attr('href') === '#' || $this.attr('href') === '' || $this.hasClass('menu-expand'))
		) {
			e.preventDefault();
			if ($this.siblings('ul:visible').length) {
				$this.siblings('ul').slideUp('slow');
			} else {
				$this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
				$this.closest('li').siblings('li').removeClass('menu-open');
				$this.siblings('ul').slideDown('slow');
				$this.parent().siblings().children('ul').slideUp();
			}
		}
		if ($this.is('a') || $this.is('span') || $this.attr('class').match(/\b(menu-expand)\b/)) {
			$this.parent().toggleClass('menu-open');
		} else if ($this.is('li') && $this.attr('class').match(/\b('menu-item-has-children')\b/)) {
			$this.toggleClass('menu-open');
		}
	});


	$('.btn-close').on('click', function (e) {
		e.preventDefault();
		$('.mobile-menu .sub-menu').slideUp();
		$('.mobile-menu .menu-item-has-children').removeClass('menu-open');
	})


    /*----------------------------------------*/
	/*  Offcanvas Inner Nav
    /*----------------------------------------*/
	$('.offcanvas-inner_nav li.has-sub > a, .frequently-item li.has-sub a, .pd-tab_item li.has-sub a').on('click', function () {
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		} else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});

    

    /*--------------------------------
    	Hzmbargur Option
    ----------------------------------*/
/*
    function hamburgerOption(params) {
        $('.hamburger-trigger').on('click', function(e) {
            e.preventDefault(),
                $('.hamburger-area').addClass('is-visible');
            $(this).addClass('open');

            $(".menu-overlay").addClass('active');

        })
        $('.btn-close-search').on('click', function(e) {
            e.preventDefault(),
                $(this).parent('.hamburger-area').removeClass('is-visible');
            $(".menu-overlay").removeClass('active');
            $('.hamburger-trigger').removeClass('open');
            $('.sub-menu').slideUp('100');
            $('.lavel--3').slideUp('100');
            $('.responsive-manu > li > a').removeClass('is-visiable')
            $('.has-label--3 a').removeClass('is-visiable')
        })
    }
    hamburgerOption();

  */
  
  $(document).ready(function () {
    /*--------------------------------
        Hamburger Option
    ----------------------------------*/
    function hamburgerOption() {
        // Open Hamburger Menu
        $('.hamburger-trigger').on('click', function (e) {
            e.preventDefault();
            console.log('Hamburger menu opened');
            $('.hamburger-area').addClass('is-visible');
            $(this).addClass('open');
            $(".menu-overlay").addClass('active');
        });

        // Close Hamburger Menu
        $('.btn-close-search').on('click', function (e) {
            e.preventDefault();
            console.log('Hamburger menu closed');
            $(this).closest('.hamburger-area').removeClass('is-visible');
            $(".menu-overlay").removeClass('active');
            $('.hamburger-trigger').removeClass('open');
            $('.sub-menu').slideUp(100);
            $('.lavel--3').slideUp(100);
            $('.responsive-manu > li > a').removeClass('is-visible');
            $('.has-label--3 a').removeClass('is-visible');
        });
    }

    /*--------------------------------
        Responsive Menu
    ----------------------------------*/
    function responsiveMenu() {
        // Toggle Submenu for Main Menu Items
        $('.responsive-manu > li > a').on('click', function (e) {
            // Check if the link has a submenu
            if ($(this).siblings('.sub-menu').length > 0) {
                e.preventDefault(); // Prevent default only if a submenu exists
                console.log('Toggling submenu');
                $(this).siblings('.sub-menu').slideToggle(400);
                $(this).toggleClass('is-visible').siblings('.sub-menu').toggleClass('active');
                $('.lavel--3').slideUp(400); // Close deeper menus
                $('.has-label--3 a').removeClass('is-visible'); // Reset other menu items
            }
        });

        // Toggle Deeper Submenu for Nested Items
        $('.has-label--3 > a').on('click', function (e) {
            if ($(this).siblings('.lavel--3').length > 0) {
                e.preventDefault(); // Prevent default only if a deeper menu exists
                console.log('Toggling deeper submenu');
                $(this).siblings('.lavel--3').slideToggle(400);
                $(this).toggleClass('is-visible').siblings('.sub-menu').toggleClass('active');
            }
        });
    }

    // Initialize Functions
    hamburgerOption();
    responsiveMenu();
});

    
    /*===================================
    =           Menu Activeion          =
    ===================================*/
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if((curpage == "" || curpage == "/" || curpage == "index") && hash=="")
        {
          //$("nav .navbar-nav > li:first-child").addClass("active");
        } else {
            $(".navigation-menu li").each(function()
        {
            $(this).removeClass("active");
        });
        if(hash != "")
            $(".navigation-menu li a[href*='"+hash+"']").parents("li").addClass("active");
        else
        $(".navigation-menu li a[href*='"+curpage+"']").parents("li").addClass("active");
    }
    

 
   /*-------------------------------------------
    =            background image              =
   ---------------------------------------------*/
    function dataBackgroundImage() {
        var bgSelector = $(".bg-img");
        bgSelector.each(function (index, elem) {
            var element = $(elem),
                bgSource = element.data('bg');
            element.css('background', 'url(' + bgSource + ')');
        });
    }

    /*----------------------------------------
    =       counter up active                 =
    -------------------------------------------*/
    $('.counter').counterUp({
        delay: 10,
        time: 4000
    });
   

    /*--------------------------------
        Hero Slider one
    -----------------------------------*/
    $('.hreo-slider-one').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
   
    $('.hero-slider-two,.hero-slider-14-active').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
   
    $('.hero-slider-12-active').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
   
    $('.hero-slider-four').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
   
   
    $('.hero-slider-six').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="dlicon arrows-1_tail-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="dlicon arrows-1_tail-right"></i></button>',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 648,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
   
    $('.hero-slider-9').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    /*--
        Real Estate Hero Slider
    -----------------------------------*/
    $('.real_estate-slier-three-active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /*--
        Populer Project Slider
    -----------------------------------*/
    $('.populer-project-slider').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    /*--
        Populer Project Slider
    -----------------------------------*/
    $('.project-slider-nine-active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        centerMode: true,
        centerPadding: '300px',
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1499,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '200px',
                }
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '100px',
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '60px',
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            }
        ]
    });
    /*--
        Populer Project Slider
    -----------------------------------*/
    $('.single-project-slider-03--active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        centerMode: true,
        centerPadding: '160px',
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '60px',
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '30px',
                }
            }
        ]
    });
    $('.single-project-slider-08--active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    

    $('.brand-slider-active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        responsive: [ 
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });
    

    $('.brand-logo-two').slick({
        dots: false,
        infinite: true,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        responsive: [ 
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 6,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });


    $('.agents-slider-1').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });
    

    $('.testimonials-slider-1').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow:false,
        nextArrow: false,
    });
        

    $('.testimonials-slider-2').slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        responsive: [
            {
                breakpoint: 579,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.testimonials-slider-3').slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        centerMode: true,
        centerPadding: '220px',
        responsive: [
            {
                breakpoint:1200,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '180px',
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '80px',
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '30px',
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            }
        ]
    });

            

    $('.testimonials-slider-4').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    });
            

    $('.testimonials-preview').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        centerMode: true,
        centerPadding: '220px',
        responsive: [
            {
                breakpoint:1200,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '180px',
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '80px',
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '30px',
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    centerPadding: '0px',
                }
            }
        ]
    });

            
    $('.architecture-blog-slider-1').slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        centerMode: true,
        centerPadding: '0px',
        responsive: [
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]

    });
            

    $('.latest-blog-content-active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        centerMode: true,
        centerPadding: '0px',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });

    $('.blog-slider-active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:true,
        nextArrow: true,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    });
        

    $('.blog-slider-lg-active').slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
    });



    $('.blog-element-active').slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow:false,
        nextArrow: false,
        prevArrow: '<button type="button" class="slick-prev"> <i class="fa fa-angle-left"></i> </button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });   



    /*----------------------------
    	Cart Plus Minus Button
    ------------------------------ */
    var CartPlusMinus = $('.cart-plus-minus');
    CartPlusMinus.prepend('<div class="dec qtybutton">-</div>');
    CartPlusMinus.append('<div class="inc qtybutton">+</div>');
    $(".qtybutton").on("click", function() {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);
    });

    /*---------------------
        Sidebar sticky active
    --------------------- */
    $('.sidebar-active').stickySidebar({
        topSpacing: 30,
        bottomSpacing: 30,
        minWidth: 991,
    });
    /*--------------------------
        Sidebar sticky active 2
    ------------------------------- */
    $('.sidebar-active2').stickySidebar({
        topSpacing: 150,
        bottomSpacing: 0,
        minWidth: 991,
    });

    // Instantiate EasyZoom instances
    var $easyzoom = $('.easyzoom').easyZoom();
    
    /*--
    quick view Slick Carousel
    -----------------------------------*/
    $('.pro-dec-big-img-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        fade: false,
        asNavFor: '.product-dec-slider',
    });

    /*--
        product details slider active
    -----------------------------------*/
    $('.product-dec-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.pro-dec-big-img-slider',
        dots: false,
        focusOnSelect: true,
        fade: false,
        prevArrow: '<span class="pro-dec-icon pro-dec-prev"><i class="lastudioicon-left-arrow"></i></span>',
        nextArrow: '<span class="pro-dec-icon pro-dec-next"><i class="lastudioicon-right-arrow"></i></span>',
        responsive: [{
                breakpoint: 767,
                settings: {

                }
            },
            {
                breakpoint: 420,
                settings: {
                    autoplay: true,
                    slidesToShow: 2,
                }
            }
        ]
    });


    /*--
        price-slider active
    ------------------------------------*/  
    $( "#price-slider" ).slider({
    range: true,
    min: 0,
    max: 120,
    values: [ 20, 115 ],
    slide: function( event, ui ) {
            $( "#min-price" ).val('$' + ui.values[ 0 ] );
            $( "#max-price" ).val('$' + ui.values[ 1 ] );
        }
    });
    $( "#min-price" ).val('$' + $( "#price-slider" ).slider( "values", 0 ));   
    $( "#max-price" ).val('$' + $( "#price-slider" ).slider( "values", 1 )); 
        

    /*--
        Hover Parallax Js
    ------------------------------------*/
    if ($(".hover_plx").length > 0){
        var sceneElements = document.querySelectorAll('.hover_plx');
        var parallaxScenes = [];
        for (var i = 0; i < sceneElements.length; i++) {
            parallaxScenes.push(new Parallax(sceneElements[i]));
        }
    }


    /*--
        Shop filter active 
    ---------------------------------- */
    $('.shop-filter-active , .filter-close').on('click', function(e) {
        e.preventDefault();
        $('.product-filter-wrapper').slideToggle();
    })
    
    var shopFiltericon = $('.shop-filter-active , .filter-close');
    shopFiltericon.on('click', function() {
        $('.shop-filter-active').toggleClass('active');
    })


   /*--
        Svg Icon Draw
    -----------------------------------*/ 
    var $svgIconBox = $('.svg-icon-active');
    $svgIconBox.each(function() {
        var $this = $(this),
            $svgIcon = $this.find('.svg-icon'),
            $id = $svgIcon.attr('id'),
            $icon = $svgIcon.data('svg-icon');
        var $vivus = new Vivus($id, { duration: 100, file: $icon });
        $this.on('mouseenter', function () {
            $vivus.reset().play();
        });
    });

    /*--
    	Mesonry Activation      
    ---------------------------------------*/
     $('.projects-masonary-wrapper,.masonry-activation').imagesLoaded(function () {

        // filter items on button click
        $('.messonry-button').on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $(this).siblings('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
            $grid.isotope({
                filter: filterValue
            });
        });

        // Masonry
        var $grid = $('.masonry-wrap').masonry({
            itemSelector: '.masonary-item',
            percentPosition: true,
            transitionDuration: '0.7s',
            //itemSelector: '.grid-item',
            columnWidth: '.masonary-sizer'
        });

        // init Isotope
        var $grid = $('.mesonry-list').isotope({
            percentPosition: true,
            transitionDuration: '0.7s',
            layoutMode: 'masonry',/*
            masonry: {
                columnWidth: '.resizer',
            }*/
        });

    });

    
    /*--- showlogin toggle function ----*/
    $('.checkout-click').on('click', function(e) {
        e.preventDefault();
        $('.checkout-login-info').slideToggle(1000);
    });

    /*--
        Parallax
    ------------------------------------- */
	! function () {
		$('.parallax').jarallax({
			speed: 1.5
		});
	}();

   // Magnific Popup Video
    $('.popup-youtube').magnificPopup({
        type: 'iframe',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    
    /*--
        Magnific Popup Image
    ------------------------*/
    $('.poppu-img').magnificPopup({
        type: 'image',
        gallery:{
            enabled:true
        }
    });


 /*======================================
    =       Countdown Activation          =     
    ======================================*/
	$('[data-countdown]').each(function () {
		var $this = $(this),
			finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			$this.html(event.strftime('<div class="single-countdown"><span class="single-countdown__time">%D</span><span class="single-countdown__text">Days</span></div><div class="single-countdown"><span class="single-countdown__time">%H</span><span class="single-countdown__text">Hours</span></div><div class="single-countdown"><span class="single-countdown__time">%M</span><span class="single-countdown__text">Minutes</span></div><div class="single-countdown"><span class="single-countdown__time">%S</span><span class="single-countdown__text">Seconds</span></div>'));
		});
	});


  

})(jQuery);
