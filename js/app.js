$(function() {
    $(document).foundation();

    function addMenuListeners() {
        console.log("addMenuListeners()");
        $('.button-group').children().on('click', function() {
            if(!$(this).hasClass('active')) {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            }
        });

        $('#game').hide();
        $('#play').on('click', function() {
            var settings = $('#menu').find('.active');
            startGame($(settings[0]).html(), $(settings[1]).html(), $(settings[2]).html());
            $('#menu').slideToggle("slow");
            $('#game').slideToggle("slow");
        });
    }

    function startGame(noOfStacks, similarity, powered) {
        stacksSetUp(noOfStacks);
    }

    function stacksSetUp(noOfStacks) {
        var stackTypes = ['SINGLE', 'DOUBLE'];
        var stacks = [];
        console.log(stackTypes.indexOf(noOfStacks));
        for (var i = 0; i < stackTypes.indexOf(noOfStacks).length + 1; i++) {
            stacks.push(createStack());
        }
        console.log(stacks);
    }

    function createStack() {
        console.log("Stack Created");
        return ['A'];
    }

    function initialise() {
        addMenuListeners();
    }

    initialise();
});
