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

        $('#play').on('click', function() {
            var settings = $('#menu').find('.active');
            startGame($(settings[0]).html(), $(settings[1]).html(), $(settings[2]).html());
        });
    }

    function startGame(noOfStacks, similarity, powered) {
        console.log(noOfStacks);
        console.log(similarity);
        console.log(powered);
        $('#menu').slideUp();
        $('#game').slideUp();
    }

    function stacksSetUp(noOfStacks) {

    }

    function initialise() {
        addMenuListeners();
    }

    initialise();
});
