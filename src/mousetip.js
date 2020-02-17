class MouseTip {
    // Construct the class
    constructor({
        animations = true,
        direction  = [ 'bottom', 'right' ],
        html       = true,
        message    = '',
        offset     = 15,
        selector   = {},
        stylesheet = false,
        styles     = {}
    } = {}) {
        // Initialize an array for all targets,...
        this.targets = [];
        // ... an empty string for a specific target,...
        this.target = '';
        // ... and an object to store the mousetip's element and attributes
        this.mouseTip = {};

        // Define the global animations...
        this.animations = animations ? this.overrideDefaults({
            duration: '.2s',
            from:     'transform:translateY(.5rem);opacity:0;',
            name:     'mouseTipTransition',
            to:       'transform:translateY(0);opacity:1;',
            timing:   'ease-in-out'
        }, animations) : false;
        // ... and assign all other settings
        this.html       = html;
        this.message    = message;
        this.offset     = offset;
        this.direction  = direction;
        this.selector   = this.overrideDefaults({
            full:  'mousetip',
            short: 'mt'
        }, typeof selector === 'string' ? { full: selector } : selector);
        this.stylesheet = stylesheet;

        // If a custom stylesheet is being used, do nothing else...
        if (this.stylesheet) return;
        // ... otherwise, define the global styles
        this.styles = this.overrideDefaults({
            backgroundColor: 'rgba(0,0,0,.75)',
            borderRadius:    '.25rem',
            color:           '#fff',
            display:         'inline-block',
            padding:         '.75rem 1rem',
            position:        'absolute',
            zIndex:          '9999'
        }, styles);
    }

    // Override default objects with that of user defined objects
    overrideDefaults(defaults, custom) {
        // Ensure the user defined object is an object...
        if (typeof custom !== 'object') custom = {};
        // ... then assign them to the defaults
        return Object.assign(defaults, custom);
    }

    // Set the global styles
    setGlobalStyles() {
        // Create the global styles <style> tag...
        const css = document.createElement('style');
        // ... and define the base mousetip styles based on class settings
        let styles = `#${ this.selector.full }{position:${ this.styles.position };display:${ this.styles.display };padding:${ this.styles.padding };border-radius:${ this.styles.borderRadius };background-color:${ this.styles.backgroundColor };color:${ this.styles.color };z-index:${ this.styles.zIndex };}`;

        // If animations are enabled, add additional styles to support in/out transitions
        if (this.animations) styles += `@keyframes ${ this.animations.name }{from{${ this.animations.from }}to{${ this.animations.to }}}#${ this.selector.full }[aria-hidden="false"],#${ this.selector.full }[aria-hidden="true"]{animation: ${ this.animations.name } ${ this.animations.duration } ${ this.animations.timing };}#${ this.selector.full }[aria-hidden="true"]{animation-direction:reverse;}`;

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
    getTargetAttribute(fullName, shortName, wrapper) {
        // Get the attribute and ensure it's an empty string if it doesn't exist
        const attribute = this.target.getAttribute(`${ this.selector.full }:${ fullName }`) || this.target.getAttribute(`${ this.selector.short }:${ shortName }`) || '';

        // If no wrapper function has been set, return the attribute as is...
        if (!wrapper) return attribute;
        // ... otherwise, return the attribute passed through the wrapper function
        return wrapper(attribute);
    }

    // Check to see if the target element has a given attribute
    targetHasAttribute(fullName, shortName) {
        return this.target.hasAttribute(`${ this.selector.full }:${ fullName }`) || this.target.hasAttribute(`${ this.selector.short }:${ shortName }`);
    }

    // Set the mousetip's local attributes
    setLocalAttributes() {
        // Override global attributes with target attributes if possible...
        const direction = this.getTargetAttribute('direction', 'dr').split(' ') || this.direction,
            html        = this.targetHasAttribute(`${ this.html ? 'disable' : 'enable' }-html`, `${ this.html ? 'd' : 'e' }h`),
            message     = {
                text: this.getTargetAttribute('message', 'm') || this.message,
                type: (!this.html && !html) || (this.html && html) ? 'textContent' : 'innerHTML'
            },
            offset      = this.getTargetAttribute('offset', 'o', Number) || this.offset,
            style       = {
                backgroundColor: this.getTargetAttribute('background-color', 'bc'),
                base:            this.getTargetAttribute('style', 's'),
                borderRadius:    this.getTargetAttribute('border-radius', 'br'),
                color:           this.getTargetAttribute('color', 'c'),
                display:         this.getTargetAttribute('display', 'ds'),
                padding:         this.getTargetAttribute('padding', 'pd'),
                position:        this.getTargetAttribute('position', 'ps'),
                zIndex:          this.getTargetAttribute('z-index', 'z')
            };
        // ... and assign them as the mousetip's attributes
        this.mouseTip.attributes = {
            direction,
            html,
            message,
            offset,
            style
        };
    }

    // Set the mousetip's local styles
    setLocalStyles() {
        // Store a local copy of the mousetip style attributes
        let { style } = this.mouseTip.attributes;

        // First, set the element style attribute in case the corresponding mousetip attribute (mousetip-style) has been set
        this.mouseTip.element.setAttribute('style', style.base);

        // Ignore the base styles (mousetip-style)...
        delete style.base;
        // ... and find the explicit style attributes that have been set and apply them to the mousetip element
        Object.keys(style)
            .filter(key  => style[key])
            .forEach(key => this.mouseTip.element.style[key] = this.mouseTip.attributes.style[key]);
    }

    // Create the mousetip
    create(event) {
        // Set the mousetip's local attributes
        this.setLocalAttributes();

        // Create the mousetip,...
        this.mouseTip.element = document.createElement('span');
        // ... assign its ID,...
        this.mouseTip.element.id = this.selector.full;
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
    start(elements) {
        // Grab all target elements by selector...
        const targets = elements ? Array.from(elements) : Array.from(document.querySelectorAll(`[${ this.selector.full }], [${ this.selector.short }]`));
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