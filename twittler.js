$(document).ready(function() {
  var $timeline = $('.timeline');
  var historyLength = streams.home.length;

  var tweetAppend = function(index) {
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + " " + jQuery.timeago(tweet.created_at));
    $tweet.appendTo($timeline);
  }
  var initialLoad = function() {
    $timeline.html();
    var index = streams.home.length - 1;
    while (index >= 0) {
      tweetAppend(index);
      index -= 1;
    }
  }
  initialLoad();

  var refresh = function(){
    var currentLength = streams.home.length;
    console.log(currentLength);
    if(currentLength > historyLength){
      var difference = currentLength - historyLength;
      for(var i=0;i<difference;i++){
        tweetAppend(i);
      }
      historyLength = currentLength;
    }
  }
  $(".refresh").click(function(){
    refresh();
  });
});