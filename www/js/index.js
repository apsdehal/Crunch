crunch = crunch || {};
crunch = $.extend(crunch, {

    media: {
        track: null,
        nowPlaying: false,
        data: null
    },

    initialize: function(){
        crunch.home();
        crunch.hooks();
    },

    home: function(){
        $.getJSON('track/top.php',{},function(data){
            crunch.loadContent(data);
        });
    },

    play: function(id){
        $.get('track/',{id:id}, function(data){
            crunch.media.data = data;

            if( crunch.media.nowPlaying == true)
                crunch.media.stop();

            var file = crunch.config.musicRoot + data.file.split('/').map(function(x){return encodeURIComponent(x);}).join('/');
            crunch.media = new Media(file);
            crunch.media.play();
            crunch.postPlay();
        });
    },

    pause: function(){
        if(crunch.media){
            crunch.media.pause();
            crunch.playToggle()
        }
    },

    getTotalDuration: function(){
        if(crunch.media)
            return crunch.media.getDuration();
        else
            return false;
    },

    getCurrentPosition: function(){
        if(crunch.media)
            return crunch.media.getCurrentPosition();
        else
            return false;
    },

    seek: function(obj){

    },

    postPlay: function(){
        crunch.playToggle();
    },

    resume: function(){
        if(crunch.media && !crunch.media.nowPlaying){
            crunch.media.play();
            crunch.playToggle();
        }
    },

    loadContent: function(data){
        var html = '';
            html += '<ul data-role="listview" data-inset="true" data-filter="true">'
            for(i in data){
                html += '<li class="trackLi" data-mid="' + data[i].id + '">\
                        <div class="album-art-div"><img class="album-art" \
                        src="'+crunch.config.picsRoot+data[i]['albumId']+'.jpg" /></div>\
                        <div><span>' + data[i].title + '</span>\
                        <span>' + data[i].artist + '</span></div>\
                        </li>';
            }
            html += '</ul>';
            $(".box").html(html);
    },

    search: {
        init: function(query){
            $.getJSON('search/', {search:query}, function(data){
                crunch.loadContent(data.tracks);
            })
        }

    },

    hooks: function(){
        var mainHandle = $(".main");
        mainHandle.delegate('#search_text','keyup',function(e){
                crunch.search.init(e.target.value);
        });

        mainHandle.delegate('.trackLi', 'click', function(){
            crunch.play($(this).attr('data-mid'));
        });

        mainHandle.delegate('.active-pause', 'click', function(){
            crunch.pause();
        });
        mainHandle.delegate('.active-play', 'click', function(){
            crunch.resume();
        });

    },

    playToggle: function(){
        if(crunch.media.nowPlaying){
            $('.playButton').removeClass('active-pause');
            $('.playButton').addClass('active-play');
            crucnh.media.nowPlaying = false;
        } else {
            $('.playButton').removeClass('active-play');
            $('.playButton').addClass('active-pause');
            crunch.media.nowPlaying = true;
        }
    }
});
