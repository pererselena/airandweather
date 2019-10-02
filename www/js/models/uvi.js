"use strict";

import m from "mithril";


const uvi = {
    currentUvi: {},
    baseURL: "http://api.openweathermap.org/data/2.5/uvi",
    apiKey: "93a8f47efed602a2b08d625e6e923a7a",
    uviForecast: {},

    getUvIndexCurrPos: function (lat, lon) {
        if (lat === "undefined" || lon === "undefined") {
            return null;
        }
        return m.request({
            url: uvi.baseURL + '?appid=' + uvi.apiKey + '&lat=' + lat + '&lon=' + lon,
            method: "GET",
        }).then(function (res) {
            uvi.currentUvi = res;
        });
    },
    getUviCategory: function (value) {
        var className = "";
        var text;

        switch (true) {
            case value < 3:
                className = "uvlow";
                text = "Låg";
                break;
            case value < 6:
                className = "uvmoderate";
                text = "Medel";
                break;
            case value < 8:
                className = "uvhigh";
                text = "Hög";
                break;
            case value < 11:
                className = "uvveryhigh";
                text = "Väldigt hög";
                break;
            case value > 11:
                className = "uvextreme";
                text = "Extrem";
                break;
            default:
                className = "";
        }
        return m("p." + className, text);
    },
    getUviClass: function (value) {
        value = parseFloat(value);
        var className = "";

        switch (true) {
            case value < 3:
                className = "uvlow";
                break;
            case value < 6:
                className = "uvmoderate";
                break;
            case value < 8:
                className = "uvhigh";
                break;
            case value < 11:
                className = "uvveryhigh";
                break;
            case value > 11:
                className = "uvextreme";
                break;
            default:
                className = "";
        }
        return className;
    },
    getUviText: function (value) {
        var text;

        switch (true) {
            case value < 3:
                text = "Låg";
                break;
            case value < 6:
                text = "Medel";
                break;
            case value < 8:
                text = "Hög";
                break;
            case value < 11:
                text = "Väldigt hög";
                break;
            case value > 11:
                text = "Extrem";
                break;
            default:
                text = "Låg";
        }
        return text;
    },
    getUviForecast: function (lat, lon) {
        if (lat === "undefined" || lon === "undefined") {
            return null;
        }
        return m.request({
            url: uvi.baseURL + '/forecast' + '?appid=' + uvi.apiKey + '&lat=' + lat + '&lon=' + lon,
            method: "GET",
        }).then(function (res) {
            uvi.uviForecast.data = res;
        });
    }

};



export default uvi;
