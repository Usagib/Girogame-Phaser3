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
var randY = Phaser.Math.Between(0, 600);
var randX = Phaser.Math.Between(300, 5100);

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
   this.load.image('background', '../src/assets/city.png');
   this.load.image('tiles', '../src/assets/tilemap/tileset1.png');
   this.load.tilemapTiledJSON('map', '../src/assets/tilemap/map1.json');
}

function create () {

  this.add.image(0, 0, 'background').setOrigin(0);

  this.cameras.main.setBounds(0, 0, 5130, 600);

  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('tileset1', 'tiles');
  platforms = map.createStaticLayer('GroundLayer', tileset, 0, 100);
  platforms.setScale(.2);

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
    delay: 3000,
    callback: () => {
      fireSkulls.create(Phaser.Math.Between(player.x+500, 5100), Phaser.Math.Between(0, 600), 'skull');
      fireSkulls.children.iterate(function (child) {
        child.setGravityY(-300);
        child.setScale(.5);
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

/*  fireSkullTween = this.tweens.add({
    targets: fireSkulls.getChildren(),
    props: {
      x: {value: '-=5700', duration: 50000}
    },
    ease: 'Sine.easeInOut',
  });
*/
}

function update () {
  var cam = this.cameras.main;
    this.anims.staggerPlay('fireshoot', fireBullets.getChildren(), 0.03);
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

  if (this.input.keyboard.checkDown(cursors.space, 300)) {
    console.log(player.x);
    console.log(player.y);
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
