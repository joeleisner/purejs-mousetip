function MouseTip(userSettings) {
    // Select all elements with the attribute 'mouse-tip', and accept user-defined render settings or constructor defaults
    var elements = document.querySelectorAll('[mousetip]'),
        userSettings = userSettings || {},
        settings = {
            cssZIndex: userSettings.cssZIndex || '9999',
            cssPosition: userSettings.cssPosition || 'absolute',
            cssPadding: userSettings.cssPosition || '15px',
            cssBorderRadius: userSettings.cssPosition || '4px',
            cssBackground: userSettings.cssBackground || 'rgba(0,0,0,0.75)',
            cssColor: userSettings.cssColor || '#fff',
            position: userSettings.position || 'bottom right'
        };
    // Run Function
    this.run = function() {
        // For each element selected...
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            // ... bind it to events triggered by 'mouseenter', 'mouseleave', and 'mousemove'
            this.bindMouseEnter(element, settings);
            this.bindMouseLeave(element);
            this.bindMouseMove(element, settings.position);
        }
    }

    //=include ./modules/bind-mouse-enter.js
    //=include ./modules/bind-mouse-leave.js
    //=include ./modules/bind-mouse-move.js
};
