"use strict";

import m from 'mithril';
import auth from '../models/auth.js';


function loginOrNot() {
    if (auth.token) {
        return "/profile";
    }
    return "/login";
}


var layout = {
    view: function (vnode) {
        return [
            //m("nav.top-nav", "Lager 6"),
            m("nav.bottom-nav", [
                m("a", {
                    href: "/",
                    oncreate: m.route.link,
                    class: m.route.get() === "/" ? "active" : ""}, [
                    m("i.material-icons", "home"),
                    m("span.icon-text", "Hem")
                ]),
                m("a", {
                    href: loginOrNot(),
                    oncreate: m.route.link,
                    class: m.route.get() === "/login" ? "active" : ""}, [
                    m("i.material-icons", "account_box"),
                    m("span.icon-text", "Logga in")
                ]),
                m("a", {
                    href: "/map",
                    oncreate: m.route.link,
                    class: m.route.get().startsWith("/map") ? "active" : ""}, [
                    m("i.material-icons", "map"),
                    m("span.icon-text", "Karta")
                ]),
                m("a", {
                    href: "/uvi",
                    oncreate: m.route.link,
                    class: m.route.get().startsWith("/uvi") ? "active" : ""}, [
                    m("i.material-icons", "brightness_low"),
                    m("span.icon-text", "UV index")
                ]),
                m("a", {
                    href: "/weather",
                    oncreate: m.route.link,
                    class: m.route.get().startsWith("/weather") ? "active" : ""}, [
                    m("i.material-icons", "filter_drama"),
                    m("span.icon-text", "Väder")
                ])
            ]),
            m("main.container", vnode.children)
        ];
    }
};

export default layout;
