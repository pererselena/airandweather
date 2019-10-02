/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

"use strict";

import m from 'mithril';
import auth from "./models/auth.js";
import home from "./views/home.js";
import layout from "./views/layout.js";
import mapView from "./views/map.js";
import uviView from "./views/uvi.js";
import login from "./views/login.js";
import register from "./views/register.js";
import profile from "./views/profile.js";
import weatherView from "./views/weather/weather.js";
import weatherTomorrow from "./views/weather/tomorrow.js";
import weatherDays from "./views/weather/days.js";


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        m.route(document.body, "/", {
            "/": {
                render: function () {
                    return m(layout, m(home));
                }
            },
            "/map": {
                render: function () {
                    return m(layout, m(mapView));
                }
            },
            "/weather": {
                render: function () {
                    return m(layout, m(weatherView));
                }
            },
            "/weather/tomorrow": {
                render: function () {
                    return m(layout, m(weatherTomorrow));
                }
            },
            "/weather/days": {
                render: function () {
                    return m(layout, m(weatherDays));
                }
            },
            "/profile": {
                render: function () {
                    if (auth.token) {
                        return m(layout, m(profile));
                    }
                    return m.route.set("/login");
                }
            },
            "/login": {
                render: function () {
                    return m(layout, m(login));
                }
            },
            "/register": {
                render: function () {
                    return m(layout, m(register));
                }
            },
            // "/invoices/create": {
            //     render: function () {
            //         if (auth.token) {
            //             return m(layout, m(createInvoice));
            //         }
            //         return m.route.set("/login");
            //     }
            // },
            // "/invoices/show": {
            //     render: function () {
            //         if (auth.token) {
            //             return m(layout, m(showInvoice));
            //         }
            //         return m.route.set("/login");
            //     }
            // },
            "/uvi": {
                render: function () {
                    return m(layout, m(uviView));
                }
            }
        });
    }
};

app.initialize();
