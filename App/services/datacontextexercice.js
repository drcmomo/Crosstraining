(function () {
    'use strict';

    var serviceId = 'datacontextexercice';
    angular.module('app').factory(serviceId, ['common', datacontextexercice]);

    function datacontextexercice(common) {
        var $q = common.$q;
        var $http = common.$http;
        // will hold backend posts
        //var $scope = common.$scope;
        var service = {
            getExercices: getExercices,
            getMessageCount: getMessageCount,
            saveExercice: saveExercice,
            modifyExercice: modifyExercice,
            deleteExercice: deleteExercice

        };

        return service;

        function getMessageCount() { return $q.when(72); }
        function modifyExercice(exercice, $scope)
        {
           // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/Exercice/ModifyExercice",
                data: exercice
            });

            return request.then(handleSucess, handleError);
        }


        function deleteExercice(exercice, $scope,idx) {
           // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/Exercice/DeleteExercice",
                data: exercice
            });

            return request.then(function (response) {
                $scope.vm.exercice.splice(idx, 1);
                    $scope.Modifymessage = "Data deleted successfully";
                },
            function (error) {
                handleError(error);
            }
               );
        }

        function saveExercice(exercice, $scope) {
                var request = $http({
                    method: "post",
                    url: "/Exercice/SaveExercice",
                    data: exercice
                });
            //  var nsg = request.then(handleSucess, handleError);

                return request.then(function (response) {
                    $scope.vm.exercice.push(response.data);
                        $scope.message = "L\'enregistrerment a ete bien pris en compte";
                        $scope.exercice.nomExercices = "";

                   
                },
                function (error) {
                    handleError(Error);
                }
                );
                    //handleSucess,handleError);
        }
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

        function getExercices(pagenumber) {
            console.log("getExercices   " + pagenumber);
            return $http({ method: 'GET', url: '/Exercice/GetExercicesDetails?page=' + pagenumber });
        }
    }
})();