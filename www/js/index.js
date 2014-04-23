var muzi = {

    initialize: function(){
        muzi.home();
    },

    home: function(){
        $.getJSON('https://beta.sdslabs.co.in/muzi/ajax/track/top.php',{},function(data){
            var html = '';
            html += '<ul data-role="listview" data-inset="true" data-filter="true">'
            for(i in data){
                html += '<li><div>' + data[i].title + '</div>\
                        <div>' + data[i].artist + '</div>\
                        <div>' + data[i].album + '</div>\
                        </li>';
            }
            html += '</ul>';
            $(".content").html(html);
        });
    },
};
