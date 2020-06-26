export default class Scene1 extends Phaser.Scene {

  constructor() {
    super('mainMenu');
  }

  preload () {

    this.load.image('menubg', '../src/assets/city.png');
    this.load.image('menutext', '../src/assets/bootmenu.png');
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

    this.load.audio('rudebuster','../src/assets/levelmusic.mp3');
    this.load.audio('orchestrabuster', '../src/assets/bossmusic.mp3');
    this.load.audio('chillbuster', '../src/assets/bootmusic.mp3');
  }

  create() {

    this.chillMusic = this.sound.add('chillbuster');
    this.chillMusic.play({loop:true, volume: 0.1});

    this.bgBack = this.add.tileSprite(0, 0, 1024, 600, 'background4');
    this.bgBack.setOrigin(0,0);
    this.bgBack.setScrollFactor(0);
    this.bgBack.setScale(6);

    // Add each layer one by one
    this.bgMid1 = this.add.tileSprite(0, 0, 1024, 600, 'background3');
    this.bgMid1.setOrigin(0,0);
    this.bgMid1.setScrollFactor(0);
    this.bgMid1.setScale(6);

    this.bgMid2 = this.add.tileSprite(0, 0, 1024, 600, 'background2');
    this.bgMid2.setOrigin(0,0);
    this.bgMid2.setScrollFactor(0);
    this.bgMid2.setScale(6);

    this.bgFront = this.add.tileSprite(0, 0, 1024, 600, 'background1');
    this.bgFront.setOrigin(0,0);
    this.bgFront.setScrollFactor(0);
    this.bgFront.setScale(6);

    this.bootTxt = this.add.image(512, 300, 'menutext');
  }

  update() {
    this.bgMid1.tilePositionX += 0.01;
    this.bgMid2.tilePositionX += 0.04;
    this.bgFront.tilePositionX += 0.07;
    this.pointer = this.input.activePointer;

    if (this.pointer.isDown){
      this.chillMusic.pause();
      this.scene.start('playGame');
    }
  }
}
