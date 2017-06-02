import angular from 'angular';

/**
 * More robust replacement for `ngBlur`. This directive will only trigger when focus leaves the
 * element this is applied on, as well as any children of the element. Usage:
 *
 *   <div ngc-focus-out="applyAngularExpression()" tabindex="-1"></div>
 *
 * Notice that the element must be focusable in order for any blur events to fire. Make sure to
 * use this together with the `tabindex` attribute when necessary.
 */
focusOutDirective.$inject = ['$document', '$timeout'];
function focusOutDirective($document, $timeout) {
  const doc = $document[0];

  return {
    restrict: 'A',
    scope: false,
    link(scope, element, attrs) {
      const el = element[0];

      // Wait for new document.activeElement to be set. $applyAsync() does not work.
      el.addEventListener('blur', () => $timeout(onFocusOut, 0, false), true);

      function onFocusOut() {
        if (!el.contains(doc.activeElement)) {
          scope.$apply(attrs.ucFocusOut);
        }
      }
    },
  };
}

export default angular.module('ngc.focusOut', [])
  .directive('ngcFocusOut', focusOutDirective)
  .name;
