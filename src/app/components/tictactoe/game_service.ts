type Triple = [string, string, string];
type Rows = [Triple, Triple, Triple];

export class Game {

  board: Rows;
  player: string;
  winner: string;
  gameover: boolean;

  constructor() {
    this.reset();
  }

  play(x,y) {
    if (!this.gameover && this.board[x][y] ==='') {
      this.board[x][y] = this.player;
      this.player = this.player == 'x' ? 'o': 'x';
      this.check();
    }
  }

  reset() {
    this.board = [['', '', ''], ['', '', ''], ['', '', '']];
    this.player='x';
    this.winner='';
    this.gameover = false;
  }

  check() {
    const allWinningLists = [
      this.board,                   // rows
      zip(this.board),        // columns
      diagonals(this.board)   // diagonals
    ];

    this.winner = allWinningLists
      .reduce((allLists, lists) => allLists.concat(lists), [])
      .reduce(getWinnerFromList, '');

    if (checkDraw(this.board) || this.winner !=='') {
      this.gameover = true;
    }
  }

  get done() {
    return this.gameover;
  }


  get draw() {
    return this.gameover && this.winner === ''
  }

}

function getWinnerFromList(winner, list: Triple) {
  if (winner) return winner;
  if (list.every(s => s == 'o')) return 'o';
  if (list.every(s => s == 'x')) return 'x';
  return '';
}

function zip(arrays: Rows) {
  return arrays[0].map(function(_, i) {
    return arrays.map(function(array) { return array[i] } )
  });
}

function checkDraw(rows: Rows) {
  return rows.every(row => row.every(item => item != ''));
}

function diagonals(rows: Rows) {
  return [
    rows.map((row, index) => row[index]), // left to right diagonal
    rows.map((row, index) => row[row.length - 1 - index]) // right to left diagonal
  ];
}

