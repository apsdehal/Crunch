crunch = crunch || {};
crunch = $.extend(crunch, {

    current: {
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
            crunch.current.data = data;
            var file = crunch.config.music + data.file.split('/').map(function(x){return encodeURIComponent(x);}).join('/');
            crunch.current.nowPlaying = new Howl({
                urls: [file],
                buffer: true,
            }).play();
        });
    },

    loadContent: function(data){
        var html = '';
            html += '<ul data-role="listview" data-inset="true" data-filter="true">'
            for(i in data){
                html += '<li class="trackLi" data-mid="' + data[i].id + '"><div>' + data[i].title + '</div>\
                        <div>' + data[i].artist + '</div>\
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
    },
});
