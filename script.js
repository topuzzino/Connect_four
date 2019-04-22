// popups: start and finish
var winPopup = $(".winning-popup").hide();
var startPopup = $(".starting-popup").show();

// variables for amount of slots of the board
var sizeX = 7;
var sizeY = 6;

// getting players names and saving them
var player1Name;
var player2Name;
var currentPlayer = "player1";

// button for restarting the game
var startButton = $(".startButton");
//
var allSlots = $(".slot");

// saves players' names and starts the game
startButton.on("click", function() {
    player1Name = $(".player1Name").val();
    player2Name = $(".player2Name").val();
    startPopup.hide();
    $("h1").html("Next move: " + player1Name);
});

// shows the column on mouseover
$(".column").on("mouseover", function(e) {
    $(e.currentTarget)
        .children()
        .css("background-color", "#424153");
});

// returns the column to normal state on mouseout
$(".column").on("mouseout", function(e) {
    $(e.currentTarget)
        .children()
        .css("background-color", "#000");
});

// click event on selected column
$(".column").on("click", function(e) {
    var slotsInColumn = $(e.currentTarget).find(".slot");
    // if a slot is empty, add a class of current player
    for (var i = 5; i >= 0; i--) {
        if (
            !slotsInColumn.eq(i).hasClass("player1") &&
            !slotsInColumn.eq(i).hasClass("player2")
        ) {
            slotsInColumn.eq(i).addClass(currentPlayer);
            break;
        }
    }

    // check for victory before switching the player
    if (
        // diagonal up left to bottom right
        checkForVictory(0, sizeX - 4, sizeY - 4, 1, 1, currentPlayer) ||
        // diagonal up right to bottom left
        checkForVictory(3, sizeX - 1, sizeY - 4, -1, 1, currentPlayer) ||
        // horisontal check
        checkForVictory(0, sizeX - 4, sizeY - 1, 1, 0, currentPlayer) ||
        // vertical check
        checkForVictory(0, sizeX - 1, sizeY - 4, 0, 1, currentPlayer)
    ) {
        return showVictoryMessage(currentPlayer);
    }
    switchPlayers();
});

// function for switching players
function switchPlayers() {
    if (currentPlayer == "player1") {
        currentPlayer = "player2";
        $("h1").html("Next move: " + player2Name);
    } else {
        currentPlayer = "player1";
        $("h1").html("Next move: " + player1Name);
    }
}

// check if a slot has a class of an player on it
function checkSlot(x, y, currentPlayer) {
    if (allSlots.eq(x * sizeY + y).hasClass(currentPlayer)) {
        return true;
    }
    return false;
}

// check every slot
function checkForVictory(
    areaStartX,
    areaEndX,
    areaEndY,
    stepX,
    stepY,
    currentPlayer
) {
    // check particular area
    for (var x = areaStartX; x <= areaEndX; x++) {
        for (var y = 0; y <= areaEndY; y++) {
            if (
                checkSlot(x, y, currentPlayer) &&
                checkSlot(x + stepX, y + stepY, currentPlayer) &&
                checkSlot(x + stepX * 2, y + stepY * 2, currentPlayer) &&
                checkSlot(x + stepX * 3, y + stepY * 3, currentPlayer)
            ) {
                return true;
            }
        }
    }
    return false;
}

function showVictoryMessage(player) {
    // loop through all slot to find winning and loosing circles
    // and transform them into cat and shit emoji
    for (var i = 0; i < allSlots.length; i++) {
        if (
            allSlots.eq(i).hasClass("player1") ||
            allSlots.eq(i).hasClass("player2")
        ) {
            if (allSlots.eq(i).hasClass(player)) {
                allSlots
                    .eq(i)
                    .children()
                    .addClass("win");
            } else {
                allSlots
                    .eq(i)
                    .children()
                    .addClass("loose");
            }
        }
    }
    winPopup.delay(2000).show(0);
    var clearButton = $(".clearButton").on("click", function() {
        winPopup.hide();
        window.location.reload();
    });
}
