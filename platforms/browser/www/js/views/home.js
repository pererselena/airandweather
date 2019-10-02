"use strict";

import m from 'mithril';
import position from "../models/position.js";
import uvi from "../models/uvi.js";
import weather from "../models/weather.js";
import airQ from "../models/airq.js";
import functions from "../models/functions.js";

var home = {
    oninit: function () {
        position.getPosition();
    },
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            setTimeout(function() {
                vnode.dom.classList.remove("slide-out");
                resolve();
            }, 250);
        });
    },
    view: function() {
        return m("div.slide-in.home", [
            m("h1", "Air & Weather"),
            m("h2", weather.currentWeather.name),
            m("p", functions.getDateAndTime()),
            m("section.weatherHome.weather", [
                weather.currentWeather.main ? m("div.weatherTempSec", [
                    m("p.weathTemp", Math.round(weather.currentWeather.main.temp) + "\xB0"),
                    m("p", "Vind: " + weather.currentWeather.wind.speed + "m/s"),
                    m("p", "Fuktighet: " + weather.currentWeather.main.humidity + "%")
                ]) : null,
                weather.currentWeather.weather ? m("div.weathericon", [
                    m("img", {src: "img/icons/" + weather.currentWeather.weather[0].icon + ".png"}),
                    m("p", weather.currentWeather.weather[0].description)
                ]) : null,
            ]),
            m("section.uvi." + uvi.getUviClass(uvi.currentUvi.value), [
                m("h2", "UV Index"),
                uvi.currentUvi.value ? uvi.getUviCategory(uvi.currentUvi.value) : null,
            ]),
            m("section.airQ." + airQ.getAirQClass(airQ.currentAirQ.aqi), [
                m("h2", "Luftkvalitet"),
                airQ.currentAirQ.aqi ? airQ.getAirQCategory(airQ.currentAirQ.aqi) : null,
            ]),
        ]);
    }
};

export default home;
