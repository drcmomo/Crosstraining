(function () {
    'use strict';
    var controllerId = 'activite';
    angular.module('app').controller(controllerId, ['common', 'datacontextactivite', '$scope', activite]);

    function activite(common, datacontextactivite, $scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Ajouter un programme',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };

        $scope.Activites = "Pour saisie le programme du jour";
        $scope.Activites1= "Il faut saisie et enregistrer : Warning,Skills,Woids";

        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Activités';
        $scope.teams = {};
        $scope.rounds = {};
        $scope.rounds.roundsId = "1";
        $scope.teams.teamsId = "1";

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
            datacontextactivite.deletePeople(currentuser, $scope, idx);
        }
        $scope.save=function()
        {
            var currentuser = $scope.user;
            var message = datacontextactivite.savePeople(currentuser, $scope);
           // vm.people.push(currentuser);
        }
        $scope.modifyuser = function()
        {
            var message = datacontextactivite.modifyuser(this.p, $scope);
            this.p.editMode = false;
            $scope.Modifymessage = "Data modified successfully";
        }
        activaterounds();
        activateteams();

        function activaterounds() {
            var rounds = [getMessageCount(), getRounds()];
            common.activateController(rounds, controllerId)
                .then(function () { log('Activation Rounds'); });
        }
        function activateteams() {
            var teams = [getMessageCount(), getTeams()];
            common.activateController(teams, controllerId)
                .then(function () { log('Activation Teams'); });
        }

        function getMessageCount() {
            return datacontextactivite.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

        function getRounds() {
            return datacontextactivite.getRounds().success(function (data) {
                var datarounds = JSON.parse(JSON.stringify(data));
                vm.rounds = datarounds.data;
                return vm.rounds = data;
            });
        }
        function getTeams() {
            return datacontextactivite.getTeams().success(function (data) {
                var datateams = JSON.parse(JSON.stringify(data));
                vm.teams = datateams.data;
                return vm.teams = data;
            });
        }
    }
})();