(function (angular) {
  "use strict";

  var app = angular.module('myApp.chat', ['ngRoute', 'firebase.utils', 'firebase']);

  app.controller('ChatCtrl', ['$scope', 'messageList', function($scope,  messageList) {
      
     $scope.loggedInUsername = localStorage.getItem("loggedInUsername");
     $scope.sendTo = null;      
      
      if($scope.loggedInUsername == "Amin"){
          $scope.sendTo = "Nisrawat"
      }
      else{
          $scope.sendTo = "Amin";
      }
      
      $scope.messages = messageList;
      $scope.addMessage = function(newMessage) {
        if( newMessage ) {
             
          $scope.messages.$add({text: newMessage, username: $scope.loggedInUsername, sendTo: $scope.sendTo});
        }
      };
    }]);

    
  app.factory('messageList', ['fbutil', '$firebaseArray', function(fbutil, $firebaseArray) {
    var ref = fbutil.ref('messages').orderByChild("sendTo").equalTo(localStorage.getItem("loggedInUsername"));
    return $firebaseArray(ref);
  }]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/chat', {
      templateUrl: 'chat/chat.html',
      controller: 'ChatCtrl'
    });
  }]);

})(angular);