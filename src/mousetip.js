function MouseTip(userSettings) {
    // Select all elements with the attribute 'mousetip' (or user-specified selector), and accept user-defined render settings or constructor defaults
    var config = userSettings || {},
        settings = {
            cssZIndex: config.cssZIndex || '9999',
            cssPosition: config.cssPosition || 'absolute',
            cssPadding: config.cssPosition || '15px',
            cssBorderRadius: config.cssPosition || '4px',
            cssBackground: config.cssBackground || 'rgba(0,0,0,0.75)',
            cssColor: config.cssColor || '#fff',
            html: config.html || true,
            position: config.position || 'bottom right',
            selector: config.selector || 'mousetip'
        };

    // Run Function
    this.run = function() {
        // Select all elements...
        var elements = document.querySelectorAll('[' + settings.selector + ']');
        // ... and for each...
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            // ... bind it to events triggered by 'mouseenter', 'mouseleave', and 'mousemove'
            this.bindMouseEnter(element, settings);
            this.bindMouseLeave(element, settings);
            this.bindMouseMove(element, settings);
        }
    };

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

    // Bind Mouse Leave Function
    this.bindMouseLeave = function(element, settings) {
        // Bind a 'mouseleave' event listener to the element
        element.addEventListener('mouseleave', function(event) {
            // When the user leaves the element, delete the mouse-tip element
            var mouseTip = document.getElementById(settings.selector);
            mouseTip.parentNode.removeChild(mouseTip);
        });
    };

    // Bind Mouse Move Function
    this.bindMouseMove = function(element, settings) {
        // Bind a 'mousemove' event listener to the element
        element.addEventListener('mousemove', function(event) {
            // When the user moves within the element, get the user's mouse X and Y, ...
            var mouseX = event.pageX,
                mouseY = event.pageY,
                // ... select the mouse-tip, ...
                mouseTip = document.getElementById(settings.selector),
                // ... then check to see if the element has a specified mousetip position
                mouseTipPos = element.getAttribute(settings.selector + '-pos') || settings.position;
            // Split the mousetip position value into a two part array...
            var posArray = mouseTipPos.split(' '),
                vertAdj, horizAdj;
            // If there are two items in the position array...
            if (posArray.length == 2) {
                // For the first item of the array (vertical position), ...
                switch (posArray[0]) {
                    // ... if it's 'bottom'...
                    case 'bottom':
                        // ... set vertAdj to 15, ...
                        vertAdj = 15;
                        break;
                    // ... if it's 'center'...
                    case 'center':
                        // ... set vertAdj to 0 minus half of the mousetip's height, ...
                        vertAdj = 0 - (mouseTip.offsetHeight / 2);
                        break;
                    // ... if it's 'top'...
                    case 'top':
                        // ... set vertAdj to -15 minues the mousetip's height, ...
                        vertAdj = -15 - mouseTip.offsetHeight;
                        break;
                    // ... otherwise, ...
                    default:
                        // ... set vertAdj to 15 (Default: 'bottom')
                        vertAdj = 15;
                }
                // For the second item in the array (horizontal position), ...
                switch (posArray[1]) {
                    // ... if it's 'right'...
                    case 'right':
                        // ... set horizAdj to 15, ...
                        horizAdj = 15;
                        break;
                    // ... if it's 'center'...
                    case 'center':
                        // ... set horizAdj to 0 minus half of the mousetip's width, ...
                        horizAdj = 0 - (mouseTip.offsetWidth / 2);
                        break;
                    // ... if it's 'left'...
                    case 'left':
                        // ... set horizAdj to -15 minus the mousetip's width
                        horizAdj = -15 - mouseTip.offsetWidth;
                        break;
                    // ... otherwise, ...
                    default:
                        // ... set horizAdj to 15 (Default: 'right')
                        horizAdj = 15;
                }
            } else {
                // ... otherwise, set the adjustment variables to 15 and 15 (Default: 'bottom right')
                vertAdj = 15;
                horizAdj = 15;
            }
            // ... then set the mousetip's top and left based on the mouse's X and Y plus the vertical and horizontal adjustments
            mouseTip.style.top = mouseY + vertAdj + 'px';
            mouseTip.style.left = mouseX + horizAdj + 'px';
        });
    };
}
