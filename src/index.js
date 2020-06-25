import Scene1 from './Scene1';
import Scene2 from './Scene2';

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
  scene: [Scene1, Scene2]/*, {
    preload: preload,
    create: create,
    update: update
  }*/
};
var game = new Phaser.Game(config);

var player;
var cursors;
var gameOver = false;
var score = 0;
var scoreText;
var healthText;
var groundLayer;
var map;
var tileset;
var platforms;
var background;
var camConfig;
var coins;
var fireBullets;
var whiteSlimes;
var redSlimes;
var whiteSlimeTween;
var redSlimeTween;
var greenSlimes;
var littleSlimes;
var fireSkulls;
var fireSkullTween;
var bgBack;
var bgMid1;
var bgMid2;
var bgFront;
var music;
var bossMusic;
var boss;
var bossBullets;
var bossTween;

var chillMusic;
var bootBg;
var bootTxt;
