import angular from 'angular';

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
