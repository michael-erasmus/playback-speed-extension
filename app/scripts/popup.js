'use strict';

var elements = document.querySelectorAll('.speed');

Array.prototype.forEach.call(elements, function(el){
    el.onchange = function () {
        var label = document.querySelectorAll('#speed-label');

        Array.prototype.forEach.call(label, function(lbl){
            lbl.innerHTML = el.value + 'x';
        });
    };
    el.oninput = el.onchange;
});
