(function () {
'use strict';

angular.module('MenuApp')
.controller('MainCategoriesListController', MainCategoriesListController);


MainCategoriesListController.$inject = ['MenuDataService', 'catItems'];
function MainCategoriesListController(MenuDataService, catItems) {
  var vm = this;
  vm.items = catItems;
}

})();
