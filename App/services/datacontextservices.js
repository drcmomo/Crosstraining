(function () {
    'use strict';

    var serviceId = 'datacontextservices';
    angular.module('app').factory(serviceId, ['common', datacontextservices]);

    function datacontextservices(common) {
        var $q = common.$q;
        var warnaingId = null;
        var skillId = null;
        var wodId = null;
        var user = {};
        var teams = {};
        var rounds = {};
        var service = {        
            addUser: addUser,
            getUser: getUser,
            addTeams: addTeams,
            getTeams: getTeams,
            addRounds: addRounds,
            getRounds: getRounds,
            SetcachewarnaingId: setcachewarnaingId,
            getcachewarnaingId: getcachewarnaingId,
            setcacheskillId: setcacheskillId,
            getcacheskillId: getcacheskillId,
            setcachewodId: setcachewodId,
            getcachewodId: getcachewodId
        }
        return service;


        function setcachewarnaingId(warningid) {
            console.log("warningid  ", warningid);
            warnaingId = warningid;
        }

        function getcachewarnaingId() {
           return  warnaingId;
        }


        function setcacheskillId(idskill) {
            console.log("skillId  ", idskill);
            skillId = idskill;
        }

        function getcacheskillId() {
            return skillId;
        }
        function setcachewodId(wodid) {
            console.log("wodid  " ,wodid);
            wodId = wodid;
        }

        function getcachewodId() {
            return warnaingId;
        }

        function addUser(newObj) {
            console.log("newObj  ",newObj);
            user = newObj;
            console.log(user);
        }

        function getUser() {
            return user;
        }

        function addTeams(team) {
            console.log("team  ",team);
            teams = team;
            console.log(team);
        }

        function getTeams() {
            return teams;
        }

        function addRounds(round) {
            console.log("round ",round);
            rounds = round;
            console.log(round);


        }

        function getRounds() {
            return rounds;
        }

    }
})();