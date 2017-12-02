(function () {
    'use strict';
    var controllerId = 'addusercontroller';
    angular
        .module('app')
        .controller(controllerId, ['common', 'datacontextuser', '$scope', adduser]);

    //adduser.$inject = ['$location']; 

    function adduser(common, datacontextuser, $scope) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'adduser';
      //  vm.save = save;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        activate();
        $scope.save = function () {
            var currentuser = $scope.user;
            datacontextuser.saveUser(currentuser);
            $scope.message = 'Votre compte vient  d\'être enregistrer. Il n\'est pas encore activé par l\'administrateur';
            $scope.user = null;
           // $window.location.href = '/logon/Logon.html';
        }
        //save(common,datacontext)
        function activate() {
            //var promises = [save()];
          //  vm.save = save;
            common.activateController([], controllerId)
                .then(function () { log('Ajouter un utilisateur'); });
        }

        function save() {

            datacontextuser.save(vm.user);
        }
    }
   
})();
