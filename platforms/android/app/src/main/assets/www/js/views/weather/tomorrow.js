"use strict";

import m from 'mithril';
import position from "../../models/position.js";
import weather from "../../models/weather.js";
import functions from "../../models/functions.js";

var weatherTomorrow = {
    oninit: function() {
        let pos = position.getPosition();

        weather.getWeatherForecast(pos.latitude, pos.longitude);
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
        return m("div.slide-in.tomorrow", [
            m("div.weatherHead", [
                m("i.material-icons", "menu"),
                m("h2", weather.currentWeather.name),
                m("i.material-icons", "youtube_searched_for")
            ]),
            m("nav.weatherNav", [
                m("a", {
                    href: "/weather",
                    oncreate: m.route.link,
                    class: m.route.get() === "/weather" ? "active" : ""
                }, "I DAG"),
                m("a", {
                    href: "/weather/tomorrow",
                    oncreate: m.route.link,
                    class: m.route.get() === "/weather/tomorrow" ? "active" : ""
                }, "I MORGON"),
                m("a", {
                    href: "/weather/days",
                    oncreate: m.route.link,
                    class: m.route.get() === "/weather/days" ? "active" : ""
                }, "5 DAGAR")
            ]),
            m("section.weatherView", [
                weather.forecast.list ? weather.getTomorrowWeather().map(function(item) {
                    return m("div.weather", [
                        m("div.weatherTempSec", [
                            m("p.weathTemp", Math.round(item.main.temp) + "\xB0"),
                            m("p", "Vind: " + item.wind.speed + "m/s"),
                            m("p", "Fuktighet: " + item.main.humidity + "%"),
                        ]),
                        m("div.weatherIconSec", [
                            m("img", {
                                src: "img/icons/" + item.weather[0].icon + ".png"
                            }),
                            m("p", item.weather[0].description)
                        ]),
                    ]);
                }) : null,
                m("section.timeforecast", [
                    weather.forecast.list ? weather.forecast.list.slice(7, 15).map(function(item) {
                        return m("div.timeforecastItem", [
                            m("p.temp", Math.round(item.main.temp) + "\xB0"),
                            m("hr"),
                            m("img", {
                                src: "img/icons/" + item.weather[0].icon + ".png"
                            }),
                            m("hr"),
                            m("p.time", functions.getTime(item.dt_txt))
                        ]);
                    }) : null,
                ]),
            ])
        ]);
    }
};

export default weatherTomorrow;
