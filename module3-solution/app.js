(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
		.directive('foundItems', foundItemsDirective);


	function foundItemsDirective() {
		return {
			templateUrl: 'menuItemList.html',
			scope: {
				foundItems: '<items',
				onRemove: '&'
			}
		};
	}


	NarrowItDownController.$inject = ['MenuSearchService'];

	function NarrowItDownController(MenuSearchService) {
		var vm = this;
		vm.itemList = [];
		vm.searchTerm = "";

		vm.getMenu = function () {
			var count = 0;

			var promise = MenuSearchService.getMatchedMenuItems(vm.searchTerm);
			promise.then(function (result) {
				vm.itemList = result;
			});
		}

		vm.removeItem = function (itemIndex) {
			MenuSearchService.removeItem(itemIndex);
		}
	};

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];

	function MenuSearchService($http, ApiBasePath) {
		var service = this;
		var foundItems = [];

		service.removeItem = function (index) {
			foundItems.splice(index, 1);
		}

		service.getMatchedMenuItems = function (searchTerm) {

			return $http({
					method: "GET",
					url: (ApiBasePath + "/menu_items.json"),
				}).then(function (result) {
					foundItems = [];

					for (var i = 0; i < result.data.menu_items.length; i++) {
						var description = result.data.menu_items[i].description;
						console.log(description);
						if (description.toLowerCase().indexOf(searchTerm) !== -1) {
							
							foundItems.push({
								name: result.data.menu_items[i].name,
								short_name: result.data.menu_items[i].short_name,
								description: result.data.menu_items[i].description
							});
						}
					}
					return foundItems;
				})
				.catch(function (error) {
					console.log(error);
				});
		}

	}
})();