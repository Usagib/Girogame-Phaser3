export default class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }
  preload () {

  }
  create () {
    this.score = 0;
    this.gameOver = false;

    this.music = this.sound.add('rudebuster');
    this.bossMusic = this.sound.add('orchestrabuster');
    this.music.play({loop: true, volume: 0.1});

    this.bgBack = this.add.tileSprite(0, 0, 800, 600, 'background4');
    this.bgBack.setOrigin(0,0);
    this.bgBack.setScrollFactor(0);
    this.bgBack.setScale(6);

    this.bgMid1 = this.add.tileSprite(0, 0, 800, 600, 'background3');
    this.bgMid1.setOrigin(0,0);
    this.bgMid1.setScrollFactor(0);
    this.bgMid1.setScale(6);

    this.bgMid2 = this.add.tileSprite(0, 0, 800, 600, 'background2');
    this.bgMid2.setOrigin(0,0);
    this.bgMid2.setScrollFactor(0);
    this.bgMid2.setScale(6);

    this.bgFront = this.add.tileSprite(0, 0, 800, 600, 'background1');
    this.bgFront.setOrigin(0,0);
    this.bgFront.setScrollFactor(0);
    this.bgFront.setScale(6);

    this.scoreText = this.add.text(16, 360, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    this.healthText = this.add.text(16, 420, 'Health: 0', { fontSize: '32px', fill: '#fff' });

    this.cameras.main.setBounds(0, 0, 7700, 950);

    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset1', 'tiles');
    this.platforms = this.map.createStaticLayer('GroundLayer', this.tileset, 0, 200);
    this.platforms.setScale(.3);

    this.platforms.setCollisionByExclusion(-1, true);

    this.player = this.physics.add.sprite(100, 450, 'robot');
    this.player.health = 100;
    this.boss = this.physics.add.sprite(7380, 300, 'bossidle');
    this.boss.setGravityY(-300);
    this.boss.setScale(1.3);
    this.boss.health = 50;

    this.coins = this.physics.add.group({
      key: 'coin',
      repeat: 200,
      setXY: { x:100, y:0, stepX: 100 }
    });
    this.coins.children.iterate(function (child) {
      child.setScale(.2);
      child.setBounce(0.5);
    });

    this.fireBullets = this.physics.add.group();

    this.whiteSlimes = this.physics.add.group({
      key: 'whiteslime',
      repeat: 10,
      setXY: { x:225, y:0, stepX: 555 }
    });
    this.whiteSlimes.children.iterate(function (child) {
      child.health = 3;
      child.setScale(1.5);
      child.setSize(2, 8, true);
    });

    this.redSlimes = this.physics.add.group({
      key: 'redslime',
      repeat: Phaser.Math.Between(20, 25),
      setXY: { x:300, y:0, stepX: Phaser.Math.Between(200, 600), stepY: Phaser.Math.Between(0, 10) }
    });
    this.redSlimes.children.iterate(function (child) {
      child.health = 3;
      child.setScale(2);
      child.setSize(4, 10, true);
    });

    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.redSlimes.children.iterate(function (child) {
          child.setVelocityY(-300);
        });
      },
      loop: true
    });

    this.fireSkulls = this.physics.add.group();

    this.time.addEvent({
      delay: 2500,
      callback: () => {
        this.fireSkulls.create(Phaser.Math.Between(2000, 6300), Phaser.Math.Between(0, 900), 'skull');
        this.fireSkulls.children.iterate(function (child) {
          child.setGravityY(-300);
          child.setScale(.7);
          child.setVelocityX(-160);
          child.setSize(4, 8, true);
          child.anims.play('skullfly', true);
          child.health = 2;
        });
      },
      loop: true
    });

    this.greenSlimes = this.physics.add.group();
    this.littleSlimes = this.physics.add.group();
    this.bossBullets = this.physics.add.group();

    /*this.time.addEvent({
      delay: 10000,
      callback: () => {
        this.greenSlimes.create(Phaser.Math.Between(1500, 6000), Phaser.Math.Between(500, 900), 'greenslime');
        this.greenSlimes.children.iterate(function (child) {
            child.setScale(1.7);
            child.setGravityY(-305);
            child.anims.play('floatslime', true);
            child.setSize(4, 4, true);
            child.health = 5;
        });
      },
      loop: true
    });*/

    this.time.addEvent({
      delay: 6000,
      callback: () => {
        this.greenSlimes.children.iterate(function (child) {
          this.littleSlimes.create(child.x, child.y, 'littleslime');
          this.littleSlimes.children.iterate(function (child) {
            child.setScale(1.3);
            child.setBounce(0.5);
            child.setSize(1, 1, true)
            child.health = 1;
          })
        });
      },
      loop: true
    });

    this.time.addEvent({
      delay: 3000,
      callback: () => {
          this.littleSlimes.children.iterate(function (child) {
            child.setVelocityY(-300);
            child.setVelocityX(-30);
          });
      },
      loop: true
    });


    this.player.setBounce(0.2);
    this.player.body.setGravityY(300);

    this.cameras.main.startFollow(this.player, true);

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

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.collider(this.boss, this.platforms);
    this.physics.add.collider(this.bossBullets, this.platforms, destroyBullet, null, this);
    this.physics.add.collider(this.whiteSlimes, this.platforms);
    this.physics.add.collider(this.redSlimes, this.platforms);
    this.physics.add.collider(this.littleSlimes, this.platforms);

    this.physics.add.overlap(this.whiteSlimes, this.fireBullets, damageEnemy, null, this);
    this.physics.add.overlap(this.redSlimes, this.fireBullets, damageEnemy, null, this);
    this.physics.add.overlap(this.greenSlimes, this.fireBullets, damageEnemy, null, this);
    this.physics.add.overlap(this.littleSlimes, this.fireBullets, damageEnemy, null, this);
    this.physics.add.overlap(this.fireSkulls, this.fireBullets, damageEnemy, null, this);
    this.physics.add.collider(this.boss, this.fireBullets, damageBoss, null, this);

    this.physics.add.overlap(this.player, this.whiteSlimes, playerDamage5, null, this);
    this.physics.add.overlap(this.player, this.redSlimes, playerDamage10, null, this);
    this.physics.add.overlap(this.player, this.littleSlimes, playerDamage5Disable, null, this);
    this.physics.add.overlap(this.player, this.fireSkulls, playerDamage10Disable, null, this);
    this.physics.add.overlap(this.player, this.greenSlimes, playerDamage10, null, this);
    this.physics.add.overlap(this.player, this.bossBullets, playerDamage10Disable, null, this);

    this.physics.add.collider(this.fireBullets, this.platforms, destroyBullet, null, this);
    this.physics.add.overlap(this.player, this.coins, collectCoin, null, this);

    function damageEnemy(enemy, bullet) {
        enemy.health-=1;
        enemy.setTint(0xff0000);
        this.time.addEvent({
          delay: 200,
          callback: () => {
            enemy.setTint(0xffffff);
          },
        });
        bullet.destroy();
        if (enemy.health <= 0){
          this.score += 5;
          enemy.destroy();
          this.coins.create(enemy.x, enemy.y, 'coin');
          this.coins.children.iterate( function (child) {
            child.setScale(.2);
            child.anims.play('coinidle', true);
          });
        }
    }

    function damageBoss(boss, bullet) {
      boss.health-=1;
      boss.setTint(0xff0000);
      console.log(boss.health);
      this.time.addEvent({
        delay: 200,
        callback: () => {
          boss.setTint(0xffffff);
        },
      });
      bullet.destroy();
      if (boss.health === 47){
        this.music.pause();
        this.bossMusic.play({loop:true, volume: 0.1});
      }
      if (boss.health <= 0){
        this.score += 200;
        boss.destroy();
        this.physics.pause();
        this.bossMusic.pause();
        this.scene.start('gameWin', {score : this.score});
      }
    }

    function playerDamage10(player, enemy) {
      player.x-=20;
      this.score -= 50;
      player.setTint(0xff0000);
      player.health -= 10;
      console.log(player.health);
      this.time.addEvent({
        delay: 100,
        callback: () => {
          player.x-=25;
          player.setTint(0xffffff);
        },
      });
      if (player.health <= 0){
        this.score -= 1000;
        this.gameOver = true;
        console.log('game over');
      }
    }

    function playerDamage5(player, enemy) {
      player.x-=15;
      player.setTint(0xff0000);
      player.health -= 5;
      this.score -= 50;
      console.log(player.health);
      this.time.addEvent({
        delay: 200,
        callback: () => {
          player.x-=15;
          player.setTint(0xffffff);
        },
      });
      if (player.health <= 0){
        this.gameOver = true;
        console.log('game over');
      }
    }

    function playerDamage10Disable(player, enemy) {
      player.x-=15;
      player.setTint(0xff0000);
      player.health -= 10;
      this.score -= 50;
      enemy.destroy();
      console.log(player.health);
      this.time.addEvent({
        delay: 200,
        callback: () => {
          player.x-=15;
          player.setTint(0xffffff);
        },
      });
      if (player.health <= 0){
        this.gameOver = true;
      }
    }

    function playerDamage5Disable(player, enemy) {
      player.x-=15;
      player.setTint(0xff0000);
      player.health -= 5;
      this.score -= 50;
      enemy.destroy();
      console.log(player.health);
      this.time.addEvent({
        delay: 200,
        callback: () => {
          player.x-=15;
          player.setTint(0xffffff);
        },
      });
      if (player.health <= 0){
        this.gameOver = true;
        console.log('game over');
      }
    }

    function collectCoin (player, coin) {
      coin.disableBody(true, true);
      this.score += 10;
    }

    function destroyBullet(bullet, collider) {
      bullet.disableBody(true, true);
    }

    this.anims.staggerPlay('coinidle', this.coins.getChildren(), 0.03);
    this.anims.staggerPlay('walkslime', this.whiteSlimes.getChildren(), 0.03);
    this.anims.staggerPlay('jumpslime', this.redSlimes.getChildren(), 0.03);
    this.anims.staggerPlay('skullfly', this.fireSkulls.getChildren(), 0.03);

    this.time.addEvent({
        delay: 528,
        callback: () => {
          this.boss.anims.play('bossattack');
          this.bullet = this.bossBullets.create(this.boss.x, this.boss.y, 'bossbullet');
          this.bossBullets.children.iterate( function (child) {
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
    this.bossTween = this.tweens.add({
            targets: this.boss,
            props: {
              y: {value: '+=500', duration: 2125}
            },
            ease: 'sine.easeInOut',
            yoyo: true,
            repeat: -1
          });
    this.whiteSlimeTween = this.tweens.add({
      targets: this.whiteSlimes.getChildren(),
      props: {
        x: {value: '+=85', duration: 1500}
      },
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });
  }

  update () {
    if(this.healthText.x >= this.player.x + 550) {
      this.scoreText.x = this.player.x - 700;
      this.healthText.x = this.player.x - 700;
    }

    this.scoreText.setText('Score: ' + this.score);
    this.healthText.setText('Health: ' + this.player.health);

    this.cam = this.cameras.main;
    this.anims.staggerPlay('fireshoot', this.fireBullets.getChildren(), 0.03);

    if (this.gameOver) {
      this.music.pause();
      this.scene.start('gameOver', {score : this.score});
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('walk', true);
      this.cam.scrollX -= 4;
      this.scoreText.x-=2.5;
      this.healthText.x-=2.5;
      this.bgMid1.tilePositionX -= 0.1;
      this.bgMid2.tilePositionX -= 0.2;
      this.bgFront.tilePositionX -= 0.3;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('walk', true);
      this.cam.scrollX += 4;
      this.scoreText.x+= 4;
      this.healthText.x+= 4;
      this.bgMid1.tilePositionX += 0.1;
      this.bgMid2.tilePositionX += 0.2;
      this.bgFront.tilePositionX += 0.3;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('idle', true);
    }

    if (this.cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-550);
      this.player.anims.play('jump', true);
    }

    if (this.input.keyboard.checkDown(this.cursors.space, 300)) {
      this.shoot = this.fireBullets.create(this.player.x + 40, this.player.y + 15, 'firebullet');
      if (this.cursors.left.isDown){
        this.shoot.setVelocityX(-500);
      } else {
        this.shoot.setVelocityX(500);
      }
      this.shoot.body.setGravityY(-300);
    }

    if (this.player.body.velocity.x > 0) {
      this.player.setFlipX(false);
    } else if (this.player.body.velocity.x < 0) {
      this.player.setFlipX(true);
    }

  }
}
