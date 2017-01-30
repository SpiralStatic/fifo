$(function() {
    $(document).foundation();

    /* Variables */
    var playerOneStacks = [];
    var playerTwoStacks = [];

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
        var colors = ['red', 'blue', 'green', 'yellow'];
        var colorMax = 3;
        for (var i = 0; i < 10; i++) {
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

    /* Outputs and displays the cubes on the users screenm up-to the choosen value*/
    function displayStacks(playerNo, playerStacks) {
        var maxCubes = 7;
        for (var i = 0; i < playerStacks.length; i++) {
            for (var j = 0; j < maxCubes; j++) {
                $('#player-' + playerNo).prepend('<p class="cube ' + playerStacks[i][j].color + ' ' + playerStacks[i][j].powerup + '">CUBE</p>');
            }
        }
    }

    function keyCheck(keyPress) {
        // Q - 113; A - 97; S - 115; W - 119;
        switch (keyPress) {
            case 113:

                break;
            case 97:
                if (playerOneStacks[0][0].color === 'blue' || playerOneStacks[1][0].color === 'blue') {
                    console.log('BLUE');
                    removeCube(this);
                }
                break;
            case 115:
                if (playerOneStacks[0][0].color === 'green' || playerOneStacks[1][0].color === 'green') {
                    console.log('GREEN');
                    removeCube(this);
                }
                break;
            case 119:
                if (playerOneStacks[0][0].color === 'yellow' || playerOneStacks[1][0].color === 'yellow') {
                    console.log('YELLOW');
                    removeCube(this);
                }
                break;

                // I - 105; K - 107; L - 108; O - 111;
            case 105:
                if (playerTwoStacks[0][0].color === 'red' || playerTwoStacks[1][0].color === 'red') {
                    console.log('RED');
                    removeCube(this);
                }
                break;
            case 107:
                if (playerTwoStacks[0][0].color === 'blue' || playerTwoStacks[1][0].color === 'blue') {
                    console.log('BLUE');
                    removeCube(this);
                }
                break;
            case 108:
                if (playerTwoStacks[0][0].color === 'green' || playerTwoStacks[1][0].color === 'green') {
                    console.log('GREEN');
                    removeCube(this);
                }
                break;
            case 111:
                if (playerTwoStacks[0][0].color === 'yellow' || playerTwoStacks[1][0].color === 'yellow') {
                    console.log('YELLOW');
                    removeCube(this);
                }
                break;
            default:
                break;
        }
    }

    function canRemoveCube() {
        if (playerOneStacks[0][0].color === 'red' && playerOneStacks[1][0].color === 'red') {
            console.log('RED');
            removeCube(playerOneStacks[0][0]);
            removeCube(playerOneStacks[1][0]);
        } else if (playerOneStacks[0][0].color === 'red') {
            removeCube(playerOneStacks[0][0]);
        } else if (playerOneStacks[1][0].color === 'red') {
            removeCube(playerOneStacks[1][0]);
        }
    }

    function removeCube(cubePosition) {
        console.log(cubePosition);
    }

    /* Initialises web page */
    function initialise() {
        addMenuListeners();
    }

    initialise();
});
