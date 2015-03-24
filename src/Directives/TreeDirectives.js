/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
  var app = ng.module('tree.directives', []);
  app.directive('nodeTree', function () {
    return {
      template: '<node ng-repeat="node in tree"></node>',
      replace: true,
      restrict: 'E',
      scope: {
        tree: '=children'
      }
    };
  });
  app.directive('node', function ($compile) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'partials/the-tree.html',
      link: function (scope, elm) {
        $(elm).find('span.leaf').on('click', function (e) {
          var children = $(elm).find('li');
          if (children.is(":visible")) {
            children.hide('fast');
          } else {
            children.show('fast');
          }
        });
        if (scope.node && scope.node.children && scope.node.children.length > 0) {
          var childNode = $compile('<ul><node-tree children="node.children"></node-tree></ul>')(scope);
          elm.append(childNode);
        }
      },
      controller: ["$scope", function($scope) {
        $scope.checkNode = function (node) {
          node.checked = !node.checked;
          function checkChildren(c) {
            angular.forEach(c.children, function (c) {
              c.checked = node.checked;
              checkChildren(c);
            });
          }

          checkChildren(node);
        };
        $scope.isLeaf = function (_data) {
          return _data && _data.children && _data.children.length == 0;
        };
      }]
    };
  });
})(angular);
