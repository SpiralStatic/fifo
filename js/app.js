$(function() {
    $(document).foundation();

    /* Variables */
    var colors = ['red', 'blue', 'green', 'yellow'];
    var playerOneStacks = [];
    var playerTwoStacks = [];
    var stackType;
    var playerOnePoints = 0;
    var playerTwoPoints = 0;

    /* Adds the game menu listeners to the options */
    function addMenuListeners() {
        console.log("addMenuListeners()");
        /* Toggles selected menu option value */
        $('.button-group').children().on('click', function() {
            if (!$(this).hasClass('active')) {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            }
        });

        /* When play is pressed, gets the menu option values, then switches to game */
        $('#game').hide();
        $('#play').on('click', function() {
            var settings = $('#menu').find('.active');
            startGame($(settings[0]).html(), $(settings[1]).html(), $(settings[2]).html());
            $('#menu').slideToggle('slow');
            $('#game').slideToggle('slow');
            addGameListeners();
        });
    }

    /* Adds the listeners for the game keys that are to be used */
    function addGameListeners() {
        // Q - 113; A - 97; S - 115; W - 119;
        // I - 105; K - 107; L - 108; O - 111;
        $(document).bind('keypress', function(e) {
            keyCheck(e.keyCode);
        });
    }

    /* Starts the game by taking the required settings */
    function startGame(noOfStacks, similarity, powered) {
        console.log("startGame(" + noOfStacks + ", " + similarity + ", " + powered + ")");
        playerOneStacks = stacksSetUp(noOfStacks);
        if (similarity === 'EQUAL') {
            playerTwoStacks = copyArray(playerOneStacks);
        } else {
            playerTwoStacks = stacksSetUp(noOfStacks);
        }
        playerOneStacks.player = 'one';
        playerTwoStacks.player = 'two';
        displayStacks('one', playerOneStacks);
        displayStacks('two', playerTwoStacks);
    }

    /* Sets up the game stacks */
    function stacksSetUp(noOfStacks) {
        console.log("stacksSetUp(" + noOfStacks + ")");
        var stackTypes = ['SINGLE', 'DOUBLE'];
        stackType = noOfStacks;
        var stacks = [];
        for (var i = 0; i < stackTypes.indexOf(noOfStacks) + 1; i++) {
            stacks.push(createStack());
        }
        return stacks;
    }

    /* Creates a stack full of cube objects and returns it*/
    function createStack() {
        /* cube = {
            color: 'color',
            powerup: 'power-up'
        } */
        console.log("createStack()");
        var stack = [];
        var colorMax = 3;
        for (var i = 0; i < 20; i++) {
            var newColor = colors[getRandom(0, colorMax)];
            stack.push({
                color: newColor,
                powerup: 'none'
            });
        }
        //console.log(stack);
        return stack;
    }

    /* Returns a random value between the min-max parameters */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* Copies over an array by parsing its objects to a new array */
    function copyArray(original) {
        return JSON.parse(JSON.stringify(original));
    }

    /* Outputs and displays the cubes on the users screen up-to the choosen value */
    function displayStacks(playerNo, playerStacks) {
        console.log("displayStacks(" + playerNo + ", " + playerStacks + ")");
        var maxCubes = 7;
        for (var i = 0; i < playerStacks.length; i++) {
            $('#player-' + playerNo).append('<ul id="' + playerNo + i + '">');
            for (var j = 0; j < maxCubes; j++) {
                $('ul#' + playerNo + i).prepend('<li class="cube ' + playerStacks[i][j].color + ' ' + playerStacks[i][j].powerup + '">CUBE</li>');
            }
            $('#player-' + playerNo).append('</ul>');
        }
    }

    /* Upon key press triggers function to check key to cube */
    function keyCheck(keyPress) {
        // Q - 113; W - 119 ; A - 97; S - 115;
        switch (keyPress) {
            case 113:
                canRemoveCube(playerOneStacks, colors[0]); // Red
                break;
            case 97:
                canRemoveCube(playerOneStacks, colors[1]); // Blue
                break;
            case 119:
                canRemoveCube(playerOneStacks, colors[2]); // Green
                break;
            case 115:
                canRemoveCube(playerOneStacks, colors[3]); // Yellow
                break;
                // I - 105; O - 111; K - 107; L - 108;
            case 105:
                canRemoveCube(playerTwoStacks, colors[0]); // Red
                break;
            case 107:
                canRemoveCube(playerTwoStacks, colors[1]); // Blue
                break;
            case 111:
                canRemoveCube(playerTwoStacks, colors[2]); // Green
                break;
            case 108:
                canRemoveCube(playerTwoStacks, colors[3]); // Yellow
                break;
            default:
                break;
        }
    }

    /* Checks if cube is same, and if so triggers removal and display update */
    function canRemoveCube(playerStack, color) {
        if (stackType === 'DOUBLE' && playerStack[0][0].color === color && playerStack[1][0].color === color) {
            removeCube(playerStack[0]);
            removeCube(playerStack[1]);
            updateDisplay(playerStack[0]);
            updateDisplay(playerStack[1]);
            addPoints(playerStack.player);
            addPoints(playerStack.player);
        } else if (playerStack[0][0].color === color) {
            removeCube(playerStack[0]);
            updateDisplay(playerStack[0]);
            addPoints(playerStack.player);
        } else if (stackType === 'DOUBLE' && playerStack[1][0].color === color) {
            removeCube(playerStack[1]);
            updateDisplay(playerStack[1]);
            addPoints(playerStack.player);
        }
        console.log("one: " + playerOnePoints);
        console.log("two: " + playerTwoPoints);
    }

    // Removes a single cube from the front of an array */
    function removeCube(playerStack) {
        //console.log(playerStack);
        playerStack.shift();
    }

    /* Updates the game display when cube is removed */
    function updateDisplay(playerStack) {
        var getCorrectHTMLStack;

        if (playerStack === playerOneStacks[0]) {
            getCorrectHTMLStack = 'ul#one0';
        } else if (playerStack === playerOneStacks[1]) {
            getCorrectHTMLStack = 'ul#one1';
        } else if (playerStack === playerTwoStacks[0]) {
            getCorrectHTMLStack = 'ul#two0';
        } else if (playerStack === playerTwoStacks[1]) {
            getCorrectHTMLStack = 'ul#two1';
        }
        //console.log(getCorrectHTMLStack);
        $(getCorrectHTMLStack + ' > .cube:last').remove();
        $(getCorrectHTMLStack).prepend('<li class="cube ' + playerStack[6].color + ' ' + playerStack[6].powerup + '">CUBE</li>');
    }

    /* Increments the players point value */
    function addPoints(player) {
        if(player === 'one') {
            playerOnePoints++;
        }else if(player === 'two') {
            playerTwoPoints++;
        }
    }

    /* Initialises web page */
    function initialise() {
        addMenuListeners();
    }

    initialise();
});
