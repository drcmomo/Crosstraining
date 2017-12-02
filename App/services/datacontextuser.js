(function () {
    'use strict';

    var serviceId = 'datacontextuser';
    angular.module('app').factory(serviceId, ['common', datacontextuser]);

    function datacontextuser(common) {
        var $q = common.$q;
        var $http = common.$http;
        // will hold backend posts
        var userconnected = undefined;
        //var $scope = common.$scope;
        var service = {
            getUsers: getUsers,
            getMessageCount: getMessageCount,
            saveUser: saveUser,
            modifyuser: modifyuser,
            deleteUser: deleteUser

        };

        return service;

        function getMessageCount() { return $q.when(72); }
        function modifyuser(user,$scope)
        {
           // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/User/ModifyUser",
                data: user
            });

            return request.then(handleSucess, handleError);
        }

        function logon(login, password, $scope) {
                // Get the deferred object
                var deferred = $q.defer();
                // Initiates the AJAX call
                $http({ method: 'GET', url: '/Logon/Logon?login=' + login + '&password=' + password }).then(function (response) {
                    deferred.resolve(response.data);
                }, function (response) {
                    deferred.reject(response);
                });

                return deferred.promise;
            }
        


        function deleteUser(user, $scope,idx) {
           // var $scope = $scope;
            var request = $http({
                method: "post",
                url: "/User/DeleteUser",
                data: user
            });

            return request.then(function (response) {
                $scope.vm.people.splice(idx, 1);
                    $scope.Modifymessage = "Data deleted successfully";
                },
            function (error) {
                handleError(error);
            }
               );
        }

        function saveUser(user, $scope) {
                var request = $http({
                    method: "post",
                    url: "/User/SaveUser",
                    data: user
                });
            //  var nsg = request.then(handleSucess, handleError);

                return request.then(function (response) {
                    $scope.vm.people.push(response.data);
                    $scope.message = "Data saved successfully"
                    $scope.user.nom = "";
                    $scope.user.prenom = "";
                    $scope.user.age = "";
                    $scope.user.password = "";
                    $scope.user.mail = "";
                    $scope.user.photo = "";
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

        function getUsers(pagenumber) {
            return $http({ method: 'GET', url: '/User/GetUsersDetails?page=' + pagenumber });
        }
    }
})();