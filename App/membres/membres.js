(function () {
    'use strict';
    var controllerId = 'membres';
    angular.module('app').controller(controllerId, ['common', 'datacontextuser', '$scope', membres]);

    function membres(common, datacontextuser, $scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        $scope.selection = [];
        var vm = this;
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

        $scope.modifyuser = function (user)
        {  console.log(user);
            var message = datacontextuser.modifyuser(user, $scope);
            $('#userModel').modal('hide');
            $scope.Modifymessage = "La modification de l'utilsateur " + user.Nom + "  " + user.Prenom + "a été bien prise en compte";

        }
        $scope.add=function()
        {
            var currentuser = $scope.user;
            datacontextuser.modifyuser(currentuser, $scope);
            $('#userModel').modal('hide');
        }
        $scope.showadd=function()
        {
            $scope.user = null;
            $scope.editMode = false;
            $('#userModel').modal('show');
        }
        $scope.showedit=function(p)
        {
            $scope.user= p;
            $scope.editMode = true;
            $('#userModel').modal('show');
            
        }
        $scope.cancel=function()
        {
            $scope.user = null;
            $('#userModel').modal('hide');
        }
        $scope.delete=function(idx)
        {
            var currentuser = this.p;//.user;
            datacontextuser.deleteUser(currentuser, $scope, idx)
        }
        function activate() {
            var promises = [getUsers()];
            common.activateController(promises, controllerId)
                .then(function () { log('Exercices'); });
        }

        function getUsers() {
            console.log("getUsers");
            return datacontextuser.getUsers($scope.pagingInfo.page).success(function (data) {
                $scope.pagingInfo.totalItems = data.count;
                var dtausers = JSON.parse(JSON.stringify(data));
                vm.people = dtausers.data;
                return vm.people ;
            });
        }
        $scope.search = function () {
            $scope.pagingInfo.page = 1;
            getUsers();
        };

        $scope.sort = function (sortBy) {
            if (sortBy === $scope.pagingInfo.sortBy) {
                $scope.pagingInfo.reverse = !$scope.pagingInfo.reverse;
            } else {
                $scope.pagingInfo.sortBy = sortBy;
                $scope.pagingInfo.reverse = false;
            }
            $scope.pagingInfo.page = 1;
            getUsers();
        };

        $scope.selectPage = function (page) {
            $scope.pagingInfo.page = page;
            console.log("page" + page);
            getUsers();
        };
        getUsers();
    }
})();