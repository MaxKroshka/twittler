$(document).ready(function() {
  var $timeline = $('.timeline');
  var historyLength = streams.home.length;

  var tweetAppend = function(index, bold) {
    var tweet = streams.home[index];
    if (bold === undefined) {
      var $tweet = $('<div class="post"></div>');
    } else {
      $tweet = $("<div class='post bold'></div>");
    }
    var time = Math.floor(tweet.created_at/1000);
    $tweet.html("<img class=tweetPic src="+tweet.user+".jpg>"+'@' + tweet.user + ': ' + tweet.message+"<span data-livestamp="+time+"></span>"); 
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

  var refresh = function() {
    $('div').removeClass('bold');
    var currentLength = streams.home.length;
    if (currentLength > historyLength) {
      var difference = currentLength - historyLength;
      for (var i = 0; i < difference; i++) {
        tweetAppend(i, true);
      }
      historyLength = currentLength;
    }
  }
  $(".refresh").click(function() {
    refresh();
  });
});