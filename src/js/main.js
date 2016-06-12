/**** Main Sidebar Menu ****/
$(document).ready(function() {
    $('.sidebar-trigger').click(function() {

        if ($('body').hasClass('sidebar-close')) {

            $('.sidebar').addClass('push');
            $('body').removeClass('sidebar-close').addClass('sidebar-open');
            $('.overlay').fadeIn(300);

        } else {

            $('.sidebar').removeClass('push');
            $('body').removeClass('sidebar-open').addClass('sidebar-close');
            $('.overlay').fadeOut(300);

        }
    });

    $('.overlay').click(function() {

        $('.sidebar').removeClass('push');
        $('body').removeClass('sidebar-open').addClass('sidebar-close');
        $('.overlay').fadeOut(300);

    });
});
/**** /Main Sidebar Menu ****/

/***** Accordeon *****/
(function($) {
    $.fn.liHarmonica = function(params) {
        var p = $.extend({
            currentClass: 'cur',
            onlyOne: true,
            speed: 500
        }, params);
        return this.each(function() {
            var
                el = $(this).addClass('harmonica'),
                linkItem = $('ul', el).prev('a');
            el.children(':last').addClass('last');
            $('ul', el).each(function() {
                $(this).children(':last').addClass('last');
            });
            $('ul', el).prev('a').addClass('harFull');
            el.find('.' + p.currentClass).parents('ul').show().prev('a').addClass(p.currentClass).addClass('harOpen');
            linkItem.on('click', function() {
                if ($(this).next('ul').is(':hidden')) {
                    $(this).addClass('harOpen');
                } else {
                    $(this).removeClass('harOpen');
                }
                if (p.onlyOne) {
                    $(this).closest('ul').closest('ul').find('ul').not($(this).next('ul')).slideUp(p.speed).prev('a').removeClass('harOpen');
                    $(this).next('ul').slideToggle(p.speed);
                } else {
                    $(this).next('ul').stop(true).slideToggle(p.speed);
                }
                return false;
            });
        });
    };
})(jQuery);

/*Init*/
$(function() {
    $('.sidebar__item').liHarmonica({
        onlyOne: true,
        speed: 500
    });
});
/***** /Accordeon *****/

/***** Tabs *****/
$(function() {
    $('[data-tabs-buttons] > .tabs-buttons').click(function() {

        var set = $(this).parents('div').data('tabs-buttons');
        var index = $(this).index();


        $.each(['buttons', 'panels'], function(_, name) {
            makeActive($("[data-tabs-" + name + "=" + set + "] > div"), index);
        });

        function makeActive(el, index) {
            el.eq(index).addClass('active').siblings().removeClass('active');
        }
    });
});
/***** /Tabs *****/

/**** Sidebar Map Menu ****/
(function($) {
    $.fn.tabSlideOut = function(callerSettings) {
        var settings = $.extend({
            tabHandle: '.handle',
            speed: 300,
            action: 'click',
            tabLocation: 'left',
            topPos: '200px',
            leftPos: '20px',
            fixedPosition: false,
            positioning: 'absolute'
        }, callerSettings || {});

        settings.tabHandle = $(settings.tabHandle);
        var obj = this;
        if (settings.fixedPosition === true) {
            settings.positioning = 'fixed';
        } else {
            settings.positioning = 'absolute';
        }

        //ie6 doesn't do well with the fixed option
        if (document.all && !window.opera && !window.XMLHttpRequest) {
            settings.positioning = 'absolute';
        }

        //set initial tabHandle css
        settings.tabHandle.css({
            'display': 'block',
            'width': settings.imageWidth,
            'height': settings.imageHeight,
            'outline': 'none',
            'position': 'absolute'
        });

        obj.css({
            'line-height': '1',
            'position': settings.positioning
        });


        var properties = {
            containerWidth: parseInt(obj.outerWidth(), 10) + 'px',
            containerHeight: parseInt(obj.outerHeight(), 10) + 'px',
            tabWidth: parseInt(settings.tabHandle.outerWidth(), 10) + 'px',
            tabHeight: parseInt(settings.tabHandle.outerHeight(), 10) + 'px'
        };

        //set calculated css
        if (settings.tabLocation === 'top' || settings.tabLocation === 'bottom') {
            obj.css({
                'left': settings.leftPos + '5px'
            });
            settings.tabHandle.css({
                'right': 0
            });
        }

        if (settings.tabLocation === 'top') {
            obj.css({
                'top': '-' + properties.containerHeight
            });
            settings.tabHandle.css({
                'bottom': '-' + properties.tabHeight
            });
        }

        if (settings.tabLocation === 'bottom') {
            obj.css({
                'bottom': '-' + properties.containerHeight,
                'position': 'fixed'
            });
            settings.tabHandle.css({
                'top': '-' + properties.tabHeight
            });

        }

        if (settings.tabLocation === 'left' || settings.tabLocation === 'right') {
            obj.css({
                'height': properties.containerHeight,
                'top': settings.topPos
            });

            // settings.tabHandle.css({'top' : 0});
        }

        if (settings.tabLocation === 'left') {
            obj.css({
                'left': '-' + properties.containerWidth
            });
            settings.tabHandle.css({
                'right': '-' + properties.tabWidth
            });
        }

        if (settings.tabLocation === 'right') {
            obj.css({
                'right': '-' + properties.containerWidth
            });
            settings.tabHandle.css({
                'left': '-' + properties.tabWidth
            });

            $('html').css('overflow-x', 'hidden');
        }

        //functions for animation events

        settings.tabHandle.click(function(event) {
            event.preventDefault();
        });

        var slideIn = function() {

            if (settings.tabLocation === 'top') {
                obj.animate({
                    top: '-' + properties.containerHeight
                }, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'left') {
                obj.animate({
                    left: '-' + properties.containerWidth
                }, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'right') {
                obj.animate({
                    right: '-' + properties.containerWidth
                }, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'bottom') {
                obj.animate({
                    bottom: '-' + properties.containerHeight
                }, settings.speed).removeClass('open');
            }

        };

        var slideOut = function() {

            if (settings.tabLocation == 'top') {
                obj.animate({
                    top: '-3px'
                }, settings.speed).addClass('open');
            } else if (settings.tabLocation == 'left') {
                obj.animate({
                    left: '-3px'
                }, settings.speed).addClass('open');
            } else if (settings.tabLocation == 'right') {
                obj.animate({
                    right: '-3px'
                }, settings.speed).addClass('open');
            } else if (settings.tabLocation == 'bottom') {
                obj.animate({
                    bottom: '-3px'
                }, settings.speed).addClass('open');
            }
        };

        var clickScreenToClose = function() {
            obj.click(function(event) {
                event.stopPropagation();
            });

            $(document).click(function() {
                slideIn();
            });
        };

        var clickAction = function() {
            settings.tabHandle.click(function(event) {
                if (obj.hasClass('open')) {
                    slideIn();
                } else {
                    slideOut();
                }
            });

            clickScreenToClose();
        };

        var hoverAction = function() {
            obj.hover(
                function() {
                    slideOut();
                },

                function() {
                    slideIn();
                });

            settings.tabHandle.click(function(event) {
                if (obj.hasClass('open')) {
                    slideIn();
                }
            });
            clickScreenToClose();

        };

        //choose which type of action to bind
        if (settings.action === 'click') {
            clickAction();
        }

        if (settings.action === 'hover') {
            hoverAction();
        }
    };
})(jQuery);

/**** /Sidebar Map Menu ****/
