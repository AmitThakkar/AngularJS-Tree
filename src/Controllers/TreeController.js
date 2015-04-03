/**
 * Created by Amit Thakkar on 24/03/15.
 */
(function (ng) {
    var app = ng.module('tree', ['tree.service', 'tree.directives']);
    app.controller("TreeController", ["TreeService", function (TreeService) {
        var tc = this;
        buildTree();
        function buildTree() {
            TreeService.getTree().then(function (result) {
                tc.tree = result.data;
            }, function (result) {
                alert("Tree no available, Error: " + result);
            });
        }
    }]);
})(angular);
