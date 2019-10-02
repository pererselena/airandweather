"use strict";

import m from 'mithril';
import L from 'leaflet';
import position from "../models/position.js";
import weather from "../models/weather.js";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import locationIcon from "../../img/location.png";

var map;
var cityLayer = L.layerGroup();


function mapStuff() {
    if (position.currentPosition.latitude &&
        position.currentPosition.longitude) {
        L.marker(
            [
                position.currentPosition.latitude, position.currentPosition.longitude
            ],
            {
                icon: locationMarker
            }
        ).addTo(map).bindPopup("Din plats");
    }
}

function renderMarker() {
    cityLayer.clearLayers();
    if (weather.currentWeatherNearby.list) {
        weather.currentWeatherNearby.list.map(function (item) {
            let myIcon = L.divIcon({
                iconSize: new L.Point(100, 100),
                html: `<div class="mapIconInfo"><img src="img/icons/
${item.weather[0].icon}.png" width=30><p>${item.name}</
p><p>${Math.round(item.main.temp)}\xB0 C</p></div>`
            });
            let marker = L.marker([item.coord.lat, item.coord.lon], {
                icon: myIcon
            }).bindPopup(item.weather[0].description);

            cityLayer.addLayer(marker);
        });
    }
}

var locationMarker = L.icon({
    iconUrl: locationIcon,

    iconSize:     [24, 24],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
});

var mapComponent = {
    oncreate: showMap,
    view: function() {
        return m("div#map.map");
    }
};

function showMap() {
    var osm = L.tileLayer ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    });
    var  WAQI_URL    =  'https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/' +
    '{y}.png?token=0cdbeff5baa1a56cefe92dd3a7781e7f55bfe593';
    var  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;' +
    '<a  href="http://waqi.info">waqi.info</a>';
    var mapTemp = 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/' +
    '{y}.png?appid=93a8f47efed602a2b08d625e6e923a7a';
    var mapClouds = 'https://tile.openweathermap.org/map/clouds_new/{z}/{x}/' +
    '{y}.png?appid=93a8f47efed602a2b08d625e6e923a7a';
    var mapRain = 'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/' +
    '{y}.png?appid=93a8f47efed602a2b08d625e6e923a7a';
    var mapWind = 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/' +
    '{y}.png?appid=93a8f47efed602a2b08d625e6e923a7a';
    var  waqiLayer  =  L.tileLayer(WAQI_URL,  {attribution:  WAQI_ATTR});
    var  tempLayer  =  L.tileLayer(mapTemp);
    var  cloudsLayer  =  L.tileLayer(mapClouds);
    var  rainLayer  =  L.tileLayer(mapRain);
    var  windLayer  =  L.tileLayer(mapWind);
    var baseMaps = {
        "Standard": osm
    };
    var overlayMaps = {
        "Luftkvalitet": waqiLayer,
        "Temperatur": tempLayer,
        "Moln": cloudsLayer,
        "Regn": rainLayer,
        "Vind": windLayer,
        "Väder": cityLayer
    };

    map = L.map("map", {
        layers: [osm]
    });

    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        map.setView([
            position.currentPosition.latitude,
            position.currentPosition.longitude
        ], 10);
    } else {
        map.setView([55.78, 10.17], 10);
    }

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    map.on('moveend zoomend', function() {
        if (map.getZoom() < 10) {
            cityLayer.clearLayers();
        } else {
            let pos = map.getCenter();

            weather.getWetherNearby(pos.lat, pos.lng);
            renderMarker();
        }
    });
}


var mapView = {
    oninit: function () {
        position.getPosition();
    },
    oncreate: function () {
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
        if (map) {
            mapStuff();
        }
        if (weather.currentWeatherNearby.list) {
            renderMarker();
        }
        return [ m("div.slide-in.mapView", [
            m("h1", "Karta"),
            position.currentPosition.latitude ? m(mapComponent) : null
        ])
        ];
    }
};

export default mapView;
