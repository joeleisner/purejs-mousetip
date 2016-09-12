# Change Log

## Version 1.2.0 - HTML Messages
Added HTML capabilities within MouseTip messages!
- By default, MouseTip runs with HTML capabilities turned off.
- HTML capabilities can be enabled globally via `html: true` in the global settings object
- HTML capabilities can be enabled/disabled individually via the `mousetip-enable-html` or `mousetip-disable-html` attribute

## Version 1.1.0 - New Selector Setting
Added new MouseTip constructor setting **selector**
- Now you can namespace every MouseTip instance
- When a custom selector is passed into the settings, MouseTip will look for attributes with that new namespace (i.e. "awesomeName" instead of "mousetip", "awesomeName-css-zindex" instead of "mousetip-css-zindex")
- Check out the *How to Use* section in readme.md to see this new setting in action

## Version 1.0.1 - First Release (Bug Fixes)
Simple bug fixes:
- Updated the bindMouseMove function to utilize pageX/pageY instead of clientX/clientY
- Fixed missing-semicolon JSHint warnings in the mousetip script

## Version 1.0.0 - First Release
Version 1.0.0 is here, and it includes an entirely new way to use the PureJS MouseTip script!
- The script is now wrapped in a MouseTip constructor function instead of a self-executing function
- The script can now take global style/position overrides when an instance of the constructor is created
- The script will not find the MouseTip elements or bind mouse events until a constructor instance's .run() function is called
