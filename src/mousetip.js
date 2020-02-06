class MouseTip {
    // Construct the class
    constructor({
        animations = true,
        direction  = [ 'bottom', 'right' ],
        html       = true,
        msg        = '',
        offset     = 15,
        selector   = 'mousetip',
        stylesheet = false,
        styles     = {}
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
        this.direction       = direction;
        this.selector        = selector;
        this.stylesheet      = stylesheet;

        if (this.stylesheet) return;

        this.styles = this.defineGlobalStyles(styles);
    }

    // Define global styles
    defineGlobalStyles(styles) {
        // Define the default mousetip styles...
        const defaults    = {
            backgroundColor: 'rgba(0,0,0,.75)',
            borderRadius:    '.25rem',
            color:           '#fff',
            display:         'inline-block',
            padding:         '.75rem 1rem',
            position:        'absolute',
            zIndex:          '9999'
        };
        // ... and for each,...
        Object.keys(defaults).forEach(key => {
            // ... if that style hasn't been specified by the user, set it to the default
            if (!styles[key]) styles[key] = defaults[key];
        });

        // Finally, return the styles
        return styles;
    }

    // Set the global styles
    setGlobalStyles() {
        // Create the global styles <style> tag...
        const css = document.createElement('style');
        // ... and define the base mousetip styles based on class settings
        let styles = `#${ this.selector }{position:${ this.styles.position };display:${ this.styles.display };padding:${ this.styles.padding };border-radius:${ this.styles.borderRadius };background-color:${ this.styles.backgroundColor };color:${ this.styles.color };z-index:${ this.styles.zIndex };}`;

        // If animations are enabled, add additional styles to support in/out transitions
        if (this.animations) styles += `@keyframes mouseTipTransition{from{transform:translateY(.5rem);opacity:0;}to{transform:translateY(0);opacity:1;}}#${ this.selector }[aria-hidden="false"],#${ this.selector }[aria-hidden="true"]{animation: mouseTipTransition .2s ease-in-out;}#${ this.selector }[aria-hidden="true"]{animation-direction:reverse;}`;

        // Fill the global styles <style> tag with the defined styles,...
        css.textContent = styles;
        // ... store it for later reference,...
        this.css = css;
        // ... and add it to the head
        document.head.appendChild(css);
    }

    // Unset the global styles
    unsetGlobalStyles() {
        // If a reference to the global styles <style> tag does not exist, do nothing else...
        if (!this.css) return;
        // ... otherwise, remove the global styles <style> tag
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

    // Get an attribute from the target element
    getTargetAttribute(name, wrapper) {
        // Get the attribute and ensure it's an empty string if it doesn't exist
        const attribute = this.target.getAttribute(`${ this.selector }-${ name }`) || '';

        // If no wrapper function has been set, return the attribute as is...
        if (!wrapper) return attribute;
        // ... otherwise, return the attribute passed through the wrapper function
        return wrapper(attribute);
    }

    // Check to see if the target element has a given attribute
    targetHasAttribute(name) {
        return this.target.hasAttribute(`${ this.selector }-${ name }`);
    }

    // Set the mousetip's local attributes
    setLocalAttributes() {
        // Override global attributes with target attributes if possible...
        const backgroundColor = this.getTargetAttribute('background-color'),
            borderRadius      = this.getTargetAttribute('border-radius'),
            color             = this.getTargetAttribute('color'),
            direction         = this.getTargetAttribute('direction').split(' ') || this.direction,
            display           = this.getTargetAttribute('display'),
            html              = this.targetHasAttribute(`${ this.html ? 'disable' : 'enable' }-html`),
            message           = {
                text: this.getTargetAttribute('msg') || this.msg,
                type: (!this.html && !html) || (this.html && html) ? 'textContent' : 'innerHTML'
            },
            offset            = this.getTargetAttribute('offset', Number)       || this.offset,
            padding           = this.getTargetAttribute('padding'),
            position          = this.getTargetAttribute('position'),
            style             = this.getTargetAttribute('style'),
            zIndex            = this.getTargetAttribute('z-index');
        // ... and assign them as the mousetip's attributes
        this.mouseTip.attributes = {
            backgroundColor,
            borderRadius,
            color,
            direction,
            display,
            html,
            message,
            offset,
            padding,
            position,
            style,
            zIndex
        };
    }

    // Set the mousetip's local styles
    setLocalStyles() {
        // First, set the style attribute in case the corresponding mousetip attribute has been set
        this.mouseTip.element.setAttribute('style', this.mouseTip.attributes.style);

        // Next, find the explicit style attributes that have been set...
        const styles = Object.keys(this.mouseTip.attributes)
            .filter(key => ![ 'direction', 'html', 'message', 'offset', 'style' ].includes(key) && this.mouseTip.attributes[key]);
        // ... and apply them to the mousetip element
        styles.forEach(style => this.mouseTip.element.style[style] = this.mouseTip.attributes[style]);
    }

    // Create the mousetip
    create(event) {
        // Set the mousetip's local attributes
        this.setLocalAttributes();

        // Create the mousetip,...
        this.mouseTip.element = document.createElement('span');
        // ... assign its ID,...
        this.mouseTip.element.id                    = this.selector;
        // ... set its styles,...
        this.setLocalStyles();
        // ... and add its message
        this.mouseTip.element[this.mouseTip.attributes.message.type] = this.mouseTip.attributes.message.text;

        // If animations are enabled, animate the mousetip in
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
    getAlignmentAdjustment(direction, offset, axis) {
        const dimensions = {
                y: 'offsetHeight',
                x: 'offsetWidth'
            },
            dimension = dimensions[axis];
        if ([ 'top', 'left' ].includes(direction)) return -(offset) - this.mouseTip.element[dimension];
        if (direction === 'center')                return -(this.mouseTip.element[dimension] / 2);
        return offset;
    }

    // Update the mousetip
    update(event) {
        // If the mousetip has no attributes or direction, do nothing
        if (!this.mouseTip.attributes || !this.mouseTip.attributes.direction) return;

        // If the direction does not contain two items, set it to the default
        if (this.mouseTip.attributes.direction.length !== 2) this.mouseTip.attributes.direction = [ 'bottom', 'right' ];

        // If the mousetip's vertical adjustment is not set,...
        if (!this.mouseTip.attributes.verticalAdjustment) {
            // ... calulate and store the vertical adjustment of the mousetip
            this.mouseTip.attributes.verticalAdjustment = this.getAlignmentAdjustment(
                this.mouseTip.attributes.direction[0],
                this.mouseTip.attributes.offset,
                'y'
            );
        }

        // If the mousetip's horizontal adjustment is not set,...
        if (!this.mouseTip.attributes.horizontalAdjustment) {
            // ... calculate and store the horizontal adjustment of the mousetip
            this.mouseTip.attributes.horizontalAdjustment = this.getAlignmentAdjustment(
                this.mouseTip.attributes.direction[1],
                this.mouseTip.attributes.offset,
                'x'
            );
        }

        // Grab the X/Y of the mouse on the page...
        const { pageX, pageY } = event;
        // ... and update the mousetip's direction
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