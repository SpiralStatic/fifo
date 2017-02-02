class Player {
    constructor(game, playerNo, keys) {
        this.colors = ['red', 'blue', 'green', 'yellow'];
        this.powerUps = ['freeze', 'removal'];
        this.stacks = [];
        this.points = 0;
        this.pointsElement = null;
        this.playerNo = playerNo;
        this.pointsElement = $(`#p${playerNo}score`);
        this.keys = keys;
        this.game = game;
        this.soundPop = new Audio("etc/Mark_DiAngelo-Blop.mp3"); // Recorded by Mark DiAngelo @ http://soundbible.com/2067-Blop.html
        this.soundPop.volume = 0.7;
        this.soundIce = new Audio("etc/SoundBible.com-Mirror_Shattering.mp3"); // Recorded by Mike Koenig @ http://soundbible.com/994-Mirror-Shattering.html
        this.soundIce.volume = 0.8;
        this.soundPower = new Audio("etc/Power-Up.mp3"); // Recorded by KP @ http://soundbible.com/1639-Power-Up.html
        this.soundPower.volume = 0.8;
        this.isFrozen = false;
    }

    /* Sets up the game stacks */
    stacksSetUp(noOfStacks) {
        //console.log("stacksSetUp(" + noOfStacks + ")");
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
        //console.log("createStack()");
        let stack = [];
        const colorMax = 3;
        for (let i = 0; i < 200; i++) {
            let newColor = this.colors[this.getRandom(0, colorMax)];
            let powerUp = this.getRandom(0, 70); // Chance of powered block
            (powerUp <= this.powerUps.length - 1) && this.game.settings[2] === 'POWER-UPS' ? powerUp = this.powerUps[powerUp] : powerUp = 'none';
            stack.push({
                color: newColor,
                powerup: powerUp
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
            $('ul#' + this.playerNo + i + ' > .cube:last').addClass('firstitem');
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
                $('#player-' + this.playerNo + '-controls').find('a.red').addClass('glow');
                break;
            case this.keys[1]:
                this.canRemoveCube(this.colors[1]); // Blue
                $('#player-' + this.playerNo + '-controls').find('a.blue').addClass('glow');
                break;
            case this.keys[2]:
                this.canRemoveCube(this.colors[2]); // Green
                $('#player-' + this.playerNo + '-controls').find('a.green').addClass('glow');
                break;
            case this.keys[3]:
                this.canRemoveCube(this.colors[3]); // Yellow
                $('#player-' + this.playerNo + '-controls').find('a.yellow').addClass('glow');
                break;
            default:
                break;
        }
        setTimeout(() => {
            $('#player-' + this.playerNo + '-controls').find('a.glow').removeClass('glow');
        }, 1000);
    }

    /* Checks if cube is same, and if so triggers removal and display update */
    canRemoveCube(color) {
        //console.log(this.stacks[1][0].color, color, this.game.stackType);
        if (!this.isFrozen) {
            if (this.game.stackType === 'DOUBLE' && this.stacks[0][0].color === color && this.stacks[1][0].color === color) {
                $(this.stacks).each((i, stack) => {
                    this.checkPowerUp(stack[0]);
                    this.removeCube(stack);
                    this.updateDisplay(stack);
                    this.changePoints(1);
                });
            } else if (this.game.stackType === 'DOUBLE' && this.stacks[1][0].color === color) {
                this.checkPowerUp(this.stacks[1][0]);
                this.removeCube(this.stacks[1]);
                this.updateDisplay(this.stacks[1]);
                this.changePoints(1);
            } else if (this.stacks[0][0].color === color) {
                this.checkPowerUp(this.stacks[0][0]);
                this.removeCube(this.stacks[0]);
                this.updateDisplay(this.stacks[0]);
                this.changePoints(1);
            } else {
                this.changePoints(-1);
            }
        }
    }

    // Removes a single cube from the front of an array */
    removeCube(stack) {
        //console.log(stack);
        stack.shift();
        this.soundPop.play();
    }

    checkPowerUp(block) {
        if (block.powerup != 'none') {
            let power = block.powerup;
            switch (power) {
                case 'freeze':
                    this.game.freezePlayer(this.playerNo - 1); //Convert from Numbers to 0,1 indexing
                    break;
                case 'removal':
                    this.removeBlocks();
                    break;
                default:

            }
        }
    }

    /* Updates the game display when cube is removed */
    updateDisplay(stack) {
        var getCorrectHTMLStack;

        if (stack === this.stacks[0]) {
            getCorrectHTMLStack = 'ul#' + this.playerNo + '0';
            $(getCorrectHTMLStack + ' > .cube:last').remove();
            $(getCorrectHTMLStack).prepend('<li class="cube ' + this.stacks[0][6].color + ' ' + this.stacks[0][6].powerup + '"></li>');
            $(getCorrectHTMLStack + ' > .cube:last').addClass('firstitem');
        } else if (stack === this.stacks[1]) {
            getCorrectHTMLStack = 'ul#' + this.playerNo + '1';
            $(getCorrectHTMLStack + ' > .cube:last').remove();
            $(getCorrectHTMLStack).prepend('<li class="cube ' + this.stacks[1][6].color + ' ' + this.stacks[1][6].powerup + '"></li>');
            $(getCorrectHTMLStack + ' > .cube:last').addClass('firstitem');
        }
        //console.log(getCorrectHTMLStack);
    }

    /* Increments the players point value */
    changePoints(points) {
        this.points += points;
        //console.log(this.pointsElement, this.points);
        $(this.pointsElement).html(this.points);
    }

    resetPlayer() {
        this.stacks.length = 0;
        $('#player-' + this.playerNo).empty();
        this.points = 0;
        $(this.pointsElement).html(`P${this.playerNo} SCORE`);
    }

    removeBlocks() {
        $(this.stacks).each((i, stack) => {
            for (let i = 0; i < 3; i++) {
                this.removeCube(stack);
                this.updateDisplay(stack);
                this.changePoints(1);
            }
        });
        this.soundPower.play();
    }
}
