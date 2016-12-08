// Bind Mouse Leave Function
this.bindMouseLeave = function(element, settings) {
    // Bind a 'mouseleave' event listener to the element
    element.addEventListener('mouseleave', function(event) {
        // When the user leaves the element, delete the mouse-tip element
        var mouseTip = document.getElementById(settings.selector);
        mouseTip.parentNode.removeChild(mouseTip);
    });
};
