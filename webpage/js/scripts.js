$(document).ready(function() {
    /*$('#start-page').animate({'opacity': '.1', 'pointer-events': 'none'}, 0);
    $('#loader-page').fadeIn(0);
    $('#loader').addClass('load');
    /* Connect to server */


    $('#connect').click(function() {
        $('#start-page').animate({'opacity': '.1', 'pointer-events': 'none'}, 200);
        $('#loader-page').fadeIn(200);
        $('#loader').addClass('load');
        $('#loader-small').addClass('load load-reverse');

        connect('http://op-en.se:5000');

        setTimeout(function() {
            $('#start-page').fadeOut(200);
            $('#loader-page').fadeOut(200);
            setTimeout(function() {
                $('#loader').removeClass('load');
            }, 200);
            $('#video-page').fadeIn(200);
        }, 2000);

    });

    /* On settings or statistics icon click */
    $('.toggle').click(function() {
        toggle(this);
    });

    /* Show/hide fullscren icon */
    $('#video-container').on('mouseenter', function() {
        $('#fullscreen').show();
    }).on('mouseleave', function() {
        $('#fullscreen').fadeOut(200);
    });

    /* Hide fullscreen icon and cursor on inactivity */
    var timer;
    document.getElementById('video').addEventListener('mousemove', function() {
        //document.body.style.cursor = 'default';
        $('#fullscreen').show();
        clearTimeout( timer );
        timer = setTimeout(function() {
            //document.body.style.cursor = 'none';
            $('#fullscreen').fadeOut(200);
        }, 1500 );
    });

    /* On fullscreen icon click or double click */
    $('#fullscreen').click(function() {
        fullscreen();
    });
    $('#video').dblclick(function() {
        fullscreen();
    });
});

/* Toggle fullscreen */
function fullscreen() {
    var video = document.getElementById('video');
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement ) {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        }
        $('#fullscreen').css({'background-image': 'url(images/fullscreen-exit.svg)', 'position': 'fixed'});
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        $('#fullscreen').css({'background-image': 'url(images/fullscreen.svg)', 'position': 'absolute'});
    }
}

/* Toggle settings/statistics */
function toggle(elem) {
    var button, box,
        stats = false,
        settings = false;
    if(elem == document.getElementById('toggle-stats')) {
        stats = true;
        button = $('#toggle-stats > div');
        box = $('#stats-box');
    }
    else if(elem == document.getElementById('toggle-settings')) {
        settings = true;
        button = $('#toggle-settings > div');
        box = $('#settings-box');
    }
    button.css({transition: '.2s'});
    if(button.hasClass('closed')) {
        box.css({marginTop: '28px'});
        box.fadeIn(200).animate({marginTop: '-=15px'},200).dequeue();
        if(stats)
            button.css({transform: 'rotate(360deg)'});
        else
            button.css({transform: 'rotate(-360deg)'});
        button.removeClass('closed');
        setTimeout(function() {
            button.css({transition: '0s'});
            button.css({transform: 'rotate(0deg)'});
        }, 200);
    }
    else {
        box.fadeOut(100).animate({marginTop: '-=15px'},200).dequeue();
        setTimeout(function() {
            box.css({marginTop: '+=15px'});
        }, 200);
        if(stats)
            button.css({transform: 'rotate(180deg)'});
        else
            button.css({transform: 'rotate(-180deg)'});
        button.addClass('closed');
    }
}
