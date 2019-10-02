"use strict";

import m from 'mithril';
import auth from "../models/auth.js";

var errorMessage = {
    view: function () {
        return m("div.error", auth.errorMessage);
    }
};

var login = {
    oninit: auth.clear,
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
        return [
            m("div.slide-in.login", [
                m("h1", "Logga in"),
                auth.errorMessage ? m(errorMessage) : null,
                m("form", {
                    onsubmit: function (event) {
                        event.preventDefault();
                        auth.login();
                    }
                }, [
                    m("label.input-label", "E-post"),
                    m("input[type=email].input", {
                        oninput: function (e) {
                            auth.email = e.target.value;
                        }
                    }),
                    m("label.input-label", "Lösenord"),
                    m("input[type=password].input", {
                        oninput: function (e) {
                            auth.password = e.target.value;
                        }
                    }),
                    m("input[type=submit][value=Logga in].button.blue-button", "Logga in")
                ],
                m("p", [
                    m("a.button.green-button", { href: "/register", oncreate:
                        m.route.link }, "Registrera")
                ]))
            ])
        ];
    }
};

export default login;
