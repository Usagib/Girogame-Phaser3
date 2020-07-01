import Scene1 from './Scene1';
import Scene2 from './Scene2';
import Scene3 from './Scene3';
import Scene4 from './Scene4';
import Scene5 from './Scene5';

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 600,
  background: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Scene1, Scene2, Scene3, Scene4, Scene5],
};
/* eslint-diable */
const game = new Phaser.Game(config);
/* eslint-enable */
