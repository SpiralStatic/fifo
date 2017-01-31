$(document).foundation();

class FIFO {
    constructor() {
        /* Variables */
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.stackType = 'Single';

        this.playerOne = new PlayerOne();
        this.playerTwo = new PlayerTwo();

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
            }
        });

        /* When play is pressed, gets the menu option values, then switches to game */
        $('#game').hide();
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

    /* Starts the game by taking the required settings */
    startGame(noOfStacks, similarity, powered) {
        console.log("startGame(" + noOfStacks + ", " + similarity + ", " + powered + ")");
        this.playerOne.stacks = this.playerOne.stacksSetUp(noOfStacks);
        if (similarity === 'EQUAL') {
            this.playerTwo.stacks = this.copyArray(this.playerOne.stacks);
        } else {
            this.playerTwo.stacks = this.playerTwo.stacksSetUp(noOfStacks);
        }
        this.playerOne.stackElement = this.playerOne.displayStacks();
        this.playerTwo.stackElement = this.playerTwo.displayStacks();
    }

    /* Copies over an array by parsing its objects to a new array */
    copyArray(original) {
        return JSON.parse(JSON.stringify(original));
    }
}

class Player {
    constructor() {
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.stacks = [];
        this.points = 0;
    }

    /* Sets up the game stacks */
    stacksSetUp(noOfStacks) {
        console.log("stacksSetUp(" + noOfStacks + ")");
        let stackTypes = ['SINGLE', 'DOUBLE'];
        this.stackType = noOfStacks;
        let stacks = [];
        for (let i = 0; i < stackTypes.indexOf(noOfStacks) + 1; i++) {
            stacks.push(this.createStack());
        }
        return stacks;
    }

    /* Creates a stack full of cube objects and returns it*/
    createStack() {
        /* cube = {
            color: 'color',
            powerup: 'power-up'
        } */
        console.log("createStack()");
        let stack = [];
        const colorMax = 3;
        for (let i = 0; i < 200; i++) {
            let newColor = this.colors[this.getRandom(0, colorMax)];
            stack.push({
                color: newColor,
                powerup: 'none'
            });
        }
        //console.log(stack);
        return stack;
    }

    /* Outputs and displays the cubes on the users screen up-to the choosen value */
    displayStacks() {
        console.log("displayStacks(" + this.playerNo + ", " + this.stacks + ")");
        const maxCubes = 7;
        for (let i = 0; i < this.stacks.length; i++) {
            $('#player-' + this.playerNo).append('<ul id="' + this.playerNo + i + '">');
            for (let j = 0; j < maxCubes; j++) {
                $('ul#' + this.playerNo + i).prepend('<li class="cube ' + this.stacks[i][j].color + ' ' + this.stacks[i][j].powerup + '"></li>');
            }
            $('#player-' + this.playerNo).append('</ul>');
        }
    }

    /* Returns a random value between the min-max parameters */
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /* Checks if cube is same, and if so triggers removal and display update */
    canRemoveCube(color) {
        if (this.stackType === 'DOUBLE' && this.stacks[0][0].color === color && this.stacks[1][0].color === color) {
            this.removeCube(this.stacks[0]);
            this.removeCube(this.stacks[1]);
            this.updateDisplay(this.stacks[0]);
            this.updateDisplay(this.stacks[1]);
            this.addPoints();
            this.addPoints();
        } else if (this.stacks[0][0].color === color) {
            this.removeCube(this.stacks[0]);
            this.updateDisplay(this.stacks[0]);
            this.addPoints();
        } else if (this.stackType === 'DOUBLE' && this.stacks[1][0].color === color) {
            this.removeCube(this.stacks[1]);
            this.updateDisplay(this.stacks[1]);
            this.addPoints();
        }
    }

    // Removes a single cube from the front of an array */
    removeCube(stack) {
        //console.log(playerStack);
        stack.shift();
    }

    /* Updates the game display when cube is removed */
    updateDisplay(stack) {
        var getCorrectHTMLStack;

        if (stack === this.stacks[0]) {
            getCorrectHTMLStack = 'ul#' + this.playerNo + '0';
            $(getCorrectHTMLStack + ' > .cube:last').remove();
            $(getCorrectHTMLStack).prepend('<li class="cube ' + this.stacks[0][6].color + ' ' + this.stacks[0][6].powerup + '"></li>');
        } else if (stack === this.stacks[1]) {
            getCorrectHTMLStack = 'ul#' + this.playerNo + '1';
            $(getCorrectHTMLStack + ' > .cube:last').remove();
            $(getCorrectHTMLStack).prepend('<li class="cube ' + this.stacks[1][6].color + ' ' + this.stacks[1][6].powerup + '"></li>');
        }
        //console.log(getCorrectHTMLStack);
    }

    /* Increments the players point value */
    addPoints() {
        this.points++;
    }
}

class PlayerOne extends Player {
    constructor() {
        super();
        this.playerNo = 1;
    }

    /* Upon key press triggers function to check key to cube */
    keyCheck(keyPress) {
        // Q - 113; W - 119 ; A - 97; S - 115;
        switch (keyPress) {
            case 113:
                this.canRemoveCube(this.colors[0]); // Red
                break;
            case 97:
                this.canRemoveCube(this.colors[1]); // Blue
                break;
            case 119:
                this.canRemoveCube(this.colors[2]); // Green
                break;
            case 115:
                this.canRemoveCube(this.colors[3]); // Yellow
                break;
            default:
                break;
        }
    }
}

class PlayerTwo extends Player {
    constructor() {
        super();
        this.playerNo = 2;
    }

    /* Upon key press triggers function to check key to cube */
    keyCheck(keyPress) {
        // I - 105; O - 111; K - 107; L - 108;
        switch (keyPress) {
            case 105:
                this.canRemoveCube(this.colors[0]); // Red
                break;
            case 107:
                this.canRemoveCube(this.colors[1]); // Blue
                break;
            case 111:
                this.canRemoveCube(this.colors[2]); // Green
                break;
            case 108:
                this.canRemoveCube(this.colors[3]); // Yellow
                break;
            default:
                break;
        }
    }
}

$(() => {
    const fifo = new FIFO();
});

// Change all vars to lets or consts
// Change all anonymous functions to arrow syntax

// OOP
