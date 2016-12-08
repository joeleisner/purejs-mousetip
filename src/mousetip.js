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

    //=require modules/*
}
