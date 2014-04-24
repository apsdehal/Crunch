muzi = muzi || {};
muzi = $.extend(muzi, {

    initialize: function(){
        muzi.home();
        muzi.hooks();
    },

    home: function(){
        $.getJSON('track/top.php',{},function(data){
            muzi.loadContent(data);
        });
    },

    loadContent: function(data){
        var html = '';
            html += '<ul data-role="listview" data-inset="true" data-filter="true">'
            for(i in data){
                html += '<li><div>' + data[i].title + '</div>\
                        <div>' + data[i].artist + '</div>\
                        <div>' + data[i].album + '</div>\
                        </li>';
            }
            html += '</ul>';
            $(".box").html(html);
    },

    search: {
        init: function(query){
            $.getJSON('search/', {search:query}, function(data){
                muzi.loadContent(data.tracks);
            })
        }

    },

    hooks: function(){
        $(".main").delegate('#search_text','keyup',function(e){
                muzi.search.init(e.target.value);
        });
    }
});
