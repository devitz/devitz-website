// 21 Dez 2012, 4:42
;(function ($, window, document, undefined) {
    'use strict';
    ({
        animateScroll : function () {
            $("#nav").find('.nav-link').on('click', function (event) {

                var $this = $(this),
                    $htmlBody = $('html, body'),
                    linkTarget = $this.attr('href'),
                    offSetTop;

                // If not start with #, stop here!
                if (linkTarget[0] !== '#') {
                    return false;
                }

                event.preventDefault();

                // Get distance of top
                offSetTop = $(linkTarget).offset().top;

                // Animate the scroll
                $htmlBody.stop().animate({scrollTop : offSetTop}, function () {
                    location.hash = linkTarget;
                });
            });
        },

        countDown : function () {
            function get_time_difference(earlierDate,laterDate) {
                var nTotalDiff = laterDate.getTime() - earlierDate.getTime(),
                    oDiff = new Object();

                oDiff.days = Math.floor(nTotalDiff/1000/60/60/24);
                nTotalDiff -= oDiff.days*1000*60*60*24;

                oDiff.hours = Math.floor(nTotalDiff/1000/60/60);
                nTotalDiff -= oDiff.hours*1000*60*60;
                
                oDiff.minutes = Math.floor(nTotalDiff/1000/60);
                nTotalDiff -= oDiff.minutes*1000*60;

                oDiff.seconds = Math.floor(nTotalDiff/1000);
                
                if (oDiff.days < 10) oDiff.days = '0' + oDiff.days;
                if (oDiff.hours < 10) oDiff.hours = '0' + oDiff.hours;
                if (oDiff.minutes < 10) oDiff.minutes = '0' + oDiff.minutes;
                if (oDiff.seconds < 10) oDiff.seconds = '0' + oDiff.seconds;

                return oDiff;
            }

            var dateCurrent = new Date(),
                eventDate = new Date(2016, 10, 5, 9, 0, 0),
                timeDifference = get_time_difference(dateCurrent, eventDate);

            $('#counter:visible').countdown({
              image: 'assets/lib/countdown/img/digits.png',
              startTime: timeDifference.days+':'+timeDifference.hours+':'+timeDifference.minutes+':'+timeDifference.seconds,
              format: "dd:hh:mm:ss",
            });
        },

        confirmUser: function () {
            var qs = window.location.search;
            if (qs) {
                var qs = qs.split('=');

                if (qs[0] === '?confirmed') {
                    var name = decodeURIComponent(qs[1].replace('/', '')),
                        $confirmated = $('#confirmated');

                    $confirmated.find('p').text($confirmated.find('p').text().replace('{name}', name));
                    $confirmated.animate({
                        top: '40%'
                    }, 1000);
                    $confirmated.find('a').on('click', function(e){
                        $confirmated.fadeOut();
                        e.preventDefault();
                    });
                }
            }
        },

        init : function () {
            var that = this;

            $(function () {
                that.animateScroll();
                that.countDown();
                that.confirmUser();
            });
        }
    }).init();
}(jQuery, window, document));
