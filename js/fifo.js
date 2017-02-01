class FIFO {
    constructor() {
        /* Variables */
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.stackType = 'SINGLE';
        this.timer = 10; // Game Length (Seconds)
        this.addMenuListeners();
    }

    /* Adds the game menu listeners to the options */
    addMenuListeners() {
        console.log("addMenuListeners()");
        /* Toggles selected menu option value */
        $('.button-group').children().on('click', (event) => {
            console.log(event.target);
            if (!$(event.target).hasClass('active')) {
                $(event.target).siblings().removeClass('active');
                $(event.target).addClass('active');
                //toggleClass
            }
        });

        /* When play is pressed, gets the menu option values, then switches to game */
        $('#game').hide();
        $('#gameover').hide();
        $('#play').on('click', () => {
            let settings = $('#menu').find('.active');
            this.startGame($(settings[0]).html(), $(settings[1]).html(), $(settings[2]).html());
            $('#menu').slideToggle('slow');
            $('#game').slideToggle('slow');
            this.addGameListeners();
        });
    }

    /* Adds the listeners for the game keys that are to be used */
    addGameListeners() {
        // Q - 113; A - 97; S - 115; W - 119;
        // I - 105; K - 107; L - 108; O - 111;
        $(document).bind('keypress', (event) => {
            this.playerOne.keyCheck(event.keyCode);
            this.playerTwo.keyCheck(event.keyCode);
        });
    }

    addGameOverListeners() {
        $('#restart').on('click', () => {
            
        });
        $('#newgame').on('click', () => {

        });
    }

    /* Starts the game by taking the required settings */
    startGame(noOfStacks, similarity, powered) {
        console.log("startGame(" + noOfStacks + ", " + similarity + ", " + powered + ")");
        this.playerOne.stacks = this.playerOne.stacksSetUp(noOfStacks);

        this.playerTwo.stacks = (similarity === 'EQUAL') ? this.copyArray(this.playerOne.stacks) : this.playerTwo.stacksSetUp(noOfStacks);

        $([this.playerOne, this.playerTwo]).each((i, stack) => {
            stack.stackElement = stack.displayStacks();
        });

        this.startTimer();
    }

    /* Copies over an array by parsing its objects to a new array */
    copyArray(original) {
        return JSON.parse(JSON.stringify(original));
    }

    startTimer() {
        let interval = setInterval(() => {
            this.timer--;
            $('#timer').html(this.timer);
            if(this.timer === 0) {
                clearInterval(interval);
                this.gameOver();
            }
        }, 1000);
    }

    gameOver() {
        if(this.playerOne.points === this.playerTwo.points) {
            $('#gameover').find('h3').html("ITS A DRAW");
        }else if(this.playerOne.points > this.playerTwo.points) {
            $('#gameover').find('h3').html("P1 WINS!");
        }else if(this.playerOne.points < this.playerTwo.points) {
            $('#gameover').find('h3').html("P2 WINS!");
        }
        $('#gameover').find('p:first').html("P1 SCORE: " + this.playerOne.points);
        $('#gameover').find('p:last').html("P2 SCORE: " + this.playerTwo.points);

        $('#game').slideToggle('slow');
        $('#gameover').slideToggle('slow');

        addGameOverListeners();
    }
}
