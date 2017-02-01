class FIFO {
    constructor() {
        /* Variables */
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.stackType = 'SINGLE';
        this.timer = 10; // Game Length (Seconds)
        this.addMenuListeners();
        this.addGameListeners();
        this.addGameOverListeners();
        this.settings = [];
        this.soundtrack = $('#soundtrack')[0];
        this.isPlaying = true;
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
            let settingsHTML = $('#menu').find('.active');
            $(settingsHTML).each((i, setting) => {
                console.log(setting);
                this.settings.push($(setting).html());
            });
            this.startGame();
            $('#menu').slideToggle('slow');
            $('#game').slideToggle('slow');
        });

        $('#pause').on('click', () => this.pauseAudio());
        $('#mute').on('click', () => this.muteAudio());
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
            $('#game').slideToggle('slow');
            $('#gameover').slideToggle('slow');
            this.resetGame();
            this.startGame();
        });
        $('#newgame').on('click', () => {
            $('#menu').slideToggle('slow');
            $('#gameover').slideToggle('slow');
            this.settings.length = 0;
            this.resetGame();
        });
    }

    /* Starts the game by taking the required settings */
    startGame() {
        console.log("startGame(" + this.settings[0] + ", " + this.settings[1] + ", " + this.settings[2] + ")");
        this.playerOne.stacks = this.playerOne.stacksSetUp(this.settings[0]);

        this.playerTwo.stacks = (this.settings[1] === 'EQUAL') ? this.copyArray(this.playerOne.stacks) : this.playerTwo.stacksSetUp(this.settings[0]);

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
            if (this.timer === 0) {
                clearInterval(interval);
                this.gameOver();
            }
        }, 1000);
    }

    gameOver() {
        if (this.playerOne.points === this.playerTwo.points) {
            $('#gameover').find('h3').html("ITS A DRAW");
        } else if (this.playerOne.points > this.playerTwo.points) {
            $('#gameover').find('h3').html("P1 WINS!");
        } else if (this.playerOne.points < this.playerTwo.points) {
            $('#gameover').find('h3').html("P2 WINS!");
        }
        $('#gameover').find('p:first').html("P1 SCORE: " + this.playerOne.points);
        $('#gameover').find('p:last').html("P2 SCORE: " + this.playerTwo.points);

        $('#game').slideToggle('slow');
        $('#gameover').slideToggle('slow');
    }

    resetGame() {
        this.timer = 10;
        $([this.playerOne, this.playerTwo]).each((i, player) => {
            player.resetPlayer();
        });
    }

    pauseAudio() {
        this.isPlaying ? [this.soundtrack.pause(), this.isPlaying = false] : [this.soundtrack.play(), this.isPlaying = true];
    }

    muteAudio() {
        this.soundtrack.volume ? this.soundtrack.volume = 0 : this.soundtrack.volume = 1;
    }
}
