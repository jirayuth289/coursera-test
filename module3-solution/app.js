(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
		.directive('foundItems', foundItemsDirective);


	function foundItemsDirective() {
		return  {
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

		vm.getMenu = function (desc) {
			var count = 0;
			var promise = MenuSearchService.getMatchedMenuItems();
			promise.then(function (result) {
				var foundItems = result.data.menu_items;
				for (var index = 0; index < foundItems.length; index++) {
					if (desc == foundItems[index].description) {
						vm.itemList.push(foundItems[index]);
						count++;
						break;
					}
				}
				if(count == 0){
					vm.msg = "Nothing found";
				}
			});
		}

		vm.removeItem = function (itemIndex) {
			vm.itemList.splice(itemIndex, 1);
		}
	};

	MenuSearchService.$inject = ['$http', 'ApiBasePath'];

	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function () {
			var response = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			});

			return response;
		}
	}
})();