(function () {
'use strict';

angular.module('MenuApp')
.component('itemlist', {
  templateUrl: 'src/shoppinglist/templates/itemlist.template.html',
  bindings: {
    items: '<'
  }
});

})();
