(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('app').controller(controllerId, ['common', 'datacontextuser', 'datacontextservices', '$location', '$route', 'config', 'routes', '$scope', admin]);

    function admin(common, datacontextuser, datacontextservices,$scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        $scope.selection = [];
        var vm = this;
        vm.currentuser = [];
        vm.title = 'Utilisateurs';

        $scope.pagingInfo = {
            page: 1,
            itemsPerPage: 4,
            sortBy: 'Nom',
            reverse: false,
            search: '',
            totalItems: 0
        };

       
        activate();

       
        function activate() {       
            common.activateController([], controllerId)
                .then(function () { log('Exercices'); });
        }

    }
})();