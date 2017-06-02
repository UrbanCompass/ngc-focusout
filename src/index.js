import angular from 'angular';

focusOutDirective.$inject = ['$document', '$timeout'];
function focusOutDirective($document, $timeout) {
  const doc = $document[0];

  return {
    restrict: 'A',
    scope: false,
    link(scope, element, attrs) {
      const el = element[0];

      el.addEventListener('blur', onFocusOut, true);

      scope.$on('$destroy', () => {
        el.removeEventListener('blur', onFocusOut, true);
      });

      function onFocusOut() {
        // Wait for new document.activeElement to be set. $applyAsync() does not work.
        $timeout(() => {
          if (!el.contains(doc.activeElement)) {
            scope.$apply(attrs.ngcFocusOut);
          }
        }, 0, false);
      }
    },
  };
}

export default angular.module('ngc.focusOut', [])
  .directive('ngcFocusOut', focusOutDirective)
  .name;
