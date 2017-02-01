$(document).foundation();
$(() => {
    const fifo = new FIFO();
    const player1 = new Player(fifo, 1, [113, 97, 119, 115]);
    const player2 = new Player(fifo, 2, [105, 107, 111, 108]);
    fifo.players = [player1, player2];
});

// Change all vars to lets or consts
// Change all anonymous functions to arrow syntax

// OOP
