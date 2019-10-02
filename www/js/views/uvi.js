"use strict";

import m from 'mithril';
import position from "../models/position.js";
import uvi from "../models/uvi.js";
import weather from "../models/weather.js";
import functions from "../models/functions.js";

var uviView = {
    oninit: function() {
        uvi.currentUvi = {};
        uvi.uviForecast = {};
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
        console.log(uvi.uviForecast);
        return m("div.slide-in.uvi." + uvi.getUviClass(uvi.currentUvi.value), [
            m("section.uviView", [
                m("section.uviWeather", [
                    weather.currentWeather.weather ? m("div.weathericon", [
                        m("img", {
                            src: "img/icons/" + weather.currentWeather.weather[0].icon + ".png"
                        })
                    ]) : null,
                    m("div.uviNav", [
                        weather.currentWeather.main ? m("p.tempNav",
                            Math.round(weather.currentWeather.main.temp) + "\xB0 c")
                            : null,
                        m("p.location", weather.currentWeather.name)
                    ]),
                    m("a", {
                        href: "/login/",
                        oncreate: m.route.link
                    }, [
                        m("i.material-icons", "perm_identity")
                    ])
                ]),
                m("section.uviValue", [
                    m("p.small", "NOW "),
                    uvi.currentUvi.value ? m("p.big", uvi.getUviText(uvi.currentUvi.value)) : null,
                ]),
                m("section.uviValueBig", [
                    uvi.currentUvi.value ? m("p.bigIndex", uvi.currentUvi.value) : null,
                ]),
                m("section.uviForecast", [
                    m("h2", "UV FORECAST"),
                    m("section.uviForecastCont", [
                        uvi.uviForecast.data ? uvi.uviForecast.data.slice(0, 6).map(function(item) {
                            return m("div.uviItem." + uvi.getUviClass(item.value), [
                                m("p.uviIndex", item.value),
                                m("p.uviTime", functions.getFormatDate(item.date_iso)),
                            ]);
                        }) : null
                    ])
                ])
            ])
        ]);
    }
};

export default uviView;
