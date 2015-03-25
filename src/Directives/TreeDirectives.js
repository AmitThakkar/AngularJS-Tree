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
      templateUrl: 'partials/node.html',
      link: function (scope, element) {
        if (scope.node && scope.node.children && scope.node.children.length > 0) {
          var childNode = $compile('<ul ng-if="!node.visibility"><node-tree children="node.children"></node-tree></ul>')(scope);
          element.append(childNode);
        }
      },
      controller: ["$scope", function ($scope) {
        $scope.toggleVisibility = function (node) {
          node.visibility = !node.visibility;
        };
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
      }]
    };
  });
})(angular);
