// Bind Mouse Enter Function
this.bindMouseEnter = function(element, settings) {
    // Bind a 'mouseenter' event listener to the element
    element.addEventListener('mouseenter', function(event) {
        // When the user enters the element, create the mouse-tip element with a message defined from the elements 'mousetip-msg' attribute, ...
        var mouseTip = document.createElement('span'),
            elMsg = element.getAttribute('mousetip-msg'),
            mouseTipMsg = document.createTextNode(elMsg),
            // ... attempt to grab any styling attributes, ...
            mouseTipZIndex = element.getAttribute('mousetip-css-zindex'),
            mouseTipPosition = element.getAttribute('mousetip-css-position'),
            mouseTipPadding = element.getAttribute('mousetip-css-padding'),
            mouseTipBorderRadius = element.getAttribute('mousetip-css-borderradius'),
            mouseTipBackground = element.getAttribute('mousetip-css-background'),
            mouseTipColor = element.getAttribute('mousetip-css-color');
        // ... give the mouse-tip an id for easier DOM selection, ...
        mouseTip.id = 'mousetip';
        // ... set the default styles of the mouse-tip (use styling attributes if applicable), ...
        mouseTip.style.zIndex = mouseTipZIndex || settings.cssZIndex;
        mouseTip.style.position = mouseTipPosition || settings.cssPosition;
        mouseTip.style.padding = mouseTipPadding || settings.cssPadding;
        mouseTip.style.borderRadius = mouseTipBorderRadius || settings.cssBorderRadius;
        mouseTip.style.background = mouseTipBackground || settings.cssBackground;
        mouseTip.style.color = mouseTipColor || settings.cssColor;
        // ... append the message to the mouse-tip, ...
        mouseTip.appendChild(mouseTipMsg);
        // ... and append the mouse-tip to the document body
        document.body.appendChild(mouseTip);
    });
}
