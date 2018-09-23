(function () {
    'use strict';

    const app = angular.module('app');

    app.controller('adminDashboardController', ['$rootScope', 'func', adminDashboardController]);

    function adminDashboardController($rootScope, func) {
        // if (func.getCookieAccessToken()) {
        //     $rootScope.info = func.setCookieAccount();
        // } else {
        //     window.location.href = '/#!/tai-khoan/dang-nhap';
        // }
    };

})();
