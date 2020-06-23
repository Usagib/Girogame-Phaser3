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
var coins;
var fireBullets;
var whiteSlimes;
var whiteSlimeTween;
var fireSkulls;
var fireSkullTween;
var bgBack;
var bgMid1;
var bgMid2;
var bgFront;

var game = new Phaser.Game(config);

function preload () {

  this.load.image('piso', '../src/assets/platform.png');
  this.load.spritesheet('robot','../src/assets/bot.png',
       { frameWidth: 52, frameHeight: 52 }
  );
  this.load.spritesheet('firebullet', '../src/assets/firebullet.png',
        { frameWidth: 40, frameHeight: 40 }
  );
  this.load.spritesheet('coin', '../src/assets/coin.png',
        { frameWidth: 120, frameHeight: 120 }
  );
  this.load.spritesheet('whiteslime', '../src/assets/slimewhite.png',
        { frameWidth: 32, frameHeight: 32}
  );
  this.load.spritesheet('skull', '../src/assets/fire-skull.png',
        { frameWidth: 96, frameHeight: 112 }
  );
   this.load.image('tiles', '../src/assets/tilemap/tileset1.png');
   this.load.tilemapTiledJSON('map', '../src/assets/tilemap/map1.json');
   this.load.image('background4', '../src/assets/background/back1.png');
   this.load.image('background3', '../src/assets/background/farback.png');
   this.load.image('background2', '../src/assets/background/far.png');
   this.load.image('background1', '../src/assets/background/farfront.png');
}

function create () {

  //------------------
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let topBackgroundXOrigin = windowWidth / 2;
  let topBackgroundYOrigin = (windowHeight / 5) * 1.5;
  let topBackgroundHeight = (windowHeight / 5) * 3;

  let imageBaseWidth = 272;
  let imageBaseHeight = 150;
  let heightRatio = topBackgroundHeight / imageBaseHeight;


  bgBack = this.add.image(topBackgroundXOrigin, topBackgroundYOrigin, 'background4');
  bgBack.setDisplaySize(windowWidth, topBackgroundHeight);

  // Add each layer one by one
  bgMid1 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background3');
  bgMid1.setScale(heightRatio);

  bgMid2 = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background2');
  bgMid2.setScale(heightRatio);

  bgFront = this.add.tileSprite(topBackgroundXOrigin, topBackgroundYOrigin, imageBaseWidth, imageBaseHeight, 'background1');
  bgFront.setScale(heightRatio);

  // -----------------------

  this.cameras.main.setBounds(0, 0, 7700, 950);

  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('tileset1', 'tiles');
  platforms = map.createStaticLayer('GroundLayer', tileset, 0, 200);
  platforms.setScale(.3);

  platforms.setCollisionByExclusion(-1, true);

  player = this.physics.add.sprite(100, 450, 'robot');
  coins = this.physics.add.group({
    key: 'coin',
    repeat: 50,
    setXY: { x:100, y:0, stepX: 100 }
  });
  coins.children.iterate(function (child) {
    child.setScale(.2);
    child.setBounce(0.5);
  });

  fireBullets = this.physics.add.group();

  whiteSlimes = this.physics.add.group({
    key: 'whiteslime',
    repeat: 10,
    setXY: { x:225, y:0, stepX: 555 }
  });
  whiteSlimes.children.iterate(function (child) {
    child.setScale(1.5);
  });

  fireSkulls = this.physics.add.group();

  this.time.addEvent({
    delay: 2500,
    callback: () => {
      fireSkulls.create(Phaser.Math.Between(player.x+500, 6300), Phaser.Math.Between(0, 900), 'skull');
      fireSkulls.children.iterate(function (child) {
        child.setGravityY(-300);
        child.setScale(.7);
        child.setVelocityX(-160);
        child.anims.play('skullfly', true);
      });
    },
    loop: true
  });


  player.setBounce(0.2);
  player.body.setGravityY(300);

  this.cameras.main.startFollow(player, true);

  this.anims.create({
    key: 'skullfly',
    frames: this.anims.generateFrameNumbers('skull',
      {start: 0, end: 7}),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'walkslime',
    frames: this.anims.generateFrameNumbers('whiteslime',
      { start: 0, end: 15}
    ),
    frameRate: 6,
    repeat: -1
  })

  this.anims.create({
    key: 'fireshoot',
    frames: this.anims.generateFrameNumbers('firebullet',
      {start: 0, end: 8}
    ),
    frameRate: 5
  })

  this.anims.create({
    key: 'coinidle',
    frames:  this.anims.generateFrameNumbers('coin',
      {start: 0, end: 7}
    ),
    frameRate: 5,
    repeat: -1
  })

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
  frameRate: 30,
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
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(coins, platforms);
  this.physics.add.collider(whiteSlimes, platforms);
  this.physics.add.collider(fireBullets, platforms, destroyBullet, null, this);
  this.physics.add.overlap(player, coins, collectCoin, null, this);


  function collectCoin (player, coin) {
    coin.disableBody(true, true);
  }

  function destroyBullet(bullet, collider) {
    bullet.disableBody(true, true);
  }

  this.anims.staggerPlay('coinidle', coins.getChildren(), 0.03);
  this.anims.staggerPlay('walkslime', whiteSlimes.getChildren(), 0.03);
  this.anims.staggerPlay('skullfly', fireSkulls.getChildren(), 0.03);

  whiteSlimeTween = this.tweens.add({
    targets: whiteSlimes.getChildren(),
    props: {
      x: {value: '+=100', duration: 1500}
    },
    ease: 'Sine.easeInOut',
    yoyo: true,
    repeat: -1
  });

}

function update () {

  //------------------------

  //------------------------

  var cam = this.cameras.main;
    this.anims.staggerPlay('fireshoot', fireBullets.getChildren(), 0.03);
  if (gameOver) {
    return;
  }

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('walk', true);
    cam.scrollX -= 4;
    bgMid1.tilePositionX -= 0.1;
    bgMid2.tilePositionX -= 0.2;
    bgFront.tilePositionX -= 0.3;
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('walk', true);
    cam.scrollX += 4;
    bgMid1.tilePositionX += 0.1;
    bgMid2.tilePositionX += 0.2;
    bgFront.tilePositionX += 0.3;
  } else {
    player.setVelocityX(0);
    player.anims.play('idle', true);
  }

  if (cursors.up.isDown && player.body.onFloor()) {
    player.setVelocityY(-550);
    player.anims.play('jump', true);
  }

  if (this.input.keyboard.checkDown(cursors.space, 300)) {
    var shoot = fireBullets.create(player.x + 40, player.y + 15, 'firebullet');
    if (cursors.left.isDown){
      shoot.setVelocityX(-500);
    } else {
      shoot.setVelocityX(500);
    }
    shoot.body.setGravityY(-300);
  }

  if (player.body.velocity.x > 0) {
    player.setFlipX(false);
  } else if (player.body.velocity.x < 0) {
    player.setFlipX(true);
  }

}
