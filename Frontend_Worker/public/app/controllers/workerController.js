(function () {
    'use strict';

    const app = angular.module('app');

    app.controller('workerDashboardController', ['$rootScope', 'func', workerDashboardController]);

    function workerDashboardController($rootScope, func) {
        // if (func.getCookieAccessToken()) {
        //     $rootScope.info = func.setCookieAccount();
        // } else {
        //     window.location.href = '/#!/tai-khoan/dang-nhap';
        // }
    };

})();
