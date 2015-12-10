$( document ).ready(function() {
    //arrays containing special tile numbers
    var tripleWord = [1,8,15,106,120,211,218,225];
    var doubleWord = [17,29,33,43,49,57,65,71,155,161,169,177,183,193,197,209];
    var tripleLetter = [21,25,77,81,85,89,137,141,145,149,201,205];
    var doubleLetter = [4,12,37,39,46,53,60,93,97,99,103,109,117,123,127,129,133,166,173,180,187,189,214,222];
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
    var cellCount = 1;
    
    for (var i = 1; i <= 15; i++){
        strbody += "<tr>";
        for (var j = 1; j <=15; j++){
            //insert star middle tile
            if(cellCount === 113){
                strbody += "<td class='star' id='" + cellCount + "'>" + "<img src='graphics/star.jpg' border='0' height ='60' width = '60'</img></td>";
            }
            else{
            //inserts special tiles onto board
            switch(searchArray(cellCount)){
                case "tripleWord":
                    strbody += "<td class='tripleWord' id='" + cellCount + "'>" + "<img src='graphics/triple_word.jpg' border='0' height ='60' width = '60'</img></td>";
                    break;
                case "doubleWord":
                    strbody += "<td class='doubleWord' id='" + cellCount + "'>" + "<img src='graphics/double_word.jpg' border='0' height ='60' width = '60'</img></td>";
                    break;
                case "tripleLetter":
                    strbody += "<td class='tripleLetter' id='" + cellCount + "'>" + "<img src='graphics/triple_letter.jpg' border='0' height ='60' width = '60'</img></td>";
                    break;
                case "doubleLetter":
                    strbody += "<td class='doubleLetter' id='" + cellCount + "'>" + "<img src='graphics/double_letter.jpg' border='0' height ='60' width = '60'</img></td>";
                    break;
                case "normal":
                    strbody += "<td class='normal' id='" + cellCount + "'>" + "<img src='graphics/Scrabble_Tile_Blank.jpg' border='0' height ='60' width = '60'</img></td>";
            }
            }   
            cellCount++;
        }
        strbody += "</tr>\n";
    }
    $("#boardContainer").html(strheader + strbody + strfooter);
    };
    createBoard();
});