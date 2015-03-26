# AngularJS Tree

This repository is for creating a tree structure with **AngularJS**.

In this blog we will implement **tree** with **AngularJS** only, without using any ```.js``` file. In the we will create **tree** like below:

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
