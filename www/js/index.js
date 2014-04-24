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
            if(muzi.search.xhr){
                muzi.search.xhr.abort()
                muzi.search.xhr = false
            }
            // $.ajax({
            //     dataType:'json',
            //     type: 'GET',
            //     url:'search',
            //     data: {search:query},
            //     success: function(data){
            //         console.log('hello');
            //         muzi.loadContent(data);
            //         muzi.search.xhr = false;
            //     },
            //     error: function(data, x, y){
            //         console.log(data);
            //         console.log(x);
            //         console.log(y);
            //     }
            // });
            $.getJSON('search', {search:query}, function(data){
                console.log(data);
            })
        }

    },
    hooks: function(){
        $(".main").delegate('#search_text','keyup',function(e){
                muzi.search.init(e.target.value);
        });
    }
});
