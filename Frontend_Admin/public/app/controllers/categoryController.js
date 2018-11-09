(function () {
    'use strict';

    const app = angular.module('app');

    app.controller('classifyWorkersController', ['$q', '$scope', '$log', 'call', 'api', 'func', 'NgMap', classifyWorkersController]);
    app.controller('changeCategoryController', ['$scope', 'call', 'api', 'func', changeCategoryController]);

    function classifyWorkersController($q, $scope, $log, call, api, func, NgMap) {
        NgMap.getMap().then(function (map) { $scope.map = map; });

        $scope.showDetail = function (e, userCategory) {
            $scope.userCategory = userCategory;
            $scope.map.showInfoWindow('infor', this);
        };
        //load data
        $scope.loadListCategory = function () {
            try {
                $q.all([
                    call.GET(api.CATEGORY.GET_ALL),
                    call.GET(api.LOCATION.GET_ALL_PROVINCE)
                ]).then(function (result) {
                    if (result[0].success) {
                        $scope.categories = result[0].result;
                        $scope.provinces = result[1].result;
                    } else {
                        $scope.categories = [];
                    }
                });
            } catch (err) {
                $log.error(err);
                func.showToastError(err);
            }
        };
        $scope.loadDistrict = function () {
            loadAllDistrictByProvinceid($scope.selectedProvince);
            $scope.wards = "";
        };
        $scope.loadWard = function () { loadAllWardByDistrictid($scope.selectedDistrict); };
        $scope.changeCategory = function () {
            loadListWorkerActivated($scope.selectedCategory, $scope.selectedProvince, $scope.selectedDistrict, $scope.selectedWard);
        };
        $scope.loadWorkerWard = function () {
            loadListWorkerActivated($scope.selectedCategory, $scope.selectedProvince, $scope.selectedDistrict, $scope.selectedWard);
        }

        //FUNCTION
        function loadListWorkerActivated(CategoryID, ProvinceID, DistrictID, WardID) {
            try {
                call.GET(`${api.CV.ACTIVATED_BY_QUERY}?categoryid=${CategoryID}&provinceid=${ProvinceID}&districtid=${DistrictID}&wardid=${WardID}`)
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
        function loadAllDistrictByProvinceid(provinceid) {
            if (provinceid > 0) {
                loadListWorkerActivated($scope.selectedCategory, $scope.selectedProvince, $scope.selectedDistrict, $scope.selectedWard);
                call.GET(`${api.LOCATION.GET_ALL_DISTRICT_BY_PROVINCEID}?provinceid=${provinceid}`)
                    .then(function (resultDistrict) { $scope.districts = resultDistrict.result; });
            } else { $scope.districts = ""; }
        };
        function loadAllWardByDistrictid(districtid) {
            if (districtid > 0) {
                loadListWorkerActivated($scope.selectedCategory, $scope.selectedProvince, $scope.selectedDistrict, $scope.selectedWard);
                call.GET(`${api.LOCATION.GET_ALL_WARD_BY_DISTRICTID}?districtid=${districtid}`)
                    .then(function (resultWard) { $scope.wards = resultWard.result; });
            } else { $scope.wards = ""; }
        };
    };

    function changeCategoryController($scope, call, api, func) {
        //load data when init
        $scope.loadListCategory = function () {
            call.GET(api.CATEGORY.GET_ALL)
                .then(function (result) {
                    $scope.success = result.success;
                    if (result.success) { $scope.categories = result.result; }
                    else { $scope.message = result.message; }
                })
        };
        //EDIT CATEGORY
        $scope.clickEditCategory = function (category) {
            $scope.category = category;
            angular.element("input[type='file']").val(null);
        };
        $scope.changeFile = function () {
            var file = $('#Image')[0].files[0];
            var formData = new FormData;
            formData.append("ImageStore", file);
            call.POSTIMAGE(api.UPLOAD.STORE.POST, formData)
                .then(function (result) {
                    if (result.success) {
                        $scope.category.ImageStore = result.result.path;
                    }
                });
        };
        $scope.submitEditCategory = function () {
            call.PUT(api.CATEGORY.UPDATE_CATEGORY, $scope.category)
                .then(function (result) {
                    if (result.success) {
                        func.showToastSuccess(result.message);
                        $('#myModal').modal('toggle');
                    }
                });
        };
        //ADD NEW CATEGORY
        $scope.clickAddCategory = function () {
            call.GET(api.UPLOAD.IMAGE_STORE_DEFAULT.GET)
                .then(function (result) {
                    $scope.categoryNew = {
                        NameJobCategory: "",
                        ImageStore: result.result
                    };
                });
            angular.element("input[type='file']").val(null);
        };
        $scope.changeFileAddCategory = function () {
            var file = $('#ImageNewCtegory')[0].files[0];
            var formData = new FormData;
            formData.append("ImageStore", file);
            call.POSTIMAGE(api.UPLOAD.STORE.POST, formData)
                .then(function (result) {
                    if (result.success) {
                        $scope.categoryNew.ImageStore = result.result.path;
                    }
                });
        };
        $scope.submitAddCategory = function () {
            call.POST(api.CATEGORY.CREATE_CATEGORY, $scope.categoryNew)
                .then(function (result) {
                    if (result.success) {
                        func.showToastSuccess(result.message);
                        $scope.loadListCategory();
                        $('#ModalAddNew').modal('toggle');
                    }
                });
        };
    };

})();
