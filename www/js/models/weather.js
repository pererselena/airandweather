"use strict";

import m from "mithril";


const weather = {
    currentWeather: {},
    currentWeatherNearby: {},
    forecast: {},
    baseURL: "http://api.openweathermap.org/data/2.5/",
    apiKey: "93a8f47efed602a2b08d625e6e923a7a",

    getWeatherCurrPos: function (lat, lon) {
        if (lat === "undefined" || lon === "undefined") {
            return null;
        }
        return m.request({
            url: weather.baseURL + "weather?units=metric&lang=se&" + 'appid=' +
            weather.apiKey + '&lat=' + lat + '&lon=' + lon,
            method: "GET",
        }).then(function (res) {
            weather.currentWeather = res;
        });
    },

    getWetherNearby: function (lat, lon) {
        if (lat === "undefined" || lon === "undefined") {
            return null;
        }
        return m.request({
            url: weather.baseURL + "find?units=metric&lang=se&" + 'appid=' +
            weather.apiKey + '&lat=' + lat + '&lon=' + lon + "&cnt=10",
            method: "GET",
        }).then(function (res) {
            weather.currentWeatherNearby = res;
        });
    },

    getWeatherForecast: function (lat, lon) {
        if (lat === "undefined" || lon === "undefined") {
            return null;
        }
        return m.request({
            url: weather.baseURL + "forecast?units=metric&lang=se&" + 'appid=' +
            weather.apiKey + '&lat=' + lat + '&lon=' + lon,
            method: "GET",
        }).then(function (res) {
            weather.forecast = res;
        });
    },

    getTomorrowWeather: function () {
        var tomorrow = new Date();

        tomorrow.setDate(tomorrow.getDate() + 1);
        var output = weather.forecast.list.filter(function (item) {
            var d = new Date(item.dt_txt);

            if (d.getDate() === tomorrow.getDate()) {
                if (d.getHours() === 15) {
                    return item;
                }
            }
        });

        return output;
    },

    getDailyWeather: function () {
        var output = weather.forecast.list.filter(function (item) {
            var d = new Date(item.dt_txt);

            if (d.getHours() === 15 || d.getHours() === 3) {
                return item;
            }
        });

        return output;
    },

};



export default weather;
