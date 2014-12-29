'use strict';

var getSpeed = function () {
  var speed = 0;
  Array.prototype.forEach.call(document.querySelectorAll('video'),function (v) {
    speed = v.playbackRate;
  });
  return speed;
};
var setSpeed = function (speed) {
  Array.prototype.forEach.call(document.querySelectorAll('video'),function (v) {
    v.playbackRate = speed;
  });
};

var setSpeedLabel = function(speed) {
  var label = document.querySelectorAll('#speed-label');

  Array.prototype.forEach.call(label, function(lbl){
    lbl.innerHTML = speed + 'x';
  });
};

var setSpeedBadge = function(speed) {
  chrome.browserAction.setBadgeText({text: speed + 'x'});
};

var elements = document.querySelectorAll('.speed');

Array.prototype.forEach.call(elements, function(el){
  //grab the current speed
  var getSpeedCode = '(' + getSpeed.toString() + '())';
  chrome.tabs.executeScript(null, {code:getSpeedCode, allFrames: true}, function(response){
    for(var o in response) {
      if(response[o] > 0) {
        setSpeedLabel(response[o]);
        setSpeedBadge(response[o]);
      }
    }
  });

  el.onchange = function () {
    var setSpeedCode = '(' + setSpeed.toString() + '(' + el.value +' ))';
    chrome.tabs.executeScript(null, {code:setSpeedCode, allFrames: true});
    setSpeedLabel(el.value);
    setSpeedBadge(el.value);
  };
  el.oninput = el.onchange;
});
