(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'datacontextuser', '$scope', dashboard]);

    function dashboard(common, datacontextuser, $scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Add User',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        $scope.edituser=function()
        {
          //  var currentuser = $scope.user;
            this.p.editMode = true;
            //$scope.user.editMode = true;
        }
        $scope.cancel = function () {
            //  var currentuser = $scope.user;
            this.p.editMode = false;

            if ($scope.user != null) {
                $scope.user.firstname = "";
                $scope.user.lastname = "";
                $scope.user.age = "";
                $scope.user.location = "";
            }
        }
        $scope.delete= function(idx)
        {
            var currentuser = this.p;//.user;
            datacontextuser.deletePeople(currentuser, $scope, idx)
        }
        $scope.save=function()
        {
            var currentuser = $scope.user;
            var message = datacontextuser.savePeople(currentuser, $scope);
           // vm.people.push(currentuser);
        }
        $scope.modifyuser = function()
        {
            var message = datacontextuser.modifyuser(this.p, $scope);
            this.p.editMode = false;
            $scope.Modifymessage = "Data modified successfully"
        }
        activate();

        function activate() {
            var promises = [getMessageCount(), getUsers()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getMessageCount() {
            return datacontextuser.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getUsers() {
            return datacontextuser.getUsers().then(function (data) {
                return vm.people = data;
            });
        }
    }
})();