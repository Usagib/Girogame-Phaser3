export default class Scene5 extends Phaser.Scene {
  constructor() {
    super('highScores');
  }

  init(data) {
    this.board = data.board;
  }

  create() {
    this.board.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    });
    this.add.text(350, 100, 'LeaderBoard', { fontSize: '32px', fill: '#fff' });
    this.add.text(350, 200, `${this.board[1].user} : ${this.board[1].score}`, { fontSize: '32px', fill: '#fff' });
    this.add.text(350, 300, `${this.board[2].user} : ${this.board[2].score}`, { fontSize: '32px', fill: '#fff' });
    this.add.text(350, 400, `${this.board[3].user} : ${this.board[3].score}`, { fontSize: '32px', fill: '#fff' });
    this.pointer = this.input.activePointer;
    this.input.mouse.disableContextMenu();
    this.input.on('pointerup', (pointer) => {
      if (this.pointer.leftButtonReleased()) {
        this.scene.start('mainMenu');
      }
    });
  }
}
