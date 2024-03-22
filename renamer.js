// ==UserScript==
// @name         ChristWare
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  ChristWare For TTRS
// @match        https://play.ttrockstars.com/*
// @grant        GM_log
// ==/UserScript==

(function() {
    'use strict';
    GM_log("on.");

    // Replace the values below with your desired image link and new title
    var faviconUrl = "https://imgs.search.brave.com/cSgkWfd2FfGnEW6C0ND_LrXqcnucEG4V1cYTK6LEVXk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi8xLzE3L0No/cmlzdF9pbl90aGVf/V2lsZGVybmVzc18t/X0l2YW5fS3JhbXNr/b3lfLV9Hb29nbGVf/Q3VsdHVyYWxfSW5z/dGl0dXRlLmpwZy81/MTJweC1DaHJpc3Rf/aW5fdGhlX1dpbGRl/cm5lc3NfLV9JdmFu/X0tyYW1za295Xy1f/R29vZ2xlX0N1bHR1/cmFsX0luc3RpdHV0/ZS5qcGc";
    var newTitle = "ChristWare | .gg/rexy";

    // Change favicon
    var favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
        favicon.href = faviconUrl;
    }

    // Change title
    var titleElement = document.querySelector("title");
    if (titleElement) {
        titleElement.innerHTML = newTitle;
    }

    if (typeof String.prototype.trim === "undefined") {
        String.prototype.trim = function() {
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }

    var running = false;
    setInterval(() => {
        var equation = document.querySelector(".current");
        var input = document.querySelector(".input-holder");
        var enter = document.querySelector(".key-ent");
        var top = document.querySelector(".next-game-question");
        var keypad = document.querySelector(".keyboard");
        var play;

        if (equation) {
            if (running) {
                return;
            }
            // start running
            running = true;
            // add "hacks enabled" message
            let el = document.createElement("a");
            el.setAttribute("href", "https://github.com/jibstack64/ttrockstars-bot");
            el.setAttribute("target", "_blank");
            while (top.firstChild) {
                top.removeChild(top.firstChild);
            }
            el.style.cssText = "background-color: black; color: greenyellow; width: auto; align-items: center; margin-top: 10px; margin-bottom: 10px; padding: 5px; border: 2px solid red; font-size: 20px; font-style: bold; font-family: monospace;";
            el.innerHTML = "Christware";
            top.appendChild(el);

            var id = setInterval(() => {
                if (running) {
                    let raw = equation.innerHTML.replace("×", "*").replace("÷", "/");
                    console.log(raw);
                    while (raw.includes("<!---->")) {
                        raw = raw.replace("<!---->", "");
                    }
                    raw = raw.replace(/<\s*span[^>]*>.*?<\s*\/\s*span\s*>/g, ''); // remove any <span> tags
                    raw = raw.trim();
                    console.log(raw);
                    let answer = String(eval(raw));
                    GM_log("answer: " + answer);

                    [...answer].forEach(char => {
                        for (var row = 0; row < keypad.children.length; row++) {
                            for (var key = 0; key < keypad.children[row].children.length; key++) {
                                let elem = keypad.children[row].children[key];
                                if (elem.innerHTML.trim() === char) {
                                    elem.click();
                                    return;
                                }
                            }
                        }
                    });
                    enter.click();
                } else {
                    clearInterval(id);
                }
            }, 225);
        } else {
            running = false;
            var gameOver = document.querySelector(".stamp");
            if (gameOver) {
                gameOver.innerHTML = ".gg/rexy";
            }
        }
    }, 100);
})();
