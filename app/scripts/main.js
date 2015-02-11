'use strict'



var back = 'images/troll.png';
var tile = ['images/vader.png', 'images/ackbar.png', 'images/boba_fett.png', 'images/C3PO.png', 'images/chewbacca.png', 'images/han_solo.png',
    'images/jar_jar.png', 'images/lando.png', 'images/leia.png', 'images/luke_skywalker.png', 'images/obi_wan.png', 'images/qui_gon.png',
    'images/R2D2.png', 'images/yoda.png', 'images/anakin.png'
];


// randomize the board
function randomizeOrder(a, b) {
    return (Math.round(Math.random()) - 0.5);
}

// assignment of the tiles location to the images
var card = [];
for (var counter = 0; counter < 15; counter++) {
    card[counter] = new Image();
    card[counter].src = tile[counter];
    tile[counter] = '<img src="' + tile[counter] + '" width="128" height="128" alt="tile" \/>';
    tile[counter + 15] = tile[counter];
}

// function that takes argument from counter as for loop initializes the board. The counter variable becomes part of the id of the image prefixed by the letter t and when that div structure is clicked it's image is displayed through another function
function displayBack(counter) {
    document.getElementById('t' + counter).innerHTML = '<div onclick="disp(' + counter + ');return false;"><img src="' + back + '" width="128" height="128" alt="back" \/><\/div>';
}

// initialize the game by starting on load with all backs of the cards facing the user. Set timer to start at 0:00 and set timer interval to 1 second 
var choice1, choice2, tmr, tno, tid, cid, cnt;
window.onload = start;

function start() {
    // loop sets all the cards to just show their back
    for (var counter = 0; counter <= 29; counter++) displayBack(counter);

    // reset timer to 0:00
    clearInterval(tid);
    tmr = tno = cnt = 0;

    // sort method sorts items in the array of tile objects the tiles randomly
    tile.sort(randomizeOrder);

    // call counter and set interval to 1 second
    cntr();
    tid = setInterval('cntr()', 1000);
}

// define timer function
function cntr() {
    var min = Math.floor(tmr / 60);
    var sec = tmr % 60;
    document.getElementById('cnt').value = min + ':' + (sec < 10 ? '0' : '') + sec;
    tmr++;
}

// 
function disp(sel) {
    if (tno > 1) {
        clearTimeout(cid);
        conceal();
    }
    document.getElementById('t' + sel).innerHTML = tile[sel];
    if (tno == 0) choice1 = sel;
    else {
        choice2 = sel;
        cid = setTimeout('conceal()', 900);
    }
    tno++;
}

function conceal() {
    tno = 0;
    if (tile[choice1] != tile[choice2]) {
        displayBack(choice1);
        displayBack(choice2);
    } else cnt++;
    if (cnt >= 15) clearInterval(tid);
}