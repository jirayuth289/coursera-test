(function(){
    'use strict';

    angular
        .module('LunchCheck',[])
        .controller('LunchCheckController', ControllerCtrl)
    
    ControllerCtrl.$inject = ['$scope'];
    function ControllerCtrl($scope){
       var vm = $scope;
       vm.input = "";
       vm.msg = "";
       vm.splitString = function(){
         var length = vm.input.split(",").length;
         if(vm.input != ""){
             if(length < 4)
            vm.msg = "Enjoy!";
        else
            vm.msg = "Too much!";
         }else{
             vm.msg = "Empty";
         }
       };
    }

}());