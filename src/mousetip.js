class MouseTip {

    // Construct the class
    constructor(settings) {
        // Define default settings if not provided,...
        const {
            cssZIndex        = '9999',
            cssPosition      = 'absolute',
            cssPadding       = '15px',
            cssBorderRadius  = '4px',
            cssBackground    = 'rgba(0,0,0,0.75)',
            cssColor         = '#fff',
            html             = true,
            position         = 'bottom right',
            selector         = 'mousetip',
            stylesheet       = false
        } = settings || {};
        // ... assign them to the class,...
        this.html            = html;
        this.position        = position;
        this.selector        = selector;
        this.stylesheet      = stylesheet;
        // ... and if a stylesheet has been enabled, do nothing
        if (this.stylesheet) return;
        // Otherwise, assign the CSS settings to the class as well
        this.cssZIndex       = cssZIndex;
        this.cssPosition     = cssPosition;
        this.cssPadding      = cssPadding;
        this.cssBorderRadius = cssBorderRadius;
        this.cssBackground   = cssBackground;
        this.cssColor        = cssColor;
    }

    // Create the mousetip
    createMouseTip(event) {
        // Store the target element
        this.element = event.target;
        // Create the mousetip
        const mouseTip = document.createElement('span');
        // Store the styling either from the target element's attributes or the constructor settings
        const zIndex       = this.element.getAttribute(this.selector + '-css-zindex')       || this.cssZIndex;
        const position     = this.element.getAttribute(this.selector + '-css-position')     || this.cssPosition;
        const padding      = this.element.getAttribute(this.selector + '-css-padding')      || this.cssPadding;
        const borderRadius = this.element.getAttribute(this.selector + '-css-borderradius') || this.cssBorderRadius;
        const background   = this.element.getAttribute(this.selector + '-css-background')   || this.cssBackground;
        const color        = this.element.getAttribute(this.selector + '-css-color')        || this.cssColor;
        // Assign the ID and styling to the mousetip
        mouseTip.id                 = this.selector;
        mouseTip.style.zIndex       = zIndex;
        mouseTip.style.position     = position;
        mouseTip.style.padding      = padding;
        mouseTip.style.borderRadius = borderRadius;
        mouseTip.style.background   = background;
        mouseTip.style.color        = color;
        // Grab the message and HTML attributes from the event target
        const message  = this.element.getAttribute(this.selector + '-msg');
        const html     = this.html ?
            this.element.hasAttribute(this.selector + '-disable-html') :
            this.element.hasAttribute(this.selector + '-enable-html');
        // If HTML is disabled globally and on the target element (or the inverse)...
        if ((!this.html && !html) || (this.html && html)) {
            // ... append the message to the mousetip as a text-node...
            mouseTip.appendChild(document.createTextNode(message));
        } else {
            // ... otherwise, append the message to the mousetip as HTML
            mouseTip.innerHTML = message;
        }
        // Append the mousetip to the bottom of the page...
        document.body.appendChild(mouseTip);
        // ... and store the mousetip
        this.mouseTip = document.getElementById(this.selector);
    }

    // Delete the mousetip
    deleteMouseTip() {
        // If the stored mousetip does not exist, return
        if (!this.mouseTip) return;
        // Delete the mousetip...
        this.mouseTip.parentNode.removeChild(this.mouseTip);
        // ... and delete the stored mousetip
        delete this.mouseTip;
        // If the stored target element does not exist, return
        if (!this.element) return;
        // Delete the stored target element
        delete this.element;
    }

    // Update the mousetip
    updateMouseTip(event) {
        // Grab the X/Y of the mouse
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        // Set the default adjustment to 15
        const defaultAdjust = 15;
        // Get the mousetip position from the target element or the constructor
        let position = (this.element.getAttribute(this.selector + '-pos') || this.position).split(' '),
            verticalAdjust, horizontalAdjust;
        // If the position does not contain two items, set it to the default
        if (position.length !== 2) position = ['bottom', 'right'];
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
        this.mouseTip.style.top  = `${ mouseY + verticalAdjust }px`;
        this.mouseTip.style.left = `${ mouseX + horizontalAdjust }px`;
    }

    // Handle mouse events
    handleEvent(event) {
        switch (event.type) {
        case 'mouseenter':
            // When the mouse enters an element, create the mousetip
            this.createMouseTip(event);
            break;
        case 'mouseleave':
            // When the mouse leaves an element, delete the mousetip
            this.deleteMouseTip();
            break;
        case 'mousemove':
            // When the mouse moves inside an element, update the mousetip
            this.updateMouseTip(event);
        }
    }

    // Start handling mouse events
    start() {
        // Grab all elements by selector
        const elements = document.querySelectorAll(`[${ this.selector }]`);
        // If no elements were found, return
        if (!elements) return;
        // Store the elements for reference,...
        this.elements = elements;
        // ... and for each,...
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            // ... bind the mouse enter, leave, and move events
            element.addEventListener('mouseenter', this, false);
            element.addEventListener('mouseleave', this, false);
            element.addEventListener('mousemove',  this, false);
        }
    }

    // Stop handling mouse events
    stop() {
        // If no element references are stored, return
        if (!this.elements || !this.elements.length) return;
        // For each element...
        for (let i = 0; i < this.elements.length; i++) {
            const element = this.elements[i];
            // ... unbind the mouse enter, leave, and move events
            element.removeEventListener('mouseenter', this, false);
            element.removeEventListener('mouseleave', this, false);
            element.removeEventListener('mousemove',  this, false);
        }
        // Delete the stored element references...
        delete this.elements;
        // ... and the mousetip
        this.deleteMouseTip();
    }

}
