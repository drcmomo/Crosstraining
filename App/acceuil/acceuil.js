(function () {
    'use strict';
    var controllerId = 'acceuil';
    angular.module('app').controller(controllerId, ['common', '$scope', acceuil]);

    function acceuil(common, $scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        $scope.myInterval = 500;
         vm.slides0 = [];
        $scope.addSlide1 = function () {
            var newWidth = 600 + vm.slides0.length + 1;
            vm.slides0.push({
                header: "http://placekitten.com/" + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][vm.slides0.length % 4] + ' ' +
                  ['Cats', 'Kittys', 'Felines', 'Cutes'][vm.slides0.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide1();
        }
       


        vm.images = [
    { image: 'Content/images/image00.jpg', description: 'Image 00' },
    { image: 'Content/images/image01.jpg', description: 'Image 01' },
    { image: 'Content/images/image02.jpg', description: 'Image 02' },
    { image: 'Content/images/image03.jpg', description: 'Image 03' },
    { image: 'Content/images/image04.jpg', description: 'Image 04' },
    { image: 'Content/images/image05.jpg', description: 'Image 05' },
    { image: 'Content/images/image06.jpg', description: 'Image 06' },
    { image: 'Content/images/image07.jpg', description: 'Image 07' },
    { image: 'Content/images/image08.jpg', description: 'Image 09' },
    { image: 'Content/images/image09.jpg', description: 'Image 09' },
    { image: 'Content/images/image10.jpg', description: 'Image 10' },
      { image: 'Content/images/image11.jpg', description: 'Image 11' }
        ];
        $scope.currentIndex = 0; // Initially the index is at the first image

        $scope.next = function () {
            scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
        };

        $scope.prev = function () {
            scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
        };
        $scope.messagWelcome = "Bienvenu sur le site CrossTraining Performance";

        vm.news = {
            title: 'Ajouter un programme',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };

            vm.slides = [
                {
                    header: "Manage Your Projects !!",
                    body: "This site is used for managing projects. A single Tool to manage your project!!",
                    button: "More Details"
  
                },
                {
                    header: "Add User Stories !!",
                    body:
                        "You can add different user stories as a Business Administrators. Your Stories will be form your project tasks.",
                    button: "User Stories"
                
                },
                {
                    header: "Manager Comments !!",
                    body: "Manager can add comments for the tasks which are going on under your project!!",
                    button: "Manager Comments"
                
                },
                {
                    header: "Employees List !!",
                    body:
                        "You can see all the employees details with their skill sets to assign the appropriate tasks and do efficient project management.",
                    button: "Let Me Try !!"
           
                },
                {
                    header: "Track Project Progress !!",
                    body:
                        "You can track Project Progress of all employees who are working under that project. You can also see the report for individual employee and his/her performance.",
                    button: "Try It !!"
               
                },
                {
                    header: "Add New Projects !!",
                    body:
                        "Your company can add different projects into this site and manager can assign the tasks to the users for the project.",
                    button: "Check Out Snaps!!"
               
                }
            ];
        
        vm.title = 'Home';

         setCarouselHeight('#carousel-example');

        function setCarouselHeight(id) {
            var slideHeight = [];
            $(id + ' .item').each(function () {
                // add all slide heights to an array
                slideHeight.push($(this).height());
            });

            // find the tallest item
           var max = Math.max.apply(null, slideHeight);

            // set the slide's height
            $(id + ' .carousel-content').each(function () {
                $(this).css('height', max + 'px');
            });
        }
      


    }
})();