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
    }

    function initialise() {
        addMenuListeners();
    }

    initialise();
});
