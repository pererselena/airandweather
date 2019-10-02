"use strict";

import m from "mithril";
import uvi from "../models/uvi.js";
import weather from "../models/weather.js";
import airQ from "../models/airq.js";


const position = {
    currentPosition: {},
    city: {},

    getPosition: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position.geoSuccess,
                position.geoError
            );
        }
        return position.currentPosition;
    },


    geoSuccess: function(pos) {
        position.currentPosition = pos.coords;
        uvi.getUvIndexCurrPos(pos.coords.latitude, pos.coords.longitude);
        weather.getWeatherCurrPos(pos.coords.latitude, pos.coords.longitude);
        airQ.getAirQCurrPos(pos.coords.latitude, pos.coords.longitude);
        uvi.getUviForecast(pos.coords.latitude, pos.coords.longitude);
        weather.getWeatherForecast(pos.coords.latitude, pos.coords.longitude);
        weather.getWetherNearby(pos.coords.latitude, pos.coords.longitude);
        m.redraw();
    },

    geoError: function(error) {
        console.log('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
};



export default position;
