export default class Scene4 extends Phaser.Scene {
  constructor(){
    super('gameWin');
  }
  init(data){
    console.log(data);
    this.finalScore = data.score;
  }
  preload() {
    this.load.image('gamewinscreen', '../src/assets/gamewinscreen.png');
  }
  create() {
    this.chillMusic = this.sound.add('chillbuster');
    this.chillMusic.play({loop: true, volume: 0.1});
    this.add.image(512, 300, 'gamewinscreen');
    this.add.text(350, 450, 'Score'+this.finalScore, { fontSize: '32px', fill: '#fff'});
    this.pointer = this.input.activePointer;
    this.input.mouse.disableContextMenu();
    this.input.on('pointerup',(pointer) => {
      if (this.pointer.leftButtonReleased()){
        this.chillMusic.pause();
        this.scene.start('mainMenu');
      }
    });
  }
  update() {

  }
}
