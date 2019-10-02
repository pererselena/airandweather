"use strict";

import m from 'mithril';
import position from "../../models/position.js";
import weather from "../../models/weather.js";

var weatherDays = {
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
        return m("div.slide-in.days", [
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
            m("section.weatherViewDaily", [
                m("section.timeforecastDaily", [
                    weather.forecast.list ? weather.getDailyWeather().map(function(item) {
                        if (new Date(item.dt_txt).getHours() === 3) {
                            return m("div.weathericon.night", [
                                m("div.weatherDate", [
                                    m("p", item.dt_txt),
                                    m("p", item.weather[0].description)
                                ]),
                                m("div.daysIcon", [
                                    m("p.daysImg", [
                                        m("img", {
                                            src: "img/icons/" + item.weather[0].icon + ".png"
                                        })
                                    ]),
                                    m("p.weathText", Math.round(item.main.temp) + "\xB0")
                                ])
                            ]);
                        }
                        return m("div.weathericon", [
                            m("div.weatherDate", [
                                m("p", item.dt_txt),
                                m("p", item.weather[0].description)
                            ]),
                            m("div.daysIcon", [
                                m("p.daysImg", [
                                    m("img", {
                                        src: "img/icons/" + item.weather[0].icon + ".png"
                                    })
                                ]),
                                m("p.weathText", Math.round(item.main.temp) + "\xB0")
                            ])
                        ]);
                    }) : null
                ])
            ])
        ]);
    }
};

export default weatherDays;
