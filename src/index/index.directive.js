var index = function() {
    return {
        restrict: 'E',
        replace: true,
        link: function($scope, $element, $attrs) {
            $scope.content = "This is index route";
        }
    }
};

module.exports = {
    index: index
};