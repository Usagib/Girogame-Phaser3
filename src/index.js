var config = {
  type: Phaser.AUTO,
  width: 800,
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

var platforms;
var player;
var cursors;
var gameOver = false;

var game = new Phaser.Game(config);

function preload () {
  this.load.image('city', '../src/assets/city.png');
  this.load.image('ground', '../src/assets/platform.png');
  this.load.spritesheet('robot','../src/assets/bot.png',
       { frameWidth: 52, frameHeight: 52 }
   );
}

function create () {
  this.add.image(400, 300, 'city');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  player = this.physics.add.sprite(100, 450, 'robot');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  player.body.setGravityY(300);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('robot',
      {start: 8, end: 14}
    ),
    frameRate: 5,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: this.anims.generateFrameNumbers('robot',
      {start: 0, end: 6}
    ),
    frameRate: 3,
    repeat: -1
  });

  this.anims.create({
    key: 'right',
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
  frameRate: 10,
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
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn', true);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-330);
    player.anims.play('jump', true);
  }

  if (cursors.down.isDown) {
    player.setVelocityX(0);
    player.anims.play('shoot', true);
  }

}
