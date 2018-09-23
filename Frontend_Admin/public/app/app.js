(function () {
	'use strict';

	angular.module('app', [
		// Angular modules 
		'ngRoute',

		// Custom modules

		// 3rd Party Modules
		'ngCookies', 'ngFlash', 'nk.touchspin'
	])
		.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
			//LOGIN
			$routeProvider.when("/tai-khoan/dang-nhap", {
				controller: "loginController",
				templateUrl: "/module_views/account/login.html"
			});
			//PROFILE
			$routeProvider.when("/p/:profileid", {
				controller: "profileController",
				templateUrl: "/module_views/profile/profile.html"
			});
			$routeProvider.when("/trang-ca-nhan/chinh-sua", {
				controller: "changeProfileController",
				templateUrl: "/module_views/profile/changeProfile.html"
			});
			//DASHBOARD
			$routeProvider.when("/", {
				controller: "adminDashboardController",
				templateUrl: "/module_views/admin/dashboard.html"
			});
			//CV
			$routeProvider.when("/ho-so/danh-muc-tho", {
				controller: "categoriesWorkerController",
				templateUrl: "/module_views/admin/cv/categoriesWorker.html"
			});
			$routeProvider.when("/ho-so/danh-sach-tho-doi-duyet", {
				controller: "listNotActivatedController",
				templateUrl: "/module_views/admin/cv/listNotActivated.html"
			});
			//CATEGORY
			$routeProvider.when("/danh-muc/phan-loai-tho", {
				controller: "classifyWorkersController",
				templateUrl: "/module_views/admin/categories/classifyWorkers.html"
			});
			//OTHER ROUTER
			$routeProvider.otherwise({ 
				redirectTo: "/" 
				// templateUrl: "/module_views/error404.html"
			});
		}]);

})();