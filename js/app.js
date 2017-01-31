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
            this.keyCheck(event.keyCode);
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

    /* Upon key press triggers function to check key to cube */
    keyCheck(keyPress) {
        // Q - 113; W - 119 ; A - 97; S - 115;
        switch (keyPress) {
            case 113:
                this.canRemoveCube(this.playerOneStacks, this.colors[0]); // Red
                break;
            case 97:
                this.canRemoveCube(this.playerOneStacks, this.colors[1]); // Blue
                break;
            case 119:
                this.canRemoveCube(this.playerOneStacks, this.colors[2]); // Green
                break;
            case 115:
                this.canRemoveCube(this.playerOneStacks, this.colors[3]); // Yellow
                break;
                // I - 105; O - 111; K - 107; L - 108;
            case 105:
                this.canRemoveCube(this.playerTwoStacks, this.colors[0]); // Red
                break;
            case 107:
                this.canRemoveCube(this.playerTwoStacks, this.colors[1]); // Blue
                break;
            case 111:
                this.canRemoveCube(this.playerTwoStacks, this.colors[2]); // Green
                break;
            case 108:
                this.canRemoveCube(this.playerTwoStacks, this.colors[3]); // Yellow
                break;
            default:
                break;
        }
    }

    /* Checks if cube is same, and if so triggers removal and display update */
    canRemoveCube(playerStack, color) {
        if (this.stackType === 'DOUBLE' && playerStack[0][0].color === color && playerStack[1][0].color === color) {
            this.removeCube(playerStack[0]);
            this.removeCube(playerStack[1]);
            this.updateDisplay(playerStack[0]);
            this.updateDisplay(playerStack[1]);
            this.addPoints(playerStack.player);
            this.addPoints(playerStack.player);
        } else if (playerStack[0][0].color === color) {
            this.removeCube(playerStack[0]);
            this.updateDisplay(playerStack[0]);
            this.addPoints(playerStack.player);
        } else if (this.stackType === 'DOUBLE' && playerStack[1][0].color === color) {
            this.removeCube(playerStack[1]);
            this.updateDisplay(playerStack[1]);
            this.addPoints(playerStack.player);
        }
        console.log("one: " + this.playerOnePoints);
        console.log("two: " + this.playerTwoPoints);
    }

    // Removes a single cube from the front of an array */
    removeCube(playerStack) {
        //console.log(playerStack);
        playerStack.shift();
    }

    /* Updates the game display when cube is removed */
    updateDisplay(playerStack) {
        var getCorrectHTMLStack;

        if (playerStack === this.playerOneStacks[0]) {
            getCorrectHTMLStack = 'ul#one0';
        } else if (playerStack === this.playerOneStacks[1]) {
            getCorrectHTMLStack = 'ul#one1';
        } else if (playerStack === this.playerTwoStacks[0]) {
            getCorrectHTMLStack = 'ul#two0';
        } else if (playerStack === this.playerTwoStacks[1]) {
            getCorrectHTMLStack = 'ul#two1';
        }
        //console.log(getCorrectHTMLStack);
        $(getCorrectHTMLStack + ' > .cube:last').remove();
        $(getCorrectHTMLStack).prepend('<li class="cube ' + playerStack[6].color + ' ' + playerStack[6].powerup + '"></li>');
    }

    /* Increments the players point value */
    addPoints(player) {
        if (player === 'one') {
            this.playerOnePoints++;
        } else if (player === 'two') {
            this.playerTwoPoints++;
        }
    }
}

class Player {
    constructor() {
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.stacks = [];
        this.points = 0;
        this.stackElement = null;
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
        let colorMax = 3;
        for (let i = 0; i < 20; i++) {
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
        let maxCubes = 7;
        for (let i = 0; i < this.stacks.length; i++) {
            $('#player-' + this.playerNo).append('<ul id="' + this.playerNo + i + '">');
            for (let j = 0; j < maxCubes; j++) {
                $('ul#' + this.playerNo + i).prepend('<li class="cube ' + this.stacks[i][j].color + ' ' + this.stacks[i][j].powerup + '"></li>');
            }
            $('#player-' + this.playerNo).append('</ul>');
        }
        return $('#player-' + this.playerNo);
    }

    /* Returns a random value between the min-max parameters */
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class PlayerOne extends Player {
    constructor() {
        this.playerNo = 1;
    }
    
    /* Upon key press triggers function to check key to cube */
    keyCheck(keyPress) {
        // Q - 113; W - 119 ; A - 97; S - 115;
        switch (keyPress) {
            case 113:
                this.canRemoveCube(this.playerOneStacks, this.colors[0]); // Red
                break;
            case 97:
                this.canRemoveCube(this.playerOneStacks, this.colors[1]); // Blue
                break;
            case 119:
                this.canRemoveCube(this.playerOneStacks, this.colors[2]); // Green
                break;
            case 115:
                this.canRemoveCube(this.playerOneStacks, this.colors[3]); // Yellow
                break;
            default:
                break;
        }
    }
}

class PlayerTwo extends Player {
    constructor() {
        this.playerNo = 2;
    }

    /* Upon key press triggers function to check key to cube */
    keyCheck(keyPress) {
        // I - 105; O - 111; K - 107; L - 108;
        switch (keyPress) {
            case 105:
                this.canRemoveCube(this.playerTwoStacks, this.colors[0]); // Red
                break;
            case 107:
                this.canRemoveCube(this.playerTwoStacks, this.colors[1]); // Blue
                break;
            case 111:
                this.canRemoveCube(this.playerTwoStacks, this.colors[2]); // Green
                break;
            case 108:
                this.canRemoveCube(this.playerTwoStacks, this.colors[3]); // Yellow
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
