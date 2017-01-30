$(function() {
    $(document).foundation();

    function addMenuListeners() {
        console.log("addMenuListeners()");
        /* Toggles selected menu option value */
        $('.button-group').children().on('click', function() {
            if(!$(this).hasClass('active')) {
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
        stacksSetUp(noOfStacks);
    }

    /* Sets up the game stacks */
    function stacksSetUp(noOfStacks) {
        var stackTypes = ['SINGLE', 'DOUBLE'];
        var stacks = [];
        for (var i = 0; i < stackTypes.indexOf(noOfStacks) + 1; i++) {
            stacks.push(createStack());
        }
        console.log(stacks);
    }

    /* Creates a stack */
    function createStack() {
        console.log("Stack Created");
        return ['A', 'B'];
    }

    /* Initialises web page */
    function initialise() {
        addMenuListeners();
    }

    initialise();
});
