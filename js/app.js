$(function() {
    $(document).foundation();

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
            $('#menu').slideToggle("slow");
            $('#game').slideToggle("slow");
        });
    }

    /* Starts the game by taking the required settings */
    function startGame(noOfStacks, similarity, powered) {
        console.log("startGame(" + noOfStacks + ", " + similarity + ", " + powered + ")");
        var playerOneStacks = stacksSetUp(noOfStacks);
        var playerTwoStacks;
        if (similarity === 'EQUAL') {
            playerTwoStacks = playerOneStacks;
        } else {
            playerTwoStacks = stacksSetUp(noOfStacks);
        }

        console.log("Player One: " + playerOneStacks);
        console.log("Player Two: " + playerTwoStacks);
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

    /* Creates a stack */
    function createStack() {
        /* cube = {
            color: 'color',
            powerup: 'power-up'
        } */
        console.log("createStack()");
        var stack = [];
        var colors = ['Red', 'Blue', 'Green', 'Yellow'];
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

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* Initialises web page */
    function initialise() {
        addMenuListeners();
    }

    initialise();
});
