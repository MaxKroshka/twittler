 $(document).ready(function() {
   var $timeline = $('.timeline');
   var historyLength = streams.home.length;
   var userTweets = false;
   var selectedUser;
   var selectedUserHistory;

   var tweetAppend = function(index, bold, user) {
     var tweet = user ? streams.users[user][index] : streams.home[index];
     var $tweet = bold ? $("<div class='post bold'></div>") : $('<div class="post"></div>');
     var time = Math.floor(tweet.created_at / 1000);
     $tweet.html("<img class=tweetPic src=" + tweet.user + ".jpg>" + '@' + "<a class=" + tweet.user + " href='#'>" + tweet.user + "</a>" + ': ' + tweet.message + " <span data-livestamp=" + time + "></span>");
     $tweet.prependTo($timeline);
   }
   var initialLoad = function(user) {
     var length = user ? streams.users[user].length : streams.home.length;
     $timeline.html('');
     var index = length - 1;
     while (index >= 0) {
       tweetAppend(index, false, user);
       index -= 1;
     }
   }

   initialLoad();

   var refresh = function() {
     $('div').removeClass('bold');
     if (!userTweets) {
       var currentLength = streams.home.length;
       if (currentLength > historyLength) {
         var difference = currentLength - historyLength;
         for (var i = 0; i < difference; i++) {
           tweetAppend(i, true);
         }
         historyLength = currentLength;
       }
     } else {
       var currentLength = streams.users[selectedUser].length;
       if (currentLength > selectedUserHistory) {
         var difference = currentLength - selectedUserHistory;
         for (var i = 0; i < difference; i++) {
           tweetAppend(i, true, selectedUser);
         }
         selectedUserHistory = currentLength;
       }
     }
   }

   $(".refresh").click(function() {
     refresh();
   });
   $(".home").click(function() {
    if(userTweets){
     initialLoad();
     userTweets = false;
    }else{
      refresh();
    }
   });

   $timeline.on('click','a', function() {
    if(selectedUser === this.getAttribute('class')){
      refresh();
    }else{
     selectedUser = this.getAttribute('class');
     initialLoad(selectedUser);
     userTweets = true;
     selectedUserHistory = streams.users[selectedUser].length;
   }
   });

 });