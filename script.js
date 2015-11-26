var app = angular.module('trackingPOC', ['firebase']);

app.directive('trkMain', function () {
    return {
        templateUrl: 'template.html',
        controller: 'MainController as vm',
        bindToController: true
    }
})

app.controller('MainController', function ($firebaseObject, $firebaseArray, $scope, $timeout, $location, $interval) {
    var vm = this;
    var gameDetails = new Firebase('https://boiling-fire-6401.firebaseio.com/tracking/gameData');
    var trackingDetails = new Firebase('https://boiling-fire-6401.firebaseio.com/tracking/trackingData');

    vm.trackingDetails = $firebaseArray(trackingDetails);

    vm.gameDetails = $firebaseObject(gameDetails);
    vm.gameDetails.$bindTo($scope, 'vm.gameDetails');

    /**
     * Basically starts the countdown
     */
    vm.startGame = function() {
        $interval(function() {
            vm.gameDetails.countdown -= 1;
        }, 1000);
    };

    /**
     * Stores the button click event in DB
     * @param score
     * @param event
     */
    vm.buttonClick = function (score, event) {
        if(!$location.search().watch) {
            vm.gameDetails.score += score;
            var cEvent = cleanEvent(event);
            storeEvent(cEvent, 'click', vm.trackingDetails)
        }
    };

    /**
     * Stores the mouse move event every 1 second
     * @param event
     */
    vm.mouseMove = function (event) {
        if (!vm.alreadyMoved && !$location.search().watch) {
            vm.alreadyMoved = $timeout(
                function () {
                    var cEvent = cleanEvent(event);
                    storeEvent(cEvent, 'mousemove', vm.trackingDetails);
                    vm.alreadyMoved = false;
                }, 1000
            );
        }

    };

    /**
     * Reset everything
     */
    vm.resetEverything = function () {
        vm.gameDetails.score = 10;
        vm.gameDetails.countdown = 10;

        vm.trackingDetails.map(function (tracking) {
            vm.trackingDetails.$remove(tracking);
        });
    }

    function cleanEvent(event) {
        return {
            clientX: event.clientX,
            clientY: event.clientY,
            offsetX: event.offsetX,
            offsetY: event.offsetY,
            pageX: event.pageX,
            pageY: event.pageY,
            screenX: event.screenX,
            screenY: event.screenY,
            timestamp: event.timeStamp,
            type: event.type,
        };
    }

    function storeEvent(event, type, firebaseArray) {
        var output = {
            event: event,
            type: type
        };

        output.event.sourceCapabilities = null;
        output.event.stopImmediatePropagation = null;
        output.event.isDefaultPrevented = null;
        output.event.isImmediatePropagationStopped = null;

        firebaseArray.$add(output)
    }
});

