(function () {
'use strict';

angular.module('MenuApp')
.component('shoppingList', {
  templateUrl: 'src/shoppinglist/templates/categorieslist.template.html',
  bindings: {
    catItems: '<'
  }
});

})();
