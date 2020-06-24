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
var boss;
var bossBullets;
var bossTween;

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
  this.load.spritesheet('redslime', '../src/assets/slimered.png',
        { frameWidth: 32, frameHeight: 32}
  );
  this.load.spritesheet('greenslime', '../src/assets/slimegreen.png',
        { frameWidth: 32, frameHeight: 32}
  );
  this.load.spritesheet('littleslime', '../src/assets/littleslime.png',
        { frameWidth: 32, frameHeight: 32}
  );
  this.load.spritesheet('skull', '../src/assets/fire-skull.png',
        { frameWidth: 96, frameHeight: 112 }
  );
  this.load.spritesheet('bossidle', '../src/assets/bossidle.png',
      { frameWidth: 160, frameHeight: 144 }
  );
  this.load.spritesheet('bossattack', '../src/assets/bossattack.png',
      { frameWidth: 192, frameHeight: 176 }
  );
  this.load.spritesheet('bossbullet', '../src/assets/bossbullet.png',
      { frameWidth: 130, frameHeight: 130 }
  );

   this.load.image('tiles', '../src/assets/tilemap/tileset1.png');
   this.load.tilemapTiledJSON('map', '../src/assets/tilemap/map1.json');
   this.load.image('background4', '../src/assets/background/back1.png');
   this.load.image('background3', '../src/assets/background/farback.png');
   this.load.image('background2', '../src/assets/background/far.png');
   this.load.image('background1', '../src/assets/background/farfront.png');

  this.load.audio('rudebuster',
     '../src/assets/levelmusic.mp3'
   );
}

function create () {

  music = this.sound.add('rudebuster');
  // music.play({loop: true, volume: 0.1});

  bgBack = this.add.tileSprite(0, 0, config.width, config.height, 'background4');
  bgBack.setOrigin(0,0);
  bgBack.setScrollFactor(0);
  bgBack.setScale(6);

  // Add each layer one by one
  bgMid1 = this.add.tileSprite(0, 0, config.width, config.height, 'background3');
  bgMid1.setOrigin(0,0);
  bgMid1.setScrollFactor(0);
  bgMid1.setScale(6);

  bgMid2 = this.add.tileSprite(0, 0, config.width, config.height, 'background2');
  bgMid2.setOrigin(0,0);
  bgMid2.setScrollFactor(0);
  bgMid2.setScale(6);

  bgFront = this.add.tileSprite(0, 0, config.width, config.height, 'background1');
  bgFront.setOrigin(0,0);
  bgFront.setScrollFactor(0);
  bgFront.setScale(6);

  this.cameras.main.setBounds(0, 0, 7700, 950);

  map = this.make.tilemap({ key: 'map' });
  tileset = map.addTilesetImage('tileset1', 'tiles');
  platforms = map.createStaticLayer('GroundLayer', tileset, 0, 200);
  platforms.setScale(.3);

  platforms.setCollisionByExclusion(-1, true);

  player = this.physics.add.sprite(100, 450, 'robot');
  boss = this.physics.add.sprite(7380, 300, 'bossidle');
  boss.setGravityY(-300);
  boss.setScale(1.3);

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
    child.setSize(2, 8, true);
  });

  redSlimes = this.physics.add.group({
    key: 'redslime',
    repeat: Phaser.Math.Between(20, 25),
    setXY: { x:300, y:0, stepX: Phaser.Math.Between(200, 600), stepY: Phaser.Math.Between(0, 10) }
  });
  redSlimes.children.iterate(function (child) {
    child.setScale(2);
    child.setSize(4, 10, true);
  });

  this.time.addEvent({
    delay: 5000,
    callback: () => {
      redSlimes.children.iterate(function (child) {
        child.setVelocityY(-300);
      });
    },
    loop: true
  });

  fireSkulls = this.physics.add.group();

  this.time.addEvent({
    delay: 2500,
    callback: () => {
      fireSkulls.create(Phaser.Math.Between(2000, 6300), Phaser.Math.Between(0, 900), 'skull');
      fireSkulls.children.iterate(function (child) {
        child.setGravityY(-300);
        child.setScale(.7);
        child.setVelocityX(-160);
        child.setSize(4, 8, true);
        child.anims.play('skullfly', true);
      });
    },
    loop: true
  });

  greenSlimes = this.physics.add.group();
  littleSlimes = this.physics.add.group();
  bossBullets = this.physics.add.group();

  this.time.addEvent({
    delay: 10000,
    callback: () => {
      greenSlimes.create(Phaser.Math.Between(1500, 6000), Phaser.Math.Between(500, 900), 'greenslime');
      greenSlimes.children.iterate(function (child) {
          child.setScale(1.7);
          child.setGravityY(-305);
          child.anims.play('floatslime', true);
          child.setSize(4, 4, true);
      });
    },
    loop: true
  });

  this.time.addEvent({
    delay: 6000,
    callback: () => {
      greenSlimes.children.iterate(function (child) {
        littleSlimes.create(child.x, child.y, 'littleslime');
        littleSlimes.children.iterate(function (child) {
          child.setScale(1.3);
          child.setBounce(0.5);
          child.setSize(1, 1, true)
        })
      });
    },
    loop: true
  });

  this.time.addEvent({
    delay: 3000,
    callback: () => {
        littleSlimes.children.iterate(function (child) {
          child.setVelocityY(-300);
          child.setVelocityX(-30);
        });
    },
    loop: true
  });


  player.setBounce(0.2);
  player.body.setGravityY(300);

  this.cameras.main.startFollow(player, true);

  this.anims.create({
    key: 'bossbullet',
    frames: this.anims.generateFrameNumbers('bossbullet',
      {start: 0, end: 6 }),
    frameRate: 5,
    yoyo: true,
    repeat: -1
  });

  this.anims.create({
    key: 'bossattack',
    frames: this.anims.generateFrameNumbers('bossattack',
     {start: 0, end: 7}),
     frameRate: 20,
  });

  this.anims.create({
    key: 'bossidle',
    frames: this.anims.generateFrameNumbers('bossidle',
      {start: 0, end: 5}),
    frameRate: 5,
    repeat: -1
  });

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
    key: 'jumpslime',
    frames: this.anims.generateFrameNumbers('redslime',
      { start: 0, end: 15}
    ),
    frameRate: 6,
    repeat: -1
  })

  this.anims.create({
    key: 'floatslime',
    frames: this.anims.generateFrameNumbers('greenslime',
      { start: 0, end: 15}
    ),
    frameRate: 12,
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
  this.physics.add.collider(boss, platforms);
  this.physics.add.collider(bossBullets, platforms, destroyBullet, null, this);
  this.physics.add.collider(whiteSlimes, platforms);
  this.physics.add.collider(redSlimes, platforms);
  this.physics.add.collider(littleSlimes, platforms);

  this.physics.add.collider(whiteSlimes, fireBullets, damageEnemy, null, this);
  this.physics.add.collider(redSlimes, fireBullets, damageEnemy, null, this);
  this.physics.add.collider(greenSlimes, fireBullets, damageEnemy, null, this);
  this.physics.add.collider(littleSlimes, fireBullets, damageEnemy, null, this);
  this.physics.add.collider(fireSkulls, fireBullets, damageEnemy, null, this);
  this.physics.add.collider(boss, fireBullets, damageBoss, null, this);

  this.physics.add.overlap(player, whiteSlimes, playerDamage5, null, this);
  this.physics.add.overlap(player, redSlimes, playerDamage5, null, this);
  this.physics.add.overlap(player, littleSlimes, playerDamage1Disable, null, this);
  this.physics.add.overlap(player, fireSkulls, playerDamage1Disable, null, this);
  this.physics.add.overlap(player, greenSlimes, playerDamage5, null, this);
  this.physics.add.overlap(player, bossBullets, playerDamage1Disable, null, this);

  this.physics.add.collider(fireBullets, platforms, destroyBullet, null, this);
  this.physics.add.overlap(player, coins, collectCoin, null, this);

  function damageEnemy(enemy, bullet) {
      enemy.setTint(0xff0000);
      enemy.destroy();
      bullet.disableBody(true, true);
  };

  function damageBoss(boss, bullet) {
    boss.setTint(0xff0000);
    bullet.disableBody(true, true);
    this.time.addEvent({
      delay: 200,
      callback: () => {
        boss.setTint(0xffffff);
      },
    })
  }

  function destroyEnemy(bullet, platform) {
    bullet.disableBody(true, true);
  }

  function playerDamage5(player, enemy) {
    player.x-=15;
    player.setTint(0xff0000);
    this.time.addEvent({
      delay: 200,
      callback: () => {
        player.x-=15;
        player.setTint(0xffffff);
      },
    })
  }

  function playerDamage1Disable(player, enemy) {
    player.setTint(0xff0000);
    enemy.disableBody(true, true);
    this.time.addEvent({
      delay: 200,
      callback: () => {
        player.setTint(0xffffff);
      },
    })
  }

  function collectCoin (player, coin) {
    coin.disableBody(true, true);
  }

  function destroyBullet(bullet, collider) {
    bullet.disableBody(true, true);
  }

  this.anims.staggerPlay('coinidle', coins.getChildren(), 0.03);
  this.anims.staggerPlay('walkslime', whiteSlimes.getChildren(), 0.03);
  this.anims.staggerPlay('jumpslime', redSlimes.getChildren(), 0.03);
  this.anims.staggerPlay('skullfly', fireSkulls.getChildren(), 0.03);
  this.anims.staggerPlay('bossidle', boss, 0.03);

  this.time.addEvent({
      delay: 528,
      callback: () => {
        boss.anims.play('bossattack');
        var bullet = bossBullets.create(boss.x, boss.y, 'bossbullet');
        bossBullets.children.iterate( function (child) {
          child.setScale(.3);
          child.setGravityY(-290);
          child.setVelocityX(-200);
          child.setBounce(.8);
          child.setSize(4, 4, true)
          child.anims.play('bossbullet', true);
        });
      },
      loop: true
    });
  bossTween = this.tweens.add({
          targets: boss,
          props: {
            y: {value: '+=500', duration: 2125}
          },
          ease: 'sine.easeInOut',
          yoyo: true,
          repeat: -1
        });
  whiteSlimeTween = this.tweens.add({
    targets: whiteSlimes.getChildren(),
    props: {
      x: {value: '+=85', duration: 1500}
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
    console.log(player.x);
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
