import angular from 'angular';

focusoutDirective.$inject = ['$document', '$timeout'];
function focusoutDirective($document, $timeout) {
  const doc = $document[0];

  return {
    restrict: 'A',
    scope: false,
    link(scope, element, attrs) {
      const el = element[0];

      el.addEventListener('blur', onFocusout, true);

      scope.$on('$destroy', () => {
        el.removeEventListener('blur', onFocusout, true);
      });

      function onFocusout() {
        // Wait for new document.activeElement to be set. $applyAsync() does not work.
        $timeout(() => {
          if (!el.contains(doc.activeElement)) {
            scope.$apply(attrs.ngcFocusout);
          }
        }, 0, false);
      }
    },
  };
}

export default angular.module('ngc.focusout', [])
  .directive('ngcFocusout', focusoutDirective)
  .name;
