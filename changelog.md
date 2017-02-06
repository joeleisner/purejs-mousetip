# Change Log

### [Version 1.2.2 - Build System Improvements](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.2.2)
This update includes some build-system improvements:
* All build-system javascript now utilizes ES2015 (ES6) syntax
* Removed the `clean` task from Gulp

### [Version 1.2.1 - Bug Fixes & Optimizations](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.2.1)
Minor updates have been made. Here's what's changed:
* MouseTip can now be installed by NPM! (Check out the Installation section)
* By default, MouseTip now runs with HTML capabilities turned on
* Elements are not selected until `this.run()` is called
* Linting warnings squashed
* Build system optimized

### [Version 1.2.0 - HTML Messages](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.2.0)
Added HTML capabilities within MouseTip messages!
* By default, MouseTip runs with HTML capabilities turned off
* HTML capabilities can be enabled globally via `html: true` in the global settings object
* HTML capabilities can be enabled/disabled individually via the `mousetip-enable-html` or `mousetip-disable-html` attribute

## [Version 1.1.0 - New Selector Setting](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.1.0)
Added new MouseTip constructor setting **selector**
* Now you can namespace every MouseTip instance
* When a custom selector is passed into the settings, MouseTip will look for attributes with that new namespace (i.e. "awesomeName" instead of "mousetip", "awesomeName-css-zindex" instead of "mousetip-css-zindex")
* Check out the *How to Use* section in readme.md to see this new setting in action

## [Version 1.0.1 - First Release (Bug Fixes)](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.0.1)
Simple bug fixes:
* Updated the bindMouseMove function to utilize pageX/pageY instead of clientX/clientY
* Fixed missing-semicolon JSHint warnings in the mousetip script

## [Version 1.0.0 - First Release](https://github.com/joeleisner/purejs-mousetip/releases/tag/v1.0.0)
Version 1.0.0 is here, and it includes an entirely new way to use the PureJS MouseTip script!
* The script is now wrapped in a MouseTip constructor function instead of a self-executing function
* The script can now take global style/position overrides when an instance of the constructor is created
* The script will not find the MouseTip elements or bind mouse events until a constructor instance's .run() function is called

## [Version 0.0.1 - Early Alpha](https://github.com/joeleisner/purejs-mousetip/releases/tag/v0.0.1)
This javascript tool is still in its early stages, so give me some feedback, contribute, and help make it better!
