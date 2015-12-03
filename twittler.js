$(document).ready(function() {
  var $timeline = $('.timeline');

  var tweetAppend = function(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text(tweet.created_at+' @' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($timeline);
  }
var initialLoad = function(){
    $timeline.html();
    var index = streams.home.length - 1;
    while (index >= 0) {
      tweetAppend(index);
      index -= 1;
    }
  }
initialLoad();

// $(".refresh").on('click',refresh());

});
