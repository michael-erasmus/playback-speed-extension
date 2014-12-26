'use strict';

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

var elements = document.querySelectorAll('.speed');

Array.prototype.forEach.call(elements, function(el){
  el.onchange = function () {
    var code = '(' + setSpeed.toString() + '(' + el.value +' ))';
    chrome.tabs.executeScript(null, {code:code, allFrames: true});
    setSpeedLabel(el.value);
  };
  el.oninput = el.onchange;
});
