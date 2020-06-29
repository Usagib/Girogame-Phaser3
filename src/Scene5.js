export default class Scene5 extends Phaser.Scene {
  constructor(){
    super('highScores');
  }
  init(data){
    console.log(data);
    this.finalScore = data.score;
  }
  preload() {
    this.load.image('gameoverscreen', '../src/assets/gameoverscreen.png');
  }
  create() {
    this.chillMusic = this.sound.add('chillbuster');
    this.chillMusic.play({loop: true, volume: 0.1});
    this.add.image(512, 300, 'gameoverscreen');
    this.add.text(350, 500, 'Score'+this.finalScore, { fontSize: '32px', fill: '#fff'});
  }
  update() {
    this.pointer = this.input.activePointer;

    if (this.pointer.isDown){
      this.chillMusic.pause();
      this.scene.start('mainMenu');
    }
  }
}
