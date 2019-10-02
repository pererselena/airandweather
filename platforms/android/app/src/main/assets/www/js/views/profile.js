"use strict";

import m from 'mithril';
import position from "../models/position.js";
import uvi from "../models/uvi.js";
import skintype from "../models/skintype.js";
import auth from "../models/auth.js";

var profile = {
    oninit: function () {
        let pos = position.getPosition();

        uvi.getUviForecast(pos.latitude, pos.longitude);
        auth.readData();
        skintype.init();
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
        skintype.current.artefact ? console.log("view skin", skintype.current.artefact) : null;
        return m("div.slide-in.login.table", [
            m("h1", "Hudtyp"),
            m("section.profileView", [
                m("div", [
                    m("p", "Din hud typ är:"),
                    skintype.current.artefact ? m("p",
                        skintype.current.artefact.type) : m("p", "inte sparad")
                ]),
                m("div",  [
                    m("h3", "Fitzpatrick Skin Types: "),
                    m("table.table.table-scroll.table.striped", [
                        m("thead", [
                            m("tr", [
                                m("th", "Skin Type"),
                                m("th", "Color"),
                                m("th", "Typical Features"),
                                m("th", "Tanning Ability"),
                                m("th", "Ethnicity"),
                                m("th", "Time to Burn (mins)"),
                                m("th", "Spara")
                            ])
                        ]),
                        m("tbody", skintype.list.map(function(item) {
                            return m("tr", [
                                m("td", item.type),
                                m("td", {style: "background-color:" + item.color}),
                                m("td", item.features),
                                m("td", item.ability),
                                m("td", item.ethnicity),
                                m("td", item.burn),
                                m("td", [
                                    m("a", {
                                        href: "/profile/",
                                        oncreate: m.route.link,
                                        onclick: function() {
                                            skintype.save(item);
                                        }
                                    }, [
                                        m("i.material-icons", "check_circle")
                                    ])
                                ]),
                            ]);
                        }))
                    ])
                ]),
                m("p", [
                    m("a.button.yellow-button", {
                        href: "/",
                        oncreate: m.route.link,
                        onclick: function() {
                            auth.token = "";
                        }
                    }, "Logga ut")
                ])
            ])
        ]);
    }
};

export default profile;
