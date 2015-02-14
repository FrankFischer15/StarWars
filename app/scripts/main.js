var layout = $("<div class='container-fluid'><div class='row gameTitle'><div class='col-xs-3'><img src='images/gamelogo.png' /></div><div class='col-xs-2'><button type='button' id='start'>START</button></div><div class='row'><div id='timer'></div></div><div class='col-xs-1'><div id='counter'></div><div id='wrong'></div></div><div class='col-xs-3 choiceOne'></div><div class='col-xs-3 choiceTwo'></div></div><div class='row gameArea'><div class='col-xs-12 cardSpace' id='insertCards'></div></div></div>")
var cardsArea = $("<div class='row'><div class='col-xs-2' id='t0'></div><div class='col-xs-2' id='t1'></div><div class='col-xs-2' id='t2'></div><div class='col-xs-2' id='t3'></div><div class='col-xs-2' id='t4'></div><div class='col-xs-2' id='t5'></div></div><div class='row'><div class='col-xs-2' id='t6'></div><div class='col-xs-2' id='t7'></div><div class='col-xs-2' id='t8'></div><div class='col-xs-2' id='t9'></div><div class='col-xs-2' id='t10'></div><div class='col-xs-2' id='t11'></div></div><div class='row'><div class='col-xs-2' id='t12'></div><div class='col-xs-2' id='t13'></div><div class='col-xs-2' id='t14'></div><div class='col-xs-2' id='t15'></div><div class='col-xs-2' id='t16'></div><div class='col-xs-2' id='t17'></div></div><div class='row'><div class='col-xs-2' id='t18'></div><div class='col-xs-2' id='t19'></div><div class='col-xs-2' id='t20'></div><div class='col-xs-2' id='t21'></div><div class='col-xs-2' id='t22'></div><div class='col-xs-2' id='t23'></div></div><div class='row'><div class='col-xs-2' id='t24'></div><div class='col-xs-2' id='t25'></div><div class='col-xs-2' id='t26'></div><div class='col-xs-2' id='t27'></div><div class='col-xs-2' id='t28'></div><div class='col-xs-2' id='t29'></div></div>")



var back = 'images/death_star.png';
var tile = ['images/vader.png', 'images/ackbar.png', 'images/boba_fett.png', 'images/C3PO.png', 'images/chewbacca.png', 'images/han_solo.png',
    'images/jar_jar.png', 'images/lando.png', 'images/leia.png', 'images/luke_skywalker.png', 'images/obi_wan.png', 'images/qui_gon.png',
    'images/R2D2.png', 'images/yoda.png', 'images/anakin.png'
];


var totalMoves = 0;
var wrongMoves = 0;

build();
cards();




function build() {
    $("body").append(layout);

}



function cards() {
    $("#insertCards").append(cardsArea);
}

/* randomizeOrder function randomizes the board of cards using some helpful jQuery functions*/
function randomizeOrder(a, b) {
    return (Math.round(Math.random()) - 0.5);
}

/* assignment of the tiles location to the images.*/
var card = [];
for (var counter = 0; counter < 15; counter++) {
    card[counter] = new Image();
    card[counter].src = tile[counter];
    tile[counter] = '<img src="' + tile[counter] + '" width="128" height="128" alt="tile" \/>';
    tile[counter + 15] = tile[counter];
}


/* function that takes argument from counter as for loop initializes the board. 
The counter variable becomes part of the id of the image prefixed by the letter t and when that div 
structure is clicked it's image is displayed through another function disp() which reacts to the onclick event listener
*/

function displayBack(counter) {
    document.getElementById('t' + counter).innerHTML = '<div class="shit" onclick="disp(' + counter + ');return false;"><img src="' + back + '" width="128" height="128" alt="back" \/><\/div>';
}

/* initialize the game by starting on load with all backs of the cards facing the user.
Set timer to start at 0:00 and set timer interval to 1 second
*/
var choice1, choice2, timer, numCardsSelected, tileId, count, timeId;
window.onload = start;


// loop sets all the cards to just show their back and sets initializations to 0
function start() {
    for (var counter = 0; counter <= 29; counter++) displayBack(counter);


    clearInterval(tileId);
    timer = numCardsSelected = timeId = 0;

    // sort method sorts items in the array of tile objects the tiles randomly
    tile.sort(randomizeOrder);



}

/* disp function takes an argument selection [a user clicking a card] and performs some logic before
working with the flipping effect. If this is the first card flipped it will wait for another card to be selected. If it is the second
card being selected it will compare selection 1 and 2 and then act based on logic
*/
function disp(selection) {
    if (numCardsSelected > 1) {
        clearTimeout(count);
        conceal();
    }
    // this deals with the tile array element selected and using logic determines action upon it
    document.getElementById('t' + selection).innerHTML = tile[selection];
    if (numCardsSelected == 0) choice1 = selection;
    else {
        choice2 = selection;
        count = setTimeout('conceal()', 900);
    }
    numCardsSelected++;
}

/* conceal() works with the 2 selections the user makes and compares them to determine
if they are a match or not - if not it sends those selections to have them returned to displaying
their backside to the user */
function conceal() {
    numCardsSelected = 0;
    if (tile[choice1] != tile[choice2]) {
        displayBack(choice1);

        displayBack(choice2);

        totalMoves++;
        wrongMoves++;

        document.getElementById('counter').innerHTML = (totalMoves);
        document.getElementById('wrong').innerHTML = (wrongMoves);
    } else {
        timeId++;
        totalMoves++;
        document.getElementById('counter').innerHTML = (totalMoves);
    }

    if (timeId >= 15) clearInterval(numCardsSelected);
}

