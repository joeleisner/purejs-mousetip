// Bind Mouse Enter Function
this.bindMouseEnter = function(element, settings) {
    // Bind a 'mouseenter' event listener to the element
    element.addEventListener('mouseenter', function(event) {
        // When the user enters the element, create the mouse-tip element with a message defined from the elements 'mousetip-msg' attribute, ...
        var mouseTip = document.createElement('span'),
            elMsg = element.getAttribute(settings.selector + '-msg'),
            mouseTipMsg = document.createTextNode(elMsg),
            // ... toggle which HTML attribute to look for based on the global settings, ...
            mouseTipHTML = settings.html ? element.hasAttribute(settings.selector + '-disable-html') : element.hasAttribute(settings.selector + '-enable-html'),
            // ... attempt to grab any styling attributes, ...
            mouseTipZIndex = element.getAttribute(settings.selector + '-css-zindex'),
            mouseTipPosition = element.getAttribute(settings.selector + '-css-position'),
            mouseTipPadding = element.getAttribute(settings.selector + '-css-padding'),
            mouseTipBorderRadius = element.getAttribute(settings.selector + '-css-borderradius'),
            mouseTipBackground = element.getAttribute(settings.selector + '-css-background'),
            mouseTipColor = element.getAttribute(settings.selector + '-css-color');
        // ... give the mouse-tip an id for easier DOM selection, ...
        mouseTip.id = settings.selector;
        // ... set the default styles of the mouse-tip (use styling attributes if applicable), ...
        mouseTip.style.zIndex = mouseTipZIndex || settings.cssZIndex;
        mouseTip.style.position = mouseTipPosition || settings.cssPosition;
        mouseTip.style.padding = mouseTipPadding || settings.cssPadding;
        mouseTip.style.borderRadius = mouseTipBorderRadius || settings.cssBorderRadius;
        mouseTip.style.background = mouseTipBackground || settings.cssBackground;
        mouseTip.style.color = mouseTipColor || settings.cssColor;
        // ... if HTML is disabled globally and not enabled via attribute, or enabled globally and disabled via attribute...
        if ((!settings.html && !mouseTipHTML) || (settings.html && mouseTipHTML)) {
            // ... append the message to the mouse-tip as a text-node...
            mouseTip.appendChild(mouseTipMsg);
        } else {
            // ... otherwise, append the message to the mouse-tip as HTML...
            mouseTip.innerHTML = elMsg;
        }
        // ... and append the mouse-tip to the document body
        document.body.appendChild(mouseTip);
    });
};
