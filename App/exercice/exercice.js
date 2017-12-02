(function () {
    'use strict';
    var controllerId = 'exercice';
    angular
        .module('app')
        .controller(controllerId, ['common', 'datacontextexercice', '$scope','$route', exercice]);

    function exercice(common, datacontextexercice, $scope, $route) {
        console.log('exercices routes: ',$route);
        /* jshint validthis:true */
        var vm = this;
         vm.exer = {};
         vm.title = 'Exercices';
        vm.news = {
            title: 'Ajouter un exercice',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };

        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: 10,
            sortBy: 'nomExercices',
            reverse: false,
            search: '',
            totalItems: 0
        };

        var promiseValue = {};
        //  vm.save = save;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        activate();

        $scope.updateexercice = function (exercice) {
            var message = datacontextexercice.modifyExercice(exercice, $scope);
            $('#exerciceModel').modal('hide');
        }
        $scope.addexercice = function () {
            var currentexercice = $scope.exercice;
            datacontextexercice.saveExercice(currentexercice, $scope);
            $('#exerciceModel').modal('hide');
        }
        $scope.showaddexercice = function () {
            $scope.exercice = null;
            $scope.editMode = false;
            $('#exerciceModel').modal('show');
        }
        $scope.showeditexercice = function (e) {
            $scope.exercice = e;
            $scope.editMode = true;
            $('#exerciceModel').modal('show');

        }
        $scope.cancelexercice = function () {
            $scope.exercice = null;
            $('#exerciceModel').modal('hide');
        }
        $scope.deleteexercice = function (idx) {
            var currentexercice = this.e;//.user;
            datacontextexercice.deleteExercice(currentexercice, $scope, idx);
        }

        
        function getExercices() {

            console.log("$scope.pagingInfo.totalItems11 =   " + $scope.pagingInf);
            return datacontextexercice.getExercices($scope.pagingInfo.page).success(function (data) {
                console.log(data);
                $scope.pagingInfo.totalItems = data.count;
                console.log("$scope.pagingInfo.totalItems =   " +data.count);
                var dataexercices = JSON.parse(JSON.stringify(data));
                vm.exercice = dataexercices.data;
                console.log("vm.exercice  =   " + vm.exercice);
                return vm.exercice;
            });
        }
        //$scope.message = 'User saved';

        function activate() {
            var promises = [getExercices()];
            common.activateController(promises, controllerId)
                .then(function () { log('Exercices'); });
        }

        $scope.search = function () {
            $scope.pagingInfo.page = 1;
            getExercices();
        };

        $scope.sort = function (sortBy) {
            if (sortBy === $scope.pagingInfo.sortBy) {
                $scope.pagingInfo.reverse = !$scope.pagingInfo.reverse;
            } else {
                $scope.pagingInfo.sortBy = sortBy;
                $scope.pagingInfo.reverse = false;
            }
            $scope.pagingInfo.page = 1;
            getExercices();
        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            console.log("page" + page);
            getExercices();
        };
        getExercices();
    }

})();

