(function() {
    // Select all elements with the attribute 'mouse-tip'
    var elements = document.querySelectorAll('[mousetip]');
    // For each element selected...
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        // ... bind it to events triggered by 'mouseenter', 'mouseleave', and 'mousemove'
        bindMouseEnter(element);
        bindMouseLeave(element);
        bindMouseMove(element);
    }

    //=include ./modules/bind-mouse-enter.js
    //=include ./modules/bind-mouse-leave.js
    //=include ./modules/bind-mouse-move.js
})();
