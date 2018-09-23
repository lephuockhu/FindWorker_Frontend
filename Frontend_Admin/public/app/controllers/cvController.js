(function () {
    'use strict';

    const app = angular.module('app');
    
    app.controller('listNotActivatedController', ['$scope', '$log', 'call', 'api', 'func', listNotActivatedController]);
    app.controller('categoriesWorkerController', ['$scope', '$log', 'call', 'api', 'func', categoriesWorkerController]);

    function listNotActivatedController($scope, $log, call, api, func) {
        $scope.loadListWorkerNotActivated = function () {
            try {
                call.GET(api.CV.NOT_ACTIVATED)
                    .then(function (result) {
                        $scope.success = result.success;
                        $scope.userCategories = result.result;
                        $scope.message = result.message;
                    });
            } catch (err) {
                $log.error(err);
                func.showToastError(err);
            }
        };

        $scope.clickAgreeCV = function (userCategory) {
            try {
                let cvData = {
                    CategoryID: userCategory.CategoryID,
                    UserWorkerID: userCategory.UserAccountID
                };

                if (!cvData.CategoryID || !cvData.UserWorkerID) {
                    throw "Thông tin không được để trống";
                }

                call.PUT(api.CV.ACTIVE_CV, cvData)
                    .then(function (result) {
                        if (result.success) {
                            func.showToastSuccess("Bạn đã duyệt hồ sơ: " + userCategory.NameJobCategory + "." + "<br>Của thợ: " + userCategory.FullName + ".");
                            $scope.loadListWorkerNotActivated();
                        }
                    });
            } catch (err) {
                $log.error(err);
                func.showToastError(err);
            }
        };

        $scope.clickDeleteCV = function (userCategory) {
            try {
                if (!userCategory.CategoryID || !userCategory.UserAccountID) {
                    throw "Thông tin không được để trống";
                }
                let functionOfSweet = function () {
                    call.DELETE(`${api.CV.ACTIVE_CV}?categoryid=${userCategory.CategoryID}&userworkerid=${userCategory.UserAccountID}`)
                        .then(function (result) {
                            if (result.success) {
                                swal.close();
                                func.showToastSuccess("Bạn đã xóa hồ sơ: " + userCategory.NameJobCategory + "." + "<br>Của thợ: " + userCategory.FullName + ".");
                                $scope.loadListWorkerNotActivated();
                            }
                        });
                };
                func.showSweetAlertDelete("Bạn có muốn xóa hồ sơ này?", null, functionOfSweet);
            } catch (err) {
                $log.error(err);
                func.showToastError(err);
            }
        };
    };

    function categoriesWorkerController($scope, $log, call, api, func) {
        //load data
        $scope.loadListCategory = function () {
            try {
                call.GET(api.CATEGORY.GET_ALL)
                    .then(function (result) {
                        if (result.success) {
                            $scope.categories = result.result;
                        } else {
                            $scope.categories = [];
                        }
                    });
            } catch (err) {
                $log.error(err);
                func.showToastError(err);
            }
        };

        $scope.changeCategory = function () {
            loadListWorkerActivated($scope.selectedCategory);
        };

        function loadListWorkerActivated(CategoryID) {
            try {
                call.GET(`${api.CV.ACTIVATED_BY_QUERY}?categoryid=${CategoryID}`)
                    .then(function (result) {
                        $scope.success = result.success;
                        $scope.userCategories = result.result;
                        $scope.message = result.message;
                    })
            } catch (err) {
                $log.error(err);
                func.showToastError(err);
            }
        };
    };

})();
