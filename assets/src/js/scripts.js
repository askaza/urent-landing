"use strict";

const app = {
    init() {
        app.menuFixed();
        app.mobileMenu();
        app.menuLinks();
        app.smoothScroll();
        app.runCarousel();
        app.runGallery();
        app.formValidation();
    },
    menuFixed() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 60) {
                $(".menu-container").addClass("fixed");
            } else {
                $(".menu-container").removeClass("fixed");
            }
        });

    },
    menuLinks() {
        // Подсветка пунктов меню - активных
        let menuLinks = document.querySelectorAll(".menu-link");

        let activeLink = function () {
            menuLinks.forEach((item, index) => {
                let location = window.location.href;
                let link = item.href;
                if (location == link) {
                    item.classList.add("menu-active-link");
                } else if (location == "urent.ru" || location == "http://127.0.0.1:5500/") {
                    menuLinks[0].classList.add("menu-active-link");
                }
            });
        };
        activeLink();
    },
    mobileMenu() {
        // Мобильное меню
        $(document).ready(function () {
            $(".cross").hide();
            $(".drop-menu").hide();
            $(".hamburger").click(function () {
                $(".drop-menu").slideToggle("slow", function () {
                    $(".hamburger").hide();
                    $(".cross").show();
                });
            });

            $(".cross").click(function () {
                $(".drop-menu").slideToggle("slow", function () {
                    $(".cross").hide();
                    $(".hamburger").show();
                    $(".menu-container").removeClass("fixed");
                });
            });
        });
    },
    smoothScroll() {
        // Плавный скролл
        const links = $(".menu-link");
        if (links) {
            links.each(function (index, el) {
                const block = $(el).attr('href')
                $(el).on("click", (e) => {
                    e.preventDefault();

                    $('#main').show()
                    $('#success').hide()

                    $(block)[0].scrollIntoView({
                        behavior: "smooth"
                    });
                });
            });
        }
    },
    runGallery() {
        var main = new Splide( '#main-carousel', {
            type      : 'fade',
            rewind    : true,
            pagination: false,
            arrows    : false,
        } );

        var thumbnails = new Splide( '#thumbnail-carousel', {
            fixedWidth  : 122,
            fixedHeight : 122,
            gap         : 10,
            rewind      : true,
            pagination  : false,
            isNavigation: true,
            arrows    : false,
            breakpoints : {
                640: {
                    fixedWidth : 102,
                    fixedHeight: 102,
                },
            },
        });

        main.sync( thumbnails );
        main.mount();
        thumbnails.mount();
    },
    runCarousel() {
        const width = $(window).width()
        var carousel = new Splide( '#table-carousel', {
            autoWidth: true,
            gap: 14,
            arrows: false,
            pagination: false,
            drag: 'free'
        } );

        const runCarousel = () => {
            if (carousel.state.is(Splide.STATES.CREATED) || !carousel.state.is(Splide.STATES.IDLE)) {carousel.mount();
            }
        }

        const destroyCarousel = () => {
            if (carousel.state.is( Splide.STATES.IDLE) ) {
                carousel.destroy(true)
            }
        }

        if (width < 1240) {
            runCarousel()
        }

        $(window).resize(function() {
            const resizedWidth = $(this).width()
            if (resizedWidth < 1240) {
                runCarousel()
            } else {
                destroyCarousel()
            }
        });
    },
    formValidation() {
        // close success page
        $('.js-close-success').on('click', function (event) {
            event.preventDefault();
            $('#main').show()
            $('#success').hide()
            window.scrollTo(0,0)
        })

        // init select
            const select2Data = [
                {
                    id: 0,
                    text: '1 месяц',
                    price: '3 990 / мес',
                    discount: '',
                    total: '3 990 ₽',
                    full: '',
                    selected: false
                },
                {
                    id: 1,
                    text: '3 месяца',
                    price: '3590 ₽ / мес',
                    discount: 'Скидка 20%',
                    total: '9 670 ₽',
                    full: '11 970 ₽',
                    selected: false
                },
                {
                    id: 2,
                    text: '6 месяцев',
                    price: '2 399 ₽ / мес',
                    discount: 'Скидка 40%',
                    total: '14 360 ₽',
                    full: '23 940 ₽',
                    selected: false
                },
                {
                    id: 3,
                    text: '12 месяцев',
                    price: '1 599 ₽ / мес',
                    discount: 'Скидка 60%',
                    total: '19 180 ₽',
                    full: '47 880 ₽',
                    selected: false
                }]

            const formatState = function (state) {
                if ( !state.id) { return state.text; }

                const $state = $(
                    '<div class="option"><div class="columns">' +
                    '<div class="top"><div class="time">' + state.text + '</div></div>' +
                    '<div class="bottom"><div class="price">' + state.price + '</div></div></div>' +
                    '<div class="total">' + state.total + '<span class="full">' + state.full + '</span>' +
                    '<div class="discount">' + state.discount + '</div></div></div>'
                );
                    return $state;
                };

            const formatStateSelected = function (state) {
                if ( !state.id) { return state.text; }

                const $state = $(
                    '<div class="option">' +
                    '<div class="time">' + state.text + '</div></div>'
                );
                return $state;
            };

            $('.js-custom-select').select2({
                data: select2Data,
                minimumResultsForSearch: -1,
                placeholder: "На сколько месяцев?",
                templateResult: formatState,
                templateSelection: formatStateSelected,
                width: '100%'
            })

        // init mask
        $('.js-input-phone').inputmask({
            mask: '+7 (999) 999-99-99',
            showMaskOnHover: true,
            inputmode: 'tel',
            onincomplete: function () {
                checkValue($(this));
            },
            oncomplete: function () {
                checkValue($(this));
            }
        });

        // on change name
        $('.js-input-name').on('change', function () {
            const isValid = $('.js-input-name').val().trim() != ''
            if (!isValid) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        })

        // on change tariff
        $('.js-custom-select').on('change', function () {
            $('.select2-container').removeClass('error')
        })

        const checkValue = function(input) {
            var $th = $(input);
            var phone = $th.val();	//Введенное значение
            var isValid = Inputmask.isValid(phone , { mask: '+7 (999) 999-99-99'});	//Проверяем на валидность

            if (!isValid) {
                $th.addClass('error');
            } else {
                $th.removeClass('error');
            }
        }

        const disableForm = function () {
            $('.loading-icon').show()
        }

        const enableForm = function () {
            $('.loading-icon').hide()
        }

        $('#register-button').on('click', function(event) {
            event.preventDefault()

            const nameVal = $('.js-input-name').val()
            const phoneNumberVal = $('.js-input-phone').val()
            const phoneNumberValValid = Inputmask.isValid(phoneNumberVal, { mask: '+7 (999) 999-99-99'})

            const tariffVal = $('.js-custom-select').val()

            if (!phoneNumberValValid) {
                $('.js-input-phone').addClass('error')
            }
            if (!nameVal) {
                $('.js-input-name').addClass('error')
            }
            if (!tariffVal) {
                $('.select2-container').addClass('error')
            }

            if ( phoneNumberValValid && nameVal && tariffVal) {
                disableForm()

                const data = {
                    name: nameVal,
                    phoneNumber: phoneNumberVal.replace(/[^0-9]/g, ''),
                    tariff: tariffVal
                }

                console.log(data, 'data')

                fetch("api/CorporateUsers/signup", {
                    method: 'POST',
                    headers: {"Content-Type": "application/json-patch+json",
                        accept: "application/json"
                    },
                    url: "api/CorporateUsers/signup",
                    body: JSON.stringify(data)
                }).then(data => {
                    if (data.ok == true && data.status == 200) {
                        $('#main').hide()
                        $('#success').show()
                        window.scrollTo(0,0)
                    } else {
                        enableForm()
                        alert('Что-то пошло не так! Попробуйте позже')
                    }
                })
            }
        })
    }
};

$(document).ready(function() {
    app.init();
});


