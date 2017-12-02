(function () {
    'use strict';

    var serviceId = 'datacontextactivite';
    angular.module('app').factory(serviceId, ['common', datacontextactivite]);

    function datacontextactivite(common) {
        var $q = common.$q;
        var $http = common.$http;
        // will hold backend posts
        var userconnected = undefined;
        //var $scope = common.$scope;
        var service = {
            //a Supprimer
            getMessageCount: getMessageCount,
            //A garder
            getRounds: getRounds,
            getTeams: getTeams,
            saveWarning: saveWarning,
            saveSkill: saveSkill,
            saveWod: saveWod,
            saveProgramme: saveProgramme,
            modifyWarning: modifyWarning,
            GetWarmingsDetails: GetWarmingsDetails,
            modifySkill: modifySkill,
            getSkillsDetails: getSkillsDetails,
            deleteskill:deleteskill,
            deleteWarning:deleteWarning

        };

        return service;

        function getMessageCount() { return $q.when(72); }


        function handleSucess(response)
        {
            
            return response.data;
        }
        function handleError(response)
        {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {
                return ($q.reject("An unknown error occurred."));
            }
            // Otherwise, use expected error message.
            return ($q.reject(response.data.message));

        }



        function modifySkill(skillsup, $scope) {
            // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/Skills/ModifySkill",
                data: skillsup
            });

            return request.then(handleSucess, handleError);
        }




        function modifyWarning(warningup, $scope) {
            // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/Warming/ModifyWarming",
                data: warningup
            });

            return request.then(handleSucess, handleError);
        }



        function getTeams() {
            console.log("getTeams");
            return $http({ method: 'GET', url: '/Activite/GetTeams'});
        }

        function getRounds() {
            console.log("getRounds");
            return $http({ method: 'GET', url: '/Activite/GetRounds'});
        }

        function saveWarning(warning, $scope) {
            var deferred = $q.defer();
         $http({
                method: "post",
                url: "/Warming/SaveWarming",
                data: warning
            }).success(function (response) {
                deferred.resolve(response);
            }).error(deferred.reject);
            return deferred.promise;;
            
        }
        function saveSkill(skill, $scope) {
            var deferred = $q.defer();
            $http({
                method: "post",
                url: "/Skills/SaveSkill",
                data: skill
            }).success(function (response) {
                deferred.resolve(response);
            }).error(deferred.reject);
            return deferred.promise;
          
            
        }
        function saveWod(wod, $scope) {
            var deferred = $q.defer();
            $http({
                method: "post",
                url: "/Wods/SaveWod",
                data: wod
          }).success(function (response) {
              deferred.resolve(response);
          }).error(deferred.reject);
          return deferred.promise;
           
        }

    
        function deleteWarning(warning, $scope,idx) {
            // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/Warming/DeleteWarming",
                data: warning
            });

            return request.then(function (response) {
                $scope.vm.warmingdetails.splice(idx, 1);
                $scope.Modifywarmingmessage = "La suppression de l'activite a ete prise en compte"
            },
            function (error) {
                handleError(error);
            }
               );
        }
        function deleteskill(skill, $scope,idx) {
            // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/Skills/DeleteSkill",
                data: skill
            });

            return request.then(function (response) {
                $scope.vm.skilldetails.splice(idx, 1);
                $scope.Modifyskillmessage = "La suppression de l'activite a ete prise en compte"
            },
            function (error) {
                handleError(error);
            }
               );
        }


        function saveProgramme(prog, $scope) {
            var deferred = $q.defer();
            $http({
                method: "post",
                url: "/Programme/Saveprogramme",
                data: prog
            }).success(function (response) {
                deferred.resolve(response);
            }).error(deferred.reject);
            return deferred.promise;

        }
        function GetWarmingsDetails() {
            return $http({ method: 'GET', url: '/Warming/GetWarmingsDetails'});
        }
        function getSkillsDetails() {
            return $http({ method: 'GET', url: '/Skills/GetSkillsDetails' });
        }

        
    }
})();