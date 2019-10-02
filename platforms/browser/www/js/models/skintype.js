"use strict";

import auth from "./auth.js";


const skintype = {
    list: [
        {
            type: "1",
            color: "#f1d1b1",
            features: "Very fair skin, white; red or blond hair;" +
            "light-colored eyes; freckles likely",
            ability: "Always burns, does not tan",
            ethnicity: "Scandinavian, Celtic",
            burn: "(200 * 2.5)⁄(3 * UVI)"
        },
        {
            type: "2",
            color: "#e4b590",
            features: "Fair skin, white; light eyes; light hair",
            ability: "Burns easily, tans poorly",
            ethnicity: "Northern European (Caucasian)",
            burn: "(200 * 3)⁄(3 * UVI)"
        },
        {
            type: "3",
            color: "#cf9f7d",
            features: "Fair skin, cream white; any eye or hair color (very common skin type)",
            ability: "Tans after initial burn",
            ethnicity: "Darker Caucasian (Central Europe)",
            burn: "(200 * 4)⁄(3 * UVI)"
        },
        {
            type: "4",
            color: "#b67851",
            features: "Olive skin, typical Mediterranean Caucasian skin;" +
            "dark brown hair; medium to heavy pigmentation",
            ability: "Burns minimally, tans easily",
            ethnicity: "Mediterranean, Asian, Hispanic",
            burn: "(200 * 5)⁄(3 * UVI)"
        },
        {
            type: "5",
            color: "#a15e2d",
            features: "Brown skin, typical Middle Eastern skin; dark hair; rarely sun sensitive",
            ability: "Rarely burns, tans darkly easily",
            ethnicity: "Middle eastern, Latin, light-skinned African-American, Indian",
            burn: "(200 * 8)⁄(3 * UVI)"
        },
        {
            type: "6",
            color: "#513938",
            features: "Black skin; rarely sun sensitive",
            ability: "Never burns, always tans darkly",
            ethnicity: "Dark-skinned African American",
            burn: "(200 * 15)⁄(3 * UVI)"
        }
    ],
    current: {},

    save: function (object) {
        if (Object.keys(skintype.current).length === 0) {
            auth.save(object);
        } else {
            skintype.current.artefact = object;
            auth.update(skintype.current);
        }
    },

    load: function() {
        skintype.current = auth.readData();
    },

    init: function() {
        auth.readData();
    }

};



export default skintype;
