"use strict";

import m from "mithril";
import skintype from "./skintype.js";

var auth = {
    email: "",
    password: "",
    token: "",
    errorMessage: "",
    baseURL: "https://auth.emilfolino.se/",
    apiKey: "4a8d718f21cd74ef077ce271e6aa280e",

    clear: function () {
        auth.email = "";
        auth.password = "";
        auth.errorMessage = "";
    },

    login: function () {
        var playload = {
            email: auth.email,
            password: auth.password,
            api_key: auth.apiKey,
        };

        return m.request({
            url: auth.baseURL + "login",
            method: "POST",
            data: playload
        }).then(function (result) {
            auth.token = result.data.token;
            console.log(auth.token);
            skintype.current = {};
            m.route.set("/profile");
        }).catch(function (error) {
            var errorJSON = JSON.parse(error.message);

            auth.errorMessage = errorJSON.errors.detail;
        });
    },

    register: function () {
        var playload = {
            email: auth.email,
            password: auth.password,
            api_key: auth.apiKey,
        };

        return m.request({
            url: auth.baseURL + "register",
            method: "POST",
            data: playload
        }).then(function (result) {
            auth.token = result.data.token;
            console.log(auth.token);
            m.route.set("/profile");
        });
    },

    save: function (object) {
        var userData = {
            artefact: JSON.stringify(object),
            api_key: auth.apiKey
        };

        m.request({
            url: auth.baseURL + "data",
            data: userData,
            method: 'POST',
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(result) {
            result.data.artefact = JSON.parse(result.data.artefact);
            skintype.current = result.data;
            m.redraw();
        });
    },

    update: function (object) {
        object.api_key = auth.apiKey;
        object.artefact = JSON.stringify(object.artefact);

        m.request({
            url: auth.baseURL + "data",
            data: object,
            method: 'PUT',
            headers: {
                'x-access-token': auth.token
            }
        }).then(function() {
            skintype.current.artefact = JSON.parse(object.artefact);
            m.redraw();
        });
    },

    readData: function() {
        m.request({
            method: "GET",
            url: auth.baseURL + "data?api_key=" + auth.apiKey,
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(result) {
            if (result.data[0]) {
                result.data[0].artefact = JSON.parse(result.data[0].artefact);
                skintype.current = result.data[0];
                return result.data[0];
            }
        });
    }
};

export default auth;
