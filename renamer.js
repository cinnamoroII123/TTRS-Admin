// ==UserScript==
// @name         TTRS Renamer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Changes your Times Table Rockstars username using inspect element
// @author       WormGPT V3.0
// @match        play.ttrockstars.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Set your desired username
    const newUsername = ".gg/star";

    // Find the username element
    const usernameElement = document.querySelector('.username');

    if (usernameElement) {
        // Change the inner text of the username element to the new username
        usernameElement.innerText = newUsername;
        console.log(`Your username has been changed to "${newUsername}"`);
    } else {
        console.log('Sorry, I couldn\'t find the username element.');
    }
})();
