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
			//ACCOUNT
			$routeProvider.when("/tai-khoan/dang-nhap", {
				controller: "loginController",
				templateUrl: "/module_views/account/login.html"
			});

			$routeProvider.when("/tai-khoan/dang-ky", {
				controller: "signupController",
				templateUrl: "/module_views/account/signup.html"
			});
			//VERIFY
			$routeProvider.when("/tai-khoan/verify", {
				controller: "verifyController",
				templateUrl: "/module_views/account/verify.html"
			});
			//DASHBOARD
			$routeProvider.when("/", {
				controller: "workerDashboardController",
				templateUrl: "/module_views/worker/dashboard.html"
			});
			//CV
			$routeProvider.when("/ho-so/dang-ho-so", {
				controller: "cvPostController",
				templateUrl: "/module_views/worker/cv/cvPost.html"
			});
			$routeProvider.when("/ho-so/danh-sach-ho-so-doi-duyet", {
				controller: "cvNotActivatedByUseridController",
				templateUrl: "/module_views/worker/cv/cvNotActivatedByUserid.html"
			});
			$routeProvider.when("/ho-so/danh-sach-da-duyet", {
				controller: "cvActivatedByUseridController",
				templateUrl: "/module_views/worker/cv/cvActivatedByUserid.html"
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
			//CATEGORY
			$routeProvider.when("/danh-muc/phan-loai-tho", {
				controller: "classifyWorkersController",
				templateUrl: "/module_views/worker/categories/classifyWorkers.html"
			});
			//OTHER ROUTER
			$routeProvider.otherwise({ 
				redirectTo: "/" 
				// templateUrl: "/module_views/error404.html"
			});
		}]);

})();