
const damageEnemy = (enemy, bullet, score) => {
  enemy.health -= 1;
  enemy.tint = true;
  bullet.destroy = true;
  if (enemy.health <= 0) {
    score += 5;
    enemy.destroy = true;
    return { score, enemy };
  }
  return { enemy, bullet };
};

const damageBoss = (boss, bullet, score) => {
  boss.health -= 1;
  boss.tint = true;
  bullet.destroy = true;
  /*  boss.setTint(0xff0000);
  bullet.destroy(); */
  if (boss.health <= 0) {
    score += 200;
    boss.destroy = true;
    /*  boss.destroy();
    this.physics.pause();
    this.bossMusic.pause(); */
    const gameWin = true;
    return { score, boss, gameWin };
  }
  return { boss, bullet };
};

const playerDamage10 = (player, enemy, score) => {
  score -= 50;
  player.tint = true;
  enemy.tint = true;
  //  setTint(0x00ff00);
  player.health -= 10;

  if (player.health <= 0) {
    const gameOver = true;
    return gameOver;
  }
  return { player, enemy, score };
};

const playerDamage5 = (player, enemy, score) => {
  score -= 50;
  player.tint = true;
  enemy.tint = true;
  //  setTint(0x00ff00);
  player.health -= 5;

  if (player.health <= 0) {
    const gameOver = true;
    return gameOver;
  }
  return { player, enemy, score };
};

const collectCoin = (player, coin, score) => {
  score += 10;
  coin.destroy = true;
  return { score, coin };
};

const destroyBullet = (bullet) => {
  bullet.destroy = true;
  return bullet;
};

export {
  damageEnemy,
  damageBoss,
  playerDamage5,
  playerDamage10,
  collectCoin,
  destroyBullet,
};
