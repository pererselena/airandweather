"use strict";

import m from "mithril";


const airQ = {
    currentAirQ: {},
    baseURL: "https://api.waqi.info/feed/",
    apiKey: "0cdbeff5baa1a56cefe92dd3a7781e7f55bfe593",

    getAirQCurrPos: function (lat, lon) {
        if (lat === "undefined" || lon === "undefined") {
            return null;
        }
        return m.request({
            url: airQ.baseURL + 'geo:' + lat + ';' + lon + '/?token=' + airQ.apiKey,
            method: "GET",
        }).then(function (res) {
            airQ.currentAirQ = res.data;
        });
    },
    getAirQCategory: function (value) {
        value = parseFloat(value);
        var className = "";
        var text;

        switch (true) {
            case value < 50:
                className = "good";
                text = "Utmärkt";
                break;
            case value < 100:
                className = "moderate";
                text = "Medel";
                break;
            case value < 150:
                className = "bad";
                text = "Ohälsosamt för känsliga grupper";
                break;
            case value < 200:
                className = "verybad";
                text = "Ohälsosamt";
                break;
            case value < 300:
                className = "extremlybad";
                text = "Väldigt ohälsosamt";
                break;
            case value > 300:
                className = "hazardous";
                text = "Extrem";
                break;
            default:
                className = "";
        }
        return m("p." + className, text);
    },

    getAirQClass: function (value) {
        value = parseFloat(value);
        var className = "";

        switch (true) {
            case value < 50:
                className = "good";
                break;
            case value < 100:
                className = "moderate";
                break;
            case value < 150:
                className = "bad";
                break;
            case value < 200:
                className = "verybad";
                break;
            case value < 300:
                className = "extremlybad";
                break;
            case value > 300:
                className = "hazardous";
                break;
            default:
                className = "";
        }
        return className;
    }

};



export default airQ;
