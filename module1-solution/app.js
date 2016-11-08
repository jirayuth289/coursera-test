(function () {
	'use strict';

	angular
		.module('LunchCheck', [])
		.controller('LunchCheckController', ControllerCtrl)

	ControllerCtrl.$inject = ['$scope'];

	function ControllerCtrl($scope) {
		var vm = $scope;
		vm.input = "";
		vm.msg = "";
		vm.splitString = function () {
			var length = vm.input.split(",").length;
			var arr = vm.input.split(",");
			var count = 0;
			if (vm.input != "") {
				for (var index = 0; index < length; index++) {
					if (arr[index] == "") {
						count++;
					}
				}
				if (count > 0) {
					vm.msg = "empty item, i.e.,' ', ,";
					$scope.css = {
						"color": "red",
					}
				} else {
					if (length < 4) {
						vm.msg = "Enjoy!";
						$scope.css = {
							"color": "green",
						}
					} else {
						$scope.css = {
							"color": "green",
						}
						vm.msg = "Too much!";
					}
				}



			} else {
				vm.msg = "Please enter data first";
				$scope.css = {
					"color": "red",
				}
			}
		};
	}

}());