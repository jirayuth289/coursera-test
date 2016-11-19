(function () {

angular.module('MenuApp').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/shoppinglist/templates/home.template.html'
    })

    .state('categories', {
      url: '/categories-list',
      templateUrl: 'src/shoppinglist/templates/main-categorieslist.template.html',
	     controller: 'MainCategoriesListController as catelistCtrl',
	      resolve: {
      	   catItems: ['MenuDataService', function (MenuDataService) {
			       return  MenuDataService.getAllCategories();
		         }]
	          }
    })

	.state('items', {
       url: '/item-detail/{itemId}',
       templateUrl: 'src/shoppinglist/templates/itemsDetail.template.html',
	     controller: "ItemDetailController as itemCtrl",
       resolve: {
       items: ['$stateParams', 'MenuDataService',
          function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.itemId);
          }]
        }
    });
}


})();
