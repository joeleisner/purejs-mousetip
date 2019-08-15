class MouseTip {
    // Construct the class
    constructor({
        cssZIndex       = '9999',
        cssPosition     = 'absolute',
        cssPadding      = '15px',
        cssBorderRadius = '4px',
        cssBackground   = 'rgba(0,0,0,0.75)',
        cssColor        = '#fff',
        html            = true,
        msg             = '',
        position        = 'bottom right',
        selector        = 'mousetip',
        stylesheet      = false
    } = {}) {
        // Assign the settings to the class,...
        this.html            = html;
        this.msg             = msg;
        this.position        = position;
        this.selector        = selector;
        this.stylesheet      = stylesheet;
        // ... and if a stylesheet has been enabled, do nothing more
        if (this.stylesheet) return;
        // Otherwise, assign the CSS settings to the class as well
        this.cssZIndex       = cssZIndex;
        this.cssPosition     = cssPosition;
        this.cssPadding      = cssPadding;
        this.cssBorderRadius = cssBorderRadius;
        this.cssBackground   = cssBackground;
        this.cssColor        = cssColor;
    }

    // Delete the mousetip
    deleteMouseTip() {
        // If a mousetip is stored,...
        if (this.mouseTip) {
            // ... remove it from the page...
            this.mouseTip.parentNode.removeChild(this.mouseTip);
            // ... and delete it
            delete this.mouseTip;
        }

        // If a target element is stored, delete it
        if (this.target) delete this.target;
    }

    // Create the mousetip
    createMouseTip(event) {
        // Create the mousetip
        const mouseTip = document.createElement('span');
        // Store the styling either from the target element's attributes or the constructor settings
        const zIndex     = this.target.getAttribute(this.selector + '-css-zindex')       || this.cssZIndex,
            position     = this.target.getAttribute(this.selector + '-css-position')     || this.cssPosition,
            padding      = this.target.getAttribute(this.selector + '-css-padding')      || this.cssPadding,
            borderRadius = this.target.getAttribute(this.selector + '-css-borderradius') || this.cssBorderRadius,
            background   = this.target.getAttribute(this.selector + '-css-background')   || this.cssBackground,
            color        = this.target.getAttribute(this.selector + '-css-color')        || this.cssColor;
        // Assign the ID and styling to the mousetip
        mouseTip.id                 = this.selector;
        mouseTip.style.zIndex       = zIndex;
        mouseTip.style.position     = position;
        mouseTip.style.padding      = padding;
        mouseTip.style.borderRadius = borderRadius;
        mouseTip.style.background   = background;
        mouseTip.style.color        = color;
        // Grab the message and HTML attributes from the event target
        const message = this.target.getAttribute(this.selector + '-msg') || this.msg,
            html      = this.html ?
                this.target.hasAttribute(this.selector + '-disable-html') :
                this.target.hasAttribute(this.selector + '-enable-html');
        // If HTML is disabled globally and on the target element (or the inverse)...
        if ((!this.html && !html) || (this.html && html)) {
            // ... append the message to the mousetip as a text-node...
            mouseTip.appendChild(document.createTextNode(message));
        } else {
            // ... otherwise, append the message to the mousetip as HTML
            mouseTip.innerHTML = message;
        }

        // Update the mousetip before rendering
        this.updateMouseTip(event, mouseTip);

        // Append the mousetip to the bottom of the page...
        document.body.appendChild(mouseTip);
        // ... and store the mousetip
        this.mouseTip = document.getElementById(this.selector);
    }

    // Update the mousetip
    updateMouseTip(event, reference) {
        // Grab the X/Y of the mouse,...
        const {
                pageX: mouseX,
                pageY: mouseY
            }             = event,
            // ... make the mousetip to update the passed in reference or the globally stored one,...
            mouseTip      = reference || this.mouseTip,
            // ... and set the default adjustment to 15
            defaultAdjust = 15;
        // Get the mousetip position from the target element or the constructor
        let position = (this.target.getAttribute(this.selector + '-pos') || this.position).split(' '),
            verticalAdjust, horizontalAdjust;
        // If the position does not contain two items, set it to the default
        if (position.length !== 2) position = [ 'bottom', 'right' ];
        // Set the vertical adjustment from the first item of position
        switch(position[0]) {
        case 'top':
            verticalAdjust = -defaultAdjust - this.mouseTip.offsetHeight;
            break;
        case 'center':
            verticalAdjust = 0 - (this.mouseTip.offsetHeight / 2);
            break;
        default:
            verticalAdjust = defaultAdjust;
        }
        // Set the horizontal adjustment from the second item of position
        switch(position[1]) {
        case 'left':
            horizontalAdjust = -defaultAdjust - this.mouseTip.offsetWidth;
            break;
        case 'center':
            horizontalAdjust = 0 - (this.mouseTip.offsetWidth / 2);
            break;
        default:
            horizontalAdjust = defaultAdjust;
        }
        // Update the mousetip's position
        mouseTip.style.top  = `${ mouseY + verticalAdjust }px`;
        mouseTip.style.left = `${ mouseX + horizontalAdjust }px`;
    }

    // Handle mouse events
    handleEvent(event) {
        // Try and find the target in the stored reference elements
        const match = this.targets.find(target => target.contains(event.target));

        // If no target was found, attempt to delete the mousetip
        if (!match) return this.deleteMouseTip();

        // If no current target is stored,...
        if (!this.target) {
            // ... store it...
            this.target = match;
            // ... and create the mousetip
            return this.createMouseTip(event);
        }

        // Otherwise, update the mousetip
        return this.updateMouseTip(event);
    }

    // Start handling mouse events
    start() {
        // Grab all target elements by selector
        const targets = Array.from(document.querySelectorAll(`[${ this.selector }]`));

        // If no target elements were found, do nothing
        if (!targets) return;

        // Store the target elements for reference,...
        this.targets = targets;
        // ... and bind to the document's mouse move events
        document.addEventListener('mousemove', this, false);
    }

    // Stop handling mouse events
    stop() {
        // If no element references are stored, return
        if (!this.targets.length) return;

        // Unbind from the document's mouse move events
        document.removeEventListener('mousemove', this, false);

        // Delete the stored target elements for reference...
        delete this.targets;
        // ... and the mousetip
        this.deleteMouseTip();
    }
}
