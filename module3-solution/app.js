(function () {
	'use strict';

	angular.module('NarrowItDownApp', [])
		.controller('NarrowItDownController', NarrowItDownController)
		.service('MenuSearchService', MenuSearchService)
		.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
		.directive('foundItems', foundItemsDirective);


	function foundItemsDirective() {
		return {
			 restrict: "E",
			templateUrl: 'menuItemList.html',
			scope: {
				foundItems: '<',
				onRemove: '&'
			}
		};
	}
	
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var vm = this;
		vm.itemList = [];
		vm.searchTerm = "";
		vm.msg = false;
		vm.doSearch = function () {
			var promise = MenuSearchService.getMatchedMenuItems(vm.searchTerm);
			promise.then(function (result) {
				if (result.length != 0){
					vm.itemList = result;
					vm.msg = false;
				}else{
					vm.msg = true;
				}
					
			}).catch(function (error) {
				console.log(error);
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
					if (description.toLowerCase().indexOf(searchTerm) !== -1) {

						foundItems.push({
							name: result.data.menu_items[i].name,
							short_name: result.data.menu_items[i].short_name,
							description: result.data.menu_items[i].description
						});
					}
				}
				return foundItems;
			});
		}

	}
})();