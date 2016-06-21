// Bind Mouse Move Function
this.bindMouseMove = function(element, positionDefault) {
    // Bind a 'mousemove' event listener to the element
    element.addEventListener('mousemove', function(event) {
        // When the user moves within the element, get the user's mouse X and Y, ...
        var mouseX = event.pageX,
            mouseY = event.pageY,
            // ... select the mouse-tip, ...
            mouseTip = document.getElementById('mousetip'),
            // ... then check to see if the element has a specified mousetip position
            mouseTipPos = element.getAttribute('mousetip-pos') || positionDefault;
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
