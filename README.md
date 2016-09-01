# AngularJS Tree

This repository is for creating a <strong>tree</strong> <strong>structure</strong> with <strong>AngularJS</strong>.

In this blog we will implement <strong>tree</strong> <strong>structure</strong> with <strong>AngularJS</strong> and resultant <strong>tree</strong> will look like below:

![tree.png](https://raw.githubusercontent.com/AmitThakkar/AngularJS-Tree/master/images/tree.png)

And ```valid JSON``` for the <strong>tree</strong> is as given below:

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

Let's see, how I have implemented this? For implementing the <strong>tree</strong>, I have created 2 <strong>directives</strong>.

1. <strong>nodeTree</strong> : An <strong>isolated</strong> <strong>scope</strong> <strong>directive</strong> which will loop to the all the siblings and add another <strong>directive</strong>(node) for each sibling.
2. <strong>node</strong> : A <strong>directive</strong> which represents a node/element and creates sub <strong>tree</strong> as its children.

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

Follow Me
---
[Github](https://github.com/AmitThakkar)

[Twitter](https://twitter.com/amit_thakkar01)

[LinkedIn](https://in.linkedin.com/in/amitthakkar01)

[More Blogs By Me](https://amitthakkar.github.io/)