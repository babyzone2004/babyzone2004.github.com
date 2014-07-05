define(function(require) {
  var $ = require('jquery')
  , accumulate = require('./modules/Accumulate')
  , Game = require('./modules/Game')
  , getQueryValue = require('./modules/getQueryValue');
  var getAccumulate = function() {
   $.ajax({
     type: "GET",
     dataType: 'jsonp',
     url: 'http://rommgr.miui.com/api.php',
     cache: false,
     jsonp: "callback",
     jsonpCallback: "updateAccumulate",
     success: function(msg) {
       accumulate($("#J-accumulate"), msg.downCount);
     }
   })
  };
  getAccumulate();
  setInterval(getAccumulate, 1000);
  var game = new Game({
    timeContainer: "#timer",
    scoreContainer: ".scoreResult",
    animal1: "#animal1",
    animal2: "#animal2",
    time: 30,
    resultContainer: "#result",
    timerWrap: "#timerWrap"
  });
  $('body').on("keypress", function(event) {
    $("#playTip").hide();
    game.play();
  })
  $("#retry").on("click", function() {
    $("#result").hide();
    game.play();
  })
  var from = getQueryValue("from");
  var $goIndex = $("#goIndex");
  if(from === "miui") {
    $goIndex.text("MIUI官网");
    $goIndex.on("click", function(e) {
      e && e.preventDefault();
      location.href = "http://www.miui.com/default.php";
    })
  } else {
    $goIndex.text("应用商店官网");
  }
});
