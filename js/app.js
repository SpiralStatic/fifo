$(function() {
    $(document).foundation();

    /* Variables */
    var colors = ['red', 'blue', 'green', 'yellow'];
    var playerOneStacks = [];
    var playerTwoStacks = [];
    var noOfStacks;

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
        noOfStacks = noOfStacks;
        playerOneStacks = stacksSetUp(noOfStacks);
        if (similarity === 'EQUAL') {
            playerTwoStacks = playerOneStacks;
        } else {
            playerTwoStacks = stacksSetUp(noOfStacks);
        }
        displayStacks('one', playerOneStacks);
        displayStacks('two', playerTwoStacks);
    }

    /* Sets up the game stacks */
    function stacksSetUp(noOfStacks) {
        console.log("stacksSetUp()");
        var stackTypes = ['SINGLE', 'DOUBLE'];
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
        for (var i = 0; i < 200; i++) {
            var newColor = colors[getRandom(0, colorMax)];
            stack.push({
                color: newColor,
                powerup: 'none'
            });
        }
        console.log(stack);
        return stack;
    }

    /* Returns a random value between the min-max parameters */
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* Outputs and displays the cubes on the users screen up-to the choosen value */
    function displayStacks(playerNo, playerStacks) {
        var maxCubes = 7;
        for (var i = 0; i < playerStacks.length; i++) {
            $('#player-' + playerNo).append('<ul id="' + playerNo + i + '">');
            for (var j = 0; j < maxCubes; j++) {
                $('ul#' + playerNo + i).prepend('<li class="cube ' + playerStacks[i][j].color + ' ' + playerStacks[i][j].powerup + '">CUBE</li>');
            }
            $('#player-' + playerNo).append('</ul>');
        }
    }

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

    function canRemoveCube(player, color) {
        if (noOfStacks === 'DOUBLE' && player[0][0].color === color && player[1][0].color === color) {
            removeCube(player[0]);
            removeCube(player[1]);
            updateDisplay(player[0]);
        } else if (player[0][0].color === color) {
            removeCube(player[0]);
            updateDisplay(player[0]);
        } else if (noOfStacks === 'DOUBLE' && player[1][0].color === color) {
            removeCube(player[1]);
            updateDisplay(player[1]);
        }
    }

    function removeCube(playerStack) {
        console.log(playerStack);
        playerStack.shift();
    }
    
    function updateDisplay(playerStack) {
        $('ul#one0 > .cube:last').remove();

        $('ul#one0').prepend('<li class="cube ' + playerStack[6].color + ' ' + playerStack[6].powerup + '">CUBE</li>');
    }

    /* Initialises web page */
    function initialise() {
        addMenuListeners();
    }

    initialise();
});
