class FIFO {
    constructor() {
        /* Variables */
        this.players = [];
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.stackType = 'SINGLE';
        this.timer = 30; // Game Length (Seconds)
        this.splashAnimation();
        this.addMenuListeners();
        this.addGameListeners();
        this.addGameOverListeners();
        this.settings = [];
        this.soundtrack = $('#soundtrack')[0]; // http://freemusicarchive.org/music/RoccoW/_1035/RoccoW_-__-_07_Fuck_Sidechain_Compression_on_Gameboy
        this.soundtrack.volume = 0.7;
        this.soundWin = new Audio("etc/Winning-sound-effect.mp3");
        this.soundWin.volume = 0.7;
        this.isPlaying = true;
    }

    splashAnimation() {
        setTimeout(() => {
            $('#splash').animate({
                opacity: 0.25,
                left: "+=50",
                height: "toggle"
            }, 4000);
        }, 2000);
        $('#splash > h3').hide();
        $('#splash > h3').fadeIn(1000);
    }

    /* Adds the game menu listeners to the options */
    addMenuListeners() {
        //console.log("addMenuListeners()");
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
        $(document).on('keypress', (event) => {
            $(this.players).each((i, player) => player.keyCheck(event.which));
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
        //console.log("startGame(" + this.settings[0] + ", " + this.settings[1] + ", " + this.settings[2] + ")");
        this.players[0].stacks = this.players[0].stacksSetUp(this.settings[0]);

        this.players[1].stacks = (this.settings[1] === 'EQUAL') ? this.copyArray(this.players[0].stacks) : this.players[1].stacksSetUp(this.settings[0]);

        $([this.players[0], this.players[1]]).each((i, stack) => {
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
        this.soundWin.play();
        if (this.players[0].points === this.players[1].points) {
            $('#gameover').find('h3').html("ITS A DRAW");
        } else if (this.players[0].points > this.players[1].points) {
            $('#gameover').find('h3').html("P1 WINS!");
        } else if (this.players[0].points < this.players[1].points) {
            $('#gameover').find('h3').html("P2 WINS!");
        }
        $('#gameover').find('p:first').html("P1 SCORE: " + this.players[0].points);
        $('#gameover').find('p:last').html("P2 SCORE: " + this.players[1].points);

        $('#game').slideToggle('slow');
        $('#gameover').slideToggle('slow');
    }

    resetGame() {
        this.timer = 30;
        $([this.players[0], this.players[1]]).each((i, player) => {
            player.resetPlayer();
        });
    }

    pauseAudio() {
        if (this.isPlaying) {
            this.soundtrack.pause();
            this.isPlaying = false;
        } else {
            this.soundtrack.play();
            this.isPlaying = true;
        }
    }

    muteAudio() {
        this.soundtrack.volume ? this.soundtrack.volume = 0 : this.soundtrack.volume = 0.7;
        this.soundWin.volume ? this.soundWin.volume = 0 : this.soundWin.volume = 0.7;
        $(this.players).each((i, player) => {
            player.soundPop.volume ? player.soundPop.volume = 0 : player.soundPop.volume = 0.7;
            player.soundIce.volume ? player.soundIce.volume = 0 : player.soundIce.volume = 0.7;
            player.soundPower.volume ? player.soundPower.volume = 0 : player.soundPower.volume = 0.7;
        });

    }

    freezePlayer(playerWhoActivated) {
        $(this.players).each((i, player) => {
            //console.log(i, playerWhoActivated);
            if (i != playerWhoActivated) {
                player.soundIce.play();
                player.isFrozen = true;
                $('#player-' + player.playerNo).toggleClass('frozen');
                setTimeout(() => {
                    player.isFrozen = false;
                    $('#player-' + player.playerNo).toggleClass('frozen');
                }, 3000);
            }
        });
    }
}
