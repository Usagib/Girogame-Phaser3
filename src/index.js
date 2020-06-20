var config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var cursors;
var gameOver = false;
var groundLayer;
var map;
var tileset;
var platforms;
var background;
var camConfig;

var game = new Phaser.Game(config);

function preload () {

  this.load.image('piso', '../src/assets/platform.png');
  this.load.spritesheet('robot','../src/assets/bot.png',
       { frameWidth: 52, frameHeight: 52 }
   );
   this.load.image('background', '../src/assets/city.png');
   this.load.image('tiles', '../src/assets/tilemap/tileset1.png');
   this.load.tilemapTiledJSON('map', '../src/assets/tilemap/map1.json');
}

function create () {

  this.add.image(0, 0, 'background').setOrigin(0);

  this.cameras.main.setBounds(0, 0, 25600, 600);

  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('tileset1', 'tiles');
  platforms = map.createStaticLayer('GroundLayer', tileset, 0, 100);
  platforms.setScale(.2);

  platforms.setCollisionByExclusion(-1, true);

  player = this.physics.add.sprite(100, 450, 'robot');

  player.setBounce(0.2);
  player.body.setGravityY(300);

  this.cameras.main.startFollow(player, true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('robot',
      {start: 8, end: 14}
    ),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('robot',
      {start: 0, end: 6}
    ),
    frameRate: 3,
    repeat: -1
  });

  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('robot',
      {start: 8, end: 14}
    ),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'shoot',
    frames: this.anims.generateFrameNumbers('robot',
    {start: 16, end: 20}
  ),
  frameRate: 5,
  repeat: -1
  })

  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('robot',
    {start: 32, end: 36}),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'death',
    frames: this.anims.generateFrameNumbers('robot',
    {start: 35, end: 44 }),
    frameRate: 5,
  });

  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(player,platforms);

}

function update () {
  var cam = this.cameras.main;

  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('walk', true);
    cam.scrollX -= 4;
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('walk', true);
    cam.scrollX += 4;
  } else {
    player.setVelocityX(0);
    player.anims.play('idle', true);
  }

  if (cursors.up.isDown && player.body.onFloor()) {
    player.setVelocityY(-450);
    player.anims.play('jump', true);
  }

  if (cursors.space.isDown) {
    player.anims.play('shoot', true);
  }

  if (player.body.velocity.x > 0) {
    player.setFlipX(false);
  } else if (player.body.velocity.x < 0) {
    player.setFlipX(true);
  }

}
