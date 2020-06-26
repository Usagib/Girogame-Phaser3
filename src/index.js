import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';

var config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 600,
  background: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [Scene1, Scene2, Scene3, Scene4]/*, {
    preload: preload,
    create: create,
    update: update
  }*/
};
var game = new Phaser.Game(config);
