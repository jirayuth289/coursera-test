(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$timeout', '$http', 'ApiBasePath']
function MenuDataService($timeout, $http, ApiBasePath) {
  var service = this;

  	service.getAllCategories = function() {
		return $http({
				method: "GET",
				url: (ApiBasePath + "/categories.json"),
			}).then(function (result) {
			  return result.data;
			}).catch(function (error) {
			     console.log(error);
			});
	}

	service.getItemsForCategory = function(categoryShortName){
    return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {category: categoryShortName}
      }).then(function (result) {
        return result.data;
      }).catch(function (error) {
           console.log(error);
      });
	}

}

})();
