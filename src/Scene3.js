import leaderboardPost from './helpers/LeaderboardPost';
export default class Scene3 extends Phaser.Scene {
  constructor(){
    super('gameOver');
  }
  init(data){
    this.finalScore = data.score;
    this.leadername = data.name;
  }
  preload() {
    this.load.image('gameoverscreen', '../src/assets/gameoverscreen.png');
  }
  create() {
    this.chillMusic = this.sound.add('chillbuster');
    this.chillMusic.play({loop: true, volume: 0.1});
    this.add.image(512, 300, 'gameoverscreen');
    this.add.text(350, 500, 'Score'+this.finalScore, { fontSize: '32px', fill: '#fff'});
    this.pointer = this.input.activePointer;
    this.input.mouse.disableContextMenu();
    this.input.on('pointerup',(pointer) => {
      if (this.pointer.leftButtonReleased()){
        this.chillMusic.pause();
        leaderboardPost(this.leadername, this.finalScore);
        this.scene.start('mainMenu');
      }
    });
  }
  update() {

  }
}
