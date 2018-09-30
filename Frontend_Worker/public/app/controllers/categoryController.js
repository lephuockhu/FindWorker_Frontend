(function () {
    'use strict';

    const app = angular.module('app');
    
    app.controller('classifyWorkersController', ['$q', '$scope', '$log', 'call', 'api', 'func', classifyWorkersController]);

    function classifyWorkersController($q, $scope, $log, call, api, func) {
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

})();
