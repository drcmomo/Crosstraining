(function () {
    'use strict';

    var app = angular.module('app');

    // Collect the routes
    app.constant('routes', getRoutes()); 
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {
     
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
      
        $routeProvider.otherwise({ redirectTo: '/' });
    }

     

    // Define the routes 
    function getRoutes() {
        
        return [
             {

                 url: '/',
                 config: {
                     title: 'Acceuil',
                     templateUrl: 'app/acceuil/acceuil.html',
                     controller: 'acceuil' ,
                     settings: {
                         content: '',
                         isAdmin: false
                     }
                 }
             },

            
            {

                url: '/logon',
                config: {
                    title: 'Se connecter',
                    templateUrl: 'app/logon/logon.html',
                    controller: 'logon',
                    settings: {
                        content: '',
                        isAdmin: false
                    }

                }
            },

            {

                url: '/add',
                config: {
                    title: 'Add user',
                    templateUrl: 'app/user/adduser.html',
                    controller: 'adduser',
                    settings: {
                        content: '',
                        isAdmin: false
                    }

                }
            }, {
                url: '/activite',
                config: {
                    title: 'Activités',
                    templateUrl: 'app/activite/activite.html',
                    controller: 'activite',
                    settings: {  
                        content: '',
                        isAdmin: false
                    }
                }
            },
            {
                url: '/exercice',
                config: {
                    templateUrl: 'app/exercice/exercice.html',
                    title: 'Exercice',
                    settings: {
                        nav: 1, 
                        content: '<i class="fa fa-bars" aria-hidden="true"></i> Exercices',
                        isAdmin : false
                    }
                }
            },
            {        
               url: '/membres',
               config: {
                   title: 'Membres',
                   templateUrl: 'app/membres/membres.html',
                   settings: {
                       nav: 2,
                       content: '<i class="fa fa-users" aria-hidden="true"></i> Membres',
                       isAdmin: false
                   }
               }
           }
           ,
            {
                url: '/warning',
                config: {
                    title: 'WARNING UP',
                    templateUrl: 'app/warning/warning.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-users" aria-hidden="true"></i> Warming up',
                        isAdmin: false
                    }
                }
            },
            {
                url: '/skills',
                config: {
                    title: 'Membres',
                    templateUrl: 'app/skills/skills.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-users" aria-hidden="true"></i> Skills',
                        isAdmin: false
                    }
                }
            },

              {
                  url: '/activite',
                  config: {
                      title: 'Activité',
                      templateUrl: 'app/activite/activite.html',
                      settings: {
                          nav: 6,
                          content: '<i class="fa fa-users" aria-hidden="true"></i> Activité',
                          isAdmin: false
                      }
                  }
              },
            {        
                url: '/wods',
                config: {
                    title: 'WODS',
                    templateUrl: 'app/wods/wods.html',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-clock-o" aria-hidden="true"></i> WODS',
                        isAdmin: false
                    }
                }
            },
             
             {
                 url: '/admin',
                 config: {
                     title: 'Aministrateur',
                     templateUrl: 'app/admin/admin.html',
                     controller: 'admin',
                     settings: {
                         content: '<i class="fa-li fa fa-check-square"></i>adminstration',
                         isAdmin: false
                     }
                 }
             }
        ];
    }

     
})();