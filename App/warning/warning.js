(function () {
    'use strict';
    var controllerId = 'warning';
    angular.module('app').controller(controllerId, ['common', '$scope', '$filter','datacontextservices','datacontextactivite', warning]);

    function warning(common, $scope,$filter, datacontextservices, datacontextactivite) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.title = 'WARNING UP';
        vm.warningup = [];
        activate();

        function activate() {

            vm.teams = datacontextservices.getTeams();
            vm.rounds = datacontextservices.getRounds();
            GetWarmingsDetails();
            console.log(vm.warmingdetails);
            common.activateController([], controllerId)
                .then(function () { log('WARNING UP'); });
        }




        function GetWarmingsDetails() {
            console.log("GetWarmingsDetails");
            return datacontextactivite.GetWarmingsDetails().success(function (data) {
                console.log("GetWarmingsDetails ", data);
                vm.warmingdetails = data;
                var postsLen = data.length;
                for (var i = 0; i < postsLen; i++) {
                    var dateString = vm.warmingdetails[i].Date.substr(6);
                    var currentTime = new Date(parseInt(dateString));
                    var month = currentTime.getMonth() + 1;
                    var day = currentTime.getDate();
                    var year = currentTime.getFullYear();
                    var date = day + "/" + month + "/" + year;
                    vm.warmingdetails[i].Date = date;
                }
                return vm.warmingdetails;
            });
        }



        $scope.showwarning = function () {
            $scope.warningup = null;
            $scope.editMode = false;
            $('#warningModal').modal('show');
        }

        $scope.updatewarning = function (warningup) {
            var message = datacontextactivite.modifyWarning(warningup, $scope);
            $('#warningModal').modal('hide');
        }

        $scope.savewarning = function () {
            var currentwarning = $scope.warningup;
            currentwarning.teamid = $scope.teamsId;
            currentwarning.roundid = $scope.roundsId;
            console.log("currentwarning", currentwarning);
            var warninsaved = datacontextactivite.saveWarning(currentwarning, $scope).then(function (data) {
                console.log(data);
                if (data.warmingId != null) {

                    datacontextservices.SetcachewarnaingId(data.warmingId);
                    $scope.messagesaveWarming = "L'enregistrementa ete bien pris en compte. Veuillez maintenant enregistre le pave Skills";
                    GetWarmingsDetails();
                    $('#warningModal').modal('hide');
                } else {
                    $scope.messagesaveWarming = "L'enregistrement n'a pas ete prise en compte";
                }

            });


            console.log("warninsaved",  vm.warningup);
        }
       // vm.selected = vm.teams[0];

        $scope.selectTeam = function (opt) {
            console.log(opt);
        };

        $scope.selectRound = function (opt) {
            console.log(opt);
        };

        

        $scope.cancel = function () {
            $scope.warningup = null;
            $('#warningModal').modal('hide');
        }

        $scope.showeditWarming = function (w) {
            console.log("w", w);
            $scope.warningup = w;
            $scope.editMode = true;
            $('#warningModal').modal('show');

        }
        $scope.deleteWarming = function (idx) {
            var currentwarning = this.w;
            datacontextactivite.deleteWarning(currentwarning, $scope, idx)
        }
    }
})();