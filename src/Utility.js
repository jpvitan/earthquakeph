/*
Created by Justine Paul Sanchez Vitan.
Copyright © 2021 Justine Paul Sanchez Vitan. All rights reserved.
*/

/*
============================================================
Functions
============================================================
*/
export const getMagnitudeColor = (magnitude) => {
    var magnitudeColor = "#e74c3c";

    if (magnitude >= 1 && magnitude <= 3.9) {
        magnitudeColor = "#7f8c8d";
    } else if (magnitude >= 4 && magnitude <= 4.9) {
        magnitudeColor = "#f1c40f";
    } else if (magnitude >= 5 && magnitude <= 5.9) {
        magnitudeColor = "#f39c12";
    } else if (magnitude >= 6 && magnitude <= 6.9) {
        magnitudeColor = "#d35400";
    } else if (magnitude >= 7 && magnitude <= 7.9) {
        magnitudeColor = "#c0392b";
    } else if (magnitude >= 8) {
        magnitudeColor = "#9b59b6";
    }

    return magnitudeColor;
}

export const getMagnitudeArrayBounds = (minMagnitude, maxMagnitude) => {
    var minMagnitudeArray = [];
    var maxMagnitudeArray = [];

    for (var i = 1; i <= maxMagnitude - 1; i++) {
        minMagnitudeArray.push(i);
    }
    for (var j = minMagnitude + 1; j <= 10; j++) {
        maxMagnitudeArray.push(j);
    }

    return [minMagnitudeArray, maxMagnitudeArray];
}
