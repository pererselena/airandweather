"use strict";


const functions = {
    getDateAndTime: function () {
        var d = new Date();
        var options = { weekday: 'long', month: 'long', day: 'numeric' };
        var timeOptions = {hour: '2-digit', minute: '2-digit'};

        return d.toLocaleDateString('se-SV', options) + " " +
        d.toLocaleTimeString('se-SV', timeOptions);
    },
    getFormatDate: function (d) {
        d = new Date(d);
        var options = {
            month: "2-digit",
            day: "2-digit"
        };

        return d.toLocaleDateString("se-SV", options);
    },
    getTime: function (time) {
        var d = new Date(time);
        var timeOptions = {hour: '2-digit', minute: '2-digit'};

        return d.toLocaleTimeString('se-SV', timeOptions);
    }

};



export default functions;
