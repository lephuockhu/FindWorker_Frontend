(function () {
    'use strict';

    angular
        .module('app')
        .factory('api', api);

    function api() {
        // var localhost = "http://18.217.245.123";
        var localhost = "http://localhost:3000";
        var service = {
            "ACCOUNT": {
                "LOGIN": localhost + "/api/account/login",
            },
            "PROFILE": {
                "GET": localhost + "/api/account/profile",
                "UPDATE": localhost + "/api/account/profile"
            },
            "CV": {
                "NOT_ACTIVATED": localhost + "/api/cv/not-activated",
                "ACTIVE_CV": localhost + "/api/cv/active-cv",
                "ACTIVATED": localhost + "/api/cv/activated",
                "NOT_ACTIVATED_BY_USERID": localhost + "/api/cv/not-activated-by-userid",
                "ACTIVATED_BY_USERID": localhost + "/api/cv/activated",
                "ACTIVATED_BY_QUERY": localhost + "/api/cv/activated-by-query"
            },
            "CATEGORY": {
                "GET_ALL": localhost + "/api/category/get-all",
                "GET_BY_USERWORKERID": localhost + "/api/category/get-by-userworkerid",
                "CREATE_CATEGORY": localhost + "/api/category/create-category",
                "UPDATE_CATEGORY": localhost + "/api/category/update-category"
            },
            "LOCATION": {
                "GET_ALL_PROVINCE": localhost + "/api/location/all-province",
                "GET_ALL_DISTRICT_BY_PROVINCEID": localhost + "/api/location/all-district-by-provinceid",
                "GET_ALL_WARD_BY_DISTRICTID": localhost + "/api/location/all-ward-by-districtid"
            },
            "CHAT": {
                "GET_INFO_TRANSACTION_DONE_BY_USERID": localhost + "/api/chat/get-info-transaction-done-by-userid"
            },
            "UPLOAD": {
                "AVATAR": { 'POST': localhost + "/api/upload/image-avatar" },
                "STORE": { 'POST': localhost + "/api/upload/image-store" },
                "IMAGE_STORE_DEFAULT": { "GET": localhost + "/api/upload/image-store-default" }
            }
        };
        return service;
    }
})();