(function () {
    'use strict';

    var serviceId = 'datacontextlogon';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;
        var $http = common.$http;

        //var $scope = common.$scope;
        var service = {        
            logon:logon
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function logon(user, $scope) {
            console.log(user);
            var deferred = $q.defer();

            $http({ method: 'GET', url: '/Logon/Logon', data: user })
                    .success(function(data) {
                        // The promise is resolved once the HTTP call is successful.
                        deferred.resolve(data);
                    })
                    .error(function() {
                        // The promise is rejected if there is an error with the HTTP call.
                        deferred.reject();
                    });

            // The promise is returned to the caller
            return deferred.promise;
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
    }
})();