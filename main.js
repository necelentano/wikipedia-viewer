// Yes, my code is disgusting, but it works

$(document).ready(function() {
    "use strict";
    
    $("#search_area button").click(function() {
        
        var returnBool = false;

// Get Wiki API and show on page data function _________________________________________________________________
        var mainWikiFunc = function() {

            var searchQuery = $('#search_area input').val();
                       

            var WIKI_API = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + encodeURIComponent(searchQuery);

            $.ajax({
                url: WIKI_API,
                type: "GET",
                dataType: 'jsonp', // dataType: 'jsonp' Cross-origin issue hack
                success: function (data, status, error) {

                for(var i = 0; i < data[1].length; i++) {
                  $('.item_wrapper').append('<a id="item"></a>');
                }

                for(var j = 0; j < data[1].length; j++) {
                  var child = $('.item_wrapper').children()[j];
                  $('<span class="item_h">' + data[1][j] + '</span>').appendTo(child);
                  $('<span class="item_desc">' + data[2][j] + '</span>').appendTo(child);
                  $(child).attr('href', data[3][j]).attr('target', '_blank');
                }
                },
                error: function (data, status, error) {
                  console.log('error', data, status, error);
                }
            });
        };
        //____________________________________________________
        // Work with search button 
        if($(this).hasClass('active') && $('#search_area input').val().length !== 0) {

            if($('#search_area input').val() === $('#search_area input').val()) {
                $('.item_wrapper').empty();
             }
            $('.wrapper').animate({
                marginTop: '3%'
            }, 350);
            mainWikiFunc(); 
            console.log('succes');
            returnBool = false;
            
        } else if ($(this).hasClass('active') && $('#search_area input').val().length === 0) {
            $('.item_wrapper').empty();
            $("#search_area input").animate({
                width: '35px'
               },350, function() {
                $('#search_area button').removeClass('active');
               });
            $("#search_area").animate({
                left: '0px'
            },350);
            $('.wrapper').animate({
                marginTop: '15%'
            }, 350);
            returnBool = false;
            
        }  else {
            $(this).addClass('active');
            $("#search_area input").animate({
                width: '260px'
               },350);
            $("#search_area").animate({
                left: '110px'
            },350);

            returnBool = false;
        }
        return returnBool;
    });

});