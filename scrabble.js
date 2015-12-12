$( document ).ready(function() {
    //global vars including board count and tile count
    var cellCount = 1;
    var tileCount = 1;
    var curScore = 0;
    var prevTile = 0;
    //array used for making validating tiles easier
    var validate = [];
    var revalidate = [];
    //var for enforcing players to play their tiles in either a row or column, not both
    var currentlyPlaced = 0;
    var style = "";
    //arrays containing special tile numbers
    var tripleWord = [1,8,15,106,120,211,218,225];
    var doubleWord = [17,29,33,43,49,57,65,71,155,161,169,177,183,193,197,209];
    var tripleLetter = [21,25,77,81,85,89,137,141,145,149,201,205];
    var doubleLetter = [4,12,37,39,46,53,60,93,97,99,103,109,117,123,127,129,133,166,173,180,187,189,214,222];
    //Array to check if player hand is occupied or not
    var playerHand = [false,false,false,false,false,false,false];
    //Array used for keeping track of current tiles in play 
    var tiles = [];
    //Array used for "bag" of tiles
    var bag = [];
    bag["A"] = { "value" : 1,  "number-remaining" : 9  } ;
    bag["B"] = { "value" : 3,  "number-remaining" : 2  } ;
    bag["C"] = { "value" : 3,  "number-remaining" : 2  } ;
    bag["D"] = { "value" : 2,  "number-remaining" : 4  } ;
    bag["E"] = { "value" : 1,  "number-remaining" : 12 } ;
    bag["F"] = { "value" : 4,  "number-remaining" : 2  } ;
    bag["G"] = { "value" : 2,  "number-remaining" : 3  } ;
    bag["H"] = { "value" : 4,  "number-remaining" : 2  } ;
    bag["I"] = { "value" : 1,  "number-remaining" : 9  } ;
    bag["J"] = { "value" : 8,  "number-remaining" : 1  } ;
    bag["K"] = { "value" : 5,  "number-remaining" : 1  } ;
    bag["L"] = { "value" : 1,  "number-remaining" : 4  } ;
    bag["M"] = { "value" : 3,  "number-remaining" : 2  } ;
    bag["N"] = { "value" : 1,  "number-remaining" : 6  } ;
    bag["O"] = { "value" : 1,  "number-remaining" : 8  } ;
    bag["P"] = { "value" : 3,  "number-remaining" : 2  } ;
    bag["Q"] = { "value" : 10, "number-remaining" : 1  } ;
    bag["R"] = { "value" : 1,  "number-remaining" : 6  } ;
    bag["S"] = { "value" : 1,  "number-remaining" : 4  } ;
    bag["T"] = { "value" : 1,  "number-remaining" : 6  } ;
    bag["U"] = { "value" : 1,  "number-remaining" : 4  } ;
    bag["V"] = { "value" : 4,  "number-remaining" : 2  } ;
    bag["W"] = { "value" : 4,  "number-remaining" : 2  } ;
    bag["X"] = { "value" : 8,  "number-remaining" : 1  } ;
    bag["Y"] = { "value" : 4,  "number-remaining" : 2  } ;
    bag["Z"] = { "value" : 10, "number-remaining" : 1  } ;
    bag["_"] = { "value" : 0,  "number-remaining" : 2  } ;
    
    //"Pull a random tile from bag with proper probability distributions
    var randomTile = function(){
        var total = 0;
        var selected = "";
        var chars = "";
        //Loads all remaining tile letters into a string
        for(var index in bag) {
            for( var i = 0; i < bag[index]["number-remaining"]; i++){
                chars += index;
                total++;
            }
        }
        //no more tiles are available
        if(chars === ""){
            return false;
        }
        //Selects random char from tile string at random  
        selected += chars.substr( Math.floor(Math.random() * total), 1);
        bag[selected]["number-remaining"] -= 1;
        return selected;
    };
    //used inside board creation to detect when to insert special tiles
    var searchArray = function(currentTile){
        for (var i = 0; i < tripleWord.length; i++){
            if (currentTile === tripleWord[i])
                return "tripleWord";
        }
        for (var i = 0; i < doubleWord.length; i++){
            if (currentTile === doubleWord[i])
                return "doubleWord";
        }
        for (var i = 0; i < tripleLetter.length;i++){
            if(currentTile === tripleLetter[i])
                return "tripleLetter";
        }
        for (var i = 0; i < doubleLetter.length;i++){
            if(currentTile === doubleLetter[i])
                return "doubleLetter";
        }
        return "normal";
    };
    //Board Creation function
    var createBoard = function(){
    var strheader = "<table style='border-collapse: separate; border-spacing: 0px;' border='0'>\n";
    var strbody = "";
    var strfooter = "</table>";
    
    for (var i = 1; i <= 15; i++){
        strbody += "<tr>";
        for (var j = 1; j <=15; j++){
            //insert star middle tile
            if(cellCount === 113){
                strbody += "<td class='star' id='" + cellCount + "'>" + "<img src='graphics/star.jpg' border='0' height ='50' width = '50'</img></td>";
            }
            else{
            //inserts special tiles onto board
            switch(searchArray(cellCount)){
                case "tripleWord":
                    strbody += "<td class='tripleWord' id='" + cellCount + "' height ='50' width = '50'>" + "<img src='graphics/triple_word.jpg' border='0' height ='50' width = '50'</img></td>";
                    break;
                case "doubleWord":
                    strbody += "<td class='doubleWord' id='" + cellCount + "' height ='50' width = '50'>" + "<img src='graphics/double_word.jpg' border='0' height ='50' width = '50'</img></td>";
                    break;
                case "tripleLetter":
                    strbody += "<td class='tripleLetter' id='" + cellCount + "' height ='50' width = '50'>" + "<img src='graphics/triple_letter.jpg' border='0' height ='50' width = '50'</img></td>";
                    break;
                case "doubleLetter":
                    strbody += "<td class='doubleLetter' id='" + cellCount + "' height ='50' width = '50'>" + "<img src='graphics/double_letter.jpg' border='0' height ='50' width = '50'</img></td>";
                    break;
                case "normal":
                    strbody += "<td class='normal' id='" + cellCount + "' height ='50' width = '50'>" + "<img src='graphics/Scrabble_Tile__.jpg' border='0' height ='50' width = '50'</img></td>";
            }
            }
            cellCount++;
        }
        strbody += "</tr>\n";
    }
    $("#boardContainer").html(strheader + strbody + strfooter);
    };
    //Deal tile to players
    var dealTile = function(){
        //check to see if any of player's hand is empty and fill accordingly
        for(i = 0; i < 7; i++){
            var selected = randomTile();
            if(playerHand[i] === false){
                $("#playerTile" + (i +1)).append("<div class='draggable' id ='tile" + tileCount + "'><img src='graphics/Scrabble_Tile_" + selected + ".jpg' alt='test' height ='45' width = '45'></div>");
                tiles[tileCount] = {"letter":selected, "special": "", "previous":"rack"};
                tileCount++;
                playerHand[i] = true;
            }
        }
    };
    //event listner for clicking recieve tiles button
    $("button[name='dealTile']").click(function() {
        dealTile();
    });
    //Calculate score from individual tiles
    var calcTile = function(id){
        switch(tiles[id].special){
            case "tripleLetter":
                return (3*bag[tiles[id].letter].value);
                break;
            case "doubleLetter":
                return (2*bag[tiles[id].letter].value);
                break;
            default:
                console.log(id);
                return (bag[tiles[id].letter].value);
                break;
        }
    };
    //Calculates scores from word
    var calcScore = function(){
        var placeHolder = [];
        var multiplier = 1;
        var score = 0;
        //gather tiles from word and put in placeholder
        for(var index in tiles){
            if(tiles[index].previous !== "rack"){
                placeHolder.push(index);
                //check for double/triple word multipliers
                if(tiles[index].special === "doubleWord"){
                    multiplier = 2;
                }
                if(tiles[index].special === "tripleWord"){
                    multiplier = 3;
                }
                if(tiles[index].special === "star"){
                    multiplier = 2;
                }
            }
         }
         //calculate score from individual tiles and add them up
         for(i = 0; i < placeHolder.length;i++){
             score += calcTile(placeHolder[i]);
             console.log("score before mult is " + score);
         }
         console.log(multiplier * score);
         return (multiplier * score);
    };
    //initialize board
    createBoard();
    //initialize starting hand
    dealTile();
    //make rack droppable
    for(i = 1;i <=7;i++){
        $("#playerTile" + i).droppable({accept: ".draggable",
                              drop: function(event, ui) {
            $(this).append(ui.draggable);    

            var width = $(this).width();
            var height = $(this).height();
            var cntrLeft = (width / 2 - ui.draggable.width() / 2) + 3;
            var cntrTop = (height / 2 - ui.draggable.height() / 2) - 23;

            ui.draggable.css({
                left: cntrLeft + "px",
                top: cntrTop + "px"
            });
            $(this).droppable('option', 'accept', ui.draggable);
            var id = ui.draggable.attr("id").substr(4,1);
            tiles[id].previous = "rack";
            if(tiles[id].previous !== "rack"){
                currentlyPlaced--;
            }
            $("#score").html("Score: " + calcScore());
        }});
};
    $(".draggable").draggable({revert: function(obj){
            //revert tile
            if(obj === false){
                //determine error message to be given
                if(currentlyPlaced === 0){
                    $("#errormsg").html("The first tile must be placed in the center star");
                }
                else{
                    $("#errormsg").html("Not a valid spot, you must place tiles along either a row or a column");
                    console.log("Currently Placed:" +currentlyPlaced);
                }
                console.log("FALSE CALLED");
                return true;
            }
            //tile success
            else{
                //only determine validity if tile moves from rack to board
                if(tiles[$(this).attr("id").substr(4,1)].previous !== "rack"){
                    determineValid();
                }
                //remove error msg on success
                $("#errormsg").html("");
                return false;
            }
    }});
    //ivalidate the validation array to prepare for new cases
    var wipeValid = function(){
        for(i = 1; i < validate.length;i++){
                $("#" + validate[i]).droppable('destroy');
        }
        validate = [];
    };
    //makes argument valid droppable
    var makeValid = function(arg){
        $(arg).droppable({accept: ".draggable",
                drop: function(event, ui) {
                    
                    $(this).append(ui.draggable);
                     //snap draggable to center
                    var width = $(this).width();
                    var height = $(this).height();
                    var cntrLeft = (width / 2 - ui.draggable.width() / 2) + 3;
                    var cntrTop = (height / 2 - ui.draggable.height() / 2) - 23;

                    ui.draggable.css({
                    left: cntrLeft + "px",
                    top: cntrTop + "px"
                    });
                    //prevents other tiles from being placed on a slot once occupied
                    $(this).droppable('option', 'accept', ui.draggable);
            
                    //Score Calculations
                    var id = ui.draggable.attr("id").substr(4,1);
                    console.log(tiles[id].previous);
                    if(tiles[id].previous === "rack"){
                        currentlyPlaced++;
                        console.log("Currently Placed:" + currentlyPlaced);
                    }
                    //force revert if moving tile from board space to another board space

                    //grab class string while ignoring "ui-draggable" that was added onto the class name, and store in global array
                    tiles[id].special = $(this).attr("class").substring(0, $(this).attr("class").indexOf(' '));
                    tiles[id].previous = $(this).attr("id").toString();
                    console.log("Previous:" + tiles[id].previous + " Current Space:" + $(this).attr("id").toString());
                    for(i = 1;i < tiles.length;i++){
                    }
                    $("#score").html("Score: " + calcScore());
                    //prevents players from playing tiles in invalid slots such as playing a tile vertical of the middle slot when the second tile was placed horizontally
                    wipeValid();
                },
                out: function(event, ui){
                    prevTile = $(this).attr("id");
                }
            }
            );
    };
    //determine which areas are droppable
    var determineValid = function(){
    switch(currentlyPlaced){
        //first tile must go on star tile
        case 0: 
            validate[0] = 113;
            makeValid("#"+ validate[0]);
        break;
        //middle tile has been placed
        case 1:
            //four possible spots when only middle tile is placed
            //vertical slots
            validate[1] = 98;
            validate[2] = 128;
            //horizontal slots
            validate[3] = 112;
            validate[4] = 114;
            for(i = 1; i < 5;i++){
                makeValid("#"+validate[i]);
            }
        break;
        //determine valid spots after two tiles are placed
        default:
            var placeHolder = [];
            console.log(tiles);
            //check to see if user is laying tiles horizontally or vertically
            for(var index in tiles) {
                if(tiles[index].previous !== "rack"){
                    placeHolder.push(Number(tiles[index].previous));
                }
            }
            if(Math.abs(placeHolder[1] - placeHolder[0]) === 1){
                style = "horizontal";
            }
            else{
                style = "vertical";
            }
            //if user is laying horizontally, determine valid spots
            if(style === "horizontal"){
                var highest = 0;
                var lowest =999;
                for(var index in tiles) {
                    if(tiles[index].previous !== "rack"){
                        if((Number(tiles[index].previous) - 1) < lowest){
                            lowest = (Number(tiles[index].previous) -1);
                        }
                        if((Number(tiles[index].previous) + 1) > highest){
                            highest = (Number(tiles[index].previous) +1);
                        }  
                }
                }
                makeValid("#" + highest);
                validate.push(highest);
                makeValid("#" + lowest);
                validate.push(lowest);
            }
            //if user is laying vertically, determine valid spots
            else{
                for(var index in tiles) {
                    var highest = 0;
                    var lowest =999;
                    for(var index in tiles) {
                    if(tiles[index].previous !== "rack"){
                        if((Number(tiles[index].previous) - 15) < lowest){
                            lowest = (Number(tiles[index].previous) -15);
                        }
                        if((Number(tiles[index].previous) + 15) > highest){
                            highest = (Number(tiles[index].previous) +15);
                        }  
                }
                }
                }
                makeValid("#" + highest);
                validate.push(highest);
                makeValid("#" + lowest);
                validate.push(lowest);
            }
            console.log(validate);
        break;  
    }
};
    determineValid();
});