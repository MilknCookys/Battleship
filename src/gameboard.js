import Ship from './ship';
import printBoard from './pretty-print';

class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => ({
            ship: null,
            isHit: false,
          }))
      );
    this.ships = [];
  }

  isValidPlacement(startX, startY, orientation, length) {
    const endX = orientation === 'horizontal' ? startX + length - 1 : startX;
    const endY = orientation === 'vertical' ? startY + length - 1 : startY;

    if (endX > 9 || endY > 9) return false;

    for (let y = Math.max(0, startY - 1); y <= Math.min(9, endY + 1); y++) {
      for (let x = Math.max(0, startX - 1); x <= Math.min(9, endX + 1); x++) {
        if (this.board[y][x].ship !== null) return false;
      }
    }

    return true;
  }

  place(startX, startY, orientation, length) {
    if (!this.isValidPlacement(startX, startY, orientation, length)) {
      throw new Error('Invalid ship placement!');
    }

    const ship = new Ship(length);
    this.ships.push(ship);

    if (orientation === 'horizontal') {
      for (let i = startX; i < startX + length; i++) {
        ship.tiles.push([i, startY]);
        this.board[startY][i].ship = ship;
      }
    } else if (orientation === 'vertical') {
      for (let i = startY; i < startY + length; i++) {
        ship.tiles.push([startX, i]);
        this.board[i][startX].ship = ship;
      }
    }
  }

  randomizeShips() {
    this.ships = [];
    this.board = Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => ({
            ship: null,
            isHit: false,
          }))
      );

    const shipLengths = [5, 4, 3, 3, 2];

    for (const length of shipLengths) {
      let placed = false;
      while (!placed) {
        const startX = Math.floor(Math.random() * 10);
        const startY = Math.floor(Math.random() * 10);
        const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';

        try {
          this.place(startX, startY, orientation, length);
          placed = true;
        } catch (error) {}
      }
    }
  }

  receiveAttack(x, y) {
    console.log(`Attacking: ${x}, ${y}`);
    if (x > 9 || y > 9) {
      throw new Error('Trying to attack outside board');
    } else {
      this.board[y][x].isHit = true;
      if (this.board[y][x].ship !== null) {
        this.board[y][x].ship.hit();
        console.log(this.board[y][x].ship);
        return { ship: true, xy: [x, y] };
      }
      return { ship: true, xy: [x, y] };
    }
  }

  isSunk(targetTile) {
    let targetShip = null;

    this.ships.forEach((ship) => {
      ship.tiles.forEach((shipTile) => {
        if (shipTile[0] === targetTile[0] && shipTile[1] === targetTile[1]) {
          targetShip = ship; // Assigning the found ship to targetShip
        }
      });
    });

    if (targetShip === null) {
      return false;
    } else if (targetShip.sunk !== false) {
      return targetShip;
    } else {
      return false;
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.sunk === true);
  }

  getTiles(ship) {
    const tiles = [];
    ship.tiles.forEach((tile) => {
      tiles.push(tile);
    });
    return tiles;
  }
}

export default Gameboard;
