import Ship from './ship';
import printBoard from './pretty-print';

class Tile {
  constructor() {
    this.tile = {
      isShip: false,
    };
  }
}

class Gameboard {
  constructor() {
    this.board = [];

    for (let i = 0; i <= 9; i++) {
      this.board.push([]);
    }

    this.board.forEach((row) => {
      for (let i = 0; i <= 9; i++) {
        row.push({
          ship: null,
          isHit: false,
        });
      }
    });

    this.ships = [];
  }

  place(startX, startY, orientation, length) {
    let endX = startX + length;
    let endY = startY + length;
    const ship = new Ship(length);
    this.ships.unshift(ship);

    if (orientation === 'horizontal') {
      if (endX > 9) {
        throw new Error('Trying to place ship out of bounds!');
      }
      for (let i = startX; i < endX; i++) {
        if (this.board[startY][i].ship !== null) {
          throw new Error('Ship already placed here!');
        }
        this.board[startY][i].ship = ship;
      }
    }
    if (orientation === 'vertical') {
      if (endY > 9) {
        throw new Error('Trying to place ship out of bounds!');
      }
      for (let i = startY; i < endY; i++) {
        if (this.board[i][startX].ship !== null) {
          throw new Error('Ship already placed here!');
        }
        this.board[i][startX].ship = ship;
      }
    }
    if (orientation === undefined) {
      throw new Error('No orientation provided!');
    }
    printBoard(this.board);
  }
}

export default Gameboard;
