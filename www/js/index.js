var muzi = {

    initialize: function(){
        muzi.home();
    },

    home: function(){
        $.getJSON('https://beta.sdslabs.co.in/muzi/ajax/track/top.php',{},function(data){
            $(".content").html(data);
        });
    },
};
