class Player {
    constructor(game, playerNo, keys) {
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.stacks = [];
        this.points = 0;
        this.pointsElement = null;
        this.playerNo = playerNo;
        this.pointsElement = $(`#p${playerNo}score`);
        this.keys = keys;
        this.game = game;
    }

    /* Sets up the game stacks */
    stacksSetUp(noOfStacks) {
        console.log("stacksSetUp(" + noOfStacks + ")");
        let stackTypes = ['SINGLE', 'DOUBLE'];
        this.game.stackType = noOfStacks;
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
        return stack;
    }

    /* Outputs and displays the cubes on the users screen up-to the choosen value */
    displayStacks() {
        //console.log("displayStacks(" + this.playerNo + ", " + this.stacks + ")");
        const maxCubes = 7;

        $(this.stacks).each((i, stack) => {
            $('#player-' + this.playerNo).append($('<ul></ul>').attr('id', `${this.playerNo}${i}`));
            let count = 0;
            stack.map((block) => {
                if (count >= maxCubes) return;
                count++;
                $('ul#' + this.playerNo + i).prepend('<li class="cube ' + block.color + ' ' + block.powerup + '"></li>');
            });
        });
    }

    /* Returns a random value between the min-max parameters */
    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    keyCheck(keyPress) {
        // I - 105; O - 111; K - 107; L - 108;
        switch (keyPress) {
            case this.keys[0]:
                this.canRemoveCube(this.colors[0]); // Red
                break;
            case this.keys[1]:
                this.canRemoveCube(this.colors[1]); // Blue
                break;
            case this.keys[2]:
                this.canRemoveCube(this.colors[2]); // Green
                break;
            case this.keys[3]:
                this.canRemoveCube(this.colors[3]); // Yellow
                break;
            default:
                break;
        }
    }

    /* Checks if cube is same, and if so triggers removal and display update */
    canRemoveCube(color) {
        //console.log(this.stacks[1][0].color, color, this.game.stackType);
        if (this.game.stackType === 'DOUBLE' && this.stacks[0][0].color === color && this.stacks[1][0].color === color) {
            $(this.stacks).each((i, stack) => {
                this.removeCube(stack);
                this.updateDisplay(stack);
                this.addPoints();
            });
        } else if (this.game.stackType === 'DOUBLE' && this.stacks[1][0].color === color) {
            this.removeCube(this.stacks[1]);
            this.updateDisplay(this.stacks[1]);
            this.addPoints();
        } else if (this.stacks[0][0].color === color) {
            this.removeCube(this.stacks[0]);
            this.updateDisplay(this.stacks[0]);
            this.addPoints();
        }
    }

    // Removes a single cube from the front of an array */
    removeCube(stack) {
        //console.log(stack);
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
        //console.log(this.pointsElement, this.points);
        $(this.pointsElement).html(this.points);
    }

    resetPlayer() {
        this.stacks.length = 0;
        $('#player-' + this.playerNo).empty();
        this.points = 0;
        $(this.pointsElement).html(`P${this.playerNo} SCORE`);
    }
}
