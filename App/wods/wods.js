(function () {
    'use strict';
    var controllerId = 'wods';
    angular.module('app').controller(controllerId, ['common', '$scope', 'datacontextservices','datacontextactivite',wods]);

    function wods(common, $scope, datacontextservices, datacontextactivite) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.wodsup = [];

        vm.programme = {
            Id: null,
            SkillsId: null,
            WarmingId: null,
            UserId: null,
            WodsIs: null,
            Temps: null          
        };

       
        activate();

        function activate() {

            vm.teams = datacontextservices.getTeams();
            vm.rounds = datacontextservices.getRounds();
            common.activateController([], controllerId)
                .then(function () { log('Wods'); });
        }


        $scope.savewod = function () {
            var currentwod = $scope.wodsup;
            currentwod.teamid = $scope.teamsId;
            currentwod.roundid = $scope.roundsId;
            console.log("currentwarning", currentwod);
            var wodsaved = datacontextactivite.saveWod(currentwod, $scope).then(function (data) {
                console.log(data);
                if (data.id !=null) {
                     vm.programme.SkillsId = datacontextservices.getcacheskillId();
                     vm.programme.WarmingId = datacontextservices.getcachewarnaingId();
                     vm.programme.UserId = datacontextservices.getUser().Id;                  
                    vm.programme.WodsIs = data.id;
                    datacontextactivite.saveProgramme(vm.programme);
                console.log("vm.programme ", vm.programme);
                }

                });
        }

        $scope.cancel = function () {
            //  var currentuser = $scope.user;
            this.p.editMode = false;

            if ($scope.wodsup != null) {
                $scope.wodsup.titre = "";
                $scope.wodsup.exercice1 = "";
                $scope.wodsup.exercice2 = "";
                $scope.wodsup.exercice3 = "";
                $scope.wodsup.exercice4 = "";
                $scope.wodsup.exercice5 = "";
                $scope.wodsup.exercice6 = "";
                $scope.wodsup.exercice7 = "";
                $scope.wodsup.exercice8 = "";
            }
        }


        vm.selected = vm.teams[0];

        $scope.selectTeam = function (opt) {
            console.log(opt);
        };

        $scope.selectRound = function (opt) {
            console.log(opt);
        };
    }
})();