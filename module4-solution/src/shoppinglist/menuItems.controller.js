(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['MenuDataService', 'items']
function ItemDetailController(MenuDataService, items) {
  var vm = this;
  vm.items = items.menu_items;
  vm.name = items.category.name+" ("+items.category.short_name+")";
}

})();
