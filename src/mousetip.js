import stylesCSS from './styles.css';
import animationsCSS from './animations.css';

export default class MouseTip {
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
        // ... and an object to store a mousetip's element and attributes
        this.mouseTip = {};

        // Initialize a state for flagging functionality
        this.state = {
            reducedMotion: false,
            stop:          false
        };

        // Define the global animations...
        this.animations = animations;
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

        // Bind "this" to all relavent methods
        this.animationEnd = this.animationEnd.bind(this);
        this.toggleReducedMotion = this.toggleReducedMotion.bind(this);

        // If a custom stylesheet is being used, do nothing else
        if (this.stylesheet) return;

        // Otherwise, define the user's global style overrides,...
        this.styles = styles;
        // ... normalize animations as an object if it's set to true,...
        if (this.animations && typeof this.animations !== 'object') this.animations = {};
        // ... and use the appropriate global CSS depending on if animations are enabled or not
        this.css = this.animations ? animationsCSS : stylesCSS;
    }

    // Override default objects with that of user defined objects
    overrideDefaults(defaults, custom) {
        // Ensure the user defined object is an object...
        if (typeof custom !== 'object') custom = {};
        // ... then assign them to the defaults
        return Object.assign(defaults, custom);
    }

    // Generate a CSS variable
    generateCSSVariable(keys, value) {
        return `--${ keys.join('--') }: ${ value };`;
    }

    // Generate CSS variables (custom properties) from a given object
    generateCSSVariables(object, parents = []) {
        // Initialize an output array to store CSS variables
        let output = [];

        // Grab the object's keys...
        const keys = Object.keys(object);
        // ... and for each,...
        keys.forEach(key => {
            // Store the key's value...
            const value = object[key];
            // ... and if it's an object, recursively generate the CSS variables and add them to the output,...
            if (typeof value === 'object') return output.push(
                ...this.generateCSSVariables(value, [ ...parents, key ])
            );
            // ... otherwise, convert the key into a CSS variable and add it to the output
            return output.push(this.generateCSSVariable([ ...parents, key ], value));
        });

        // Finally, return the output array
        return output;
    }

    // Set the global styles
    setGlobalStyles() {
        // If a custom stylesheet is enabled, do nothing
        if (this.stylesheet) return;

        // Get the CSS local className...
        const { className } = this.css.locals;
        // ... and generate an array of CSS variables from the user's global styles
        const variables = [
            ...this.generateCSSVariables(this.styles),
            ...this.generateCSSVariables(this.animations)
        ];

        // If there are no CSS variables to inject, just initialize the CSS
        if (!variables.length) return this.css.use();

        // Create an overrides style tag...
        const overrides = document.createElement('style');
        // ... and with a rule giving the class name the generated CSS variables
        overrides.textContent = `[class="${ className }"]{${ variables.join('')}}`;

        // Finally, initialize the global CSS,...
        this.css.use();
        // ... store the overrides,...
        this.overrides = overrides;
        // ... and inject them into the page
        document.head.appendChild(overrides);
    }

    // Remove a given element
    remove(element) {
        return element.parentNode.removeChild(element);
    }

    // Unset the global styles
    unsetGlobalStyles() {
        // Disable the stop state...
        this.state.stop = false;
        // ... and if a custom stylesheet is enabled, do nothing else
        if (this.stylesheet) return;

        // Otherwise, if there are user global styles, remove them...
        if (this.overrides) this.remove(this.overrides);
        // ... and finally remove the global CSS
        this.css.unuse();
    }

    // Delete and reset the mousetip
    destroy() {
        // Remove the mousetip element...
        this.remove(this.mouseTip.element);
        // ... and reset its reference
        this.mouseTip = {};
    }

    // Handle a mousetip's animation in/out
    animationEnd({ target }) {
        // Remove the animation end event listener from the mousetip
        target.removeEventListener('animationend', this.animationEnd, false);

        // Check to see if the mousetip is being hidden...
        const hidden = target.getAttribute('aria-hidden') === 'true';
        // ... and if it is,...
        if (hidden) {
            // ... delete and reset the mousetip,...
            this.destroy();
        } else {
            // ... otherwise, remove the aria-hidden attribute
            target.removeAttribute('aria-hidden');
        }

        // If functionality has been stopped, unset all global styles
        if (this.state.stop) this.unsetGlobalStyles();
    }

    // Delete the mousetip
    delete() {
        // If a target element is stored, delete it...
        if (this.target) this.target = '';
        // ... and if a mousetip is not stored, do nothing else
        if (!this.mouseTip.element) return;

        // If animations are enabled,...
        if (this.animations) {
            // ... animate the mousetip out and delete it,...
            this.mouseTip.element.setAttribute('aria-hidden', true);
            return this.mouseTip.element.addEventListener('animationend', this.animationEnd, false);
        }

        // Delete and reset the mousetip
        this.destroy();

        // If functionality has been stopped, unset all global styles
        if (this.state.stop) this.unsetGlobalStyles();
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
        // Get the target's direction...
        let direction = this.getTargetAttribute('direction', 'dr') || this.direction;
        // ... and normalize it as an array
        if (typeof direction === 'string') direction = direction.split(' ');

        // Get the target's HTML attribute
        const html = this.targetHasAttribute(
            `${ this.html ? 'disable' : 'enable' }-html`,
            `${ this.html ? 'd' : 'e' }h`
        );

        // Get the target's local message attribute and how to display its text...
        const text = this.getTargetAttribute('message', 'm') || this.message;
        const type = (!this.html && !html) || (this.html && html) ? 'textContent' : 'innerHTML';
        // ... and store them in a message object (as text and type respectively)
        const message = {
            text,
            type
        }

        // Get the target's local offset attrribute
        const offset = this.getTargetAttribute('offset', 'o', Number) || this.offset;

        // Get the target's local style attributes...
        const backgroundColor = this.getTargetAttribute('background-color', 'bc');
        const base            = this.getTargetAttribute('style',            's');
        const borderRadius    = this.getTargetAttribute('border-radius',    'br');
        const color           = this.getTargetAttribute('color',            'c');
        const display         = this.getTargetAttribute('display',          'ds');
        const padding         = this.getTargetAttribute('padding',          'pd');
        const position        = this.getTargetAttribute('position',         'ps');
        const zIndex          = this.getTargetAttribute('z-index',          'z');
        // ... store them in a style object
        const style = {
            backgroundColor,
            base,
            borderRadius,
            color,
            display,
            padding,
            position,
            zIndex
        };

        // Assign all local attributes to the mousetip
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
        // If a mousetip currently exists, do nothing
        if (this.mouseTip.element) return;

        // Set the mousetip's local attributes
        this.setLocalAttributes();

        // Create the mousetip,...
        this.mouseTip.element = document.createElement('span');
        // ... assign its class name,...
        this.mouseTip.element.className = this.stylesheet ? this.selector.full : this.css.locals.className;
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

    // Get a pixel value from multiple numbers
    getPixelValue(...numbers) {
        const reducer = this.state.reducedMotion ? 
            (result, value) => result - value : 
            (result, value) => result + value;

        // Finally, return the numbers reduced as a pixel value
        return `${ numbers.reduce(reducer) }px`;
    }

    // Align the mousetip relative to the target element
    alignToTarget() {
        // Define Y...
        const y = {
            top:    this.target.offsetTop,
            center: this.target.offsetTop + this.target.offsetHeight / 2,
            bottom: this.target.offsetTop + this.target.offsetHeight
        };
        // ... and X coordinates relative to the target element
        const x = {
            left:   this.target.offsetLeft,
            center: this.target.offsetLeft + this.target.offsetWidth / 2,
            right:  this.target.offsetLeft + this.target.offsetWidth
        };

        // Grab the correct target coordinates based on the mousetip's direction
        const targetY = y[(this.mouseTip.attributes.direction[0] || 'bottom')] || y.bottom;
        const targetX = x[(this.mouseTip.attributes.direction[1] || 'right')]  || x.right;

        // Finally, set the mousetip's top...
        this.mouseTip.element.style.top  = this.getPixelValue(
            targetY,
            this.mouseTip.element.offsetHeight / 2
        );
        // ... and left styles
        this.mouseTip.element.style.left = this.getPixelValue(
            targetX,
            this.mouseTip.element.offsetWidth / 2
        );
    }

    // Get top/left adjustment
    getTopLeftAdjustment(dimension) {
        return -(this.mouseTip.attributes.offset) - this.mouseTip.element[dimension];
    }

    // Get center adjustment
    getCenterAdjustment(dimension) {
        return -(this.mouseTip.element[dimension] / 2);
    }

    // Get the appropriate alignment adjustment based on dimension and direction
    getAlignmentAdjustment(dimension, direction) {
        // Grab the offset from the mousetip's attributes
        const { offset } = this.mouseTip.attributes;

        // Define the appropriate adjustments...
        const adjustments = {
            offsetHeight: {
                top()    { return this.getTopLeftAdjustment('offsetHeight'); },
                center() { return this.getCenterAdjustment('offsetHeight'); }
            },
            offsetWidth: {
                left()   { return this.getTopLeftAdjustment('offsetWidth'); },
                center() { return this.getCenterAdjustment('offsetWidth'); }
            }
        };
        // ... and grab the correct one based on the given dimension and direction
        const adjustment = adjustments[dimension][direction];

        // Finally, return the value (defaulting to just the offset)
        return adjustment ? adjustment() : offset;
    }

    // Update the mousetip
    update(event) {
        // If the mousetip has no attributes or direction, do nothing
        if (!this.mouseTip.attributes || !this.mouseTip.attributes.direction) return;

        // If reduced motion is enabled, align the mousetip relative to the target
        if (this.state.reducedMotion) return this.alignToTarget();

        // Set the mousetip's alignment adjustments if they're not already set
        if (!this.mouseTip.attributes.adjustments) this.mouseTip.attributes.adjustments = {
            vertical: this.getAlignmentAdjustment(
                'offsetHeight',
                this.mouseTip.attributes.direction[0] || 'bottom'
            ),
            horizontal: this.getAlignmentAdjustment(
                'offsetWidth',
                this.mouseTip.attributes.direction[1] || 'right'
            )
        };

        // Grab the X/Y of the mouse on the page...
        const { pageX, pageY } = event;

        // Update the mousetip's top...
        this.mouseTip.element.style.top = this.getPixelValue(
            pageY,
            this.mouseTip.attributes.adjustments.vertical
        );
        // ... and left styles
        this.mouseTip.element.style.left = this.getPixelValue(
            pageX,
            this.mouseTip.attributes.adjustments.horizontal
        );
    }

    // Toggle the reduced motion state
    toggleReducedMotion({ target }) {
        this.state.reducedMotion = target.matches;
    }

    // Bind/unbind from reduced motion preference changes
    reducedMotion() {
        // Grab the reduced motion preference...
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        // ... and store it upon start
        if (!this.state.stop) this.state.reducedMotion = preference.matches;

        // Figure out whether to add or emove an event listener...
        const action = this.state.stop ? 'remove' : 'add',
            // ... and store the proper action
            listener = `${ action }EventListener`;

        // Finally, bind/unbind to/from all preference changes
        preference[listener]('change', this.toggleReducedMotion);
    }

    // Handle the mouse move event
    mouseMove(event) {
        // Update the mousetip if it already exists
        if (this.mouseTip.element) return window.requestAnimationFrame(() => this.update(event));

        // Otherwise, store the target...
        this.target = event.currentTarget;
        // ... and create the moustetip
        return this.create(event);
    }

    // Handle the mouse leave event
    mouseLeave(event) {
        // When the mouse leaves a target element, delete the mousetip
        return this.delete();
    }

    // Handle mouse events
    handleEvent(event) {
        switch (event.type) {
        case 'mousemove':
            return this.mouseMove(event);
        case 'mouseleave':
            return this.mouseLeave(event);
        }
    }

    // Get all target elements
    getTargets(elements) {
        // If no elements were given, try and grab them from the DOM
        if (!elements) return Array.from(document.querySelectorAll(`[${ this.selector.full }], [${ this.selector.short }]`));

        // Otherwise, if the elements aren't currently in an array, return them in one
        if (typeof elements !== 'object') return Array.from(elements);

        // Otherwise, return the elements as-is
        return elements;
    }

    // Add/remove event listeners on the target elements
    targetListeners() {
        // If no element references are stored, do nothing
        if (!this.targets.length) return;

        // Figure out whether to add or emove an event listener...
        const action = this.state.stop ? 'remove' : 'add',
            // ... and store the proper action
            listener = `${ action }EventListener`;

        // For each target element...
        this.targets.forEach(target => {
            // ... bind/unbind from its mouse move and leave events
            target[listener]('mousemove',  this, false);
            target[listener]('mouseleave', this, false);
        });

        // If the stop state is enabled, reset the target element references
        if (this.state.stop) this.targets = [];
    }

    // Start handling mouse events
    start(elements) {
        // Grab all target elements by selector...
        const targets = this.getTargets(elements);
        // ... and if no target elements were found, do nothing
        if (!targets) return;

        // Store the target elements for reference
        this.targets = targets;

        // Add the reduced motion...
        this.reducedMotion();
        // ... and target elements listeners
        this.targetListeners();

        // Set global styles
        this.setGlobalStyles();
    }

    // Stop handling mouse events
    stop() {
        // If no element references are stored, do nothing
        if (!this.targets.length) return;

        // Enable the stop state,...
        this.state.stop = true;

        // Remove the reduced motion...
        this.reducedMotion();
        // ... and target elements listeners,...
        this.targetListeners();
        // ... and delete the mousetip
        this.delete();
    }
}
