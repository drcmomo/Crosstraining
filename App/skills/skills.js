(function () {
    'use strict';
    var controllerId = 'skills';
    angular.module('app').controller(controllerId, ['common', '$scope', 'datacontextservices','datacontextactivite', skills]);

    function skills(common, $scope, datacontextservices, datacontextactivite) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.skillsup = [];
        vm.title = 'SKILLS';

        activate();

        function activate() {

            vm.teams = datacontextservices.getTeams();
            vm.rounds = datacontextservices.getRounds();
            getSkillsDetails();
            common.activateController([], controllerId)
                .then(function () { log('Skills'); });
        }
        $scope.cancel = function () {
            $scope.skillsup = null;
            $('#skillModal').modal('hide');
        }
        $scope.updateskill = function (skillsup) {
            if (this.selectedOptionround != skillsup.RoundId)
            {
                skillsup.RoundId = this.selectedOptionround;
            }
            if (this.selectedOptionteam != skillsup.TeamId) {
                skillsup.TeamId = this.selectedOptionteam;
            }

            var message = datacontextactivite.modifySkill(skillsup, $scope);
            $('#skillModal').modal('hide');
            activate();
        }
        $scope.showwskill = function () {
            $scope.skillsup = null;
            $scope.editMode = false;
            $('#skillModal').modal('show');
        }
        $scope.saveskill = function () {
            var currentskill = $scope.skillsup;
            currentskill.teamid = $scope.teamsId;
            currentskill.roundid = $scope.roundsId;
            var skillsaved = datacontextactivite.saveSkill(currentskill, $scope).then(function (data) {
                console.log(data);
                if (data.skillsId != null) {

                    datacontextservices.setcacheskillId(data.skillsId);
                    $scope.messagesaveskill = "L'enregistrementa ete bien pris en compte. Veuillez maintenant enregistre le pave WODS";
                    getSkillsDetails();
                    $('#skillModal').modal('hide');
                } else {
                    $scope.messagesaveskill = "L'enregistrement n'a pas ete prise en compte";
                }

            });
            
        }

        $scope.selectTeam = function () {
            console.log("selectTeam  ",this.selectedOptionteam);

        };

        $scope.selectRound = function () {
            console.log("selectRound  ", this.selectedOptionround);
        };

        function getSkillsDetails() {
            return datacontextactivite.getSkillsDetails().success(function (data) {
                vm.skilldetails = data;
                var postsLen = data.length;
                for (var i = 0; i < postsLen; i++) {
                    var dateString = vm.skilldetails[i].Date.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    var date = day + "/" + month + "/" + year;
                    vm.skilldetails[i].Date = date;
                }
                return vm.skilldetails;
            });
        }

        $scope.showeditskill = function (s) {
            $scope.skillsup = s;
            $scope.selectedOptionteam = s.TeamId;
            $scope.selectedOptionround = s.RoundId;
            $scope.editMode = true;
            $('#skillModal').modal('show');

        }
        $scope.deleteskill = function (idx) {
            var currentskill = this.s;
            datacontextactivite.deleteskill(currentskill, $scope, idx)
        }

    }
})();