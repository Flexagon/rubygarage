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
(function ($) {
  $.fn.liHarmonica = function (params) {
    var p = $.extend({
      currentClass: 'cur',
      onlyOne: true,
      speed: 500
    }, params);
    return this.each(function () {
      var
      el = $(this).addClass('harmonica'),
        linkItem = $('ul', el).prev('a');
      el.children(':last').addClass('last');
      $('ul', el).each(function () {
        $(this).children(':last').addClass('last');
      });
      $('ul', el).prev('a').addClass('harFull');
      el.find('.' + p.currentClass).parents('ul').show().prev('a').addClass(p.currentClass).addClass('harOpen');
      linkItem.on('click', function () {
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
$(function () {
  $('.sidebar__item').liHarmonica({
    onlyOne: true,
    speed: 500
  });


});
/***** /Accordeon *****/

/***** Tabs *****/
$(function () {
	$('[data-tabs-buttons] > .tabs-buttons').click(function() {

		var set = $(this).parents('div').data('tabs-buttons');
		var index = $(this).index();


		$.each(['buttons', 'panels'], function(_, name) {
		    makeActive($("[data-tabs-"+ name +"="+ set +"] > div"), index);
		});

		function makeActive(el, index) {
		    el.eq(index).addClass('active').siblings().removeClass('active');
		}
	});
});
/***** /Tabs *****/

/**** Sidebar Map Menu ****/
(function($){
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
        }, callerSettings||{});

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
            'width' : settings.imageWidth,
            'height': settings.imageHeight,
            'outline' : 'none',
            'position' : 'absolute'
        });

        obj.css({
            'line-height' : '1',
            'position' : settings.positioning
        });


        var properties = {
                    containerWidth: parseInt(obj.outerWidth(), 10) + 'px',
                    containerHeight: parseInt(obj.outerHeight(), 10) + 'px',
                    tabWidth: parseInt(settings.tabHandle.outerWidth(), 10) + 'px',
                    tabHeight: parseInt(settings.tabHandle.outerHeight(), 10) + 'px'
                };

        //set calculated css
        if(settings.tabLocation === 'top' || settings.tabLocation === 'bottom') {
            obj.css({'left' : settings.leftPos + '5px'});
            settings.tabHandle.css({'right' : 0});
        }

        if(settings.tabLocation === 'top') {
            obj.css({'top' : '-' + properties.containerHeight});
            settings.tabHandle.css({'bottom' : '-' + properties.tabHeight});
        }

        if(settings.tabLocation === 'bottom') {
            obj.css({'bottom' : '-' + properties.containerHeight, 'position' : 'fixed'});
            settings.tabHandle.css({'top' : '-' + properties.tabHeight});

        }

        if(settings.tabLocation === 'left' || settings.tabLocation === 'right') {
            obj.css({
                'height' : properties.containerHeight,
                'top' : settings.topPos
            });

            // settings.tabHandle.css({'top' : 0});
        }

        if(settings.tabLocation === 'left') {
            obj.css({ 'left': '-' + properties.containerWidth});
            settings.tabHandle.css({'right' : '-' + properties.tabWidth});
        }

        if(settings.tabLocation === 'right') {
            obj.css({ 'right': '-' + properties.containerWidth});
            settings.tabHandle.css({'left' : '-' + properties.tabWidth});

            $('html').css('overflow-x', 'hidden');
        }

        //functions for animation events

        settings.tabHandle.click(function(event){
            event.preventDefault();
        });

        var slideIn = function() {

            if (settings.tabLocation === 'top') {
                obj.animate({top:'-' + properties.containerHeight}, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'left') {
                obj.animate({left: '-' + properties.containerWidth}, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'right') {
                obj.animate({right: '-' + properties.containerWidth}, settings.speed).removeClass('open');
            } else if (settings.tabLocation === 'bottom') {
                obj.animate({bottom: '-' + properties.containerHeight}, settings.speed).removeClass('open');
            }

        };

        var slideOut = function() {

            if (settings.tabLocation == 'top') {
                obj.animate({top:'-3px'},  settings.speed).addClass('open');
            } else if (settings.tabLocation == 'left') {
                obj.animate({left:'-3px'},  settings.speed).addClass('open');
            } else if (settings.tabLocation == 'right') {
                obj.animate({right:'-3px'},  settings.speed).addClass('open');
            } else if (settings.tabLocation == 'bottom') {
                obj.animate({bottom:'-3px'},  settings.speed).addClass('open');
            }
        };

        var clickScreenToClose = function() {
            obj.click(function(event){
                event.stopPropagation();
            });

            $(document).click(function(){
                slideIn();
            });
        };

        var clickAction = function(){
            settings.tabHandle.click(function(event){
                if (obj.hasClass('open')) {
                    slideIn();
                } else {
                    slideOut();
                }
            });

            clickScreenToClose();
        };

        var hoverAction = function(){
            obj.hover(
                function(){
                    slideOut();
                },

                function(){
                    slideIn();
                });

                settings.tabHandle.click(function(event){
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKioqIE1haW4gU2lkZWJhciBNZW51ICoqKiovXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0ICAkKCcuc2lkZWJhci10cmlnZ2VyJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0aWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnc2lkZWJhci1jbG9zZScpKSB7XG5cblx0XHRcdFx0XHQkKCcuc2lkZWJhcicpLmFkZENsYXNzKCdwdXNoJyk7XG5cdFx0XHRcdFx0JCgnYm9keScpLnJlbW92ZUNsYXNzKCdzaWRlYmFyLWNsb3NlJykuYWRkQ2xhc3MoJ3NpZGViYXItb3BlbicpO1xuXHRcdFx0XHRcdCQoJy5vdmVybGF5JykuZmFkZUluKDMwMCk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdCQoJy5zaWRlYmFyJykucmVtb3ZlQ2xhc3MoJ3B1c2gnKTtcblx0XHRcdFx0XHQkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ3NpZGViYXItb3BlbicpLmFkZENsYXNzKCdzaWRlYmFyLWNsb3NlJyk7XG5cdFx0XHRcdFx0JCgnLm92ZXJsYXknKS5mYWRlT3V0KDMwMCk7XG5cblx0XHRcdFx0fVxuXHQgIH0pO1xuXG5cdCAgJCgnLm92ZXJsYXknKS5jbGljayhmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQkKCcuc2lkZWJhcicpLnJlbW92ZUNsYXNzKCdwdXNoJyk7XG5cdFx0XHRcdCQoJ2JvZHknKS5yZW1vdmVDbGFzcygnc2lkZWJhci1vcGVuJykuYWRkQ2xhc3MoJ3NpZGViYXItY2xvc2UnKTtcblx0XHRcdFx0JCgnLm92ZXJsYXknKS5mYWRlT3V0KDMwMCk7XG5cblx0ICB9KTtcbn0pO1xuLyoqKiogL01haW4gU2lkZWJhciBNZW51ICoqKiovXG5cbi8qKioqKiBBY2NvcmRlb24gKioqKiovXG4oZnVuY3Rpb24gKCQpIHtcbiAgJC5mbi5saUhhcm1vbmljYSA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICB2YXIgcCA9ICQuZXh0ZW5kKHtcbiAgICAgIGN1cnJlbnRDbGFzczogJ2N1cicsXG4gICAgICBvbmx5T25lOiB0cnVlLFxuICAgICAgc3BlZWQ6IDUwMFxuICAgIH0sIHBhcmFtcyk7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXJcbiAgICAgIGVsID0gJCh0aGlzKS5hZGRDbGFzcygnaGFybW9uaWNhJyksXG4gICAgICAgIGxpbmtJdGVtID0gJCgndWwnLCBlbCkucHJldignYScpO1xuICAgICAgZWwuY2hpbGRyZW4oJzpsYXN0JykuYWRkQ2xhc3MoJ2xhc3QnKTtcbiAgICAgICQoJ3VsJywgZWwpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCc6bGFzdCcpLmFkZENsYXNzKCdsYXN0Jyk7XG4gICAgICB9KTtcbiAgICAgICQoJ3VsJywgZWwpLnByZXYoJ2EnKS5hZGRDbGFzcygnaGFyRnVsbCcpO1xuICAgICAgZWwuZmluZCgnLicgKyBwLmN1cnJlbnRDbGFzcykucGFyZW50cygndWwnKS5zaG93KCkucHJldignYScpLmFkZENsYXNzKHAuY3VycmVudENsYXNzKS5hZGRDbGFzcygnaGFyT3BlbicpO1xuICAgICAgbGlua0l0ZW0ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5uZXh0KCd1bCcpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdoYXJPcGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaGFyT3BlbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwLm9ubHlPbmUpIHtcbiAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJ3VsJykuY2xvc2VzdCgndWwnKS5maW5kKCd1bCcpLm5vdCgkKHRoaXMpLm5leHQoJ3VsJykpLnNsaWRlVXAocC5zcGVlZCkucHJldignYScpLnJlbW92ZUNsYXNzKCdoYXJPcGVuJyk7XG4gICAgICAgICAgJCh0aGlzKS5uZXh0KCd1bCcpLnNsaWRlVG9nZ2xlKHAuc3BlZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcykubmV4dCgndWwnKS5zdG9wKHRydWUpLnNsaWRlVG9nZ2xlKHAuc3BlZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufSkoalF1ZXJ5KTtcblxuLypJbml0Ki9cbiQoZnVuY3Rpb24gKCkge1xuICAkKCcuc2lkZWJhcl9faXRlbScpLmxpSGFybW9uaWNhKHtcbiAgICBvbmx5T25lOiB0cnVlLFxuICAgIHNwZWVkOiA1MDBcbiAgfSk7XG5cblxufSk7XG4vKioqKiogL0FjY29yZGVvbiAqKioqKi9cblxuLyoqKioqIFRhYnMgKioqKiovXG4kKGZ1bmN0aW9uICgpIHtcblx0JCgnW2RhdGEtdGFicy1idXR0b25zXSA+IC50YWJzLWJ1dHRvbnMnKS5jbGljayhmdW5jdGlvbigpIHtcblxuXHRcdHZhciBzZXQgPSAkKHRoaXMpLnBhcmVudHMoJ2RpdicpLmRhdGEoJ3RhYnMtYnV0dG9ucycpO1xuXHRcdHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKTtcblxuXG5cdFx0JC5lYWNoKFsnYnV0dG9ucycsICdwYW5lbHMnXSwgZnVuY3Rpb24oXywgbmFtZSkge1xuXHRcdCAgICBtYWtlQWN0aXZlKCQoXCJbZGF0YS10YWJzLVwiKyBuYW1lICtcIj1cIisgc2V0ICtcIl0gPiBkaXZcIiksIGluZGV4KTtcblx0XHR9KTtcblxuXHRcdGZ1bmN0aW9uIG1ha2VBY3RpdmUoZWwsIGluZGV4KSB7XG5cdFx0ICAgIGVsLmVxKGluZGV4KS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdFx0fVxuXHR9KTtcbn0pO1xuLyoqKioqIC9UYWJzICoqKioqL1xuXG4vKioqKiBTaWRlYmFyIE1hcCBNZW51ICoqKiovXG4oZnVuY3Rpb24oJCl7XG4gICAgJC5mbi50YWJTbGlkZU91dCA9IGZ1bmN0aW9uKGNhbGxlclNldHRpbmdzKSB7XG4gICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgIHRhYkhhbmRsZTogJy5oYW5kbGUnLFxuICAgICAgICAgICAgc3BlZWQ6IDMwMCxcbiAgICAgICAgICAgIGFjdGlvbjogJ2NsaWNrJyxcbiAgICAgICAgICAgIHRhYkxvY2F0aW9uOiAnbGVmdCcsXG4gICAgICAgICAgICB0b3BQb3M6ICcyMDBweCcsXG4gICAgICAgICAgICBsZWZ0UG9zOiAnMjBweCcsXG4gICAgICAgICAgICBmaXhlZFBvc2l0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHBvc2l0aW9uaW5nOiAnYWJzb2x1dGUnXG4gICAgICAgIH0sIGNhbGxlclNldHRpbmdzfHx7fSk7XG5cbiAgICAgICAgc2V0dGluZ3MudGFiSGFuZGxlID0gJChzZXR0aW5ncy50YWJIYW5kbGUpO1xuICAgICAgICB2YXIgb2JqID0gdGhpcztcbiAgICAgICAgaWYgKHNldHRpbmdzLmZpeGVkUG9zaXRpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNldHRpbmdzLnBvc2l0aW9uaW5nID0gJ2ZpeGVkJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHRpbmdzLnBvc2l0aW9uaW5nID0gJ2Fic29sdXRlJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWU2IGRvZXNuJ3QgZG8gd2VsbCB3aXRoIHRoZSBmaXhlZCBvcHRpb25cbiAgICAgICAgaWYgKGRvY3VtZW50LmFsbCAmJiAhd2luZG93Lm9wZXJhICYmICF3aW5kb3cuWE1MSHR0cFJlcXVlc3QpIHtcbiAgICAgICAgICAgIHNldHRpbmdzLnBvc2l0aW9uaW5nID0gJ2Fic29sdXRlJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IGluaXRpYWwgdGFiSGFuZGxlIGNzc1xuICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY3NzKHtcbiAgICAgICAgICAgICdkaXNwbGF5JzogJ2Jsb2NrJyxcbiAgICAgICAgICAgICd3aWR0aCcgOiBzZXR0aW5ncy5pbWFnZVdpZHRoLFxuICAgICAgICAgICAgJ2hlaWdodCc6IHNldHRpbmdzLmltYWdlSGVpZ2h0LFxuICAgICAgICAgICAgJ291dGxpbmUnIDogJ25vbmUnLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJyA6ICdhYnNvbHV0ZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgb2JqLmNzcyh7XG4gICAgICAgICAgICAnbGluZS1oZWlnaHQnIDogJzEnLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJyA6IHNldHRpbmdzLnBvc2l0aW9uaW5nXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoOiBwYXJzZUludChvYmoub3V0ZXJXaWR0aCgpLCAxMCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXJIZWlnaHQ6IHBhcnNlSW50KG9iai5vdXRlckhlaWdodCgpLCAxMCkgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICB0YWJXaWR0aDogcGFyc2VJbnQoc2V0dGluZ3MudGFiSGFuZGxlLm91dGVyV2lkdGgoKSwgMTApICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgdGFiSGVpZ2h0OiBwYXJzZUludChzZXR0aW5ncy50YWJIYW5kbGUub3V0ZXJIZWlnaHQoKSwgMTApICsgJ3B4J1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgLy9zZXQgY2FsY3VsYXRlZCBjc3NcbiAgICAgICAgaWYoc2V0dGluZ3MudGFiTG9jYXRpb24gPT09ICd0b3AnIHx8IHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgb2JqLmNzcyh7J2xlZnQnIDogc2V0dGluZ3MubGVmdFBvcyArICc1cHgnfSk7XG4gICAgICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY3NzKHsncmlnaHQnIDogMH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2V0dGluZ3MudGFiTG9jYXRpb24gPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBvYmouY3NzKHsndG9wJyA6ICctJyArIHByb3BlcnRpZXMuY29udGFpbmVySGVpZ2h0fSk7XG4gICAgICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY3NzKHsnYm90dG9tJyA6ICctJyArIHByb3BlcnRpZXMudGFiSGVpZ2h0fSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgIG9iai5jc3Moeydib3R0b20nIDogJy0nICsgcHJvcGVydGllcy5jb250YWluZXJIZWlnaHQsICdwb3NpdGlvbicgOiAnZml4ZWQnfSk7XG4gICAgICAgICAgICBzZXR0aW5ncy50YWJIYW5kbGUuY3NzKHsndG9wJyA6ICctJyArIHByb3BlcnRpZXMudGFiSGVpZ2h0fSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAnbGVmdCcgfHwgc2V0dGluZ3MudGFiTG9jYXRpb24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgICAgIG9iai5jc3Moe1xuICAgICAgICAgICAgICAgICdoZWlnaHQnIDogcHJvcGVydGllcy5jb250YWluZXJIZWlnaHQsXG4gICAgICAgICAgICAgICAgJ3RvcCcgOiBzZXR0aW5ncy50b3BQb3NcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBzZXR0aW5ncy50YWJIYW5kbGUuY3NzKHsndG9wJyA6IDB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgIG9iai5jc3MoeyAnbGVmdCc6ICctJyArIHByb3BlcnRpZXMuY29udGFpbmVyV2lkdGh9KTtcbiAgICAgICAgICAgIHNldHRpbmdzLnRhYkhhbmRsZS5jc3MoeydyaWdodCcgOiAnLScgKyBwcm9wZXJ0aWVzLnRhYldpZHRofSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgb2JqLmNzcyh7ICdyaWdodCc6ICctJyArIHByb3BlcnRpZXMuY29udGFpbmVyV2lkdGh9KTtcbiAgICAgICAgICAgIHNldHRpbmdzLnRhYkhhbmRsZS5jc3MoeydsZWZ0JyA6ICctJyArIHByb3BlcnRpZXMudGFiV2lkdGh9KTtcblxuICAgICAgICAgICAgJCgnaHRtbCcpLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZnVuY3Rpb25zIGZvciBhbmltYXRpb24gZXZlbnRzXG5cbiAgICAgICAgc2V0dGluZ3MudGFiSGFuZGxlLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBzbGlkZUluID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7dG9wOictJyArIHByb3BlcnRpZXMuY29udGFpbmVySGVpZ2h0fSwgc2V0dGluZ3Muc3BlZWQpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7bGVmdDogJy0nICsgcHJvcGVydGllcy5jb250YWluZXJXaWR0aH0sIHNldHRpbmdzLnNwZWVkKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICAgICAgICAgIG9iai5hbmltYXRlKHtyaWdodDogJy0nICsgcHJvcGVydGllcy5jb250YWluZXJXaWR0aH0sIHNldHRpbmdzLnNwZWVkKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7Ym90dG9tOiAnLScgKyBwcm9wZXJ0aWVzLmNvbnRhaW5lckhlaWdodH0sIHNldHRpbmdzLnNwZWVkKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHNsaWRlT3V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PSAndG9wJykge1xuICAgICAgICAgICAgICAgIG9iai5hbmltYXRlKHt0b3A6Jy0zcHgnfSwgIHNldHRpbmdzLnNwZWVkKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PSAnbGVmdCcpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7bGVmdDonLTNweCd9LCAgc2V0dGluZ3Muc3BlZWQpLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNldHRpbmdzLnRhYkxvY2F0aW9uID09ICdyaWdodCcpIHtcbiAgICAgICAgICAgICAgICBvYmouYW5pbWF0ZSh7cmlnaHQ6Jy0zcHgnfSwgIHNldHRpbmdzLnNwZWVkKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzZXR0aW5ncy50YWJMb2NhdGlvbiA9PSAnYm90dG9tJykge1xuICAgICAgICAgICAgICAgIG9iai5hbmltYXRlKHtib3R0b206Jy0zcHgnfSwgIHNldHRpbmdzLnNwZWVkKS5hZGRDbGFzcygnb3BlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBjbGlja1NjcmVlblRvQ2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG9iai5jbGljayhmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgJChkb2N1bWVudCkuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzbGlkZUluKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgY2xpY2tBY3Rpb24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2V0dGluZ3MudGFiSGFuZGxlLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc0NsYXNzKCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlT3V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNsaWNrU2NyZWVuVG9DbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBob3ZlckFjdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBvYmouaG92ZXIoXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVPdXQoKTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudGFiSGFuZGxlLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNDbGFzcygnb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUluKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjbGlja1NjcmVlblRvQ2xvc2UoKTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIC8vY2hvb3NlIHdoaWNoIHR5cGUgb2YgYWN0aW9uIHRvIGJpbmRcbiAgICAgICAgaWYgKHNldHRpbmdzLmFjdGlvbiA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgICAgY2xpY2tBY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZXR0aW5ncy5hY3Rpb24gPT09ICdob3ZlcicpIHtcbiAgICAgICAgICAgIGhvdmVyQWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9O1xufSkoalF1ZXJ5KTtcblxuLyoqKiogL1NpZGViYXIgTWFwIE1lbnUgKioqKi9cbiJdLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
