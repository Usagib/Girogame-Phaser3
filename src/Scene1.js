class Scene1 extends Phaser.Scene {
  constructor() {
    super('mainMenu');
  }

  preload() {
    this.load.image('menubg', '../src/assets/city.png');
    this.load.image('menutext', '../src/assets/city.png');
  }

  create() {
    this.add.image(0, 0, 'menubg');
    this.add.image(50, 50, 'menutext');
  }

  update() {
    
  }
}
