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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqIE1haW4gU2lkZWJhciBNZW51ICoqKiovXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAkKCcuc2lkZWJhci10cmlnZ2VyJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnc2lkZWJhci1jbG9zZScpKSB7XG5cbiAgICAgICAgICAgICQoJy5zaWRlYmFyJykuYWRkQ2xhc3MoJ3B1c2gnKTtcbiAgICAgICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZWJhci1jbG9zZScpLmFkZENsYXNzKCdzaWRlYmFyLW9wZW4nKTtcbiAgICAgICAgICAgICQoJy5vdmVybGF5JykuZmFkZUluKDMwMCk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgJCgnLnNpZGViYXInKS5yZW1vdmVDbGFzcygncHVzaCcpO1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdzaWRlYmFyLW9wZW4nKS5hZGRDbGFzcygnc2lkZWJhci1jbG9zZScpO1xuICAgICAgICAgICAgJCgnLm92ZXJsYXknKS5mYWRlT3V0KDMwMCk7XG5cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnLm92ZXJsYXknKS5jbGljayhmdW5jdGlvbigpIHtcblxuICAgICAgICAkKCcuc2lkZWJhcicpLnJlbW92ZUNsYXNzKCdwdXNoJyk7XG4gICAgICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZWJhci1vcGVuJykuYWRkQ2xhc3MoJ3NpZGViYXItY2xvc2UnKTtcbiAgICAgICAgJCgnLm92ZXJsYXknKS5mYWRlT3V0KDMwMCk7XG5cbiAgICB9KTtcbn0pO1xuLyoqKiogL01haW4gU2lkZWJhciBNZW51ICoqKiovXG5cbi8qKioqKiBBY2NvcmRlb24gKioqKiovXG4oZnVuY3Rpb24oJCkge1xuICAgICQuZm4ubGlIYXJtb25pY2EgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgdmFyIHAgPSAkLmV4dGVuZCh7XG4gICAgICAgICAgICBjdXJyZW50Q2xhc3M6ICdjdXInLFxuICAgICAgICAgICAgb25seU9uZTogdHJ1ZSxcbiAgICAgICAgICAgIHNwZWVkOiA1MDBcbiAgICAgICAgfSwgcGFyYW1zKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhclxuICAgICAgICAgICAgICAgIGVsID0gJCh0aGlzKS5hZGRDbGFzcygnaGFybW9uaWNhJyksXG4gICAgICAgICAgICAgICAgbGlua0l0ZW0gPSAkKCd1bCcsIGVsKS5wcmV2KCdhJyk7XG4gICAgICAgICAgICBlbC5jaGlsZHJlbignOmxhc3QnKS5hZGRDbGFzcygnbGFzdCcpO1xuICAgICAgICAgICAgJCgndWwnLCBlbCkuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCc6bGFzdCcpLmFkZENsYXNzKCdsYXN0Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJ3VsJywgZWwpLnByZXYoJ2EnKS5hZGRDbGFzcygnaGFyRnVsbCcpO1xuICAgICAgICAgICAgZWwuZmluZCgnLicgKyBwLmN1cnJlbnRDbGFzcykucGFyZW50cygndWwnKS5zaG93KCkucHJldignYScpLmFkZENsYXNzKHAuY3VycmVudENsYXNzKS5hZGRDbGFzcygnaGFyT3BlbicpO1xuICAgICAgICAgICAgbGlua0l0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQodGhpcykubmV4dCgndWwnKS5pcygnOmhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2hhck9wZW4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdoYXJPcGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwLm9ubHlPbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCd1bCcpLmNsb3Nlc3QoJ3VsJykuZmluZCgndWwnKS5ub3QoJCh0aGlzKS5uZXh0KCd1bCcpKS5zbGlkZVVwKHAuc3BlZWQpLnByZXYoJ2EnKS5yZW1vdmVDbGFzcygnaGFyT3BlbicpO1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLm5leHQoJ3VsJykuc2xpZGVUb2dnbGUocC5zcGVlZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5uZXh0KCd1bCcpLnN0b3AodHJ1ZSkuc2xpZGVUb2dnbGUocC5zcGVlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xufSkoalF1ZXJ5KTtcblxuLypJbml0Ki9cbiQoZnVuY3Rpb24oKSB7XG4gICAgJCgnLnNpZGViYXJfX2l0ZW0nKS5saUhhcm1vbmljYSh7XG4gICAgICAgIG9ubHlPbmU6IHRydWUsXG4gICAgICAgIHNwZWVkOiA1MDBcbiAgICB9KTtcbn0pO1xuLyoqKioqIC9BY2NvcmRlb24gKioqKiovXG5cbi8qKioqKiBUYWJzICoqKioqL1xuJChmdW5jdGlvbigpIHtcbiAgICAkKCdbZGF0YS10YWJzLWJ1dHRvbnNdID4gLnRhYnMtYnV0dG9ucycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBzZXQgPSAkKHRoaXMpLnBhcmVudHMoJ2RpdicpLmRhdGEoJ3RhYnMtYnV0dG9ucycpO1xuICAgICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCk7XG5cblxuICAgICAgICAkLmVhY2goWydidXR0b25zJywgJ3BhbmVscyddLCBmdW5jdGlvbihfLCBuYW1lKSB7XG4gICAgICAgICAgICBtYWtlQWN0aXZlKCQoXCJbZGF0YS10YWJzLVwiICsgbmFtZSArIFwiPVwiICsgc2V0ICsgXCJdID4gZGl2XCIpLCBpbmRleCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIG1ha2VBY3RpdmUoZWwsIGluZGV4KSB7XG4gICAgICAgICAgICBlbC5lcShpbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbi8qKioqKiAvVGFicyAqKioqKi9cblxuLyoqKiogU2lkZWJhciBNYXAgTWVudSAqKioqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICAkLmZuLnRhYlNsaWRlT3V0ID0gZnVuY3Rpb24oY2FsbGVyU2V0dGluZ3MpIHtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgdGFiSGFuZGxlOiAnLmhhbmRsZScsXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICAgICAgYWN0aW9uOiAnY2xpY2snLFxuICAgICAgICAgICAgdGFiTG9jYXRpb246ICdsZWZ0JyxcbiAgICAgICAgICAgIHRvcFBvczogJzIwMHB4JyxcbiAgICAgICAgICAgIGxlZnRQb3M6ICcyMHB4JyxcbiAgICAgICAgICAgIGZpeGVkUG9zaXRpb246IGZhbHNlLFxuICAgICAgICAgICAgcG9zaXRpb25pbmc6ICdhYnNvbHV0ZSdcbiAgICAgICAgfSwgY2FsbGVyU2V0dGluZ3MgfHwge30pO1xuXG4gICAgICAgIHNldHRpbmdzLnRhYkhhbmRsZSA9ICQoc2V0dGluZ3MudGFiSGFuZGxlKTtcbiAgICAgICAgdmFyIG9iaiA9IHRoaXM7XG4gICAgICAgIGlmIChzZXR0aW5ncy5maXhlZFBvc2l0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5wb3NpdGlvbmluZyA9ICdmaXhlZCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5wb3NpdGlvbmluZyA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIH1cblxuICAgICAgICAvL2llNiBkb2Vzbid0IGRvIHdlbGwgd2l0aCB0aGUgZml4ZWQgb3B0aW9uXG4gICAgICAgIGlmIChkb2N1bWVudC5hbGwgJiYgIXdpbmRvdy5vcGVyYSAmJiAhd2luZG93LlhNTEh0dHBSZXF1ZXN0KSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5wb3NpdGlvbmluZyA9ICdhYnNvbHV0ZSc7XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCBpbml0aWFsIHRhYkhhbmRsZSBjc3NcbiAgICAgICAgc2V0dGluZ3MudGFiSGFuZGxlLmNzcyh7XG4gICAgICAgICAgICAnZGlzcGxheSc6ICdibG9jaycsXG4gICAgICAgICAgICAnd2lkdGgnOiBzZXR0aW5ncy5pbWFnZVdpZHRoLFxuICAgICAgICAgICAgJ2hlaWdodCc6IHNldHRpbmdzLmltYWdlSGVpZ2h0LFxuICAgICAgICAgICAgJ291dGxpbmUnOiAnbm9uZScsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9iai5jc3Moe1xuICAgICAgICAgICAgJ2xpbmUtaGVpZ2h0JzogJzEnLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogc2V0dGluZ3MucG9zaXRpb25pbmdcbiAgICAgICAgfSk7XG5cblxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHtcbiAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoOiBwYXJzZUludChvYmoub3V0ZXJXaWR0aCgpLCAxMCkgKyAncHgnLFxuICAgICAgICAgICAgY29udGFpbmVySGVpZ2h0OiBwYXJzZUludChvYmoub3V0ZXJIZWlnaHQoKSwgMTApICsgJ3B4JyxcbiAgICAgICAgICAgIHRhYldpZHRoOiBwYXJzZUludChzZXR0aW5ncy50YWJIYW5kbGUub3V0ZXJXaWR0aCgpLCAxMCkgKyAncHgnLFxuICAgICAgICAgICAgdGFiSGVpZ2h0OiBwYXJzZUludChzZXR0aW5ncy50YWJIYW5kbGUub3V0ZXJIZWlnaHQoKSwgMTApICsgJ3B4J1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vc2V0IGNhbGN1bGF0ZWQgY3NzXG4gICAgICAgIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ3RvcCcgfHwgc2V0dGluZ3MudGFiTG9jYXRpb24gPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICBvYmouY3NzKHtcbiAgICAgICAgICAgICAgICAnbGVmdCc6IHNldHRpbmdzLmxlZnRQb3MgKyAnNXB4J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY3NzKHtcbiAgICAgICAgICAgICAgICAncmlnaHQnOiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIG9iai5jc3Moe1xuICAgICAgICAgICAgICAgICd0b3AnOiAnLScgKyBwcm9wZXJ0aWVzLmNvbnRhaW5lckhlaWdodFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY3NzKHtcbiAgICAgICAgICAgICAgICAnYm90dG9tJzogJy0nICsgcHJvcGVydGllcy50YWJIZWlnaHRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgb2JqLmNzcyh7XG4gICAgICAgICAgICAgICAgJ2JvdHRvbSc6ICctJyArIHByb3BlcnRpZXMuY29udGFpbmVySGVpZ2h0LFxuICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdmaXhlZCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2V0dGluZ3MudGFiSGFuZGxlLmNzcyh7XG4gICAgICAgICAgICAgICAgJ3RvcCc6ICctJyArIHByb3BlcnRpZXMudGFiSGVpZ2h0XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAnbGVmdCcgfHwgc2V0dGluZ3MudGFiTG9jYXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIG9iai5jc3Moe1xuICAgICAgICAgICAgICAgICdoZWlnaHQnOiBwcm9wZXJ0aWVzLmNvbnRhaW5lckhlaWdodCxcbiAgICAgICAgICAgICAgICAndG9wJzogc2V0dGluZ3MudG9wUG9zXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gc2V0dGluZ3MudGFiSGFuZGxlLmNzcyh7J3RvcCcgOiAwfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2V0dGluZ3MudGFiTG9jYXRpb24gPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgb2JqLmNzcyh7XG4gICAgICAgICAgICAgICAgJ2xlZnQnOiAnLScgKyBwcm9wZXJ0aWVzLmNvbnRhaW5lcldpZHRoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldHRpbmdzLnRhYkhhbmRsZS5jc3Moe1xuICAgICAgICAgICAgICAgICdyaWdodCc6ICctJyArIHByb3BlcnRpZXMudGFiV2lkdGhcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICBvYmouY3NzKHtcbiAgICAgICAgICAgICAgICAncmlnaHQnOiAnLScgKyBwcm9wZXJ0aWVzLmNvbnRhaW5lcldpZHRoXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNldHRpbmdzLnRhYkhhbmRsZS5jc3Moe1xuICAgICAgICAgICAgICAgICdsZWZ0JzogJy0nICsgcHJvcGVydGllcy50YWJXaWR0aFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICQoJ2h0bWwnKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2Z1bmN0aW9ucyBmb3IgYW5pbWF0aW9uIGV2ZW50c1xuXG4gICAgICAgIHNldHRpbmdzLnRhYkhhbmRsZS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHNsaWRlSW4gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAndG9wJykge1xuICAgICAgICAgICAgICAgIG9iai5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAnLScgKyBwcm9wZXJ0aWVzLmNvbnRhaW5lckhlaWdodFxuICAgICAgICAgICAgICAgIH0sIHNldHRpbmdzLnNwZWVkKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ2xlZnQnKSB7XG4gICAgICAgICAgICAgICAgb2JqLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnLScgKyBwcm9wZXJ0aWVzLmNvbnRhaW5lcldpZHRoXG4gICAgICAgICAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgb2JqLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICByaWdodDogJy0nICsgcHJvcGVydGllcy5jb250YWluZXJXaWR0aFxuICAgICAgICAgICAgICAgIH0sIHNldHRpbmdzLnNwZWVkKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJy0nICsgcHJvcGVydGllcy5jb250YWluZXJIZWlnaHRcbiAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCkucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzbGlkZU91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBpZiAoc2V0dGluZ3MudGFiTG9jYXRpb24gPT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJy0zcHgnXG4gICAgICAgICAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICAgIG9iai5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJy0zcHgnXG4gICAgICAgICAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAnLTNweCdcbiAgICAgICAgICAgICAgICB9LCBzZXR0aW5ncy5zcGVlZCkuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MudGFiTG9jYXRpb24gPT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJy0zcHgnXG4gICAgICAgICAgICAgICAgfSwgc2V0dGluZ3Muc3BlZWQpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNsaWNrU2NyZWVuVG9DbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb2JqLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVJbigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIGNsaWNrQWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNsaWNrU2NyZWVuVG9DbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBob3ZlckFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb2JqLmhvdmVyKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZU91dCgpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2xpY2tTY3JlZW5Ub0Nsb3NlKCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICAvL2Nob29zZSB3aGljaCB0eXBlIG9mIGFjdGlvbiB0byBiaW5kXG4gICAgICAgIGlmIChzZXR0aW5ncy5hY3Rpb24gPT09ICdjbGljaycpIHtcbiAgICAgICAgICAgIGNsaWNrQWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2V0dGluZ3MuYWN0aW9uID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgICBob3ZlckFjdGlvbigpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKGpRdWVyeSk7XG5cbi8qKioqIC9TaWRlYmFyIE1hcCBNZW51ICoqKiovXG4iXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
