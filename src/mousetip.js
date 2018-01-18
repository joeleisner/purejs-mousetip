class MouseTip {

    // Construct the class
    constructor(settings) {
        // Define default settings if not provided...
        const {
            cssZIndex        = '9999',
            cssPosition      = 'absolute',
            cssPadding       = '15px',
            cssBorderRadius  = '4px',
            cssBackground    = 'rgba(0,0,0,0.75)',
            cssColor         = '#fff',
            html             = true,
            position         = 'bottom right',
            selector         = 'mousetip'
        } = settings || {};
        // ... and assign them to the class
        this.cssZIndex       = cssZIndex;
        this.cssPosition     = cssPosition;
        this.cssPadding      = cssPadding;
        this.cssBorderRadius = cssBorderRadius;
        this.cssBackground   = cssBackground;
        this.cssColor        = cssColor;
        this.html            = html;
        this.position        = position;
        this.selector        = selector;
        // Store the state of the mousetip
        this.mouseTip = false;
    }

    // Create the mousetip
    createMouseTip(event) {
        // Create the mousetip
        const mouseTip = document.createElement('span');
        // Store the styling either from the target element's attributes or the constructor settings
        const zIndex       = event.target.getAttribute(this.selector + '-css-zindex')       || this.cssZIndex;
        const position     = event.target.getAttribute(this.selector + '-css-position')     || this.cssPosition;
        const padding      = event.target.getAttribute(this.selector + '-css-padding')      || this.cssPadding;
        const borderRadius = event.target.getAttribute(this.selector + '-css-borderradius') || this.cssBorderRadius;
        const background   = event.target.getAttribute(this.selector + '-css-background')   || this.cssBackground;
        const color        = event.target.getAttribute(this.selector + '-css-color')        || this.cssColor;
        // Assign the ID and styling to the mousetip
        mouseTip.id                 = this.selector;
        mouseTip.style.zIndex       = zIndex;
        mouseTip.style.position     = position;
        mouseTip.style.padding      = padding;
        mouseTip.style.borderRadius = borderRadius;
        mouseTip.style.background   = background;
        mouseTip.style.color        = color;
        // Grab the message and HTML attributes from the event target
        const message  = event.target.getAttribute(this.selector + '-msg');
        const html     = this.html ?
            event.target.hasAttribute(this.selector + '-disable-html') :
            event.target.hasAttribute(this.selector + '-enable-html');
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
        // ... and update the constructor's mousetip state
        this.mouseTip = true;
    }

    // Delete the mousetip
    deleteMouseTip() {
        // If the constructor's mousetip state is not true, return
        if (!this.mouseTip) return;
        // Grab the mousetip,...
        const mouseTip = document.getElementById(this.selector);
        // ... delete it,...
        mouseTip.parentNode.removeChild(mouseTip);
        // ... and update the constructor's mousetip state
        this.mouseTip = false;
    }

    // Update the mousetip
    updateMouseTip(event) {
        // Grab the mousetip
        const mouseTip = document.getElementById(this.selector);
        // Grab the X/Y of the mouse
        const mouseX = event.pageX;
        const mouseY = event.pageY;
        // Set the default adjustment to 15
        const defaultAdjust = 15;
        // Get the mousetip position from the target element or the constructor
        let position = (event.target.getAttribute(this.selector + '-pos') || this.position).split(' '),
            verticalAdjust, horizontalAdjust;
        // If the position does not contain two items, set it to the default
        if (position.length !== 2) position = ['bottom', 'right'];
        // Set the vertical adjustment from the first item of position
        switch(position[0]) {
        case 'top':
            verticalAdjust = -defaultAdjust - mouseTip.offsetHeight;
            break;
        case 'center':
            verticalAdjust = 0 - (mouseTip.offsetHeight / 2);
            break;
        default:
            verticalAdjust = defaultAdjust;
        }
        // Set the horizontal adjustment from the second item of position
        switch(position[1]) {
        case 'left':
            horizontalAdjust = -defaultAdjust - mouseTip.offsetWidth;
            break;
        case 'center':
            horizontalAdjust = 0 - (mouseTip.offsetWidth / 2);
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
