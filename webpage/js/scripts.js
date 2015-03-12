var fullscreen = false;
var video;

$(document).ready(function() {
    video = document.getElementById('video');

    if ($('#start-page').hasClass('active'))
        $('.content').addClass('small');
    else
        $('.content').removeClass('small');

    /* Connect to server */
    $('#connect').click(function() {
        $('#start-page').animate({'opacity': '.1', 'pointer-events': 'none'}, 200);
        $('#loader-page').fadeIn(200);
        $('#loader').addClass('load');

        if ($('#host').val() !== "")
            connect($('#host').val());
        else
            connect('http://op-en.se:5000');

        setTimeout(function() {
            $('#start-page').removeClass('active');
            $('#loader-page').fadeOut(200);
            $('.content').removeClass('small');
            setTimeout(function() {
                $('#loader').removeClass('load');
            }, 200);
            $('#video-page').addClass('active');
            $('#start-page').removeAttr('style');
        }, 1000);
    });

    var timestamps = getTimestamps();

    var coins = 96;

    video.addEventListener('timeupdate', function() {
        if (this.currentTime >= timestamps[coins]) {
            this.pause();
            if (++coins >= timestamps.length) {
                video.removeEventListener('timeupdate', arguments.callee);
            }
        }
    });

    /* On settings or statistics icon click */
    $('.toggle').click(function() {
        toggle(this);
    });

    /* Go back to start page */
    $('#back').on('click', function() {
        $('#video-page').removeClass('active');
        $('#start-page').addClass('active');
        $('.content').addClass('small');
    });

    /* Show/hide fullscreen icons and cursor on inactivity */
    var timer;
    document.getElementById('video-page').addEventListener('mousemove', function() {
        $('#toggle-stats').show();
        $('#fullscreen').show();
        clearTimeout(timer);
        timer = setTimeout(function() {
            if(fullscreen) $('#toggle-stats').fadeOut(200);
            $('#fullscreen').fadeOut(200);
        }, 1500 );
    });

    /* Set fullscreen on icon click or double click */
    $('#fullscreen').click(function() {
        toggleFullscreen();
        $('#toggle-stats').toggleClass('closed');
    });
    $('#video').dblclick(function() {
        toggleFullscreen();
    });

    /* Set fullscreen on f keyup */
    $(document).keyup(function(e) {
        if ($('*:focus').length === 0)
            if (e.keyCode == 70)
                toggleFullscreen();
    });

    /* Play video on space keydown */
    $(document).keydown(function(e) {
        if (e.keyCode == 32)
            video.play();
    });

	$('#price').on('keyup', function() {
		updateStat();
	});

    /* On fullscreen exit */
    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function() {
        if (!(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen)) {
            fullscreen = false;
            $('#fullscreen').css({'background-image': 'url(images/fullscreen.svg)', 'position': 'absolute'});
            $('#stats').removeClass('fullscreen');
        }
    });

    /* Disable right click on video */
    $("video").bind("contextmenu",function(){
        return false;
    });
});

/* Toggle fullscreen */
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement ) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        }
        fullscreen = true;
        $('#stats-image').css({'background-image': 'url(images/arrow-reverse.png)'});
        $('#fullscreen').css({'background-image': 'url(images/fullscreen-exit.svg)', 'position': 'fixed'});
        if (!$('#stats-image').hasClass('closed'))
            $('#stats').addClass('bg');
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        fullscreen = false;
        $('#stats-image').css({'background-image': 'url(images/arrow.png)'});
        $('#fullscreen').css({'background-image': 'url(images/fullscreen.svg)', 'position': 'absolute'});
        $('#stats').removeClass('bg');
    }
    $('#stats').toggleClass('fullscreen');
}

/* Toggle settings/statistics */
function toggle(elem) {
    var button, box, section;
    if (elem == document.getElementById('toggle-stats')) {
        button = $('#toggle-stats > div');
        box = $('#stats-box');
        section = $('#stats');
    }
    else if (elem == document.getElementById('toggle-settings')) {
        button = $('#toggle-settings > div');
        box = $('#settings-box');
        section = $('#settings');
    }
    button.css({transition: '.2s'});
    if (button.hasClass('closed')) {
        box.css({marginTop: '28px'});
        box.fadeIn(200).animate({marginTop: '-=15px'},200).dequeue();
        if (stats)
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
        if (stats)
            button.css({transform: 'rotate(180deg)'});
        else
            button.css({transform: 'rotate(-180deg)'});
        button.addClass('closed');
    }
    if (fullscreen)
        section.toggleClass('bg');

}

function getTimestamps() {
    var file = "../video/timestamps",
        reader = (window.XMLHttpRequest !== null ) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    reader.open("GET", file, false);
    reader.send();
    var times =  reader.responseText.split(" ");
    var secondsTimes = [];
    for(i= 0; i < times.length; i++) {
        split = times[i].split(":");
        for(n = 0; n < 3; n++)
            split[n] = parseFloat(split[n]);
        secondsTimes.push(split[0] * 60 + split[1] + split[2]/100);
    }
    return secondsTimes;
}
