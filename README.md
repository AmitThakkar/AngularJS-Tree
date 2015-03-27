# AngularJS Tree

This repository is for creating a **tree** **structure** with **AngularJS**.

In this blog we will implement **tree** **structure** with **AngularJS** and resultant **tree** will be looks like below:

![tree.png](https://raw.githubusercontent.com/AmitThakkar/AngularJS-Tree/master/images/tree.png)

And ```JSON``` for the **tree** will be looks like as below:

```JSON
[
  {
    "name": "Vegetarian Recipes",
    "checked": false,
    "children": [
      {
        "name": "Fruits",
        "checked": false,
        "children": [
          {
            "name": "Dry Fruits",
            "checked": false,
            "children": [
              {
                "name": "Almond",
                "checked": false
              },
              ...
            ]
          },
          {
            "name": "Fresh Fruits",
            "checked": false,
            "children": [
              {
                "name": "Apple",
                "checked": false
              },
              ...
            ]
          },
          ...
        ]
      },
      {
        "name": "Soup",
        "checked": false,
        "children": [
          {
            "name": "Tomato Soup",
            "checked": false
          },
          ...
        ]
      }
    ]
  },
  {
    "name": "Non-vegetarian Recipes",
    "checked": false
  }
]
```

Lets see, how have I implemented this? For implementing the **tree**, I have created 2 **directives**.

1. **nodeTree** : A **isolated** **scope** **directive** which will loop to the all the siblings and add another **directive**(node) for each sibling.
2. **node** : A **directive** which represent a node/element and create sub **tree** is it has children.

```JavaScript
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
    templateUrl: 'partials/node.html', // HTML for a single node.
    link: function (scope, element) {
      /*
       * Here we are checking that if current node has children then compiling/rendering children.
       * */
      if (scope.node && scope.node.children && scope.node.children.length > 0) {
        var childNode = $compile('<ul class="tree" ng-if="!node.visibility"><node-tree children="node.children"></node-tree></ul>')(scope);
        element.append(childNode);
      }
    },
    controller: ["$scope", function ($scope) {
      // This function is for just toggle the visibility of children
      $scope.toggleVisibility = function (node) {
        node.visibility = !node.visibility;
      };
      // Here We are marking check/un-check all the nodes. 
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
```
