class MouseTip {
    // Construct the class
    constructor({
        animations      = true,
        cssZIndex       = '9999',
        cssPosition     = 'absolute',
        cssPadding      = '.75rem 1rem',
        cssBorderRadius = '.25rem',
        cssBackground   = 'rgba(0,0,0,.75)',
        cssColor        = '#fff',
        cssDisplay      = 'inline-block',
        html            = true,
        msg             = '',
        offset          = 15,
        position        = [ 'bottom', 'right' ],
        selector        = 'mousetip',
        stylesheet      = false
    } = {}) {
        // Initialize an array for all targets,...
        this.targets = [];
        // ... an empty string for a specific target,...
        this.target = '';
        // ... and an object to store the mousetip's element and attributes
        this.mouseTip = {};

        // Assign the settings to the class
        this.animations      = animations;
        this.html            = html;
        this.msg             = msg;
        this.offset          = offset;
        this.position        = position;
        this.selector        = selector;
        this.stylesheet      = stylesheet;
        this.cssZIndex       = cssZIndex;
        this.cssPosition     = cssPosition;
        this.cssPadding      = cssPadding;
        this.cssBorderRadius = cssBorderRadius;
        this.cssBackground   = cssBackground;
        this.cssColor        = cssColor;
        this.cssDisplay      = cssDisplay;
    }

    // Set the global styles
    setGlobalStyles() {
        // Create the global styles <style> tag...
        const style = document.createElement('style');
        // ... and define the base mousetip styles based on class settings
        let rules = `#${ this.selector }{position:${ this.cssPosition };display:${ this.cssDisplay };padding:${ this.cssPadding };border-radius:${ this.cssBorderRadius };background-color:${ this.cssBackground };color:${ this.cssColor };z-index:${ this.cssZIndex };}`;

        // If animations are enabled, add additional styles to support in/out transitions
        if (this.animations) rules += `@keyframes mouseTipTransition{from{transform:translateY(.5rem);opacity:0;}to{transform:translateY(0);opacity:1;}}#${ this.selector }[aria-hidden="false"],#${ this.selector }[aria-hidden="true"]{animation: mouseTipTransition .2s ease-in-out;}#${ this.selector }[aria-hidden="true"]{animation-direction:reverse;}`;

        // Fill the <style> with the defined styles,...
        style.textContent = rules;
        // ... store it for later reference,...
        this.css = style;
        // ... and add it to the head
        document.head.appendChild(style);
    }

    // Unset the global styles
    unsetGlobalStyles() {
        // If a reference to the global styles <style> tag does not exist, do nothing else
        if (!this.css) return;

        // Remove the global styles <style> tag
        this.css.parentNode.removeChild(this.css);
    }

    // Animation end handler
    animationEnd({ target }) {
        // Remove the animation end event listener from the mousetip
        target.removeEventListener('animationend', this.animationEnd, false);

        // Get the aria-hidden attribute value...
        const state = target.getAttribute('aria-hidden');
        // ... and if it's true (meaning the mousetip has been animated out), simply delete the mousetip
        if (state === 'true') return target.parentNode.removeChild(target);

        // Otherwise, remove the aria-hidden attribute
        target.removeAttribute('aria-hidden');
    }

    // Delete the mousetip
    delete() {
        // If a mousetip is stored,...
        if (this.mouseTip.element) {
            // ... and animations are enabled,...
            if (this.animations) {
                // ... animate the mousetip out and delete it,...
                this.mouseTip.element.setAttribute('aria-hidden', true);
                this.mouseTip.element.addEventListener('animationend', this.animationEnd, false);
            } else {
                // ... otherwise just delete the mousetip...
                this.mouseTip.element.parentNode.removeChild(this.mouseTip.element);
            }
            // ... and always reset the mousetip reference
            this.mouseTip = {};
        }

        // If a target element is stored, delete it
        if (this.target) this.target = '';
    }

    // Assign the mousetips attributes
    setAttributes() {
        // Override global attributes with target attributes if possible...
        const cssZIndex     = this.target.getAttribute(`${ this.selector }-css-zindex`),
            cssPosition     = this.target.getAttribute(`${ this.selector }-css-position`),
            cssPadding      = this.target.getAttribute(`${ this.selector }-css-padding`),
            cssBorderRadius = this.target.getAttribute(`${ this.selector }-css-borderradius`),
            cssBackground   = this.target.getAttribute(`${ this.selector }-css-background`),
            cssColor        = this.target.getAttribute(`${ this.selector }-css-color`),
            cssDisplay      = this.target.getAttribute(`${ this.selector }-css-display`),
            html            = this.target.hasAttribute(`${ this.selector }-${ this.html ? 'disable' : 'enable' }-html`),
            messageType     = (!this.html && !html) || (this.html && html) ? 'textContent' : 'innerHTML',
            message         = this.target.getAttribute(`${ this.selector }-msg`)                    || this.msg,
            offset          = Number(this.target.getAttribute(`${ this.selector }-offset`))         || this.offset,
            position        = (this.target.getAttribute(`${ this.selector }-pos`) || '').split(' ') || this.position;
        // ... and assign them as the mousetip's attributes
        this.mouseTip.attributes = {
            cssZIndex,
            cssPosition,
            cssPadding,
            cssBorderRadius,
            cssBackground,
            cssColor,
            cssDisplay,
            html,
            messageType,
            message,
            offset,
            position
        };
    }

    // Create the mousetip
    create(event) {
        // Assign the mousetip's attributes
        this.setAttributes();

        // Create the mousetip,...
        this.mouseTip.element = document.createElement('span');
        // ... assign its ID and styling,...
        this.mouseTip.element.id                 = this.selector;
        this.mouseTip.element.style.display      = this.mouseTip.attributes.cssDisplay;
        this.mouseTip.element.style.zIndex       = this.mouseTip.attributes.cssZIndex;
        this.mouseTip.element.style.position     = this.mouseTip.attributes.cssPosition;
        this.mouseTip.element.style.padding      = this.mouseTip.attributes.cssPadding;
        this.mouseTip.element.style.borderRadius = this.mouseTip.attributes.cssBorderRadius;
        this.mouseTip.element.style.background   = this.mouseTip.attributes.cssBackground;
        this.mouseTip.element.style.color        = this.mouseTip.attributes.cssColor;
        // ... and add its message
        this.mouseTip.element[this.mouseTip.attributes.messageType] = this.mouseTip.attributes.message;

        if (this.animations) {
            this.mouseTip.element.setAttribute('aria-hidden', false);
            this.mouseTip.element.addEventListener('animationend', this.animationEnd, false);
        }

        // Append the mousetip to the bottom of the page...
        document.body.appendChild(this.mouseTip.element);
        // ... and update it's vertical/horizontal position
        window.requestAnimationFrame(() => this.update(event));
    }

    // Get the mousetip's vertical/horizontal adjustment
    getAlignmentAdjustment(position, offset, axis) {
        const dimensions = {
                y: 'offsetHeight',
                x: 'offsetWidth'
            },
            dimension = dimensions[axis];
        if ([ 'top', 'left' ].includes(position)) return -(offset) - this.mouseTip.element[dimension];
        if (position === 'center')                return -(this.mouseTip.element[dimension] / 2);
        return offset;
    }

    // Update the mousetip
    update(event) {
        // If the mousetip has no attributes or position, do nothing
        if (!this.mouseTip.attributes || !this.mouseTip.attributes.position) return;

        // If the position does not contain two items, set it to the default
        if (this.mouseTip.attributes.position.length !== 2) this.mouseTip.attributes.position = [ 'bottom', 'right' ];

        // If the mousetip's vertical adjustment is not set,...
        if (!this.mouseTip.attributes.verticalAdjustment) {
            // ... calulate and store the vertical adjustment of the mousetip
            this.mouseTip.attributes.verticalAdjustment = this.getAlignmentAdjustment(
                this.mouseTip.attributes.position[0],
                this.mouseTip.attributes.offset,
                'y'
            );
        }

        // If the mousetip's horizontal adjustment is not set,...
        if (!this.mouseTip.attributes.horizontalAdjustment) {
            // ... calculate and store the horizontal adjustment of the mousetip
            this.mouseTip.attributes.horizontalAdjustment = this.getAlignmentAdjustment(
                this.mouseTip.attributes.position[1],
                this.mouseTip.attributes.offset,
                'x'
            );
        }

        // Grab the X/Y of the mouse on the page...
        const { pageX, pageY } = event;
        // ... and update the mousetip's position
        this.mouseTip.element.style.top  = `${ pageY + this.mouseTip.attributes.verticalAdjustment }px`;
        this.mouseTip.element.style.left = `${ pageX + this.mouseTip.attributes.horizontalAdjustment }px`;
    }

    // Handle mouse events
    handleEvent(event) {
        switch (event.type) {
        case 'mousemove':
            // When the mouse moves inside a target element,...
            if (!this.target) {
                // ... create the moustetip if the target element has not been saved,...
                this.target = event.currentTarget;
                return this.create(event);
            }
            // ... otherwise, update the mousetip
            return window.requestAnimationFrame(() => this.update(event));
        case 'mouseleave':
            // When the mouse leaves a target element, delete the mousetip
            return this.delete();
        }
    }

    // Start handling mouse events
    start() {
        // Grab all target elements by selector...
        const targets = Array.from(document.querySelectorAll(`[${ this.selector }]`));
        // ... and if no target elements were found, do nothing
        if (!targets) return;

        // Store the target elements for reference,...
        this.targets = targets;
        // ... and for each...
        this.targets.forEach(target => {
            // ... bind to its mouse move and leave events
            target.addEventListener('mousemove', this, false);
            target.addEventListener('mouseleave', this, false);
        });

        // If a custom stylesheet has not been enabled, set the global styles
        if (!this.stylesheet) this.setGlobalStyles();
    }

    // Stop handling mouse events
    stop() {
        // If no element references are stored, return
        if (!this.targets.length) return;

        // For each target element reference...
        this.targets.forEach(target => {
            // ... unbind from its mouse move and leave events
            target.removeEventListener('mousemove', this, false);
            target.removeEventListener('mouseleave', this, false);
        });

        // Reset the stored target elements for reference...
        this.targets = [];
        // ... and the mousetip
        this.delete();

        // If a custom stylesheet has not been enabled, unset the global styles
        if (!this.stylesheet) this.unsetGlobalStyles();
    }
}