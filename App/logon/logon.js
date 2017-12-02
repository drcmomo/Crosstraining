(function () {
    'use strict';
    var controllerId = 'logon';
    angular
        .module('app')
        .controller(controllerId, ['common', 'datacontext', '$scope', '$location', 'routes', 'config', 'datacontextservices','datacontextactivite', logon]);

    function logon(common, datacontext, $scope, $location, routes, config, datacontextservices, datacontextactivite) {
        /* jshint validthis:true */
        var vm = {};
        var vmside = this;
        vm.title = 'logon';
      
        vmside.navRoutes = routes ;
        console.log('logon controller : ', JSON.stringify(vmside.navRoutes));

        vm.uservalue = {
            Id: null,
            IsActive: null,
            IsAdmin: null,
            Login: null,
            Mail: null,
            Nom: null,
            Password: null,
            Photo: null,
            Prenom: null
        };
        $scope.Userconnected = vm.uservalue;
        //  vm.save = save;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        activate();

        $scope.getUser = function () {
            console.log("getuser method");
            var currentuser = $scope.user;

            console.log(currentuser);
            return datacontext.logon(currentuser.Login, currentuser.Password, $scope).then(function (data) {
                console.log(data);
                vm.uservalue.Id = data.Id;
                vm.uservalue.IsActive = data.IsActive;
                vm.uservalue.IsAdmin = data.IsAdmin;
                vm.uservalue.Login = data.Login;
                vm.uservalue.Mail = data.Mail;
                vm.uservalue.Nom = data.Nom;
                vm.uservalue.Password = data.Password;
                vm.uservalue.Photo = data.Photo;
                vm.uservalue.Prenom = data.Prenom;
                console.log(vm.uservalue);
                console.log($scope.Userconnected);
                 datacontextservices.addUser(vm.uservalue);
                $scope.goToAcceuil();
                return vm.uservalue;

            });
        }

        $scope.Login = function () {
            console.log("Login method");
            this.getUser();
            console.log("Prenom : " + $scope.Userconnected.Prenom + "   " + $scope.Userconnected);
            JSON.stringify($scope.Userconnected);
        }



        $scope.goToAcceuil = function () {
            console.log("goToAcceuil method ");

            console.log("$scope prenom : " + $scope.Userconnected.Prenom);
            console.log($scope.user);
            console.log(vm.uservalue);
            var currentuser = $scope.user;
            console.log("currentuser " + currentuser.Login + currentuser.Password);
            console.log("vm.uservalue.Login " + $scope.Userconnected.Prenom + vm.uservalue.IsAdmin);
            if (vm.uservalue.Login == currentuser.Login && vm.uservalue.Password == currentuser.Password && vm.uservalue.IsAdmin == true) {
                console.log("vm.teams ", vmside.teams);
                datacontextservices.addTeams(vmside.teams);
                datacontextservices.addRounds(vmside.rounds);
                console.log("vm.rounds ", vmside.rounds);

                console.log("goToAcceuil method " + vm.uservalue.IsAdmin);
                $location.path('/admin');
                $scope.IsUserconnected = true;
                $.each(vmside.navRoutes,
                    function(index, item) {
                        console.log('item', item.config.settings.content);
                        if (item.url === '/exercice') {
                            item.config.settings.isAdmin = true;
                        }
                        if (item.url === '/membres') {
                            item.config.settings.isAdmin = true;
                        }
                        if (item.url === '/activite') {
                            item.config.settings.isAdmin = true;
                        }

                        if (item.url === '/wods') {
                            item.config.settings.isAdmin = true;
                        }
                        if (item.url === '/skills') {
                            item.config.settings.isAdmin = true;
                        }
                        if (item.url === '/warning') {
                            item.config.settings.isAdmin = true;
                        }
                    }); 
            }  
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
        function getRounds() {
            return datacontextactivite.getRounds().success(function (data) {
                var datarounds = JSON.parse(JSON.stringify(data));
                vmside.rounds = datarounds.data;
                return vmside.rounds = data;
            });
        }
        function getTeams() {
            return datacontextactivite.getTeams().success(function (data) {
                var datateams = JSON.parse(JSON.stringify(data));
                vmside.teams = datateams.data;
                return vmside.teams = data;
            });
        }
        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Se connecter'); });
        }


        function getMessageCount() {
            return datacontextactivite.getMessageCount().then(function (data) {
                return vm.messageCount = data;
            });
        }

    }

})();
