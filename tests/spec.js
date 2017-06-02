import angular from 'angular';
import 'angular-mocks';

import ngcFocusout from '../src/index.js';

describe('ngc.focusout', () => {

  let $scope, $timeout, docEl, el, outsideEl;

  beforeEach(angular.mock.module(ngcFocusout));

  beforeEach(inject(($compile, $rootScope, _$timeout_, $window) => {
    const element = angular.element([
      '<div ngc-focusout="spy()" tabindex="-1">',
      '<input type="text">',
      '</div>',
    ].join(''));

    $timeout = _$timeout_;
    $scope = $rootScope.$new();
    $scope.spy = jasmine.createSpy('handler');

    el = $compile(element)($scope)[0];
    $scope.$digest();

    outsideEl = angular.element('<div tabindex="-1"></div>')[0];

    docEl = $window.document.documentElement;
    docEl.appendChild(el);
    docEl.appendChild(outsideEl);
  }));

  afterEach(() => {
    $timeout.verifyNoPendingTasks();
    $scope.$destroy();
    docEl.removeChild(el);
    docEl.removeChild(outsideEl);
    el = null;
    outsideEl = null;
  });

  it('should run the handler when focusing out of the element', (done) => {
    new Promise((resolve) => {
      el.focus();
      resolve();
    }).then(() => {
      $timeout.verifyNoPendingTasks();
      expect($scope.spy.calls.count()).toBe(0);
      outsideEl.focus();
    }).then(() => {
      $timeout.flush();
      expect($scope.spy.calls.count()).toBe(1);
    }).then(done, fail);
  });

  it('should not run the handler when focusing a child of the element', (done) => {
    new Promise((resolve) => {
      el.focus();
      resolve();
    }).then(() => {
      $timeout.verifyNoPendingTasks();
      expect($scope.spy.calls.count()).toBe(0);
      el.firstChild.focus();
    }).then(() => {
      $timeout.flush(); // this will error if $timeout was never called
      expect($scope.spy.calls.count()).toBe(0);
    }).then(done, fail);
  });

  it('should run the handler when focusing out of a child of the element', (done) => {
    new Promise((resolve) => {
      el.firstChild.focus();
      resolve();
    }).then(() => {
      $timeout.verifyNoPendingTasks();
      expect($scope.spy.calls.count()).toBe(0);
      outsideEl.focus();
    }).then(() => {
      $timeout.flush();
      expect($scope.spy.calls.count()).toBe(1);
    }).then(done, fail);
  });

});
