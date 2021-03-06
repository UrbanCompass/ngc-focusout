# ngc-focusout [![Build Status](https://travis-ci.org/UrbanCompass/ngc-focusout.svg?branch=master)](https://travis-ci.org/UrbanCompass/ngc-focusout)

More robust replacement for `ngBlur`. This directive uses the blur event's capture phase to detect when focus leaves not just the element this is applied on, but children of the element as well.

Usage:
```html
<div ngc-focusout="applyAngularExpression()" tabindex="-1"></div>
```

Note that the element must be focusable in order for any blur events to fire. Make sure to
use this together with the `tabindex` attribute when necessary.
