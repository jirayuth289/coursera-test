(function () {
		'use strict';

		angular
			.module('ShoppingListCheckOff', [])
			.controller('ToBuyController', ToBuyController)
			.controller('AlreadyBoughtController', AlreadyBoughtController)
			.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

		ToBuyController.$inject = ['ShoppingListCheckOffService'];
		function ToBuyController(ShoppingListCheckOffService) {
			var vm = this;
			
			vm.items = ShoppingListCheckOffService.getItemTobuy();
			vm.toBuy = function(index) {
				ShoppingListCheckOffService.ToBuy(index);
			}
		};

		AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
		function AlreadyBoughtController(ShoppingListCheckOffService) {
			var vm = this;
			
			vm.itemsBought = ShoppingListCheckOffService.getItemAlreadyBought();
		};

		function ShoppingListCheckOffService() {
			var service = this;

			// List of shopping items
			var listItemTobuy = [{ name: "cookies", quantity: 10 },
						 { name: "bread", quantity: 2 },
						{ name: "cake", quantity: 1 },
						{ name: "pork", quantity: 10 },
						{ name: "apple", quantity: 10 },
						{ name: "coke", quantity: 10 }];
			
			var listItemBought = [];
			
			service.ToBuy = function(index) {
				listItemBought.push(listItemTobuy[index]);
				listItemTobuy.splice(index, 1);
			}
			
			service.getItemTobuy = function() {
				return listItemTobuy;
			}
			
			service.getItemAlreadyBought = function() {
				return listItemBought;
			}
			
	}

}());